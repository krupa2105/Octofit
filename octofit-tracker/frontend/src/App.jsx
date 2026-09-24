import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  ['/', 'Dashboard'],
  ['/users', 'Users'],
  ['/teams', 'Teams'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/workouts', 'Workouts'],
]

function Dashboard() {
  return (
    <div className="hero-panel">
      <p className="eyebrow">Train together. Go further.</p>
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your progress, challenge your team, and find your next great workout.</p>
      <NavLink className="btn btn-primary" to="/activities">View activity</NavLink>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
            <img src={logo} alt="OctoFit Tracker" height="42" />
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
            {navigation.map(([path, label]) => (
              <NavLink key={path} className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to={path}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<><h1 className="h2 mb-4">Users</h1><Users /></>} />
          <Route path="/teams" element={<><h1 className="h2 mb-4">Teams</h1><Teams /></>} />
          <Route path="/activities" element={<><h1 className="h2 mb-4">Activities</h1><Activities /></>} />
          <Route path="/leaderboard" element={<><h1 className="h2 mb-4">Leaderboard</h1><Leaderboard /></>} />
          <Route path="/workouts" element={<><h1 className="h2 mb-4">Workouts</h1><Workouts /></>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
