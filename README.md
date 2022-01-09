# felixgrohs.dev v2

Rebuilding my [old personal website](https://github.com/felixgro/felixgrohs.dev) using [preact](https://preactjs.com/).

## Improvements 🚀
- Pre-render components at build time to support disabled js and improve FCP
- Serverless function for fetching projects directly from my github profile
- Client-side caching to minimize requests
- PWA support by using a Service Worker
- Improved animation performance
- Modular CSS

## Project Structure
| Directory | Alias | Description |
| :----- | :----- | :----- |
|`functions/`||serverless functions|
|`src/`|`@/`|frontend files|
|`src/assets/`||static assets|
|`src/components/`||components|
|`src/hooks/`||custom hooks|
|`src/styles/`||css files|
|`src/styles/modules/`|`#/`|css modules|

## Development

### Requirements
- JS Package Manager (NPM, Yarn, etc..)
- Node
- Git

### Getting Started
Start by cloning this repository and specify a directory name (f.e myClone):
```bash
git clone https://github.com/felixgro/felixgrohs.dev-v2.git myClone
```
Go in the cloned directory and install all dependencies using your package manager of choice:
```bash
cd myClone
npm i
```
Boot up a development server along with all serverless functions:
```bash
npm run dev:all
```

### CLI Commands
*   `npm install`: Install dependencies

*   `npm run dev`: Run a development, HMR server

*   `npm run serve`: Run a production-like server

*   `npm run build`: Create production-ready build

*   `npm run lint`: Run ESLint

*   `npm run test`: Run Jest and Enzyme

For detailed explanation on how things work, checkout [preact-cli](https://github.com/developit/preact-cli/blob/master/README.md).

