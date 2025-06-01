// src/routes/api/logout/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import config from '$lib/config/app'; // 导入配置

export const POST: RequestHandler = async ({ cookies }) => {
    // 清除 session cookie，使用配置中的 cookie 名称
    cookies.delete(config.auth.cookieName, { path: '/' });

    return new Response(JSON.stringify({ success: true, message: 'Logged out successfully.' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};