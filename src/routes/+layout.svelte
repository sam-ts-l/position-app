<script>
    import '../app.css' // DoNotChange
    import { base } from '$app/paths' // DoNotChange
</script>

<svelte:head>
    <title>Noyocity</title>
</svelte:head>
<main class="max-w-[1920px] container mx-auto pt-4">
    <slot />
</main>

<!-- Menu button -->
<div class="px-8 flex new-row items-center justify-center w-30 max-w-30 font-bold text-sm">
    <div class="relative">
        <div class="dropdown dropdown-top dropdown-hover">
            <div
                tabindex="0"
                role="button"
                class="btn btn-sm">menu</div>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a href="{base}/">Game</a></li>
                <li><a href="{base}/game">Home</a></li>
                <li><a href="{base}/rules">Rulebook</a></li>
                <!--<li><a href="{base}/about">About</a></li>-->
            </ul>
        </div>
    </div>
</div>
