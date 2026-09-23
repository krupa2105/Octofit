import { useEffect, useState } from 'react'
import { fetchItems } from '../api'
import { ResourceState } from './ResourceState'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchItems('users')
      .then((items) => setUsers(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <ResourceState {...state}>
      <div className="row g-4">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id || user.id || user.email}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <span className="avatar">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</span>
                <h2 className="h5 mt-3">{user.name}</h2>
                <p className="text-secondary mb-0">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ResourceState>
  )
}

export default Users
