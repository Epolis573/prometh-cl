// api/render.js
import { readFile } from "fs/promises";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  try {
    // The bundled template sits next to project root; adjust if yours lives elsewhere
    const templatePath = path.join(__dirname, "..", "index.ejs");
    const tpl = await readFile(templatePath, "utf8");

    const html = ejs.render(tpl, {
      BLOB_BASE_URL: process.env.BLOB_BASE_URL,
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (err) {
    console.error("Render error:", err);
    res.status(500).send("Render error");
  }
}
