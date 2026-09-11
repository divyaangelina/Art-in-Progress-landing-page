import "../styles/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <main className="privacy-policy">
      <div className="privacy-policy__container">
        <p className="eyebrow">LEGAL</p>

        <h1>Privacy Policy</h1>

        <p className="privacy-policy__updated">
          Last updated: September 11, 2026
        </p>

        <section>
          <h2>1. What We Collect</h2>
          <p>
            At this stage, Art in Progress collects the information you provide
            when you join our waitlist, primarily your email address.
          </p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your email address to manage the Art in Progress waitlist
            and to contact you about the development and launch of the platform,
            including updates, announcements, and related opportunities.
          </p>
        </section>

        <section>
          <h2>3. How Your Information Is Stored</h2>
          <p>
            Waitlist email addresses are stored in a Google Sheets spreadsheet
            managed by Art in Progress. Access to the spreadsheet is limited to
            the Art in Progress team.
          </p>
        </section>

        <section>
          <h2>4. Your Choices</h2>
          <p>
            You may request that we remove your email address from our waitlist
            at any time by contacting us using the email address below.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We take reasonable measures to protect the information we collect
            and limit access to the waitlist to authorized members of the Art
            in Progress team. However, no method of transmission or storage
            over the internet can be guaranteed to be completely secure.
          </p>
        </section>

        <section>
          <h2>6. Changes as Art in Progress Develops</h2>
          <p>
            This Privacy Policy applies to the current Art in Progress landing
            page and waitlist. As we develop and launch the Art in Progress
            platform, we may collect and process additional information and may
            update this Privacy Policy accordingly. Any changes will be
            reflected on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            If you have questions about this Privacy Policy or would like to
            request deletion of your information from the waitlist, please
            contact us at{" "}
            <a href="mailto:artinprogress3@gmail.com">
              artinprogress3@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}