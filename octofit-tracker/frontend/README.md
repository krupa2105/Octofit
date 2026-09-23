# OctoFit Tracker frontend

Create `octofit-tracker/frontend/.env.local` before running the frontend:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

`VITE_CODESPACE_NAME` must be defined in Codespaces so the app can call
`https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/...`. When it is unset,
the app safely falls back to `http://localhost:8000`.

## Development

```bash
npm run dev
```
