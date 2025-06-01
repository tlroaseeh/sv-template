<script lang="ts">
    export let type: string = 'text';
    export let id: string;
    export let name: string;
    export let value: string = '';
    export let placeholder: string = '';
    export let label: string = '';
    export let required: boolean = false;
    export let error: string | undefined = undefined; // 错误信息
</script>

<div class="mb-4">
    {#if label}
        <label for={id} class="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {#if required}<span class="text-red-500">*</span>{/if}
        </label>
    {/if}
    <input
        {type}
        {id}
        {name}
        bind:value
        {placeholder}
        {required}
        class="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
               {error ? 'border-red-500' : 'border-gray-300'}"
    />
    {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
    {/if}
</div>