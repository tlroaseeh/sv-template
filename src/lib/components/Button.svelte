<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let text: string;
    export let loading: boolean = false;
    export let disabled: boolean = false;
</script>

<button
    {type}
    {disabled}
    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
           bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
           transition-colors duration-200
           {disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}"
>
    {#if loading}
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading...
    {:else}
        {text}
    {/if}
</button>