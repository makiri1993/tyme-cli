use std::fs::read_to_string;
use std::process::Command;

use chrono::{DateTime, Datelike, Duration, Utc};
use exitfailure::ExitFailure;
use serde::{Deserialize, Serialize};
use std::env;
use std::path::Path;
use structopt::StructOpt;

#[derive(Debug, Serialize, Deserialize)]
struct TymeExport {
    timed: Vec<TymeEntry>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct TymeEntry {
    task: String,
    date: DateTime<Utc>,
    project: String,
    sum: f32,
    duration: f32,
}

#[derive(Debug, Serialize, Deserialize)]
struct Time {
    hours: i32,
    minutes: i32,
}

#[derive(Debug, Serialize, Deserialize)]
struct TimeEntry {
    task: String,
    date: String,
    project: String,
    sum: f32,
    time: Time,
    week: u32,
}

#[derive(Debug, Serialize, Deserialize)]
struct TimeExport {
    first_day: String,
    last_day: String,
    entries: Vec<TimeEntry>,
}

#[derive(StructOpt)]
struct Cli {
    #[structopt(parse(from_os_str))]
    path: std::path::PathBuf,
}

const DATE_FORMAT: &str = "%Y-%m-%d";

fn main() -> Result<(), ExitFailure> {
    let args = Cli::from_args();

    let tyme_entries = parse_file_to_rust_tyme_structs(&args.path);
    let fixed_tyme_entries = tyme_entries
        .iter()
        .map(|entry| {
            let right_date = entry.date + Duration::days(1);
            TymeEntry {
                date: right_date,
                ..entry.clone()
            }
        })
        .collect::<Vec<TymeEntry>>();
    let sanitized_entries: Vec<TimeEntry> = fixed_tyme_entries
        .iter()
        .map(transform_tyme_entry_to_time_entry)
        .collect();

    // sanitized_entries.iter().for_each(|entry| {
    //     println!("{:?}", entry);
    // });

    let (first_day, last_day) = find_first_date(&fixed_tyme_entries);

    let time_export = TimeExport {
        entries: sanitized_entries,
        first_day,
        last_day,
    };

    let mut cd = Command::new("cd");
    let root = Path::new("./timesheet");
    assert!(env::set_current_dir(&root).is_ok());
    println!(
        "Successfully changed working directory to {}!",
        root.display()
    );

    cd.arg("timesheet").output().expect("Failed to execute.");

    let mut echo_hello = Command::new("yarn");
    let output = echo_hello
        .arg("dev")
        .arg(serde_json::to_string(&time_export).unwrap())
        .output()
        .expect("Command wasn't run successfully");

    println!("Starting to generate pdf.");
    println!("status: {}", output.status);
    println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
    println!("stderr: {}", String::from_utf8_lossy(&output.stderr));
    println!("Generating pdf successfully finished.");
    Ok(())
}

fn find_first_date(entries: &Vec<TymeEntry>) -> (String, String) {
    let first_entry = entries.first().unwrap();
    let last_entry = entries.last().unwrap();

    let monday = first_entry.date
        + Duration::days(first_entry.date.weekday().num_days_from_monday() as i64 * -1);
    let sunday =
        last_entry.date + Duration::days(first_entry.date.weekday().num_days_from_sunday() as i64);

    (
        format!("{}", monday.format(DATE_FORMAT)),
        format!("{}", sunday.format(DATE_FORMAT)),
    )
}

fn transform_tyme_entry_to_time_entry(entry: &TymeEntry) -> TimeEntry {
    TimeEntry {
        time: transform_duration_to_hours_and_minutes(entry.duration),
        date: format!("{}", entry.date.format(DATE_FORMAT)),
        week: entry.date.iso_week().week(),
        project: entry.project.clone(),
        sum: entry.sum,
        task: entry.task.clone(),
    }
}

fn parse_file_to_rust_tyme_structs(path: &std::path::PathBuf) -> Vec<TymeEntry> {
    let data = read_to_string(path).expect("Unable to read file");
    let deserialized: TymeExport = serde_json::from_str(&data).unwrap();
    deserialized.timed
}

fn transform_duration_to_hours_and_minutes(duration: f32) -> Time {
    let decimal_number = (duration / 60.0) as i32;
    let minutes = decimal_number % 60;
    let hours = decimal_number / 60;
    Time { hours, minutes }
}
