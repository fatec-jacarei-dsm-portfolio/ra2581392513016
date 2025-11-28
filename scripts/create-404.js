const fs = require("fs");
const path = require("path");

const docs = path.join(__dirname, "..", "docs");
const browserDir = path.join(docs, "browser");
const index = path.join(docs, "index.html");
const notFound = path.join(docs, "404.html");

if (!fs.existsSync(index) && fs.existsSync(path.join(browserDir, "index.html"))) {
  fs.cpSync(browserDir, docs, { recursive: true });
}

if (fs.existsSync(index)) {
  fs.copyFileSync(index, notFound);
  console.log("✔ 404.html criado com sucesso!");
} else {
  console.error("✖ ERRO: index.html não encontrado em /docs");
}
