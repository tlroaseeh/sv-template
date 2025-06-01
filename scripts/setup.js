// scripts/setup.js
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const appName = path.basename(projectRoot); // 获取新应用的名称（即当前目录名）

console.log(`\n✨ Setting up your new SvelteKit app: ${appName} ✨`);

// 1. 更新 package.json
const packageJsonPath = path.join(projectRoot, 'package.json');
try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.name = appName.toLowerCase().replace(/[^a-z0-9-]/g, '-'); // 将名称转为小写，非字母数字转为-
    packageJson.version = '0.0.1'; // 重置版本
    packageJson.description = `A SvelteKit app for ${appName}`; // 更新描述

    // 移除 setup 相关的脚本，避免无限循环或不必要的脚本
    if (packageJson.scripts) {
        delete packageJson.scripts.postinstall; // 移除自身触发的脚本
        // 如果你有其他用于模板设置的脚本，也一并删除
        // delete packageJson.scripts['setup-template'];
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('✅ Updated package.json');
} catch (error) {
    console.error('❌ Failed to update package.json:', error);
    process.exit(1); // 失败时退出
}

// 2. 更新 src/lib/config/app.ts 中的 site.name
const appConfigPath = path.join(projectRoot, 'src', 'lib', 'config', 'app.ts');
try {
    let appConfigContent = fs.readFileSync(appConfigPath, 'utf8');

    // 使用正则表达式替换 site.name。
    // 这个正则假设 site.name 的格式是 name: '...'
    appConfigContent = appConfigContent.replace(
        /name: '(SvelteTemplate|[^']*)',/g, // 匹配 name: 'SvelteTemplate' 或 name: 'anything'
        `name: '${appName}',`
    );

    fs.writeFileSync(appConfigPath, appConfigContent);
    console.log('✅ Updated src/lib/config/app.ts (site.name)');
} catch (error) {
    console.error('❌ Failed to update src/lib/config/app.ts:', error);
    process.exit(1);
}

// 3. 清理设置脚本本身
try {
    const setupScriptDir = path.join(projectRoot, 'scripts');
    const setupScriptFile = path.join(setupScriptDir, 'setup.js');

    if (fs.existsSync(setupScriptFile)) {
        fs.unlinkSync(setupScriptFile); // 删除 setup.js 文件
        console.log('✅ Removed setup script.');
    }
    // 尝试删除 scripts 目录，如果为空的话
    if (fs.existsSync(setupScriptDir) && fs.readdirSync(setupScriptDir).length === 0) {
        fs.rmdirSync(setupScriptDir);
        console.log('✅ Removed empty scripts directory.');
    }
} catch (error) {
    console.error('❌ Failed to remove setup script:', error);
    // 允许继续，因为这个错误不影响应用功能
}

console.log('\n🚀 Setup complete! Now run `npm install` again to finalize, then `npm run dev` to start your app.');