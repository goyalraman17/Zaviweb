const fs = require('fs');

const path = './app/layout.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/canonical.*$/gm, '');

fs.writeFileSync(path, code);
