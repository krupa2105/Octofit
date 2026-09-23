export function ResourceState({ loading, error, children }) {
  if (loading) return <div className="alert alert-info">Loading...</div>
  if (error) return <div className="alert alert-danger">{error}</div>
  return children
}
