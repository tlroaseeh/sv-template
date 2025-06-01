import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    // 将认证的用户信息传递给所有页面和布局
    return {
        user: locals.user
    };
};