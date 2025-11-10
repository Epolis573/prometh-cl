// api/render.js (ESM)
import { readFile } from "fs/promises";
import path from "path";
import ejs from "ejs";

export default async function handler(req, res) {
  try {
    const templatePath = path.resolve(process.cwd(), "views/index.ejs");
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
