const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, 'client');
const pagesDir = path.join(clientDir, 'pages');
const srcPagesDir = path.join(clientDir, 'src', 'pages');
const componentsDir = path.join(clientDir, 'src', 'components');

const htmlTemplate = (pageName) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MIST.CO | ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/pages/${pageName}.js"></script>
  </body>
</html>`;

const jsTemplate = (pageName) => `import { renderNavbar, initNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  app.innerHTML = \`
    \${renderNavbar()}
    <main class="min-h-screen pt-24 pb-16">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8 capitalize">${pageName} Page</h1>
        <p class="text-gray-600">This page is under construction.</p>
      </div>
    </main>
    \${renderFooter()}
  \`;

  initNavbar();
});`;

const componentTemplate = (componentName) => `export const render${componentName.replace(/-./g, x=>x[1].toUpperCase()).replace(/^./, x=>x.toUpperCase())} = () => {
  return \`
    <div class="${componentName}">
      <!-- Component Content -->
    </div>
  \`;
};

export const init${componentName.replace(/-./g, x=>x[1].toUpperCase()).replace(/^./, x=>x.toUpperCase())} = () => {
  // Initialization logic
};`;

function populateEmptyFiles(dir, getTemplate, extension) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile() && fullPath.endsWith(extension)) {
      if (fs.statSync(fullPath).size === 0) {
        const basename = path.basename(file, extension);
        fs.writeFileSync(fullPath, getTemplate(basename));
        console.log(`Populated: ${fullPath}`);
      }
    }
  }
}

populateEmptyFiles(pagesDir, htmlTemplate, '.html');
populateEmptyFiles(srcPagesDir, jsTemplate, '.js');
populateEmptyFiles(componentsDir, componentTemplate, '.js');

// Special handling for client/src/js/main.js
const jsMainPath = path.join(clientDir, 'src', 'js', 'main.js');
if (fs.existsSync(jsMainPath) && fs.statSync(jsMainPath).size === 0) {
  fs.writeFileSync(jsMainPath, '// Main JS entry file\nconsole.log("Main JS loaded");');
  console.log(`Populated: ${jsMainPath}`);
}

console.log('Boilerplate generation complete.');
