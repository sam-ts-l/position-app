<script>
    import '../app.css' // DoNotChange
    import { base } from '$app/paths' // DoNotChange
</script>

<!-- Website title -->
<svelte:head>
    <title>Position App</title>
</svelte:head>

<!-- Header -->
<!-- HTML <a href="{base}/"></a> tag for routing -->
<div class="navbar bg-base-300">
    <a
        class="btn btn-ghost text-xl"
        href="{base}/"
    >
        Home
    </a>
    <a
        class="btn btn-ghost text-xl"
        href="{base}/about"
    >
        About
    </a>
    <a
        class="btn btn-ghost text-xl"
        href="{base}/game"
    >
        Game
    </a>
</div>

<!-- Main content -->
<!-- Content is inserted at <slot /> -->
<!-- DoNotChange -->
<main class="max-w-[1920px] container mx-auto pt-4">
    <slot />
</main>
