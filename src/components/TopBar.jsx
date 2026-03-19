import Select from 'react-select'
import cars from '../data/cars'
import tracks from '../data/tracks'
import './TopBar.css'

const selectStyles = {
  control: (base, state) => ({
    ...base,
    background: '#141414',
    borderColor: state.isFocused ? '#e8c84a' : '#272727',
    boxShadow: state.isFocused ? '0 0 0 1px #e8c84a' : 'none',
    minWidth: '210px',
    height: '38px',
    minHeight: '38px',
    '&:hover': { borderColor: '#e8c84a' },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 10px',
  }),
  menu: (base) => ({
    ...base,
    background: '#141414',
    border: '1px solid #272727',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? '#1e1e1e' : 'transparent',
    color: state.isSelected ? '#e8c84a' : '#e8e8e8',
    fontSize: '0.875rem',
    cursor: 'pointer',
    paddingLeft: '1rem',
  }),
  groupHeading: (base) => ({
    ...base,
    fontSize: '0.65rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#3a3a3a',
    padding: '0.4rem 0.75rem 0.2rem',
    borderTop: '1px solid #1e1e1e',
    marginTop: '2px',
  }),
  group: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  singleValue: (base) => ({ ...base, color: '#e8e8e8', fontSize: '0.875rem' }),
  input: (base) => ({ ...base, color: '#e8e8e8', fontSize: '0.875rem' }),
  placeholder: (base) => ({ ...base, color: '#555', fontSize: '0.875rem' }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#e8c84a' : '#555',
    padding: '0 8px',
    transition: 'color 0.15s',
  }),
  clearIndicator: (base) => ({ ...base, color: '#555', padding: '0 8px' }),
}

export default function TopBar({ car, track, onCarChange, onTrackChange, onSearch, loading, minimal, navigate }) {
  const canSearch = car && track

  const Logo = () => (
    <button
      className="top-bar__logo top-bar__logo--btn"
      onClick={() => navigate?.('/')}
      aria-label="Go to home"
    >
      <div className="top-bar__logo-flag" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => <span key={i} />)}
      </div>
      <div>
        <div className="top-bar__logo-text">GT7 Setup Finder</div>
        <div className="top-bar__logo-sub">Gran Turismo 7</div>
      </div>
    </button>
  )

  if (minimal) {
    return (
      <div className="top-bar">
        <Logo />
        <button className="top-bar__back" onClick={() => navigate?.('/')}>
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div className="top-bar">
      <Logo />

      <div className="top-bar__controls">
        <Select
          options={cars}
          value={car}
          onChange={onCarChange}
          placeholder="Select a car..."
          styles={selectStyles}
          isSearchable
        />

        <Select
          options={tracks}
          value={track}
          onChange={onTrackChange}
          placeholder="Select a track..."
          styles={selectStyles}
          isSearchable
        />

        <button
          className="top-bar__btn"
          onClick={() => onSearch()}
          disabled={!canSearch || loading}
        >
          {loading ? 'Searching…' : 'Find Setups'}
        </button>
      </div>
    </div>
  )
}
