// ============================================================================
// api/waitlist.js — server-side waitlist endpoint
//
// Flow:
//   browser POSTs { email }
//        ↓
//   Vercel runs this function
//        ↓
//   Google Sheets API appends the email to the waitlist spreadsheet
//
// Google credentials stay on the server and are never sent to the browser.
// ============================================================================

import { google } from "googleapis";

export default async function handler(request, response) {
  // The form only ever POSTs.
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const email = String(request.body?.email ?? "").trim();

  // Validate again on the server.
  if (!isPlausibleEmail(email)) {
    return response
      .status(400)
      .json({ error: "Enter a valid email address." });
  }

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail =
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  // Make sure all required Google credentials exist.
  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    console.error("Google Sheets environment variables are not configured.");

    return response
      .status(500)
      .json({ error: "The waitlist is temporarily unavailable." });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Waitlist!A:B",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[email, new Date().toISOString()]],
      },
    });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Google Sheets request failed:", error);

    return response
      .status(502)
      .json({ error: "We couldn't add you just now. Please try again." });
  }
}

// Deliberately loose email validation.
// This catches obvious mistakes without rejecting legitimate addresses.
function isPlausibleEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;
}