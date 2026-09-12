import { google } from "googleapis";

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim();

    // Validate the email on the server.
    if (!isPlausibleEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Enter a valid email address." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const serviceAccountEmail =
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    // Make sure all required Google credentials exist.
    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
      console.error(
        "Google Sheets environment variables are not configured."
      );

      return new Response(
        JSON.stringify({
          error: "The waitlist is temporarily unavailable.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    // Check the existing emails BEFORE adding anything.
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Waitlist!A:A",
    });

    const existingEmails = existing.data.values ?? [];

    const alreadySignedUp = existingEmails.some(
      (row) =>
        String(row[0] ?? "").trim().toLowerCase() ===
        email.toLowerCase()
    );

    // If the email already exists, don't add another row.
    if (alreadySignedUp) {
      return new Response(
        JSON.stringify({
          error: "You've already signed up with this email.",
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Email is new, so add it to the spreadsheet.
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Waitlist!A:B",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            email,
            new Date().toLocaleString("en-US", {
              timeZone: "America/New_York",
          }),
        ],
      ],
      },
    });

    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Google Sheets request failed:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Unknown Google Sheets error.",
    }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

function isPlausibleEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;
}