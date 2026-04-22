# open-agents-test

A minimal todo list demo, used as a target repo for [Vercel Open Agents](https://github.com/vercel-labs/open-agents) — the open-source reference app for AI coding agents.

## What it does

- Add, check off, and delete todos
- State persists in localStorage
- Next.js App Router, TypeScript, Tailwind CSS
- No backend, no database, no auth

## Live demo

[live URL — will be filled in after deploy]

## Why this exists

This repo is the demo target in a YouTube tutorial on Vercel Open Agents. In the video, we give Open Agents a prompt ("add a dark mode toggle") and watch it:

1. Clone this repo into a Vercel Sandbox
2. Read the existing code
3. Add the feature (new state, toggle button, Tailwind dark: classes)
4. Create a branch + commit + push
5. Open a pull request

The goal is to show what Open Agents' full stack (Sandbox, Workflow SDK, Fluid Compute, AI SDK) can actually do on a real working codebase.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## License

MIT
