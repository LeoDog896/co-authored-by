<script lang="ts">
	import Copy from '$lib/svg/copy.svg?component';

	async function getCoAuthoredBy(login: string) {
		const response = await fetch(`https://co-authored-by.deno.dev/${login}`);

		if (response.status === 200) {
			return await response.text();
		} else {
			return null;
		}
	}

	function setCoAuthoredBy() {
		coAuthoredBy = getCoAuthoredBy(input);
	}

	let input: string;
	let coAuthoredBy: Promise<string | null> | null = null;

	let copyButton: HTMLButtonElement;
</script>

<h1>Co-authored-by</h1>

<!-- dark/light image in ./commit-template-dark.png and ./commit-template-light.png -->
<picture>
	<source srcset="commit-template-dark.png" media="(prefers-color-scheme: dark)" />
	<source srcset="commit-template-light.png" media="(prefers-color-scheme: light)" />
	<img src="commit-template-light.png" alt="commit template" />
</picture>

<p>Enter a GitHub username to get their co-authored-by line.</p>

<div>
	<input
		bind:value={input}
		placeholder="GitHub Username"
		on:keyup={(e) => {
			if (e.key === 'Enter') {
				setCoAuthoredBy();
			}
		}}
	/>

	<button class="button" on:click={setCoAuthoredBy}> Find </button>
</div>

{#await coAuthoredBy}
	<p>Loading...</p>
{:then coAuthoredBy}
	{#if coAuthoredBy}
		<p>
			<code>{coAuthoredBy}</code>
			<button
				bind:this={copyButton}
				class="copy"
				on:click={() => {
					navigator.clipboard.writeText(coAuthoredBy);
					copyButton.classList.add('copy-animation');
				}}
			>
				<Copy />
			</button>
		</p>
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
		margin-left: 0.5rem;
	}

	img {
		border: 1px solid #ccc;
	}

	.copy {
		background: transparent;
		border: none;
		padding: 0;
		vertical-align: middle;
	}

	.copy:hover {
		cursor: pointer;
	}

	/* simple clean input / button, futuristic */
	input {
		background: transparent;
		border: none;
		border-bottom: 1px solid #ccc;
		color: inherit;
		font-size: 1rem;
		padding: 0.5rem;
	}

	input:focus {
		outline: none;
		border-bottom: 1px solid #eee;
	}

	button {
		background: transparent;
		border: 1px solid #ccc;
		color: inherit;
		font-size: 1rem;
		padding: 0.5rem;
	}

	button.button:hover {
		border: 1px solid #eee;
		background: #eee;
	}

	code {
		background: #eee;
		border: 1px solid #ccc;
		border-radius: 3px;
		padding: 0.25rem 0.5rem;
	}

	:global(svg) {
		vertical-align: middle;
	}

	@keyframes copy {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.3);
		}

		100% {
			transform: scale(1);
		}
	}

	:global(.copy-animation) {
		animation: copy 1s;
	}

	@media (prefers-color-scheme: dark) {
		:global(body) {
			background-color: #1b1d20;
			color: #eee;
		}

		img {
			border-color: #333;
		}

		input {
			border-bottom-color: #333;
		}

		input:focus {
			border-bottom-color: #555;
		}

		button.button {
			border-color: #333;
		}

		button.button:hover {
			border-color: #555;
			background: #555;
		}

		code {
			background: #333;
			border-color: #555;
		}

		:global(path) {
			/* set stroke color to white */
			stroke: #eee;
		}
	}
</style>
