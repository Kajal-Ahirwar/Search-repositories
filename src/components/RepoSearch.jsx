import React, { useState } from 'react'
import RepoDetails from './RepoDetails'

function RepoItem({ repo, onSelect }) {
  return (
    <div className="repo" onClick={() => onSelect(repo)}>
      <h3>{repo.full_name}</h3>
      <p>{repo.description}</p>
      <div className="meta">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
      </div>
    </div>
  )
}

export default function RepoSearch({ onSelect, selected, onClose }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search(e) {
    e.preventDefault()
    if (!q.trim()) return
    setLoading(true)
    setError(null)
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN
      const headers = token ? { Authorization: `token ${token}` } : {}
      const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&per_page=10`, { headers })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setResults(data.items || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function clearResults() {
    setResults([])
    setQ('')
    setError(null)
  }

  return (
    <section className="search">
      <form onSubmit={search}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search repositories (e.g., react)" />
        {results.length > 0 ? (
          <button type="button" onClick={clearResults}>Close</button>
        ) : (
          <button type="submit">Search</button>
        )}
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <div className="list skeletons" aria-hidden="true">
          {[...Array(4)].map((_, i) => (
            <div className="repo skeleton" key={'s' + i}>
              <div className="s-line title" />
              <div className="s-line desc" />
              <div className="meta">
                <span className="s-line small" />
                <span className="s-line small" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="list">
          {results.map((r) => (
            <React.Fragment key={r.id}>
              <RepoItem repo={r} onSelect={onSelect} />
              {selected && selected.id === r.id && <RepoDetails repo={selected} onClose={onClose} />}
            </React.Fragment>
          ))}
        </div>
      )}
    </section>
  )
}
