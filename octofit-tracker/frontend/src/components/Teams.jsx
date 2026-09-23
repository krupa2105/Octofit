import { useEffect, useState } from 'react'
import { fetchItems } from '../api'
import { ResourceState } from './ResourceState'

const teamsEndpoint = '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchItems(teamsEndpoint)
      .then(setTeams)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <ResourceState {...state}>
      <div className="row g-4">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id || team.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="h5">{team.name}</h2>
                <p>{team.description}</p>
                <span className="badge text-bg-primary">{team.members?.length || 0} members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ResourceState>
  )
}

export default Teams
