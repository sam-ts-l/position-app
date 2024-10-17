import { getPlaces } from './gamedb.js';
import { getDistance } from './utils.js'

// Returns the quest details based on its id
// If a quest is not found, returns nothing
export function getQuestById(id) {
    let foundQuest
    let allQuests = getPlaces().places
    for (let i = 0; i < allQuests.length; i++) {
        if (allQuests[i].questId == id) {
            foundQuest = allQuests[i]
            return foundQuest
        }
    }
}

// Calculates score based on time taken to complete the quest and numbers of hints used
export function calculateQuestScore(completionTime, usedHints) {
    const questCompletionScore = 500
    const hintsUsed = usedHints.length
    const hintsPenalty = hintsUsed * 50
    const timeBonus = Math.max((3600 - completionTime) * 0.05, 0)
    const finalScore = questCompletionScore + timeBonus - hintsPenalty

    // Testing:
    // console.log("calculateQuestScore")
    // console.log(`hintsPenalty = ${hintsPenalty}, timeBonus = ${timeBonus}, questCompletionScore = ${questCompletionScore}, finalScore = ${finalScore}`)
    return finalScore
}

// Finds the user's level based on the total score
export function getLevel(score) {
    const levels = {
        "Novice": 0,
        "Explorer": 500,
        "Adventurer": 1500,
        "Seeker": 3000,
        "Navigator": 5000,
        "Historian": 8000,
        "Pathfinder": 12000,
        "Discoverer": 17500,
        "Voyager": 25000,
        "Champion": 50000,
        "Legend": 100000
    }

    let previousLevel = null;
    for (let level in levels) {
        if (score < levels[level]) {
            return previousLevel;
        }
        previousLevel = level;
    }
    return previousLevel;
}

export function loadQuest(playerLocation, remainingQuests, questsCompleted) {
    //   Get the remaining quests
    //   Calculate distance between the player location and each of the quest locations
    //   Choose top 3 locations based on the shortest distance
    //   Randomly choose one of those 3 locations

    // Fixing errors
    // Only the remaining quests should be considered
    // When all quests are completed, the game should end

    let questsDistance = []
    let questsWithShortestDistance = []
    let questPlace = 0
    let currentQuest

    for (let i = 0; i < remainingQuests.length; i++) {
        let quest = remainingQuests[i]
        let questLatitude = getQuestById(quest).latitude
        let questLongitude = getQuestById(quest).longitude
        let questObject = { lngLat: { lat: questLatitude, lng: questLongitude } }
        let distance = getDistance([playerLocation, questObject])

        questsDistance.push({ id: quest, distance: distance })
    }

    questsWithShortestDistance = questsDistance.sort((a, b) => b.distance - a.distance)
    console.log("Quests distance:", questsDistance)
    console.log("Quests with shortest distance:", questsWithShortestDistance)

    // Get a random number from 1 to the number of remaining quests 
    // This fixes the error we were facing when we were using a number that was higher than the number of remaining quests
    // https://www.w3schools.com/js/js_random.asp
    let randomNumber = Math.floor(Math.random() * remainingQuests.length)
    questPlace = questsWithShortestDistance[randomNumber]

    if (questPlace == undefined) {
        alert("You have completed all the quests. Game over!")
        return "Game Over"
    }
    currentQuest = getQuestById(questPlace.id)
    alert("Quest: " + currentQuest.hint0)

    return currentQuest
}

// Marks quest as completed
export function completeQuest(questId, startTime, usedHints, remainingQuests, totalScore, questsCompleted) {
    // Calculate the score for the quest
    // Update the player's total score
    // Update the player's level
    // Remove the quest from the pending quest list
    // Update the questId as completed in the player's quest list
    // Reset usedHints

    if (!remainingQuests.includes(questId)) {
        console.log("Quest already completed. Skipping.")
        return
    }

    // Without the delay, completeQuest function was being called rapidly and the same quest was being completed a few times
    // https://www.w3schools.com/jsref/met_win_settimeout.asp
    setTimeout(function () {
        // console.log("Delaying a bit before completing the quest")
    }, 1000)

    // Remove the completed quest from the remaining quests
    // https://stackoverflow.com/questions/18744246/remove-an-item-from-an-array-with-javascript-splice-indexof
    let index = remainingQuests.indexOf(questId)
    remainingQuests.splice(index, 1)

    questsCompleted = questsCompleted + 1
    const questScore = calculateQuestScore((Date.now() - startTime) * 1000, usedHints)
    totalScore = totalScore + questScore
    const newLevel = getLevel(totalScore)

    console.log("DEBUG")
    console.log("Quest ID:", questId)
    console.log("Quest Score:", questScore)
    console.log("Total Score:", totalScore)
    console.log("New Level:", newLevel)
    console.log("Remaining Quests:", remainingQuests)
    console.log("Quests Completed:", questsCompleted)
    console.log("Used Hints:", usedHints)

    usedHints = []

    // Testing
    // console.log("Completed quest:", questId)
    // console.log("Congratulations! You have completed the quest. Total score: " + questScore + ". Your level: " + newLevel)

    alert("Congratulations! You have completed the quest. Total score: " + questScore + ". Your level: " + newLevel)
    return [usedHints.length, totalScore, questsCompleted]
}

// Starts game timer
// This is used in other places to calculate time bonus
export function startGame() {
    const now = Date.now()
    console.log("Game started at:", now)
    return now
}

// getDistance can be called like this
// console.log(getDistance([{ lngLat: { lat: 37.7749, lng: 122.4194 } }, { lngLat: { lat: 38.7749, lng: 122.4194 } }]))

// Get the default hint and fly somewhere near that location
// This is necessary to show the player the general area where the quest is located
export function getHint1(currentQuest, usedHints, gameMap) {
    alert(currentQuest.hint1)

    // Range:
    // Max: 0.003
    // Min: 0.0011
    let offsetLat = Math.min(Math.max(Math.random(), 0.11), 0.3) * 0.01 / 2
    let offsetLng = Math.min(Math.max(Math.random(), 0.11), 0.3) * 0.01
    let lat = currentQuest.latitude + offsetLat
    let lng = currentQuest.longitude + offsetLng

    gameMap.flyTo({
        center: [lng, lat],
        zoom: 15
    })

    if (!usedHints.includes(1)) {
        usedHints.push(1)
    }
}

// Hint 2 should be more specific and should be used after hint 1
// This can only be unlocked after hint 1
export function getHint2(currentQuest, usedHints) {
    if (!usedHints.includes(1)) {
        alert("You need to use the previous hints first.")
        return
    }

    alert(currentQuest.hint2)

    if (!usedHints.includes(2)) {
        usedHints.push(2)
    }
}

// Hint 3 should be the most specific and should be used after hint 2
// This can only be unlocked after hint 2
export function getHint3(currentQuest, usedHints) {
    if (!usedHints.includes(1) || !usedHints.includes(2)) {
        alert("You need to use the previous hints first.")
        return
    }

    alert(currentQuest.hint3)

    if (!usedHints.includes(3)) {
        usedHints.push(3)
    }
}

// This should be used after the quest is complete
// Adds a marker of the completed quest to the map

// function addQuestMarker(coords, name, map) {
//     let questMarkers
//     let totalQuestMarkersVisible = questMarkersVisible.length
//     questMarkers = [
//         ...questMarkers,
//         {
//             lngLat: coords
//             label: name,
//             name
//         },
//     ]
// }

// Other ideas:
// Save the game to local storage. Reference: https://blog.logrocket.com/localstorage-javascript-complete-guide/
// Resume the game from where the player left off
