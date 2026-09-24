import { useEffect, useState } from 'react'
import { fetchItems } from '../api'
import { ResourceState } from './ResourceState'

const leaderboardEndpoint = '/api/leaderboard/'
// Codespaces API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchItems(leaderboardEndpoint)
      .then(setEntries)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <ResourceState {...state}>
      <div className="card shadow-sm">
        <ol className="list-group list-group-numbered list-group-flush">
          {entries.map((entry) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id}>
              <span>{entry.user?.name || entry.user?.email || 'Athlete'}</span>
              <span className="badge text-bg-success rounded-pill">{entry.points} points</span>
            </li>
          ))}
        </ol>
      </div>
    </ResourceState>
  )
}

export default Leaderboard
