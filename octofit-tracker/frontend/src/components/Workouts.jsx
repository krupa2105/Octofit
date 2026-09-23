import { useEffect, useState } from 'react'
import { fetchItems } from '../api'
import { ResourceState } from './ResourceState'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchItems('workouts')
      .then(setWorkouts)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <ResourceState {...state}>
      <div className="row g-4">
        {workouts.map((workout) => (
          <div className="col-md-6 col-xl-4" key={workout._id || workout.id || workout.title}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <span className="badge text-bg-warning text-uppercase">{workout.difficulty}</span>
                <h2 className="h5 mt-3">{workout.title}</h2>
                <p>{workout.description}</p>
                <small className="text-secondary">{workout.durationMinutes} min · {workout.focus}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ResourceState>
  )
}

export default Workouts
