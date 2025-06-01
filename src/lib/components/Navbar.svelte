<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { authStore, setUser } from '$lib/stores/authStore';
	import { page } from '$app/stores';

	const dispatch = createEventDispatcher();

	async function handleLogout() {
		try {
			const response = await fetch('/api/logout', { method: 'POST' });
			if (response.ok) {
				setUser(null); // 清除本地 store 状态
				window.location.href = '/login'; // 重定向并刷新以确保所有状态清除
			} else {
				alert('Logout failed. Please try again.');
			}
		} catch (error) {
			console.error('Logout error:', error);
			alert('An error occurred during logout.');
		}
	}
</script>

<!-- 这个 Navbar 位于主内容区域的顶部，并悬浮在滚动内容之上 -->
<nav class="bg-white shadow-sm py-4 px-6 flex items-center justify-between z-10 sticky top-0">
	<div class="flex items-center">
		<!-- 移动端抽屉开关按钮，在桌面端隐藏 -->
		<button
			on:click={() => dispatch('toggleMobileDrawer')}
			aria-label="Toggle Mobile Drawer"
			class="lg:hidden p-2 mr-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<svg
				class="w-6 h-6 text-gray-700"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				></path></svg
			>
		</button>
		<!-- 主内容区域的标题，例如 "Dashboard" 或动态页面标题 -->
		<!-- 你可以根据当前路由来动态显示这个标题 -->
		<h1 class="text-xl font-bold text-gray-800">
			{#if $page.url.pathname === '/'}Home{:else if $page.url.pathname === '/dashboard'}Dashboard{:else}Page
				Title{/if}
		</h1>
	</div>

	<div class="flex items-center space-x-4">
		{#if $authStore.isAuthenticated}
			<span class="text-gray-700 text-sm hidden sm:block">Hello, {$authStore.user?.username}!</span>
			<button
				on:click={handleLogout}
				class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Logout
			</button>
		{:else if $page.url.pathname !== '/login'}
			<a
				href="/login"
				class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Login
			</a>
		{/if}
	</div>
</nav>
