<script lang="ts">
    import Input from './Input.svelte';
    import Button from './Button.svelte';
    import { enhance } from '$app/forms';
    import { authStore, setUser } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';
    import type { SubmitFunction } from '@sveltejs/kit';

    let username = '';
    let password = '';
    let error: string | undefined = undefined;
    let loading = false;

    // SvelteKit 表单操作的 enhance 函数
    const submitLogin: SubmitFunction = async ({ formElement, cancel }) => {
        loading = true;
        error = undefined; // 清除之前的错误

        const response = await fetch(formElement.action, {
            method: formElement.method,
            body: new FormData(formElement),
        });

        console.log('Response:', response);

        const result = await response.json(); // 期望后端返回 JSON 结果

        if (response.ok && result.type === 'success') {
            setUser(result.user); // 更新 Svelte store
            goto('/'); // 重定向到主页
        } else {
            error = result.message || 'Login failed. Please check your credentials.';
            loading = false; // 登录失败，停止加载
        }

        return ({ update }) => {
            // 无论成功失败，都停止加载
            loading = false;
            update({ reset: false }); // 不重置表单
        };
    };
</script>

<form method="POST" action="/login?/login" use:enhance={submitLogin}>
    <Input
        id="username"
        name="username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        bind:value={username}
        required
    />
    <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        bind:value={password}
        required
    />

    {#if error}
        <p class="text-red-600 text-sm mb-4">{error}</p>
    {/if}

    <Button type="submit" text="Login" {loading} disabled={loading} />
</form>