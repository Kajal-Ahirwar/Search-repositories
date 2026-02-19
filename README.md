# GitHub Clone (Vite + React)

A minimal demo app built with Vite + React that searches public GitHub repositories and shows basic details and README (demo - not a full GitHub clone).

## Features
- Search public repositories via the GitHub Search API
- View repository details and README
- Optional `VITE_GITHUB_TOKEN` to avoid rate limits

## Quick start
```bash
cd "C:\Users\kajal\OneDrive\Desktop\All Projects\App-03\github-clone"
npm install
# Optional: create .env with VITE_GITHUB_TOKEN=your_token_here
npm run dev
```

Open http://localhost:5173 and try searching for `react`, `vite`, or any repo name.

## Notes
- This is a frontend-only demo that uses the public GitHub API.
- Use a personal access token in `.env` as `VITE_GITHUB_TOKEN` to increase rate limits when needed.

Enjoy! 🎉
