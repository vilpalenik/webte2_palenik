import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { compareDestinations } from '../api'

const MONTH_NAMES = [
  'Január','Február','Marec','Apríl','Máj','Jún',
  'Júl','August','September','Október','November','December'
]

const TYPE_LABELS = {
  more: 'More a pláž',
  hory: 'Hory a príroda',
  historicke: 'Historické mestá',
  mestsky: 'Mestský výlet',
  aktivita: 'Aktivity a dobrodružstvo',
}

export default function ComparePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const ids = searchParams.get('ids')?.split(',') || []
  const month = parseInt(searchParams.get('month') || 7)

  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    compareDestinations(ids, month)
      .then(r => setDestinations(r.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Načítavam...</div>
  if (destinations.length < 2) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Vyber dve destinácie na porovnanie</p>
      <button onClick={() => navigate('/')} style={btnStyle}>← Späť na hľadanie</button>
    </div>
  )

  const [a, b] = destinations

  const rows = [
    { label: 'Krajina', a: a.country, b: b.country },
    {
      label: 'Vlajka',
      a: <img src={`https://www.geonames.org/flags/x/${a.country_code}.gif`} alt="" style={{ height: '20px' }} />,
      b: <img src={`https://www.geonames.org/flags/x/${b.country_code}.gif`} alt="" style={{ height: '20px' }} />,
    },
    { label: 'Let z Viedne', a: `${a.flight_hours}h`, b: `${b.flight_hours}h` },
    { label: 'Mena', a: a.currency, b: b.currency },
    {
      label: `Priem. teplota (${MONTH_NAMES[month - 1]})`,
      a: a.climate ? `${a.climate.temp_avg}°C` : '–',
      b: b.climate ? `${b.climate.temp_avg}°C` : '–',
    },
    {
      label: 'Min. teplota',
      a: a.climate ? `${a.climate.temp_min}°C` : '–',
      b: b.climate ? `${b.climate.temp_min}°C` : '–',
    },
    {
      label: 'Max. teplota',
      a: a.climate ? `${a.climate.temp_max}°C` : '–',
      b: b.climate ? `${b.climate.temp_max}°C` : '–',
    },
    {
      label: 'Tagy',
      a: <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {a.types.map(t => <span key={t} style={tagStyle}>{TYPE_LABELS[t] || t}</span>)}
      </div>,
      b: <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {b.types.map(t => <span key={t} style={tagStyle}>{TYPE_LABELS[t] || t}</span>)}
      </div>,
    },
  ]

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a73e8', fontSize: '1rem', marginBottom: '1rem' }}>
        ← Späť
      </button>

      <h1 style={{ marginBottom: '1.5rem' }}>Porovnanie destinácií</h1>

      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #1a73e8, #0d47a1)' }}>
              <th style={{ padding: '1rem', color: 'white', textAlign: 'left', width: '30%' }}>Kritérium</th>
              <th style={{ padding: '1rem', color: 'white', textAlign: 'center' }}>{a.name}</th>
              <th style={{ padding: '1rem', color: 'white', textAlign: 'center' }}>{b.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f7fafc' : 'white' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#4a5568', fontSize: '0.9rem' }}>{row.label}</td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#2d3748' }}>{row.a}</td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center', color: '#2d3748' }}>{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const tagStyle = {
  background: '#e8f0fe', color: '#1a73e8',
  padding: '2px 8px', borderRadius: '999px', fontSize: '0.8rem'
}

const btnStyle = {
  padding: '0.6rem 1.2rem', background: '#1a73e8',
  color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'
}