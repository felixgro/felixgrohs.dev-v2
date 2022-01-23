# felixgrohs.dev v2

[![Netlify Status](https://api.netlify.com/api/v1/badges/5e50b440-5a3d-449f-8be8-40f604f8716a/deploy-status)](https://app.netlify.com/sites/fgv2/deploys)

Rebuilding my [old personal website](https://github.com/felixgro/felixgrohs.dev) using [preact](https://preactjs.com/) and [typescript](https://www.typescriptlang.org/).

## Improvements 🚀
- Pre-render components at build time for better SEO, faster FCP and support for disabled JS
- Serverless functions for fetching projects directly from a github profile as well as realtime error reporting
- Client-side caching to minimize serverless requests
- Improved animation performance
- Monorepo architecture

## Project Structure
| Directory |Description |
| :----- | :----- |
| `packages/`|core application packages |
| &nbsp; &nbsp; `server/`| lambda serverless functions |
| &nbsp; &nbsp; `client/`| preact frontend |
| &nbsp; &nbsp; `common/`| shared logic and types |

## Development

### Requirements
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/)
- [Node.js](https://nodejs.org/en/)

### Getting Started
Start by cloning this repository:
```bash
git clone https://github.com/felixgro/felixgrohs.dev-v2.git
cd felixgrohs.dev-v2
```
Install & build all dependencies:
```bash
yarn && yarn build
```

Boot up a local development server:
```bash
yarn dev:plain  # only frontend, no serverless functions
```

### With Serverless Functions
Clone and rename `.env.example` to `.env`:
```bash
cp .env.example .env
```

Add your Github username and API token to the freshly cloned `.env` file:
```
GITHUB_TOKEN=your_token
GITHUB_USER=your_username
```

\[Optional\] Setup realtime error reporting using Mailersend by including your token along with your desired sending/receiving email address in the `.env` file:
```
MAILERSEND_TOKEN=your_token
MAILERSEND_FROM=sending@example.com
MAILERSEND_FROM_NAME=Error Reporter
MAILERSEND_TO=receiving@example.com
MAILERSEND_TO_NAME=Joe Sample
```

Boot up a local development server with all serverless functions:
```bash
yarn dev
```

### All CLI Commands
| Command | Description |
| :----- | :----- |
| `dev`|Run development, HMR server & serverless functions|
| `dev:plain`|Run development, HMR server|
| `serve`|Run a production-like server|
| `build`|Create production-ready build|
| `lint`|Run ESLint|
| `test`|Run Jest and Enzyme|

