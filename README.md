# felixgrohs.dev v2

[![Netlify Status](https://api.netlify.com/api/v1/badges/5e50b440-5a3d-449f-8be8-40f604f8716a/deploy-status)](https://app.netlify.com/sites/fgv2/deploys)

Rebuilding my [old personal website](https://github.com/felixgro/felixgrohs.dev) using [preact](https://preactjs.com/).

## Improvements 🚀
- Pre-render components at build time for better SEO, faster FCP and support for disabled JS
- Serverless function for fetching projects directly from a github profile
- Client-side caching to minimize serverless requests
- Realtime error notifications via email
- Improved animation performance
- PWA support

## Project Structure
| Directory | Alias | Description |
| :----- | :----- | :----- |
| `netlify/`||serverless node.js functions|
| &nbsp; `functions/`||lambda functions|
| &nbsp; `helpers/`||helper functions|
| &nbsp; `libs/`||dependency modules|
| `src/`|`@/`|frontend files|
| &nbsp; `assets/`||static assets|
| &nbsp; `hooks/`||custom hooks|
| &nbsp; `styles/`||global css styles|
| &nbsp; `utils/`||utility functions & polyfills|
| &nbsp; `components/`||functional components & css modules|
| &nbsp; &nbsp; `main/`||layout components|
| &nbsp; &nbsp; `shared/`||reusable components|
| &nbsp; &nbsp; `async/`||asynchronous components (requested as external bundle after initial load)|
| `tests/` ||unit tests & mocks|

## Development

### Requirements
- JS Package Manager (NPM, Yarn, etc..)
- Node
- Git

### Getting Started
Start by cloning this repository:
```bash
git clone https://github.com/felixgro/felixgrohs.dev-v2.git
```
Install all dependencies using your package manager of choice:
```bash
npm i
# or
yarn
```

Boot up a local development server:
```bash
npm run dev     # only frontend, no serverless functions
```

### Serverless Functions
Clone and rename `.env.example` to `.env`:
```bash
cp .env.example .env
```

Add your Github username and API token to the freshly cloned `.env` file:
```
GITHUB_TOKEN=YOUR_GITHUB_API_TOKEN
GITHUB_USER=YOUR_GITHUB_USERNAME
```

\[Optionally\] Setup realtime error reporting using Mailersend by including your token along with your desired sending/receiving email address in the `.env` file:
```
MAILERSEND_TOKEN=mailersend_token
MAILERSEND_FROM=error@example.com
MAILERSEND_FROM_NAME=Error Reporter
MAILERSEND_TO=joe@example.com
MAILERSEND_TO_NAME=Joe
```

Boot up a local development server along with all serverless functions:
```bash
npm run dev:netlify
```

### All CLI Commands
| Command | Description |
| :----- | :----- |
| `dev`|Run development, HMR server|
| `dev:netlify`|Run development, HMR server with serverless functions|
| `serve`|Run a production-like server|
| `build`|Create production-ready build|
| `lint`|Run ESLint|
| `test`|Run Jest and Enzyme|

