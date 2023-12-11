import { google } from "googleapis";
import type { bar } from "@/types/bar";

// Tuple type to represent a row in the Google Sheet
type GoogleSheetRow = [string, ...string[]];

function handleSpreadSheetApiResponse(
  googleSheetRows: GoogleSheetRow[] | null | undefined
): bar[] {
  if (!googleSheetRows) {
    return [];
  }

  return googleSheetRows.map((row) => ({
    // heads up, you'll need to change this if you change the order of columns in the sheet
    name: row[0],
    lat: parseFloat(row[3]),
    long: parseFloat(row[4]),
    lastUpdated: row[7],
    onTap: row[5] === "TRUE", // Convert string to boolean
    onBottle: row[6] === "TRUE", // Convert string to boolean
  }));
}

export async function getGoogleSheetData() {
  try {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      scopes
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "MapData!A2:H100",
    });

    return handleSpreadSheetApiResponse(
      response.data.values as GoogleSheetRow[]
    );
  } catch (err) {
    console.error(err);
    return [];
  }
}
