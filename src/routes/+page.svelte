<script>
    import { onMount } from 'svelte'
    import Geolocation from 'svelte-geolocation'
    import {
        Control,
        ControlButton,
        ControlGroup,
        DefaultMarker,
        FillLayer,
        GeoJSON,
        hoverStateFilter,
        LineLayer,
        MapEvents,
        MapLibre,
        Marker,
        Popup,
    } from 'svelte-maplibre' // DoNotChange

    import {getDistance, getMapBounds, getPlaces, loadQuest, startGame, completeQuest, getHint1, getHint2, getHint3, getLevel} from '$lib'

    let markers = [
        {
            lngLat: {
                lng: 0,
                lat: 0
            },
            label: '⌛ Loading...',
            name: 'Please wait for the game to load',
        },
    ]

    // Extent of the map
    let bounds = getMapBounds(markers)

    // Geolocation API related
    const options = {
        enableHighAccuracy: true,
        timeout: Infinity, // milliseconds
        maximumAge: 0, // milliseconds, 0 disables cached positions
    }
    let getPosition = false
    let success = false
    let error = ''
    let position = {}

    // RMIT coordinates
    let coords = [144.9639, -37.8083]

    // game-related variables
    let gamePlaces = getPlaces()["places"]
    const gameLoadTime = Date.now()
    let questStartTime
    let questEndTime
    let questPlace
    let attempts = 0
    let maxRetries = 10
    let playerLivePosition = {}
    let currentQuest = 0
    let hintsUsed = 0
    let usingGNSS = false
    let initialPosition = true
    let gameMap
    let distance = "N/A"
    let playerLevel = "Novice"
    let questMarkersVisible = []
    let usedHints = []

    let remainingQuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let questsCompleted = 0
    let totalScore = 0


    // Watch a position using Geolocation API if you need continuous updates
    let watchPosition = false
    let watchedPosition = {}
    let watchedMarker = {}

    $: if (success) {
        // Not sure if we need this
        getPosition = false
    }

    $: if (error) {
        console.error('Error:', error.message)
        document.getElementsByClassName("maplibregl-control-container")[0].style="display:none"
        alert(error.message)
        markers = [
            {
                lngLat: {
                    lng: 0,
                    lat: 0
                },
                name: '❌ An error occurred while fetching your location',
                label: 'Please enable location in your device, allow the browser to access location, and reload the page',
            },
        ]
    }

    $: if (watchedPosition.coords) {
        coords = [position.coords.longitude, position.coords.latitude]

        if (initialPosition) {
            gameMap.flyTo({
                center: coords,
                zoom: 14,
            })
            initialPosition = false
        }

        let accuracyStrengthMetres = Math.ceil(watchedPosition.coords.accuracy)
        let accuracyEmpty = "▒"
        let accuracyFilled = "█"
        let accuracyMeter = ""

        let qualityElement = document.getElementById("debug-msg")
        let scoreBox = document.getElementById("scorebox")
        let distanceElement = document.getElementById("distance")

        if (accuracyStrengthMetres >= 20) {
            accuracyMeter = "NO GNSS ❌ "
            usingGNSS = false
        } else if (accuracyStrengthMetres >= 12 && accuracyStrengthMetres < 20) {
            qualityElement.style.color = "#c41f1f"
            accuracyMeter = "█▒▒"
            usingGNSS = true
        } else if (accuracyStrengthMetres < 12 && accuracyStrengthMetres > 6 ) {
            qualityElement.style.color = "#c4851f"
            accuracyMeter = "██▒"
            usingGNSS = true
        } else {
        qualityElement.style.color = "#59c41f"
        accuracyMeter = "███"
        usingGNSS = true
      }

        qualityElement.innerText = accuracyMeter + " " + accuracyStrengthMetres + " m"

        scoreBox.innerText = totalScore

        markers = [{
            lngLat: { lng:coords[0], lat:coords[1] },
            label: '🧍',
            name: 'Your current position',
        }]

        playerLivePosition = {
            lngLat: { lng: watchedPosition.coords.longitude, lat: watchedPosition.coords.latitude },
            label: '🧍',
            name: 'Your current position',
        }

        if (!currentQuest) {
            currentQuest = loadQuest(playerLivePosition, remainingQuests, questsCompleted)

            if (currentQuest == "Game Over") {
                alert("Your final score is: " + totalScore)
            }

            questPlace = {
                lngLat: { lng: currentQuest.longitude, lat: currentQuest.latitude },
                label: '📌',
                name: currentQuest.name,
            }

            questStartTime = startGame()
        }

        distance = getDistance([playerLivePosition, questPlace])
        if (distance != NaN) {
            distanceElement.innerText = distance.toFixed(2) + "m"
        } else {
            distanceElement.innerText = "N/A"
        }

        // const threshold = 15
        let threshold = currentQuest.areaScale * 8

        // mark quest as complete
        if (distance <= threshold) {
            // get multiple values from a function call [hintsUsed, remainingQuests, totalScore, questsCompleted]
            // https://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript
            [hintsUsed, totalScore, questsCompleted] = completeQuest(currentQuest.questId, questStartTime, usedHints, remainingQuests, totalScore, questsCompleted)
            playerLevel = getLevel(totalScore)

            // need to work on this
            // addQuestMarker(currentQuest.name, questMarkersVisible)

            // reset quest-realted settings after the completion of a quest
            currentQuest = 0
            distanceElement.innerText = "N/A"
            hintsUsed = 0
            usedHints = []
        }
    }

    let showGeoJSON = true
    let geojsonData

    // Some additional GeoJSON data can be found here:
    // https://raw.githubusercontent.com/codeforgermany/click_that_hood/refs/heads/main/public/data/airports.geojson
    onMount(async () => {
        const response = await fetch('melbourne.geojson')
        geojsonData = await response.json()
    })
</script>

<div class="flex flex-col h-[calc(100vh-80px)] w-full">
    <!-- Might need to research on how to make a responsive layout -->
    <!-- grid, grid-cols-#, col-span-#, md:xxxx are some Tailwind utilities you can use for responsive design -->
    <div class="grid grid-cols-4">

        <!-- Get player's location continuosly -->
        <div class="col-span-4 md:col-span-1 text-center">
            <Geolocation
                getPosition={true}
                options={options}
                bind:position
                bind:success
                bind:error
                watch={true}
                on:position={(e) => {
                    watchedPosition = e.detail
                }}
            />
        </div>
    </div>

    <!-- Might need something similar later to toggle GeoJSON data on the map -->
    <!--     <div class="col-span-4 md:col-span-1 text-center"> -->
    <!--         <h1 class="font-bold">Toggle Melbourne Suburbs</h1> -->

    <!--         <button -->
    <!--             class="btn btn-neutral" -->
    <!--             on:click={() => { showGeoJSON = !showGeoJSON }} -->
    <!--         > -->
    <!--             Toggle -->
    <!--         </button> -->
    <!--     </div> -->

    <!-- This section demonstrates how to make a web map using MapLibre -->
    <!-- More basemap options -->
    <!-- "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" -->
    <!-- "https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" -->
    <!-- "https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json" -->

    <div class="px-8 flex new-row items-center w-30 max-w-30 font-bold text-sm">
        <div class="flex items-center">
            GNSS ACCU: &nbsp;
            <span id="debug-msg" class="tracking-tighter">N/A</span>
        </div>
        <div class="ml-auto">
            Distance: &nbsp;
            <span id="distance">N/A</span>
        </div>
        <div class="ml-auto">
            Score: &nbsp;
            <span id="scorebox">N/A</span>
            <br>
            Level: &nbsp;
            <span id="level" class="mt-1">{playerLevel}</span>
        </div>
    </div>

    <div class="flex flex-col items-center">
        <div class="flex justify-center align-middle mt-2">
            <button
                class="btn-sm btn-ghost text-sm"
                on:click={() => {
                    bounds = getMapBounds(markers);
                }}>
                Center
            </button>
            <button
                class="btn-sm btn-ghost text-sm mx-2"
                on:click={() => getHint1(currentQuest, usedHints, gameMap)}>
                Hint 1
            </button>
            <button
                class="btn-sm btn-ghost text-sm mx-2"
                on:click={() => getHint2(currentQuest, usedHints)}>
                Hint 2
            </button>
            <button
                class="btn-sm btn-ghost text-sm mx-2"
                on:click={() => getHint3(currentQuest, usedHints)}>
                Hint 3
            </button>
        </div>
    </div>

    <MapLibre
        class="map flex-grow min-h-[500px] gameMapControl"
        standardControls
        style="https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        bind:bounds
        zoom={14}
        bind:map={gameMap}
    >

        {#if showGeoJSON}
            <GeoJSON
                id="geojsonData"
                data={geojsonData}
                promoteId="name"
            >
                <FillLayer
                    paint={{
                        'fill-color': hoverStateFilter('purple', 'yellow'),
                        'fill-opacity': 0.3,
                    }}
                    beforeLayerType="symbol"
                    manageHoverState
                >
                    <Popup
                        openOn="hover"
                        let:data
                    >
                        {@const props = data?.properties}
                        {#if props}
                            <div class="flex flex-col gap-2">
                                <p>{props.name}</p>
                            </div>
                        {/if}
                    </Popup>
                </FillLayer>
                <LineLayer
                    layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                    paint={{ 'line-color': 'purple', 'line-width': 3 }}
                    beforeLayerType="symbol"
                />
            </GeoJSON>
        {/if}

        {#each markers as { lngLat, label, name }, i (i)}
            <Marker
                {lngLat}
                class="text-4xl text-black"
            >
                <span>
                    {label}
                </span>

                <Popup
                    openOn="hover"
                    offset={[0, -10]}>
                    <div class="text-lg font-bold">{name}</div>
                </Popup>
            </Marker>
        {/each}

        Display the watched position as a marker
        {#if watchedMarker.lngLat}
            <DefaultMarker lngLat={watchedMarker.lngLat}>
                <Popup offset={[0, -10]}>
                    <div class="text-lg font-bold">You</div>
                </Popup>
            </DefaultMarker>
        {/if}
    </MapLibre>
</div>
