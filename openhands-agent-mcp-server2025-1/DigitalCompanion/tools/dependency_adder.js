// tools/dependency_adder.js - أداة إدارة وتثبيت التبعيات
const { exec } = require('child_process');
const fs        = require('fs');

/**
 * يثبت حزم npm ثم يقرأ الإصدارات من package.json
 * @param {string} framework
 * @param {string[]} libs
 * @returns {{ result: string, versions: Record<string,string> }}
 */
module.exports = async function dependencyAdder(framework, libs) {
  return new Promise((resolve, reject) => {
    const pkgs = libs.join(' ');
    exec(`npm install ${pkgs} --save`, (error, stdout, stderr) => {
      if (error) return reject(error);

      // قراءة package.json لاستخراج النسخ
      const pkg = JSON.parse(fs.readFileSync('package.json'));
      const versions = {};
      libs.forEach(lib => {
        const v = pkg.dependencies?.[lib] || pkg.devDependencies?.[lib];
        if (v) versions[lib] = v;
      });

      resolve({ result: 'installed', versions });
    });
  });
};