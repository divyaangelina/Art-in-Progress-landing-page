// ============================================================================
// api/waitlist.js — the only server-side code in this project.
// ----------------------------------------------------------------------------
// Everything else here is a static file that gets copied to the visitor's
// browser and runs on their machine. This file does not. Vercel runs any
// file under /api on its own servers, and that difference is the entire
// reason this exists: the Buttondown API key lives here, where a visitor
// cannot read it. Calling Buttondown straight from Waitlist.jsx would ship
// the key inside the JavaScript bundle for anyone to lift out of DevTools.
//
// Flow: the browser POSTs { email } here -> this attaches the key and
// forwards it to Buttondown -> this returns a plain ok/error the UI renders.
//
// Requires one environment variable, set in the Vercel dashboard:
//   BUTTONDOWN_API_KEY — from buttondown.com, Settings -> Programming
//
// Note: `npm run dev` runs Vite alone and does NOT execute this file, so the
// form will 404 locally. Use `vercel dev` to run both together.
// ============================================================================

const BUTTONDOWN_ENDPOINT = "https://api.buttondown.com/v1/subscribers";

export default async function handler(request, response) {
  // The form only ever POSTs. Anything else is someone poking at the URL.
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const email = String(request.body?.email ?? "").trim();

  // Validated again here even though Waitlist.jsx already checked. The
  // client-side check is a convenience for real users; it is trivially
  // bypassed by anyone POSTing straight to this URL, so the server cannot
  // trust that it happened.
  if (!isPlausibleEmail(email)) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    // A misconfiguration, not a user mistake — log the real cause, but stay
    // vague in the response. Internal detail in the UI helps nobody.
    console.error("BUTTONDOWN_API_KEY is not set in this environment.");
    return response
      .status(500)
      .json({ error: "The waitlist is temporarily unavailable." });
  }

  try {
    const buttondown = await fetch(BUTTONDOWN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, type: "regular" }),
    });

    if (buttondown.ok) {
      return response.status(200).json({ ok: true });
    }

    const detail = await buttondown.text();

    // Already subscribed is a success from the visitor's point of view: they
    // asked to be on the list and they are on the list. Returning an error
    // here would just make them think it failed and submit again.
    if (buttondown.status === 400 && /already|exists/i.test(detail)) {
      return response.status(200).json({ ok: true, alreadySubscribed: true });
    }

    console.error("Buttondown rejected the subscribe:", buttondown.status, detail);
    return response
      .status(502)
      .json({ error: "We couldn't add you just now. Please try again." });
  } catch (error) {
    // Network failure, DNS, timeout — Buttondown was unreachable.
    console.error("Buttondown request failed:", error);
    return response
      .status(502)
      .json({ error: "We couldn't add you just now. Please try again." });
  }
}

// Deliberately loose. Email syntax is notoriously hard to validate correctly
// and an over-strict pattern rejects real addresses; the only true test is
// whether mail arrives. This catches typos and junk, Buttondown does the rest.
function isPlausibleEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;
}
