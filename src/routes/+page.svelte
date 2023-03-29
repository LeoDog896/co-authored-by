<script lang="ts">
    import { fetchEmail, makeRedirect } from "$lib/query"
    import { onMount } from "svelte";

    let email = "";
    let token = "";

    onMount(() => {
        const localToken = localStorage.getItem("token");

        if (!localToken) {
            window.location.href = makeRedirect();
            return;
        }

        token = localToken;
        
        fetchEmail("test").then((data) => {
            email = data;
            alert(email)
        });
    });
</script>

{email}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
