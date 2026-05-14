import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { getDestination } from '../api'

const MONTH_NAMES = [
  'Január','Február','Marec','Apríl','Máj','Jún',
  'Júl','August','September','Október','November','December'
]

const TYPE_LABELS = {
  more: '🏖️ More a pláž',
  hory: '🏔️ Hory a príroda',
  historicke: '🏛️ Historické mestá',
  mestsky: '🏙️ Mestský výlet',
  aktivita: '🧗 Aktivity a dobrodružstvo',
}

export default function DetailPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const month = parseInt(searchParams.get('month') || 7)

  const [dest, setDest] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDestination(id)
      .then(r => setDest(r.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Načítavam...</div>
  if (!dest) return <div style={{ padding: '2rem', textAlign: 'center' }}>Destinácia nenájdená</div>

  const monthClimate = dest.climate?.find(c => c.month === month)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#1a73e8', fontSize: '1rem' }}>
        ← Späť
      </button>

      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>

        {/* Hlavička */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <img src={`https://www.geonames.org/flags/x/${dest.country_code}.gif`} alt="" style={{ height: '32px' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{dest.name}</h1>
            <span style={{ color: '#718096' }}>{dest.country} · Hlavné mesto: {dest.capital}</span>
          </div>
        </div>

        {/* Typy */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {dest.types.map(t => (
            <span key={t} style={{ background: '#e8f0fe', color: '#1a73e8', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.85rem' }}>
              {TYPE_LABELS[t] || t}
            </span>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1.5rem 0' }} />

        {/* Počasie v zvolenom mesiaci */}
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>🌡️ Počasie v {MONTH_NAMES[month - 1]}</h2>
        {monthClimate ? (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { label: 'Priemer', value: `${monthClimate.temp_avg}°C` },
              { label: 'Minimum', value: `${monthClimate.temp_min}°C` },
              { label: 'Maximum', value: `${monthClimate.temp_max}°C` },
            ].map(item => (
              <div key={item.label} style={{ flex: 1, minWidth: '100px', background: '#f7fafc', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a73e8' }}>{item.value}</div>
                <div style={{ color: '#718096', fontSize: '0.85rem' }}>{item.label}</div>
              </div>
            ))}
          </div>
        ) : <p style={{ color: '#718096' }}>Klimatické dáta nie sú dostupné</p>}

        {/* Aktuálna predpoveď */}
        {dest.weather && (
          <>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>⛅ Aktuálne počasie</h2>
            <div style={{ background: '#f7fafc', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <span>🌡️ <strong>{dest.weather.temperature_2m}°C</strong></span>
              <span>💨 <strong>{dest.weather.windspeed_10m} km/h</strong></span>
            </div>
          </>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1.5rem 0' }} />

        {/* Mena */}
        <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>💶 Mena</h2>
        <p style={{ margin: 0, color: '#2d3748' }}>
          <strong>{dest.currency}</strong>
          {dest.exchange_rate
            ? ` · 1 EUR = ${dest.exchange_rate} ${dest.currency}`
            : ' · Krajina používa Euro'}
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1.5rem 0' }} />

        {/* Prečo práve teraz — generovaný text */}
        <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>✨ Prečo práve teraz?</h2>
        <p style={{ color: '#2d3748', lineHeight: 1.7, margin: 0 }}>
          {generateRecommendationText(dest, month, monthClimate)}
        </p>
      </div>
    </div>
  )
}

function generateRecommendationText(dest, month, climate) {
  const monthName = MONTH_NAMES[month - 1].toLowerCase()
  const typeLabels = dest.types.map(t => TYPE_LABELS[t]?.replace(/^.{2}/, '').trim() || t)

  let text = `${dest.name} je v ${monthName} skvelou voľbou`

  if (climate) {
    if (climate.temp_avg >= 25) {
      text += `, keďže priemerná teplota dosahuje ${climate.temp_avg}°C — ideálne na opaľovanie a kúpanie`
    } else if (climate.temp_avg >= 15) {
      text += `, kde panuje príjemné počasie okolo ${climate.temp_avg}°C vhodné na turistiku aj kultúru`
    } else {
      text += `, kde teploty okolo ${climate.temp_avg}°C vytvárajú atmosféru pre aktívny pobyt`
    }
  }

  if (typeLabels.length > 0) {
    text += `. Destinácia ponúka ${typeLabels.join(', ').toLowerCase()}`
  }

  text += `. Let z Viedne trvá len ${dest.flight_hours_from_vienna} hodín`

  if (dest.currency !== 'EUR' && dest.exchange_rate) {
    text += ` a miestna mena ${dest.currency} je výhodná pre európskych cestovateľov`
  }

  text += '.'
  return text
}