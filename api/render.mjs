import ejs from "ejs";
import { readFile } from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  try {
    const file = await readFile(path.resolve("index.ejs"), "utf8");
    const html = ejs.render(file, {
      BLOB_BASE_URL: process.env.BLOB_BASE_URL,
    });
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send("Render error");
  }
}
