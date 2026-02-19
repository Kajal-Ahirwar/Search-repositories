import React, { useEffect, useState } from 'react'

export default function RepoDetails({ repo, onClose }) {
  const [readme, setReadme] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchReadme() {
      setLoading(true)
      setError(null)
      setReadme(null)
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN
        const headers = token ? { Authorization: `token ${token}` } : {}
        const res = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`, { headers })
        if (!res.ok) {
          setReadme(null)
          return
        }
        const data = await res.json()
        const content = atob(data.content.replace(/\n/g, ''))
        setReadme(content.slice(0, 2000))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReadme()
  }, [repo])

  return (
    <aside className="details">
      <button className="close" onClick={onClose}>Close</button>
      <h2>{repo.full_name}</h2>
      <p>{repo.description}</p>
      <div className="meta">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <a href={repo.html_url} target="_blank" rel="noreferrer">Open on GitHub</a>
      </div>
      {loading && <p>Loading README…</p>}
      {error && <p className="error">{error}</p>}
      {readme && <pre className="readme">{readme}</pre>}
    </aside>
  )
}
