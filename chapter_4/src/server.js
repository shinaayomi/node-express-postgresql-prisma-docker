import express from "express";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// Get directory name from the file path
const __dirname = dirname(__filename);

// Middleware
// Allows us to read json of the body network incoming request
app.use(express.json());
// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / file. Any request for the css files will be resolved to the public directory.

app.use(express.static(path.join(__dirname, "../public")));

// Serving up the HTML file from the /public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
// clayson.teal@dunefee.com
