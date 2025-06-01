import { writable } from 'svelte/store';
import type { User } from '$lib/server/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean; // 用于表示是否正在加载认证状态
}

const initialAuthState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true, // 初始设置为 true，表示正在加载
};

export const authStore = writable<AuthState>(initialAuthState);

// 辅助函数：设置用户
export function setUser(user: User | null) {
    authStore.update(state => ({
        ...state,
        user,
        isAuthenticated: !!user,
        loading: false, // 加载完成
    }));
}