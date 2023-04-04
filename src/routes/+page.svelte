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

<h1>Co-authored-by</h1>

<!-- dark/light image in ./commit-template-dark.png and ./commit-template-light.png -->
<picture>
    <source srcset="commit-template-dark.png" media="(prefers-color-scheme: dark)" />
    <source srcset="commit-template-light.png" media="(prefers-color-scheme: light)" />
    <img src="commit-template-light.png" alt="commit template" />
</picture>

<p>Enter a GitHub login to get their co-authored-by line.</p>

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
        font-family: sans-serif;
    }

    button {
        margin-left: .5rem;
    }

    img {
        border: 1px solid #ccc;
    }

    @media (prefers-color-scheme: dark) {
        :global(body) {
            background-color: #1b1d20;
            color: #eee;
        }

        img {
            border-color: #333;
        }
    }
</style>