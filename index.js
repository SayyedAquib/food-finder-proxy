const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 8000;

// Enable parsing of JSON request bodies
app.use(express.json());

// Enable default CORS settings
app.use(cors());

// Manually set additional CORS headers for finer control
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (in production, restrict this!)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  next(); // Move to the next middleware/route handler
});

// Create a proxy middleware for all requests starting with /cors
app.use(
  "/cors", // All incoming requests starting with /cors will be proxied
  createProxyMiddleware({
    target: "https://www.swiggy.com", // Target server to forward requests to
    changeOrigin: true, // Changes the origin header to match the target (important for avoiding blocks by Swiggy)

    // Rewrites the URL path:
    // For example, /cors/dapi/restaurants → /dapi/restaurants (removes /cors)
    pathRewrite: {
      "^/cors": "", // Removes only the '/cors' prefix from the request path
    },

    // Event hooks for debugging and error handling
    on: {
      // Log every request being proxied
      proxyReq: (proxyReq, req, res) => {
        // Force a desktop User-Agent
        proxyReq.setHeader(
          "User-Agent",
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        );
        console.log("Proxying request:", req.url); // Shows the original URL received
      },

      // Log every response received from the target (Swiggy)
      proxyRes: (proxyRes, req, res) => {
        console.log("Received response from target:", proxyRes.statusCode); // Shows response status code
      },

      // Handle and log proxy errors
      error: (err, req, res) => {
        console.error("Proxy error:", err); // Logs error message
        res.status(500).send("Proxy error"); // Sends a 500 response to the client
      },
    },
  })
);

// Root endpoint for testing that the proxy server is running
app.get("/", (req, res) => {
  res.send("Hello from the proxy server!"); // Basic test endpoint
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
