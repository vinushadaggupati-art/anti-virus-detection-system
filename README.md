# Digital Guardian Console

Build a professional 2D cybersecurity dashboard for an Automated Anti-Forensics Detection System.

Do NOT create a 3D interface. The entire dashboard should use a clean 2D dark cybersecurity/SOC-style design with cards, charts, tables, timelines, icons, badges, and panels.

Design Style

Use:

- Dark navy/black background

- Clean 2D layout

- Modern cybersecurity/SOC appearance

- Subtle borders and shadows

- Professional typography

- Clear spacing

- Minimal animations

- No 3D objects

- No rotating 3D models

- No unnecessary decorative graphics

The dashboard should look like a real digital forensic investigation platform.

Main Layout

Use a fixed left sidebar and a main content area.

Left Sidebar

Display the project logo:

🛡️ AFD

Anti-Forensics Detection

Navigation:

- Dashboard

- New Scan

- Evidence Analysis

- Hidden Files

- Timestamp Analysis

- Log Analysis

- Browser Artifacts

- Memory Analysis

- Malware Detection

- File Integrity

- Reports

- Scan History

- Alerts

- Settings

At the bottom:

- User profile

- Investigator role

- Logout

Dashboard Header

Display:

Automated Anti-Forensics Detection

Subtitle:

Digital Evidence Integrity & Threat Analysis

On the right:

- Search

- Notifications

- Investigator profile

Add a prominent button:

+ Start New Scan

Top Statistics

Create four 2D cards:

Total Scans

128

Suspicious Activities

37

Critical Findings

8

Evidence Integrity

94%

Each card should contain:

- Small icon

- Main number

- Label

- Small trend indicator

Overall Risk Section

Create a large 2D risk-score card.

Display:

Overall Risk Score

78 / 100

HIGH RISK

Use a clean circular progress indicator or horizontal progress bar.

Below:

"Multiple anti-forensics indicators detected."

Add:

View Investigation →

Detection Overview

Create a 2D bar chart showing:

- Hidden Files

- Timestamp Tampering

- Log Deletion

- Browser Anomalies

- File Integrity

- Malware Indicators

The chart should display the number of findings.

Use Plotly and connect it to backend data later.

Risk Trend

Create a 2D line chart showing risk score across previous scans.

Example:

Scan 01 → 25

Scan 02 → 34

Scan 03 → 46

Scan 04 → 63

Scan 05 → 78

Label the chart:

Risk Score Trend

Recent Findings

Create a professional 2D table.

Columns:

- Severity

- Detection

- Evidence

- Timestamp

- Risk Score

- Status

- Action

Example:

🔴 Critical | Log Deletion | system.log | 21:34 | 92 | Open | View

🟠 High | Timestamp Tampering | evidence01.txt | 20:18 | 78 | Open | View

🟡 Medium | Hidden File | .hidden_data | 19:45 | 51 | Reviewed | View

Recent Alerts

Create a 2D alert panel.

Example:

🔴 Critical

Timestamp manipulation detected

🟠 High

Suspicious hidden files detected

🟡 Medium

Browser artifact inconsistency detected

Each alert should have:

- Severity

- Description

- Time

- Evidence

- View button

New Scan Page

Create a clean 2D scan configuration interface.

Section:

Select Evidence

Allow:

- Upload forensic image

- Select evidence folder

- Select case ID

Section:

Detection Modules

Use checkboxes:

☐ Hidden File Detection

☐ Timestamp Tampering Detection

☐ Log Deletion Detection

☐ Browser Artifact Analysis

☐ Memory Analysis

☐ Malware Scanning

☐ File Integrity Monitoring

☐ AI Anomaly Detection

Button:

START FORENSIC SCAN

After starting, display a 2D progress workflow:

Evidence Acquisition

↓

File Analysis

↓

Artifact Analysis

↓

Anomaly Detection

↓

Risk Calculation

↓

Report Generation

Scan Results

Create a 2D investigation results page.

Header:

Forensic Scan Results

Display:

- Case ID

- Evidence name

- Scan date

- Investigator

- Total files analyzed

- Findings

- Risk score

Then show:

Critical Findings

High Findings

Medium Findings

Low Findings

Use severity badges.

Finding Details

When the investigator clicks "View", open a detailed 2D panel.

Show:

Timestamp Tampering Detected

Evidence:

"example.txt"

Created:

"12:30 PM"

Modified:

"09:15 PM"

Accessed:

"12:35 PM"

Severity:

HIGH

Confidence:

94%

Reason:

"File modification timestamp is inconsistent with the evidence timeline."

Buttons:

Mark as Reviewed

Add Investigation Note

Evidence Explorer

Create a 2D file explorer/table.

Columns:

- File

- Type

- Size

- Created

- Modified

- Accessed

- SHA-256

- Status

Allow:

- Search

- Sort

- Filter

- Severity filtering

Timestamp Analysis

Create a 2D timeline.

Display:

Created → Modified → Accessed

Highlight suspicious timestamp relationships.

Detect:

- Modified before creation

- Accessed before creation

- Unusual timestamp changes

- Timestamp gaps

Hidden File Detection

Create a 2D page containing:

Files Scanned

Hidden Files

Suspicious Files

Critical Files

Then show a searchable table with:

- File

- Location

- Hidden attribute

- File type

- Size

- Risk

- Reason

Log Analysis

Display:

- Logs analyzed

- Missing entries

- Deleted indicators

- Modified entries

- Suspicious events

Include a searchable event table.

Browser Artifact Analysis

Display separate 2D cards for:

Chrome

Edge

Firefox

Analyze:

- History

- Downloads

- Cookies

- Cache

- Search activity

Highlight suspicious or inconsistent artifacts.

Malware Detection

Create a 2D malware-analysis page.

Show:

- Files scanned

- Suspicious files

- Malware indicators

- Hash matches

- Threat level

Do NOT execute uploaded files.

Use safe mock detection data during development.

File Integrity

Create a 2D integrity monitoring page.

Display:

Files Verified

Files Modified

Files Deleted

New Files

For each file show:

- Original hash

- Current hash

- Hash status

Display either:

✓ INTEGRITY VERIFIED

or

⚠ INTEGRITY VIOLATION

Reports

Create a 2D report-generation page.

Buttons:

Generate PDF Report

Export CSV

PDF should contain:

- Case information

- Investigator

- Evidence details

- Scan date

- Risk score

- Findings

- Hash values

- Timeline

- Detection summary

- Conclusion

Scan History

Create a 2D table containing:

- Scan ID

- Case ID

- Evidence

- Date

- Findings

- Risk

- Investigator

- Status

Add filters for:

- Date

- Risk

- Investigator

- Status

Alerts

Create an alert-management page.

Allow:

- View alert

- Mark as reviewed

- Filter by severity

- Filter by date

Critical alerts should be clearly visible.

Authentication

Create a professional 2D login screen.

Fields:

- Username/email

- Password

Roles:

Administrator

Investigator

Viewer

Implement role-based access.

Database

Use PostgreSQL.

Create tables:

- users

- cases

- evidence

- scans

- findings

- alerts

- reports

- scan_history

- file_integrity

Use SQLAlchemy.

Backend

Use FastAPI.

Create REST APIs for:

- Authentication

- Scan creation

- Scan results

- Findings

- Evidence

- Alerts

- Reports

- Scan history

- Dashboard statistics

AI Detection

Use Scikit-learn.

Initially implement an Isolation Forest anomaly-detection module using forensic features such as:

- Timestamp inconsistencies

- File modifications

- Hidden-file frequency

- Missing logs

- Hash changes

- Browser artifact inconsistencies

Display:

AI Anomaly Score: 87%

Clearly label AI results as anomaly predictions, not confirmed forensic evidence.

Risk Scoring

Use:

Critical = 25 points

High = 15 points

Medium = 8 points

Low = 3 points

Normalize to 0–100.

Risk levels:

0–20 → LOW

21–40 → MODERATE

41–60 → MEDIUM

61–80 → HIGH

81–100 → CRITICAL

Keep the scoring system configurable.

Important

The dashboard must initially work using realistic mock data.

After that, connect it to FastAPI and PostgreSQL.

Do not hardcode statistics once the backend is connected.

Use reusable components so the application can later be converted from Streamlit to React.

The final UI must be 100% 2D, professional, clean, responsive, and suitable for a final-year cybersecurity/digital-forensics project demonstration.

The primary goal is:

Detect → Analyze → Score Risk → Investigate → Generate Report

Make these five stages visually clear throughout the application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0dd6f52b-7f5b-45b9-b5a8-57f037a4e51f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
