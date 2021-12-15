# felixgrohs.dev v2

Rebuilding my [personal website](https://github.com/felixgro/felixgrohs.dev) using [preact](https://preactjs.com/).

## Improvements 🚀
- Pre-render components at build time to support disabled js and improve FCP
- Serverless function for fetching projects directly from my github profile
- Client-side caching to minimize requests
- PWA support by using a Service Worker
- Improved animation performance
- Modular CSS

## Development
These instructions will get you a copy of my website up and running on your local machine for development and testing purposes.

### Prerequisites
- Git
- Node Package Manager (NPM, Yarn, etc..)

### Getting Started
Clone this repository and specify a directory name (f.e myClone):
```bash
git clone https://github.com/felixgro/felixgrohs.dev-v2.git myClone
```
Go in the cloned directory and install dependencies:
```bash
cd myClone
npm i
```
Boot up a development server:
```bash
npm run dev
```


### Import Aliases
|Alias|Path|
|:--|:--|
|`@/*`| `src/*`|
|`#/*`| `src/styles/modules/*`|

### CLI Commands
*   `npm install`: Install dependencies

*   `npm run dev`: Run a development, HMR server

*   `npm run serve`: Run a production-like server

*   `npm run build`: Create production-ready build

*   `npm run lint`: Run ESLint

*   `npm run test`: Run Jest and Enzyme

For detailed explanation on how things work, checkout [preact-cli](https://github.com/developit/preact-cli/blob/master/README.md).

