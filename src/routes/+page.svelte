<script lang="ts">
    import { fetchEmail } from "$lib/query.ts"
    import { onMount } from "svelte";

    let email = "";

    onMount(() => {
        fetchEmail().then((data) => {
            email = data.email;
            alert(email)
        });
    });
</script>

{email}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
