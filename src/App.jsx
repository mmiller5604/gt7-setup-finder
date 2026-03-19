import { useState, useCallback, useEffect, useRef } from 'react'
import TopBar from './components/TopBar'
import ResultsPanel from './components/ResultsPanel'
import Footer from './components/Footer'
import { TermsPage, PrivacyPage } from './components/StaticPage'
import { fetchSetups } from './api/setups'
import carOptions from './data/cars'
import trackOptions from './data/tracks'
import './App.css'

// ── URL helpers ──────────────────────────────────────────────────────────────

/** Flatten grouped car options into a plain array for lookup. */
const flatCars = carOptions.flatMap((group) => group.options)

/** Resolve a car value string → react-select option object, or null. */
function resolveCarOption(value) {
  if (!value) return null
  return flatCars.find((o) => o.value === value) ?? null
}

/** Resolve a track value string → react-select option object, or null. */
function resolveTrackOption(value) {
  if (!value) return null
  return trackOptions.find((o) => o.value === value) ?? null
}

/** Read car + track from the current URL search params. */
function readUrlParams() {
  const p = new URLSearchParams(window.location.search)
  return { carParam: p.get('car'), trackParam: p.get('track') }
}

/** Push car + track into the URL without a navigation (replaces current entry). */
function setUrlParams(car, track) {
  const p = new URLSearchParams()
  if (car) p.set('car', car)
  if (track) p.set('track', track)
  const search = p.toString() ? `?${p.toString()}` : ''
  window.history.replaceState(null, '', `/${search}`)
}

// ── Navigation hook ──────────────────────────────────────────────────────────

function useNavigation() {
  const [path, setPath] = useState(() => window.location.pathname)

  const navigate = useCallback((to) => {
    window.history.pushState(null, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handler = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  return { path, navigate }
}

// ── Main app ─────────────────────────────────────────────────────────────────

function MainApp() {
  // Initialise car + track from URL params on first render
  const { carParam, trackParam } = readUrlParams()
  const [car, setCar] = useState(() => resolveCarOption(carParam))
  const [track, setTrack] = useState(() => resolveTrackOption(trackParam))
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState(null)
  const autoSearched = useRef(false)

  const handleSearch = useCallback(
    async (forceCar, forceTrack) => {
      const searchCar = forceCar ?? car
      const searchTrack = forceTrack ?? track
      if (!searchCar || !searchTrack) return

      setLoading(true)
      setSearched(true)
      setError(null)
      setResults(null)

      // Reflect the searched combo in the URL
      setUrlParams(searchCar.value, searchTrack.value)

      try {
        const data = await fetchSetups(searchCar.value, searchTrack.value)
        setResults(data)
      } catch (err) {
        const detail = err.response?.data?.detail
        let msg
        if (Array.isArray(detail)) {
          // FastAPI 422 validation errors — array of {type, loc, msg, input} objects
          msg = detail.map((e) => e.msg ?? String(e)).join(', ')
        } else if (typeof detail === 'string') {
          msg = detail
        } else {
          msg = err.message ?? 'Unknown error'
        }
        setError(msg)
      } finally {
        setLoading(false)
      }
    },
    [car, track],
  )

  const handleRetry = useCallback(() => handleSearch(), [handleSearch])

  // Auto-search once if both car + track were present in the URL on load
  useEffect(() => {
    if (autoSearched.current) return
    const initCar = resolveCarOption(carParam)
    const initTrack = resolveTrackOption(trackParam)
    if (initCar && initTrack) {
      autoSearched.current = true
      handleSearch(initCar, initTrack)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={`app__progress${loading ? ' app__progress--visible' : ''}`} />
      <TopBar
        car={car}
        track={track}
        onCarChange={setCar}
        onTrackChange={setTrack}
        onSearch={handleSearch}
        loading={loading}
      />
      <ResultsPanel
        car={car}
        track={track}
        results={results}
        searched={searched}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </>
  )
}

// ── Root app with routing ────────────────────────────────────────────────────

export default function App() {
  const { path, navigate } = useNavigation()

  let content
  if (path === '/terms') {
    content = (
      <>
        <TopBar minimal navigate={navigate} />
        <TermsPage />
      </>
    )
  } else if (path === '/privacy') {
    content = (
      <>
        <TopBar minimal navigate={navigate} />
        <PrivacyPage />
      </>
    )
  } else if (path === '/' || path === '') {
    content = <MainApp />
  } else {
    content = (
      <>
        <TopBar minimal navigate={navigate} />
        <div className="not-found">
          <span className="not-found__code">404</span>
          <p className="not-found__msg">Page not found.</p>
          <button className="not-found__home" onClick={() => navigate('/')}>
            Go home
          </button>
        </div>
      </>
    )
  }

  return (
    <div className="app">
      {content}
      <Footer navigate={navigate} />
    </div>
  )
}
