import { useEffect, useState } from 'react'
import { getStats } from '../api'

const TIME_SLOT_LABELS = {
  '6-15':  '🌅 6:00 – 15:00',
  '15-21': '🌇 15:00 – 21:00',
  '21-24': '🌙 21:00 – 24:00',
  '0-6':   '🌃 0:00 – 6:00',
}

export default function StatsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState('count')
  const [sortDir, setSortDir] = useState('desc')

  useEffect(() => {
    getStats().then(r => setStats(r.data)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Načítavam...</div>
  if (!stats) return <div style={{ padding: '2rem', textAlign: 'center' }}>Chyba pri načítaní</div>

  const maxSlot = Math.max(...Object.values(stats.time_slots))

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = [...stats.searches].sort((a, b) => {
    let valA = a[sortKey]
    let valB = b[sortKey]
    if (sortKey === 'count') return sortDir === 'asc' ? valA - valB : valB - valA
    // pri triedi podla statu druhe kriterium je nazov destinácie
    if (sortKey === 'country') {
      if (valA === valB) return a.destination.localeCompare(b.destination)
    }
    return sortDir === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA))
  })

  const arrow = (key) => sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>📊 Štatistiky</h1>

      {/* Návštevnosť */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Celkové návštevy', value: stats.total, icon: '👁️' },
          { label: 'Unikátne návštevy (60 min)', value: stats.unique, icon: '👤' },
        ].map(item => (
          <div key={item.label} style={{
            flex: 1, minWidth: '160px', background: 'white', borderRadius: '12px',
            padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem' }}>{item.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1a73e8' }}>{item.value}</div>
            <div style={{ color: '#718096', fontSize: '0.85rem' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Návštevnosť podľa dennej doby */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem' }}>🕐 Návštevnosť podľa dennej doby</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Object.entries(stats.time_slots).map(([slot, count]) => (
            <div key={slot}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem' }}>
                <span>{TIME_SLOT_LABELS[slot]}</span>
                <span style={{ fontWeight: 600 }}>{count}</span>
              </div>
              <div style={{ background: '#e2e8f0', borderRadius: '999px', height: '10px' }}>
                <div style={{
                  background: 'linear-gradient(90deg, #1a73e8, #0d47a1)',
                  borderRadius: '999px', height: '10px',
                  width: maxSlot > 0 ? `${(count / maxSlot) * 100}%` : '0%',
                  transition: 'width 0.5s',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vyhľadávané destinácie */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
        <h2 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem' }}>🔍 Čo ľudia hľadajú</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              {[
                { key: 'destination', label: 'Destinácia' },
                { key: 'country', label: 'Štát' },
                { key: 'count', label: 'Počet hľadaní' },
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ padding: '0.75rem', textAlign: 'left', cursor: 'pointer', color: '#4a5568', userSelect: 'none' }}
                >
                  {col.label}{arrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#f7fafc' : 'white' }}>
                <td style={{ padding: '0.75rem' }}>{row.destination}</td>
                <td style={{ padding: '0.75rem' }}>{row.country}</td>
                <td style={{ padding: '0.75rem', fontWeight: 600, color: '#1a73e8' }}>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}