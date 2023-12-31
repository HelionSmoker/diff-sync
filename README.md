# sync-system
The project helps operators in syncing job data between the dispatch system and Google Sheets, ensuring accurate alignment between them. It enables updates without losing data, preserving the work of other agents. Additionally, the tool enhances report data quality through formatting changes, all achieved with efficiency and consistency.

## Step-by-Step Guide

To make the most of the website, follow these steps:

1. Copy the jobs from the system, either manually or using an automatic script, and paste them into the *left textarea*.
2. Navigate to the spreadsheet you want to sync, select the entire table, **including the date and the start time**. Scroll down to the last row with content.
3. Return to the website and paste the selected table into the *right textarea*.
4. Click on `Sync`, and a table with new values will appear below the buttons.
5. Check the row count at the bottom to ensure it matches the job count in the system precisely. If not, inspect the spreadsheet for any formatting issues and address them before retrying the process.
6. Once satisfied with the result, click on `Copy` and return to the spreadsheet. Paste the copied table over the previous one.
7. Congratulations, you're done! 🥳


## Handy Tip

If you're copying a table from Google Sheets and pasting it into the textarea, keep these tips in mind:

- Trim the table before pasting by selecting it and navigating to `Data > Data Cleanup > Trim Whitespace`.
- Opt for single quotes (`''`) over double quotes (`""`).
- When using double quotes, make sure to use them in pairs. An odd double quote could mess up the parsing.
- If you're using double quotes, refrain from placing them at the beginning or end of the cell.
