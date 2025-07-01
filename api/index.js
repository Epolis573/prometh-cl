const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

const BLOB_BASE_URL =
  process.env.BLOB_BASE_URL ||
  "https://mrfxxc2vy3ktalj1.public.blob.vercel-storage.com";

// Serve static files locally, but NOT on Vercel
if (process.env.VERCEL !== "1") {
  app.use(express.static(path.join(__dirname, "../public")));
}

// Set Views
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Routes
app.get("", (req, res) => {
  res.render("index", { BLOB_BASE_URL });
});
app.get("/index", (req, res) => {
  res.render("index", { BLOB_BASE_URL });
});
app.get("/news", (req, res) => {
  res.render("news", { BLOB_BASE_URL });
});

// Listen (only if not running as a Vercel serverless function)
if (process.env.VERCEL !== "1") {
  app.listen(port, () => console.info(`Listening on port ${port}`));
}

module.exports = app; // For Vercel
