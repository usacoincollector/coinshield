import fs from "node:fs";
import path from "node:path";

export function getDatasheetPath(slug: string) {
  const filePath = path.join(process.cwd(), "public", "datasheets", `${slug}.pdf`);
  return fs.existsSync(filePath) ? `/datasheets/${slug}.pdf` : null;
}
