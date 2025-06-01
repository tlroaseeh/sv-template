// src/lib/server/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { database } from './db';
import type { DbUser, User, LoginCredentials } from './types';
import config from '$lib/config/app'; // 导入配置

// JWT 密钥：始终从环境变量中获取，确保安全！
// 在生产环境中，请确保设置了 JWT_SECRET 环境变量。
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_ONLY'; // <--- 确保这里从环境变量读取

/**
 * 验证用户凭证并生成 JWT。
 * @param credentials - 登录凭证 (用户名和密码)
 * @returns 成功则返回用户对象和 JWT，否则返回 null。
 */
export async function authenticateUser(credentials: LoginCredentials): Promise<{ user: User; token: string } | null> {
    const { username, password } = credentials;

    const dbUser: DbUser | undefined = database.getUserByUsername(username);

    if (!dbUser) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.passwordHash);

    if (!isPasswordValid) {
        return null;
    }

    const user: User = { id: dbUser.id, username: dbUser.username };
    // 使用配置中的 JWT 过期时间
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: config.auth.jwtExpiresIn });

    return { user, token };
}

/**
 * 验证 JWT 并返回用户数据。
 * @param token - JWT 字符串
 * @returns 成功则返回用户对象，否则返回 null。
 */
export function verifyToken(token: string): User | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as User;
        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}