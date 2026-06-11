# World Cup 2026 Sweepstakes

A lightweight shared World Cup 2026 sweepstakes draw app for 8 to 12 players.

The app runs locally at `http://localhost:8000/` and is structured for Vercel deployment with static frontend files in `public/` and serverless API routes in `api/`.

## Features

- 48-team World Cup 2026 pool
- 4 equal 12-team tiers: Crap, Not Great, Hopeful, and Best
- 8 to 12 players
- Equal teams per player
- Required exclusions for 9, 10, and 11 players
- Open shared access: anyone with the link can view and edit
- Draw schedule that favours Crap, then Not Great, then Hopeful, then Best tiers
- Perfect 12-player balance: each player gets one team from each tier
- Repick-last behaviour
- Static outright tournament-winner odds
- Local browser backup through `localStorage`
- Remote shared state through `/api/state`
- Optional live results through `/api/live-data`

## Local Development

```bash
node server.mjs
```

Open:

```text
http://localhost:8000/
```

Unique shared draw URLs also work locally:

```text
http://localhost:8000/sweepstake/abc123
```

## Static Odds

Outright winner odds are baked into `public/app.js` and are not expected to update again.

Source used: FourFourTwo, "FREE Printable World Cup 2026 Sweepstake Kit", odds list last updated 10 June 2026.

Note: the FourFourTwo odds list includes Denmark at 100/1 while its included-team list and the seeded app pool include New Zealand. New Zealand has been placed in the `1000/1` outsider bucket alongside the longest-priced teams.

## Vercel Deployment

This app can be deployed directly from GitHub to Vercel.

Required for shared state on Vercel:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

Without those variables, the app still loads, but serverless memory is not durable enough for a shared public draw. For the link you send to friends, configure Upstash Redis or Vercel KV first.

Optional live data variable:

```text
FOOTBALL_DATA_TOKEN
```

If this is missing, the draw still works and the results area uses the baked-in published fixture schedule. Add `FOOTBALL_DATA_TOKEN` later if you want live scores from Football-Data.

## GitHub Setup

The intended remote is:

```text
https://github.com/ajgiven13-svg/Sweepstake.git
```

Suggested first push:

```bash
git init
git add .
git commit -m "Build World Cup 2026 sweepstakes app"
git branch -M main
git remote add origin https://github.com/ajgiven13-svg/Sweepstake.git
git push -u origin main
```

After pushing, import the repository in Vercel, add the environment variables above, and deploy.

## Open Shared Access

Anyone with the deployed link can:

- enter player names
- edit team tiers before the draw
- choose exclusions before the draw
- draw teams
- repick the latest team
- reset shared state

For a less guessable draw, send a unique URL such as:

```text
https://your-vercel-domain.vercel.app/sweepstake/family-final-2026
```
