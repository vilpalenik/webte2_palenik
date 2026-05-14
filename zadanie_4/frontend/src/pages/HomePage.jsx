import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchDestinations } from '../api'

const TYPES = [
  { value: 'more',       label: 'More' },
  { value: 'hory',       label: 'Hory' },
  { value: 'historicke', label: 'Historické mestá' },
  { value: 'mestsky',    label: 'Mestský výlet' },
  { value: 'aktivita',   label: 'Aktivity' },
]

const MONTHS = [
  'Január','Február','Marec','Apríl','Máj','Jún',
  'Júl','August','September','Október','November','December'
]

export default function HomePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    month: 7,
    types: [],
    temperature: 'jedno',
    distance: 0,
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState([])

  const toggleType = (val) => {
    setForm(f => ({
      ...f,
      types: f.types.includes(val)
        ? f.types.filter(t => t !== val)
        : [...f.types, val]
    }))
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      const res = await searchDestinations(form)
      setResults(res.data)
      setSelected([])
    } catch (e) {
      alert('Chyba pri hľadaní')
    } finally {
      setLoading(false)
    }
  }

  const toggleSelect = (id) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 2) return prev
      return [...prev, id]
    })
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* HERO */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1a202c', margin: 0 }}>
          Čo od dovolenky chceš?
        </h1>
        <p style={{ color: '#718096', marginTop: '0.5rem' }}>
          Vyplň formulár a nájdeme ti ideálnu destináciu
        </p>
      </div>

      {/* FORMULÁR */}
      <div style={{
        background: 'white', borderRadius: '16px',
        padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '2rem'
      }}>

        {/* Mesiac */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>📅 Kedy chceš cestovať?</label>
          <select
            value={form.month}
            onChange={e => setForm(f => ({ ...f, month: parseInt(e.target.value) }))}
            style={selectStyle}
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>

        {/* Typy */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>🎯 Čo hľadáš? (môžeš vybrať viac)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
            {TYPES.map(t => (
              <button
                key={t.value}
                onClick={() => toggleType(t.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: '2px solid',
                  borderColor: form.types.includes(t.value) ? '#1a73e8' : '#e2e8f0',
                  background: form.types.includes(t.value) ? '#e8f0fe' : 'white',
                  color: form.types.includes(t.value) ? '#1a73e8' : '#4a5568',
                  cursor: 'pointer',
                  fontWeight: form.types.includes(t.value) ? 600 : 400,
                  transition: 'all 0.2s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Teplota */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>🌡️ Preferovaná teplota</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
            {[
              { value: 'horuco',   label: '🔥 Horúco (30°C+)' },
              { value: 'teplo',    label: '☀️ Teplo (20–29°C)' },
              { value: 'prijemne', label: '🌤️ Príjemne (10–19°C)' },
              { value: 'jedno',    label: '🤷 Jedno mi to' },
            ].map(t => (
              <button
                key={t.value}
                onClick={() => setForm(f => ({ ...f, temperature: t.value }))}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: '2px solid',
                  borderColor: form.temperature === t.value ? '#1a73e8' : '#e2e8f0',
                  background: form.temperature === t.value ? '#e8f0fe' : 'white',
                  color: form.temperature === t.value ? '#1a73e8' : '#4a5568',
                  cursor: 'pointer',
                  fontWeight: form.temperature === t.value ? 600 : 400,
                  transition: 'all 0.2s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vzdialenosť */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={labelStyle}>✈️ Vzdialenosť z Viedne</label>
          <select
            value={form.distance}
            onChange={e => setForm(f => ({ ...f, distance: parseFloat(e.target.value) }))}
            style={selectStyle}
          >
            <option value={3}>Do 3 hodín letu</option>
            <option value={5}>Do 5 hodín letu</option>
            <option value={0}>Kdekoľvek</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            width: '100%', padding: '0.9rem',
            background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
            color: 'white', border: 'none', borderRadius: '10px',
            fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          {loading ? 'Hľadám...' : '🔍 Nájsť destinácie'}
        </button>
      </div>

      {/* VÝSLEDKY */}
      {results !== null && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, color: '#1a202c' }}>
              {results.length > 0 ? `Nájdených ${results.length} destinácií` : 'Žiadne výsledky'}
            </h2>
            {selected.length === 2 && (
              <button
                onClick={() => navigate(`/compare?ids=${selected.join(',')}&month=${form.month}`)}
                style={{
                  padding: '0.6rem 1.2rem',
                  background: '#38a169', color: 'white',
                  border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontWeight: 600,
                }}
              >
                ⚖️ Porovnať vybrané
              </button>
            )}
            {selected.length === 1 && (
              <span style={{ color: '#718096', fontSize: '0.9rem' }}>Vyber ešte jednu destináciu na porovnanie</span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {results.map(r => (
              <div
                key={r.id}
                style={{
                  background: 'white', borderRadius: '12px',
                  padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  border: selected.includes(r.id) ? '2px solid #38a169' : '2px solid transparent',
                  transition: 'border 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={`https://www.geonames.org/flags/x/${r.country_code}.gif`}
                        alt={r.country}
                        style={{ height: '20px', borderRadius: '2px' }}
                      />
                      <h3
                        style={{ margin: 0, fontSize: '1.3rem', color: '#1a202c', cursor: 'pointer' }}
                        onClick={() => navigate(`/destination/${r.id}?month=${form.month}`)}
                      >
                        {r.name}
                      </h3>
                      <span style={{ color: '#718096', fontSize: '0.9rem' }}>{r.country}</span>
                    </div>

                    <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {r.reasons.map((reason, i) => (
                        <span key={i} style={{
                          background: '#f0fff4', color: '#276749',
                          padding: '0.25rem 0.75rem', borderRadius: '999px',
                          fontSize: '0.85rem', fontWeight: 500,
                        }}>
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    {r.climate && (
                      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a73e8' }}>
                        {r.climate.avg}°C
                      </span>
                    )}
                    <button
                      onClick={() => toggleSelect(r.id)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        background: selected.includes(r.id) ? '#38a169' : '#edf2f7',
                        color: selected.includes(r.id) ? 'white' : '#4a5568',
                        border: 'none', borderRadius: '6px',
                        cursor: 'pointer', fontSize: '0.85rem',
                      }}
                    >
                      {selected.includes(r.id) ? '✓ Vybraná' : 'Porovnať'}
                    </button>
                    <button
                      onClick={() => navigate(`/destination/${r.id}?month=${form.month}`)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        background: '#1a73e8', color: 'white',
                        border: 'none', borderRadius: '6px',
                        cursor: 'pointer', fontSize: '0.85rem',
                      }}
                    >
                      Detail →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontWeight: 600,
  color: '#2d3748',
  marginBottom: '0.5rem',
  fontSize: '0.95rem',
}

const selectStyle = {
  width: '100%',
  padding: '0.6rem 0.8rem',
  borderRadius: '8px',
  border: '1.5px solid #e2e8f0',
  fontSize: '1rem',
  color: '#2d3748',
  background: 'white',
}