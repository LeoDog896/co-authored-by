<script lang="ts">
    async function getCoAuthoredBy(login: string): Promise<string | null> {
        const response = await fetch(`https://co-authored-by.deno.dev/${login}`);

        if (response.status === 200) {
            return await response.text();
        } else {
            return null;
        }
    }

    let input: string;
    let coAuthoredBy: Promise<string | null> | null = null;
</script>

<div>
    <input bind:value={input} />

    <button on:click={() => coAuthoredBy = getCoAuthoredBy(input)}>
        Submit
    </button>
</div>

{#await coAuthoredBy}
    <p>Loading...</p>
{:then coAuthoredBy}
    {#if coAuthoredBy}
        <p>{coAuthoredBy}</p>
    {:else}
        <p>Not found</p>
    {/if}
{/await}

<style>
    /* brutalist centered layout */
    :global(body) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        margin: 0;
    }

    button {
        margin-left: .5rem;
    }
</style>