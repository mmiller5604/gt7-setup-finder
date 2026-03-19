import './StaticPage.css'

export function TermsPage() {
  return (
    <main className="static-page">
      <h1>Terms of Use</h1>
      <p className="static-page__date">Last updated: March 2026</p>

      <section>
        <h2>1. Acceptance</h2>
        <p>
          By using GT7 Setup Finder ("the Service") you agree to these Terms of
          Use. If you do not agree, please do not use the Service.
        </p>
      </section>

      <section>
        <h2>2. No Warranty</h2>
        <p>
          The Service is provided "as is" without any warranty of any kind. Car
          setup recommendations are AI-generated and sourced from third-party
          community content. We make no guarantees regarding accuracy,
          completeness, or suitability for any particular purpose.
        </p>
      </section>

      <section>
        <h2>3. Use at Your Own Risk</h2>
        <p>
          Setups are suggestions only. Always test setups in a safe in-game
          environment before using them in competitive play. We accept no
          liability for any in-game losses or damages arising from use of
          the provided setups.
        </p>
      </section>

      <section>
        <h2>4. Third-Party Content</h2>
        <p>
          Setup data is derived from community posts on GTPlanet. We do not
          claim ownership of any third-party content. If you believe your
          content has been used without permission, please contact us.
        </p>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          Gran Turismo 7, all car names, track names, and related marks are
          trademarks of their respective owners. This Service is an unofficial
          fan project and is not affiliated with Sony Interactive Entertainment
          or Polyphony Digital.
        </p>
      </section>

      <section>
        <h2>6. Changes</h2>
        <p>
          We may update these Terms at any time. Continued use of the Service
          after changes constitutes acceptance of the revised Terms.
        </p>
      </section>
    </main>
  )
}

export function PrivacyPage() {
  return (
    <main className="static-page">
      <h1>Privacy Policy</h1>
      <p className="static-page__date">Last updated: March 2026</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          GT7 Setup Finder does not collect, store, or transmit any personally
          identifiable information. The only data stored locally is a cache of
          previously generated car setups in <code>setups.json</code> on the
          server running the application.
        </p>
      </section>

      <section>
        <h2>2. Cookies</h2>
        <p>
          This Service does not use cookies or any client-side tracking
          technologies.
        </p>
      </section>

      <section>
        <h2>3. Third-Party Services</h2>
        <p>
          The Service makes requests to GTPlanet to retrieve community setup
          information, and to the Anthropic API to generate setup
          recommendations. Please review the privacy policies of those services
          for information on how they handle data.
        </p>
      </section>

      <section>
        <h2>4. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please open an
          issue on the project repository.
        </p>
      </section>
    </main>
  )
}
