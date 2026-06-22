import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout.jsx'
import Login from '@/pages/Login.jsx'
import Dashboard from '@/pages/Dashboard.jsx'
import MTRFDetail from '@/pages/MTRFDetail.jsx'
import Reports from '@/pages/Reports.jsx'
import Booking from '@/pages/Booking.jsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  return (
    <BrowserRouter>
      <Layout onLogout={() => setLoggedIn(false)}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mtrf/:id" element={<MTRFDetail />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
