import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import ComparePage from './pages/ComparePage'
import StatsPage from './pages/StatsPage'
import { recordVisit } from './api'
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    recordVisit()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <nav style={{
        background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.4rem', fontWeight: 'bold' }}>
          ✈️ Kam na dovolenku?
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Hľadať</Link>
          <Link to="/stats" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Štatistiky</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </div>
  )
}