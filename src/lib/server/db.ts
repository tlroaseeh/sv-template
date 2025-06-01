// src/lib/server/db.ts
import Database from 'better-sqlite3';
import type { DbUser } from './types';
import bcrypt from 'bcryptjs'; // 导入 bcryptjs 用于初始用户密码哈希

const DB_PATH = './data/app.db'; // 定义 SQLite 数据库文件的路径

// 确保数据目录存在
import fs from 'fs';
import path from 'path';
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// 初始化 SQLite 数据库连接
// { verbose: console.log } 可以在开发模式下打印所有执行的 SQL 查询，便于调试
const db = new Database(DB_PATH, { verbose: process.env.NODE_ENV === 'development' ? console.log : undefined });

// 确保在应用启动时创建 'users' 表
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL
    );
`);

// 检查是否已有用户，如果没有，则插入一个默认的 admin 用户
function initializeDefaultUser() {
    const userCount = db.prepare('SELECT COUNT(*) FROM users').get() as { 'COUNT(*)': number };
    if (userCount['COUNT(*)'] === 0) {
        try {
            const adminPasswordHash = bcrypt.hashSync('password123', 10); // 示例密码 'password123'
            const adminId = `user_${Date.now()}`;
            db.prepare('INSERT INTO users (id, username, passwordHash) VALUES (?, ?, ?)')
              .run(adminId, 'admin', adminPasswordHash);
            console.log('Default admin user created successfully!');
        } catch (error) {
            console.error('Error creating default admin user:', error);
        }
    }
}
initializeDefaultUser(); // 在模块加载时执行此函数

export const database = {
    /**
     * 根据用户名从数据库中获取用户。
     * @param username - 用户名
     * @returns 匹配的 DbUser 对象或 undefined。
     */
    getUserByUsername: (username: string): DbUser | undefined => {
        const stmt = db.prepare('SELECT id, username, passwordHash FROM users WHERE username = ?');
        const user = stmt.get(username) as DbUser | undefined;
        return user;
    },

    /**
     * 在数据库中创建一个新用户。
     * (注意: 当前认证流程只支持登录，如果需要注册，则会用到此方法)
     * @param username - 用户名
     * @param passwordHash - 密码哈希
     * @returns 新创建的 DbUser 对象。
     */
    createUser: (username: string, passwordHash: string): DbUser => {
        const newUserId = `user_${Date.now()}`; // 简单生成一个唯一ID
        const stmt = db.prepare('INSERT INTO users (id, username, passwordHash) VALUES (?, ?, ?)');
        const info = stmt.run(newUserId, username, passwordHash);
        if (info.changes === 0) {
            throw new Error('Failed to create user.');
        }
        return { id: newUserId, username, passwordHash };
    }
};

// 在应用关闭时关闭数据库连接 (可选，但推荐用于生产环境)
// process.on('exit', () => db.close());
// process.on('SIGHUP', () => process.exit(128 + 1));
// process.on('SIGINT', () => process.exit(128 + 2));
// process.on('SIGTERM', () => process.exit(128 + 15));