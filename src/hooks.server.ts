// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';
import type { User } from '$lib/server/types';
import config from '$lib/config/app'; // 导入配置

export const handle: Handle = async ({ event, resolve }) => {
    // 从 cookie 中获取认证 token，使用配置中的 cookie 名称
    const token = event.cookies.get(config.auth.cookieName);

    if (token) {
        const user: User | null = verifyToken(token);
        if (user) {
            event.locals.user = user;
        } else {
            // 如果 token 无效，则清除它
            event.cookies.delete(config.auth.cookieName, { path: '/' });
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    const response = await resolve(event);
    return response;
};