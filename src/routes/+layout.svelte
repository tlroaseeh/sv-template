<script lang="ts">
    import '../styles/app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import DrawerMenu from '$lib/components/DrawerMenu.svelte';
    import { authStore, setUser } from '$lib/stores/authStore';
    import { onMount } from 'svelte';
    import type { LayoutData } from './$types';
    import { page } from '$app/stores';
    import { quintOut } from 'svelte/easing';
    import { fade, slide } from 'svelte/transition';
    import config from '$lib/config/app'; // 导入配置

    export let data: LayoutData;

    let showMobileDrawer = false;

    onMount(() => {
        setUser(data.user);
    });

    $: if (!$authStore.isAuthenticated && $authStore.loading === false && $page.url.pathname !== '/login') {
        window.location.href = '/login';
    }

    function toggleMobileDrawer() {
        showMobileDrawer = !showMobileDrawer;
    }
</script>

<div class="h-screen flex">
    <!-- 桌面端侧边栏 (Desktop Drawer) -->
    <aside
        class="hidden lg:block {config.drawer.widthClass} h-full bg-white shadow-xl flex-shrink-0 flex flex-col p-4 z-30"
    >
        <!-- 使用配置中的站点名称 -->
        <a href="/" class="text-xl font-bold text-gray-800 mb-4 px-2">
            <span class="text-blue-600">{config.site.name.slice(0, 6)}</span>{config.site.name.slice(6)}
        </a>
        <DrawerMenu />
    </aside>

    <!-- 主内容区域容器 (Main Container) -->
    <div class="flex-1 flex flex-col h-full">
        <Navbar on:toggleMobileDrawer={toggleMobileDrawer} />

        <main class="flex-1 p-4 lg:p-6 overflow-y-auto">
            {#if $authStore.loading}
                <div class="flex items-center justify-center h-full">
                    <p class="text-gray-600">Loading application...</p>
                </div>
            {:else if (!$authStore.isAuthenticated && $page.url.pathname !== '/login') || $page.url.pathname === '/login'}
                <slot />
            {:else}
                <slot />
            {/if}
        </main>
    </div>

    <!-- 移动端抽屉背景遮罩 (Mobile Drawer Overlay) -->
    {#if showMobileDrawer}
        <button
            aria-label="Hide Mobile Drawer"
            on:click={() => (showMobileDrawer = false)}
            class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            on:click={() => (showMobileDrawer = false)}
            in:fade={{ duration: 150 }}
            out:fade={{ duration: 150 }}
        ></button>
    {/if}

    <!-- 移动端抽屉 (Mobile Drawer) -->
    <aside
        class="fixed top-0 left-0 {config.drawer.widthClass} h-full bg-white shadow-xl z-30 flex flex-col p-4
               transition-transform duration-300 ease-in-out lg:hidden
               {showMobileDrawer ? 'translate-x-0' : '-translate-x-full'}"
        in:slide={{ axis: 'x', duration: 300, easing: quintOut }}
        out:slide={{ axis: 'x', duration: 300, easing: quintOut }}
    >
        <!-- 使用配置中的站点名称 -->
        <a href="/" class="text-xl font-bold text-gray-800 mb-4 px-2">
            <span class="text-blue-600">{config.site.name.slice(0, 6)}</span>{config.site.name.slice(6)}
        </a>
        <DrawerMenu closeDrawer={() => showMobileDrawer = false} />
    </aside>
</div>