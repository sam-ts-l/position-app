// Interesting places in Melbourne nearby the RMIT university
// Should contain a JSON of places with the following fields:
// - name: the name of the place (should not be given as hint)
// - description: a short description of the place (this is shown after each quest is completed)
// - hint0: hint given at the beginning of quest
// - hint1: a hint to the place
// - hint2: a hint to the place that is more specific than hint1
// - hint3: a hint to the place that is more specific than hint2
// - latitude: the latitude of the place
// - longitude: the longitude of the place
// - areaScale: this is tuned for each quest location (DO NOT CHANGE)
// - image: URL of the image of the place [not required]
export function getPlaces() {

    let places = {
        "places": [
            {
                "questId": 1,
                "name": "State Library Victoria",
                "description": "State Library Victoria",
                "hint0": "This majestic building, adorned with a stunning dome and grand entrance, stands as a beacon of knowledge in the heart of Melbourne. With its extensive collections and beautiful reading rooms, use this info with your knowledge to navigate to this landmark surrounded by bustling streets and cafés.",
                "hint1": "I am a place of knowledge, where the whispers of history echo through my walls of grand halls and a famous dome crowns my central space.",
                "hint2": "Established in 1854, I am Australia’s oldest public library with over 2 million books inside me.",
                "hint3": "Look for my distinctive reading room, which features a stunning circular design and a ceiling adorned with intricate details, making it a popular spot for both study and photography.",
                "latitude": -37.81,
                "longitude": 144.964598,
                "areaScale": 5
            },
            {
                "questId": 2,
                "name": "Carlton Gardens",
                "description": "Carlton Gardens",
                "hint0": "I’m a large green space in the center of Melbourne, where history and nature come together, and I have a big building that used to host international exhibitions.",
                "hint1": "I’m a large green space in the center of Melbourne, where history and nature come together, and I have a big building that used to host international exhibitions.",
                "hint2": "I’m a UNESCO World Heritage Site that started in the 1850s and became well-known for hosting Australia’s first Parliament in my famous exhibition building in 1901.",
                "hint3": "Look for my large grassy areas, tree-lined paths, and decorative fountains, along with a children's playground shaped like a Victorian maze, all surrounding a beautiful dome-topped building.",
                "latitude": -37.805431,
                "longitude": 144.971399,
                "areaScale": 10
            },
            {
                "questId": 3,
                "name": "Eight Hour Day Monument",
                "description": "Eight Hour Day Monument",
                "hint0": "I am a tribute to an important labor movement, featuring three connected figures that represent a balanced life of work, rest, and play.",
                "hint1": "I am a tribute to an important labor movement, featuring three connected figures that represent a balanced life of work, rest, and play.",
                "hint2": "Look for the striking bronze statue of a worker holding a pickaxe, surrounded by intricate engravings that tell the story of labor rights and struggles.",
                "hint3": "Look for my unique granite column with a globe on top and the words 'Rest, Labour, Recreation,' clearly shown at the corner of Russell and Victoria Streets.",
                "latitude": -37.807153,
                "longitude": 144.965577,
                "areaScale": 2
            },
            {
                "questId": 4,
                "name": "Melbourne Museum",
                "description": "Melbourne Museum",
                "hint0": "I am a place full of knowledge, where history meets today, and I have a giant dinosaur that once walked the Earth.",
                "hint1": "I am a place full of knowledge, where history meets today, and I have a giant dinosaur that once walked the Earth.",
                "hint2": "Founded in 1854, I display Australia's rich cultural heritage, including exhibits on Aboriginal history and Melbourne's development.",
                "hint3": "Look for my eye-catching modern design, with large galleries that feature a lush rainforest and an impressive IMAX theater, all in the World Heritage-listed Royal Exhibition Building.",
                "latitude": -37.8033,
                "longitude": 144.971754,
                "areaScale": 5
            },
            {
                "questId": 5,
                "name": "French Fountain",
                "description": "French Fountain",
                "hint0": "I am a lovely focal point in an old garden, where water flows beautifully, reflecting the elegance of the past.",
                "hint1": "I am a lovely focal point in an old garden, where water flows beautifully, reflecting the elegance of the past.",
                "hint2": "Originally gifted to Melbourne in the late 19th century, the fountain serves as a symbol of friendship between Melbourne and its sister city, Paris.",
                "hint3": "Look for my detailed lion masks and the beautifully crafted cast iron cap on my basin, all set against the Royal Exhibition Building.",
                "latitude": -37.804866,
                "longitude": 144.972849,
                "areaScale": 2
            },
            {
                "questId": 6,
                "name": "Charles George Gordon Memorial",
                "description": "Charles George Gordon Memorial",
                "hint0": "Look for a statue of a brave figure standing tall with a cane in one hand and a Bible in the other, where stories of courage can be felt in the park.",
                "hint1": "Look for a statue of a brave figure standing tall with a cane in one hand and a Bible in the other, where stories of courage can be felt in the park.",
                "hint2": "Find me at the corner of Spring and Macarthur Streets, where I sit on a large limestone and granite base, surrounded by greenery and a sense of history.",
                "hint3": "I honor Charles George Gordon, a British Army officer known for his service in various military campaigns, including in China and Sudan.",
                "latitude": -37.808355,
                "longitude": 144.972903,
                "areaScale": 2
            },
            {
                "questId": 7,
                "name": "Francis Ormond Building",
                "description": "Francis Ormond Building",
                "hint0": "Find the oldest educational building at RMIT, where the drive for self-improvement among working men and women began in the late 19th century.",
                "hint1": "Find the oldest educational building at RMIT, where the drive for self-improvement among working men and women began in the late 19th century.",
                "hint2": "Founded in 1887 as Melbourne's first Working Men's College, I honor my founder, a philanthropist who changed education for the working class.",
                "hint3": "Look for my impressive Gothic Revival architecture on La Trobe Street, with detailed stonework and a prominent statue of my founder in front.",
                "latitude": -37.808906,
                "longitude": 144.965215,
                "areaScale": 5
            },
            {
                "questId": 8,
                "name": "Old Melbourne Gaol",
                "description": "Old Melbourne Gaol",
                "hint0": "Look for the historic site where notorious criminals were once held, and where the echoes of justice and punishment remain.",
                "hint1": "Look for the historic site where notorious criminals were once held, and where the echoes of justice and punishment remain.",
                "hint2": "Established in 1845 and active until 1924, I am known for holding some of Australia’s most infamous inmates, including the legendary bushranger Ned Kelly, who met his end here.",
                "hint3": "Find my big bluestone building at 377 Russell Street, with original cells and a gallows, in a museum that shares the stories of those who lived and died here.",
                "latitude": -37.807832,
                "longitude": 144.965317,
                "areaScale": 5
            },
            {
                "questId": 9,
                "name": "Victorian Trades Hall Council",
                "description": "Victorian Trades Hall Council",
                "hint0": "This building is a significant site for the labor movement in Australia, serving as a venue for important meetings and events related to workers' rights.",
                "hint1": "This building is a significant site for the labor movement in Australia, serving as a venue for important meetings and events related to workers' rights.",
                "hint2": "I am home to the oldest trade union building in the world, where the eight-hour workday was first championed by dedicated laborers.",
                "hint3": "Look for my grand façade on Lygon Street, featuring a tall clock tower and colorful murals that celebrate the labor movement's history.",
                "latitude": -37.806467,
                "longitude": 144.966378,
                "areaScale": 5
            },
            {
                "questId": 10,
                "name": "Sir Redmond Barry Statue",
                "description": "Sir Redmond Barry Statue",
                "hint0": "Look for a prominent bronze figure standing proudly outside a grand library, where the pursuit of knowledge and culture is celebrated.",
                "hint1": "Look for a prominent bronze figure standing proudly outside a grand library, where the pursuit of knowledge and culture is celebrated.",
                "hint2": "I honor an important figure in Melbourne's history, known for founding the State Library of Victoria and overseeing the trial of a famous bushranger.",
                "hint3": "Find me at the front of the State Library, on a tall granite base, with detailed bronze work that reflects my legacy.",
                "latitude": -37.810031,
                "longitude": 144.964345,
                "areaScale": 2
            }
        ]
    }

    return places
}

