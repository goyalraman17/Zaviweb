const fs = require('fs');
let code = fs.readFileSync('components/Navigation.tsx', 'utf8');

const anchorStr = '{ name: \'Compare\', href: \'/compare\', id: \'compare\' },';
const insertStr = '{ name: \'About\', href: \'/about\', id: \'about\' },';

if (code.includes(anchorStr) && !code.includes("href: '/about'")) {
    code = code.replace(anchorStr, anchorStr + "\n    " + insertStr);
    fs.writeFileSync('components/Navigation.tsx', code);
    console.log("Updated Nav Link!");
}

