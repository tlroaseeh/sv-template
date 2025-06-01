<script lang="ts">
    import { authStore } from '$lib/stores/authStore';
</script>

<div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome to Your SvelteKit Template!</h1>
    <p class="text-gray-700 mb-6">
        This is a clean, minimal template designed with SvelteKit, TypeScript, Tailwind CSS v3, and a basic authentication system.
    </p>

    {#if $authStore.isAuthenticated}
        <div class="bg-white p-6 rounded-lg shadow-md max-w-md">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">User Information</h2>
            <p class="text-gray-700"><strong>Username:</strong> {$authStore.user?.username}</p>
            <p class="text-gray-700"><strong>User ID:</strong> {$authStore.user?.id}</p>
            <p class="mt-4 text-blue-600">You are logged in!</p>
        </div>
    {:else}
        <div class="bg-white p-6 rounded-lg shadow-md max-w-md">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Not Logged In</h2>
            <p class="text-gray-700">Please <a href="/login" class="text-blue-600 hover:underline">log in</a> to access more features.</p>
        </div>
    {/if}

    <section class="mt-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-3">Features:</h2>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li>SvelteKit for a robust application framework.</li>
            <li>TypeScript for type safety and better development experience.</li>
            <li>Tailwind CSS v3 for utility-first styling.</li>
            <li>Responsive Navbar and Drawer for navigation.</li>
            <li>Basic Username/Password authentication (JWT + HTTP-only cookies).</li>
            <li>Clean, minimalist UI design.</li>
            <li>Minimal dependencies for easy reusability.</li>
        </ul>
    </section>
</div>