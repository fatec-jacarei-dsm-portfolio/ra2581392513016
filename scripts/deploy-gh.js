const fs = require("fs");
const path = require("path");

// pastas
const dist = path.join(__dirname, "..", "dist", "Portfolio");
const docs = path.join(__dirname, "..", "docs","browser");

// limpar docs
if (fs.existsSync(docs)) {
    fs.rmSync(docs, { recursive: true, force: true });
}

fs.mkdirSync(docs, { recursive: true });

// copiar recursivamente
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyDir(dist, docs);

// criar 404.html para rotas angular
fs.copyFileSync(path.join(docs, "index.html"), path.join(docs, "404.html"));

console.log("\n✔ Deploy finalizado!");
console.log("Faça commit e push das mudanças na pasta /docs.\n");
