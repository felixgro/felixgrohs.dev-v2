# felixgrohs.dev v2

Rebuilding my [personal website](https://github.com/felixgro/felixgrohs.dev) using [preact](https://preactjs.com/).

## Key improvements
- Pre-render components at build time to support disabled js and improve FCP
- Serverless function for fetching projects directly from my github profile
- Client-side caching to minimize requests
- PWA support by using a Service Worker
- Improved animation performance
- Animated tab focus

## Development

### CLI Commands
*   `npm install`: Installs dependencies

*   `npm run dev`: Run a development, HMR server

*   `npm run serve`: Run a production-like server

*   `npm run build`: Production-ready build

*   `npm run lint`: Pass TypeScript files using ESLint

*   `npm run test`: Run Jest and Enzyme with
    [`enzyme-adapter-preact-pure`](https://github.com/preactjs/enzyme-adapter-preact-pure) for
    your tests

For detailed explanation on how things work, checkout [preact-cli](https://github.com/developit/preact-cli/blob/master/README.md).
