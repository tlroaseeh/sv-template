import type { Actions } from './$types';
import { authenticateUser } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        if (!username || !password) {
            return fail(400, { success: false, message: 'Please provide both username and password.' });
        }

        const authResult = await authenticateUser({ username, password });


        if (authResult) {
            // 成功认证，设置 HTTP-only cookie
            cookies.set('session_token', authResult.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // 仅在生产环境使用 HTTPS
                maxAge: 60 * 60 * 24 * 7, // 1周
                path: '/',
                sameSite: 'lax'
            });

            // 返回成功信息和用户数据 (注意：这里返回的用户数据不包含敏感信息)
            return { success: true, user: authResult.user };
            // 或者直接重定向，但为了在客户端更新 authStore，这里返回数据更灵活
            // throw redirect(303, '/');
        } else {
            return fail(401, { success: false, message: 'Invalid credentials.' });
        }
    }
};