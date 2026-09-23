import { useEffect, useState } from 'react'
import { fetchItems } from '../api'
import { ResourceState } from './ResourceState'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchItems('activities')
      .then(setActivities)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <ResourceState {...state}>
      <div className="table-responsive card shadow-sm">
        <table className="table table-hover mb-0">
          <thead><tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Calories</th><th>Date</th></tr></thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || activity.id}>
                <td>{activity.type}</td>
                <td>{activity.user?.name || activity.user?.email || 'Unknown'}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.calories}</td>
                <td>{new Date(activity.completedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResourceState>
  )
}

export default Activities
