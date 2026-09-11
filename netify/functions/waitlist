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
        error: "We couldn't add you just now. Please try again.",
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