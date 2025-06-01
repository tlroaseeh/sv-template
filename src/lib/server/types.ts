// 用于数据库存储的用户类型
export type DbUser = {
    id: string;
    username: string;
    passwordHash: string; // 存储密码哈希
};

// 用于前端显示的用户类型 (不包含密码哈希)
export type User = {
    id: string;
    username: string;
};

// 登录请求的类型
export type LoginCredentials = {
    username: string;
    password: string;
};