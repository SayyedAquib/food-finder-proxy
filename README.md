# Food Finder Proxy

A simple Node.js proxy server for forwarding API requests to [Swiggy](https://www.swiggy.com), with CORS support. Useful for frontend projects that need to bypass CORS restrictions when accessing Swiggy's public APIs.

## Features

- Proxies requests from `/cors/*` to `https://www.swiggy.com/*`
- Adds CORS headers to all responses
- Forces a desktop User-Agent for all proxied requests
- Logs proxied requests and responses for debugging
- Handles proxy errors gracefully

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone this repository or download the source code.
2. Install dependencies:

   ```
   npm install
   ```

### Running the Proxy Server

Start the server in development mode (with auto-reload):

```
npm run dev
```

Or start normally:

```
npm start
```

The server will run on [http://localhost:8000](http://localhost:8000).

### Usage

- To test if the proxy is running, open [http://localhost:8000/](http://localhost:8000/) in your browser.
- To proxy a Swiggy API endpoint, prefix the path with `/cors`.  
  For example:

  ```
  GET http://localhost:8000/cors/dapi/restaurants/list/v5?lat=...&lng=...
  ```

  This will forward the request to:

  ```
  https://www.swiggy.com/dapi/restaurants/list/v5?lat=...&lng=...
  ```

## Deployment

This project includes a `vercel.json` configuration for easy deployment to [Vercel](https://vercel.com/).

## Project Structure

- `index.js` – Main server and proxy logic
- `package.json` – Project metadata and dependencies
- `vercel.json` – Vercel deployment configuration
- `.gitignore` – Node modules exclusion

## License

ISC

---

**Note:**  
This proxy is for educational and development purposes only. Do not use it to abuse or overload Swiggy's servers.
