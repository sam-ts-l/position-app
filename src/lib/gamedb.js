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
                "hint1": "Located near the vibrant cultural precinct, this library is easily accessible from major tram routes. The area buzzes with students and tourists, especially during weekends, making it a lively spot in the city.",
                "hint2": "As you approach, look for nearby cafes where locals often gather. The library sits across from a large park, adding to its charm and inviting you to enjoy some greenery after your visit.",
                "hint3": "Nearby landmarks include a popular theater and a historical square, with the closest tram stop just a block away at the intersection of Swanston and La Trobe Streets. Keep an eye out for these clues as you make your way!",
                "latitude": -37.81,
                "longitude": 144.964598,
                "areaScale": 5
            },
            {
                "questId": 2,
                "name": "Carlton Gardens",
                "description": "Carlton Gardens",
                "hint0": "This lush green space is a favorite for locals, featuring picturesque gardens and stunning historical buildings. Surrounded by winding paths and colorful flower beds, use your knowledge to navigate to this beautiful park located near a bustling exhibition center.",
                "hint1": "This park is famous for its Victorian architecture, especially the grand exhibition building that hosts a variety of events throughout the year. Look for a serene oasis that’s just a short walk from major streets in the city.",
                "hint2": "As you get closer, keep an eye out for the nearby tram stop and the sound of children playing in the gardens. This area often attracts visitors for its outdoor activities and festivals.",
                "hint3": "You’ll find this park bordered by the major roads of Victoria and Rathdowne Streets. It’s also close to a well-known museum, making it a hub of culture and activity in the city.",
                "latitude": -37.805431,
                "longitude": 144.971399,
                "areaScale": 10
            },
            {
                "questId": 3,
                "name": "Eight Hour Day Monument",
                "description": "Eight Hour Day Monument",
                "hint0": "This significant monument stands as a tribute to a pivotal movement in Australia’s labor history, advocating for workers' rights and fair hours. Nestled in a lively area filled with historical sites, use this info with your knowledge to navigate to its location.",
                "hint1": "Surrounded by bustling cafes and shops, this monument is located near a busy intersection that connects various parts of the city. It reflects the spirit of Melbourne’s working-class heritage.",
                "hint2": "As you approach, look for a large public square where locals often gather. The monument itself is designed to catch the eye of those passing by, making it a prominent feature in the landscape.",
                "hint3": "You’ll find it situated close to major streets such as Elizabeth and Lonsdale. Nearby attractions include a popular market and a historic building, making this area rich in culture.",
                "latitude": -37.807153,
                "longitude": 144.965577,
                "areaScale": 2
            },
            {
                "questId": 4,
                "name": "Melbourne Museum",
                "description": "Melbourne Museum",
                "hint0": "This museum showcases the natural and cultural history of Australia, with fascinating exhibits and interactive displays. Set within a vibrant area filled with greenery, use your knowledge to navigate to this educational hub.",
                "hint1": "This landmark features both indoor exhibits and outdoor gardens, often buzzing with families and school groups. It’s located near the heart of the city, just a stone’s throw from major public transport routes.",
                "hint2": "Look for the park-like setting that surrounds it, perfect for a picnic after exploring the museum. The area is popular for its art installations and is frequently filled with people enjoying the outdoors.",
                "hint3": "You’ll find it adjacent to the iconic Royal Exhibition Building, with major intersections like Rathdowne and Victoria Streets nearby. This is a great starting point for further exploration!",
                "latitude": -37.8033,
                "longitude": 144.971754,
                "areaScale": 5
            },
            {
                "questId": 5,
                "name": "French Fountain",
                "description": "French Fountain",
                "hint0": "This charming fountain adds elegance to its surroundings and is inspired by romantic themes. Nestled within a beautiful garden setting, use this info with your knowledge to navigate to this delightful feature in the city.",
                "hint1": "The fountain is a popular gathering spot for visitors and locals alike, often surrounded by vibrant flowers and lush greenery. It’s located near a bustling area that draws crowds throughout the day.",
                "hint2": "As you approach, you’ll notice pathways lined with benches, where people often sit and enjoy the scenery. The sound of water flowing creates a tranquil atmosphere, perfect for a moment of relaxation.",
                "hint3": "Look for the intersection of Albert and Queensberry Streets, where you can find the fountain near a lovely park entrance. Nearby cafes and shops make this a great spot to enjoy a snack after your visit.",
                "latitude": -37.804866,
                "longitude": 144.972849,
                "areaScale": 2
            },
            {
                "questId": 6,
                "name": "Charles George Gordon Memorial",
                "description": "Charles George Gordon Memorial",
                "hint0": "This memorial honors a notable military figure and is marked by a statue that reflects courage and sacrifice. Located in a peaceful area, use this info with your knowledge to navigate to this site.",
                "hint1": "The memorial is set in a serene park surrounded by trees and well-maintained gardens. It serves as a quiet spot for reflection amidst the city’s bustle.",
                "hint2": "As you approach, you’ll find pathways leading to the statue, which is often visited by those interested in history. The area has benches where visitors can pause and reflect.",
                "hint3": "This location is situated near the intersection of Flinders and Russell Streets, close to other significant memorials and attractions. Keep an eye out for the nearby café where locals enjoy their coffee!",
                "latitude": -37.808355,
                "longitude": 144.972903,
                "areaScale": 2
            },
            {
                "questId": 7,
                "name": "Francis Ormond Building",
                "description": "Francis Ormond Building",
                "hint0": "This historic building is integral to a prominent university in Melbourne, known for its educational contributions. With its striking architecture, use this info with your knowledge to navigate to this significant site.",
                "hint1": "It’s located in a bustling academic precinct, surrounded by fellow educational facilities and student hangouts. The area is vibrant, filled with youthful energy.",
                "hint2": "As you approach, look for signs of campus life, such as students gathering for events or studying on the lawns. This site often hosts exhibitions and lectures.",
                "hint3": "This building is close to the intersection of Swanston and La Trobe Streets, right across from a popular library. Nearby eateries provide a lively atmosphere for students and visitors.",
                "latitude": -37.808906,
                "longitude": 144.965215,
                "areaScale": 5
            },
            {
                "questId": 8,
                "name": "Old Melbourne Gaol",
                "description": "Old Melbourne Gaol",
                "hint0": "This historic site offers a glimpse into the city’s past, once housing some of Melbourne’s most infamous criminals. Its storied walls tell tales of crime and punishment, so use this info with your knowledge to navigate to this intriguing location.",
                "hint1": "It’s a museum that captures the history of law and order in Melbourne, often attracting visitors fascinated by its dark history and unique architecture.",
                "hint2": "As you get closer, keep an eye out for the heavy stone walls and old cells that make this place truly special. The area is filled with history, providing a unique atmosphere.",
                "hint3": "You’ll find it near the intersection of Russell and Little Bourke Streets, surrounded by cafes and other historical landmarks that make this part of the city rich in culture.",
                "latitude": -37.807832,
                "longitude": 144.965317,
                "areaScale": 5
            },
            {
                "questId": 9,
                "name": "Victorian Trades Hall Council",
                "description": "Victorian Trades Hall Council",
                "hint0": "This building symbolizes the struggle for workers’ rights and serves as a hub for union activities. Its historical significance is felt throughout the city, so use this info with your knowledge to navigate to this important site.",
                "hint1": "You’ll find it in a lively area known for activism and community events, reflecting the voice of Melbourne’s labor movement. The area often buzzes with discussions and gatherings.",
                "hint2": "As you approach, look for banners and signs that often adorn the building, marking important events. It’s a focal point for local union activities and community support.",
                "hint3": "This location is conveniently located at the intersection of Lygon and Victoria Streets, surrounded by cafes and shops that create a vibrant community atmosphere.",
                "latitude": -37.806467,
                "longitude": 144.966378,
                "areaScale": 5
            },
            {
                "questId": 10,
                "name": "Sir Redmond Barry Statue",
                "description": "Sir Redmond Barry Statue",
                "hint0": "This statue honors a prominent figure in Melbourne’s history, celebrated for his contributions to education and the legal system. Standing tall in a bustling area, use this info with your knowledge to navigate to this significant location.",
                "hint1": "You’ll find this statue near a well-known library, making it a popular stop for both students and tourists. The area is filled with activity, especially during school hours.",
                "hint2": "As you approach, look for the nearby square where people often stop to take photos. The statue itself is surrounded by benches, inviting visitors to sit and learn about its history.",
                "hint3": "This statue is located near the intersection of Swanston and La Trobe Streets, close to a prominent cultural center and other historical sites. It’s also just steps away from a bustling public tram route, making it a familiar landmark for locals.",
                "latitude": -37.810031,
                "longitude": 144.964345,
                "areaScale": 2
            }
        ]
    }

    return places
}

