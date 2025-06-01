<script lang="ts">
	import { authStore } from '$lib/stores/authStore';
	import config from '$lib/config/app'; // 导入配置
	import type { NavItem } from '$lib/config/app'; // 导入 NavItem 接口

	export let closeDrawer: (() => void) | undefined = undefined;
</script>

<div class="flex items-center justify-between pb-4 border-b border-gray-200">
	<h2 class="text-2xl font-semibold text-gray-800">Menu</h2>
	{#if closeDrawer}
		<button
			on:click={closeDrawer}
			aria-label="Close drawer"
			class="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
					d="M6 18L18 6M6 6l12 12"
				></path></svg
			>
		</button>
	{/if}
</div>

<nav class="mt-8 flex-1 overflow-y-auto">
	<ul class="space-y-2">
		{#each config.drawer.navItems as item (item.href)}
			{#if !item.requiresAuth || ($authStore.isAuthenticated && item.requiresAuth)}
				<li>
					<a
						href={item.href}
						class="flex items-center p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors text-base"
						on:click={closeDrawer}
					>
						{#if item.iconSvg}
							<!-- 使用 @html 插入 SVG 代码 -->
							{@html item.iconSvg}
						{/if}
						<span class={item.iconSvg ? 'ml-3' : ''}>{item.label}</span>
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
