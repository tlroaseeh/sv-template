<!-- src/lib/components/Drawer.svelte -->
<script lang="ts">
    import { quintOut } from 'svelte/easing';
    import { fade, slide } from 'svelte/transition';
    import DrawerMenu from './DrawerMenu.svelte'; // 导入 DrawerMenu 组件

    export let showDrawer: boolean; // 用于控制移动端抽屉的显示状态
</script>

<!-- 移动端抽屉的背景遮罩 -->
{#if showDrawer}
    <button
        class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        tabindex="0"
        aria-label="Close drawer"
        on:click={() => (showDrawer = false)}
        in:fade={{ duration: 150 }}
        out:fade={{ duration: 150 }}
    ></button>
{/if}

<!-- 移动端抽屉 (固定定位，滑入/滑出动画，在大屏幕上隐藏) -->
<aside
    class="
        fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-30 flex flex-col p-4
        transition-transform duration-300 ease-in-out
        lg:hidden <!-- 在大屏幕上隐藏此抽屉 -->
        {showDrawer ? 'translate-x-0' : '-translate-x-full'}
    "
    in:slide={{ axis: 'x', duration: 300, easing: quintOut }}
    out:slide={{ axis: 'x', duration: 300, easing: quintOut }}
>
    <!-- 传递 closeDrawer 函数给 DrawerMenu -->
    <DrawerMenu closeDrawer={() => showDrawer = false} />
</aside>

<!-- 桌面端侧边栏 (静态定位，在大屏幕上显示) -->
<aside
    class="
        hidden lg:block <!-- 在小屏幕上隐藏，只在大屏幕上显示 -->
        w-64 h-full bg-white shadow-xl z-30 flex-col p-4
        lg:static lg:flex-shrink-0 <!-- 确保它作为flex项，并且不收缩 -->
    "
>
    <!-- 桌面端侧边栏不需要 closeDrawer 函数 -->
    <DrawerMenu />
</aside>