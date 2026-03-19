import './Footer.css'

const VERSION = '0.1.0'
const YEAR = new Date().getFullYear()

export default function Footer({ navigate }) {
  const go = (e, path) => {
    e.preventDefault()
    navigate?.(path)
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <span className="footer__brand">GT7 Setup Finder</span>
          <span className="footer__version">v{VERSION}</span>
          <span className="footer__sep" aria-hidden="true">·</span>
          <span className="footer__copy">&copy; {YEAR}</span>
        </div>

        <nav className="footer__links" aria-label="Footer links">
          <a className="footer__link" href="/terms" onClick={(e) => go(e, '/terms')}>
            Terms of Use
          </a>
          <a className="footer__link" href="/privacy" onClick={(e) => go(e, '/privacy')}>
            Privacy Policy
          </a>
          <a
            className="footer__link"
            href="https://www.gtplanet.net"
            target="_blank"
            rel="noreferrer"
          >
            Data: GTPlanet
          </a>
        </nav>
      </div>

      <div className="footer__disclaimer">
        GT7 Setup Finder is an unofficial fan tool and is not affiliated with,
        endorsed by, or connected to Sony Interactive Entertainment,
        Polyphony Digital, or Gran Turismo in any way. All car names, track
        names, and related trademarks are the property of their respective
        owners. Setup data is AI-generated using community sources as context —
        use at your own discretion. Always test setups carefully before racing.
      </div>
    </footer>
  )
}
