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
    // TODO: add tutorial PDF link here
    let tutorialURL = ""
    let newGame = true
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
                zoom: 15,
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

        qualityElement.innerText = accuracyMeter + "  " + accuracyStrengthMetres + "m"

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

        if (newGame) {
            alert("It all started with a single spark… A cyber attack so big, it wiped out everything. The world’s digital maps, data, even our memories—gone in an instant. They called it the Blackout. All the maps we trusted—Google Maps, OpenStreetMap—vanished, like smoke blown away by the wind.\n\nAnd with that, Melbourne… our beloved city, got lost in the digital fog. Streets that once buzzed with life grew empty. It’s like the city itself faded away, one forgotten corner at a time. The world moved on… but I haven’t.")
            alert("You’re a local explorer, just like I used to be. You know the city, its heart, and its stories. Now, you’re one of the few who can make a difference.\n\nYour love for Melbourne is the spark we need to revive it! But I can’t do this for you; I need your help.")
            alert("Your mission? Simple, but important. Rediscover Melbourne through numerous quests. Find its lost landmarks, its forgotten places, and help put this city back on the map—literally! With every step, you’ll be bringing Melbourne back to life.\n\nAt the end of each quest, you’ll gather location details and all the necessary information on a monument, which you’ll compile for us to publish to a server I’ve just created. The server will handle the rest!")
            alert("Now, don’t think I’m just going to hand you everything! I’ll give you clues, little riddles, and some will be tricky. After all, what fun is it if it’s too easy?\n\nBut don’t worry—you’ve got this! Use your wits and your love for the city to complete these quests. Let’s help Melbourne become the vibrant city it always was!")
            alert("I hope you understand your mission and the impact of the work you’re about to do. You’re leading a mission that will change Melbourne’s history forever!\n\nNow, to make sure you’re truly ready for this heroic journey: grab some water, pack a snack, and put on your comfiest pair of shoes… and probably get an umbrella too. Click ‘OK’ when you’re ready to begin.")
            newGame = false
        }

        if (!currentQuest) {
            questStartTime = startGame()

            currentQuest = loadQuest(playerLivePosition, remainingQuests, questsCompleted)

            questPlace = {
                lngLat: { lng: currentQuest.longitude, lat: currentQuest.latitude },
                label: '📌',
                name: currentQuest.name,
            }
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

            alert("Amazing work! You’ve now rediscovered " + currentQuest.name + " and are among the few who truly know the ins and outs of this magnificent landmark.\n\nTake a moment to compile all the details you’ve gathered and send it my way. I’ll verify that everything checks out, and once confirmed, we can go ahead and publish it to our server.")
            alert("Compiled Details:\n\n" + currentQuest.description)
            alert("Great job! You’ve crafted a perfect record of " + currentQuest.name + ". This will help thousands of future explorers to discover, learn, and experience this amazing place.\n\nJust give me an ‘OK’ when you’re ready, and I’ll publish it on the server for everyone to access.")

            // check if the final quest id completed
            if (remainingQuests.length == 0) {
                alert("Congratulations, explorer! You’ve done what many believed impossible. You’ve uncovered every hidden gem, every forgotten story, and every corner of this city that deserved to be remembered. Melbourne owes you a debt of gratitude.")
                alert("Through your dedication, the city now breathes anew. The landmarks you’ve restored will inspire thousands to explore, learn, and fall in love with Melbourne just as you have. You’ve brought history back to life and reminded us of the beauty we must never forget.")
                alert("You are now among the ranks of Melbourne’s finest explorers, an elite group who will always be remembered for their incredible contributions. Your name will echo through the city’s heart, a testament to the passion and resilience of those who truly cherish this place.")
                alert("Now, I sincerely hope the Blackout we faced never strikes again. But if such a day were to come… I’m glad to know we have a hero like you to save the day. Keep exploring, helping others, and living an amazing life. Until next time, my friend…")
            }
            else {
                alert("Congratulations! With this quest completed, there’s a new spark of hope for " + currentQuest.name + " to shine in Melbourne once again. You’re bringing us closer to our goal, one discovery at a time.\n\nWhen you’re ready, just say ‘OK,’ and we’ll set out on the next quest!")
            }

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
    let geojsonSururbs
    let geojsonQuests
    let geojsonLandmarks

    // Some additional GeoJSON data can be found here:
    // https://raw.githubusercontent.com/codeforgermany/click_that_hood/refs/heads/main/public/data/airports.geojson
    onMount(async () => {
        const responseSururbs = await fetch('melbourne.geojson')
        geojsonSururbs = await responseSururbs.json()

        const responseQuests = await fetch('quests.geojson')
        geojsonQuests = await responseQuests.json()

        const responseLandmarks = await fetch('landmarks.geojson')
        geojsonLandmarks = await await responseLandmarks.json()
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
            <span id="level" class="mt-1">{playerLevel}</span>
        </div>
    </div>

    <div class="flex flex-col items-center">
        <div class="flex justify-center align-middle mt-2">
            <button
                class="btn-sm btn-ghost text-xs"
                on:click={() => {
                    bounds =
                        gameMap.flyTo({
                            center: coords,
                            zoom: 15,
                        });
                }}>
                Center
            </button>
            <button
                class="btn-sm btn-ghost text-xs mx-2"
                on:click={() => getHint1(currentQuest, usedHints, gameMap)}>
                Hint 1
            </button>
            <button
                class="btn-sm btn-ghost text-xs mx-2"
                on:click={() => getHint2(currentQuest, usedHints)}>
                Hint 2
            </button>
            <button
                class="btn-sm btn-ghost text-xs mx-2"
                on:click={() => getHint3(currentQuest, usedHints)}>
                Hint 3
            </button>
            <button
                class="btn-sm btn-ghost text-xs mx-2"
                on:click={() => window.open(tutorialURL, "_blank") }>
                Help
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
                id="geojsonSururbs"
                data={geojsonSururbs}
                promoteId="geojsonSururbs"
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
                    paint={{ 'line-color': 'purple', 'line-width': 3, 'line-opacity': 0.3 }}
                    beforeLayerType="symbol"
                />
            </GeoJSON>

            <GeoJSON
                id="geojsonLandmarks"
                data={geojsonLandmarks}
                promoteId="geojsonLandmarks"
            >
                <FillLayer
                    paint={{
                        'fill-color': hoverStateFilter('blue', 'orange'),
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
                    paint={{ 'line-color': 'purple', 'line-width': 3, 'line-opacity': 0.3 }}
                    beforeLayerType="symbol"
                />
            </GeoJSON>


            <GeoJSON
                id="geojsonQuests"
                data={geojsonQuests}
                promoteId="geojsonQuests"
            >
                <FillLayer
                    paint={{
                        'fill-color': hoverStateFilter('green', 'red'),
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
                    paint={{ 'line-color': 'purple', 'line-width': 3, 'line-opacity': 0.3 }}
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
