// scripts/clean-sourcemaps.js - تنظيف ملفات source maps
const fs = require('fs');
const path = require('path');

function cleanSourceMaps(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules') {
      cleanSourceMaps(filePath);
    } else if (file.endsWith('.map') || file.endsWith('.js.map')) {
      console.log(`Removing source map: ${filePath}`);
      fs.unlinkSync(filePath);
    }
  });
}

console.log('🧹 Cleaning source maps...');
cleanSourceMaps('./');
console.log('✅ Source maps cleaned successfully!');