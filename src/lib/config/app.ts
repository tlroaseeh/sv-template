// src/lib/config/app.ts

// 定义导航项的接口，确保类型安全
export interface NavItem {
    label: string;      // 导航项显示的文本
    href: string;       // 导航链接
    iconSvg?: string;   // 可选的 SVG 图标字符串 (直接嵌入 SVG 代码)
    requiresAuth?: boolean; // 可选：是否只有认证用户才能看到此导航项
}

type TimeUnit = 's' | 'm' | 'h' | 'd' | 'w' | 'y';
type NumericString = `${number}`; // 匹配任何数字转换为的字符串
type JwtExpiresInString = `${NumericString}${TimeUnit}`;

// 定义应用程序配置的接口
interface AppConfig {
    site: {
        name: string;   // 站点名称 (例如显示在抽屉顶部的 Logo 处)
        slogan?: string; // 站点标语 (可选)
    };
    navbar: {
        // 你可以在这里添加主内容区域 Navbar 的特定配置
        // 例如: defaultTitle: string;
    };
    drawer: {
        widthClass: string; // 抽屉宽度对应的 Tailwind CSS 类名 (例如 'w-64')
        navItems: NavItem[]; // 抽屉中的导航项列表
    };
    auth: {
        cookieName: string; // 用于存储会话 token 的 cookie 名称
        jwtExpiresIn: JwtExpiresInString; // JWT 的过期时间 (例如 '1h', '7d')
        registrationEnabled: boolean; // 是否允许用户注册
    };
    footer: {
        text: string; // 页脚文本
    };
    // 根据需要添加更多配置项
}

// 应用程序的默认配置
const config: AppConfig = {
    site: {
        name: 'my site',
        slogan: 'A modern web application template',
    },
    navbar: {
        // 示例：可以添加一些默认标题或行为配置
    },
    drawer: {
        widthClass: 'w-64', // 默认抽屉宽度
        navItems: [
            { label: 'Home', href: '/', iconSvg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h3v-3m0 0h-3V9m8 4a1 1 0 01-1 1h-3v-3"></path></svg>' },
            { label: 'Dashboard', href: '/dashboard', iconSvg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2"></path></svg>', requiresAuth: true },
            { label: 'Settings', href: '/settings', iconSvg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.525.322 1.017.514 1.5.659.54.16.892.493 1.258.859L12 12l.742-.742c.366-.366.718-.699 1.258-.859.483-.145.975-.337 1.5-.659z"></path></svg>', requiresAuth: true },
            // 添加更多导航项...
        ],
    },
    auth: {
        cookieName: 'session_token', // 会话 cookie 的名称
        jwtExpiresIn: '1h',          // JWT 1小时过期
        registrationEnabled: true,   // 启用或禁用注册功能
    },
    footer: {
        text: '© 2024 SvelteTemplate. All rights reserved.',
    }
};

export default config;