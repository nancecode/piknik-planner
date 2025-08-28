const communityBlogs = [
  {
    id: 1,
    slug: "perfect-summer-picnic",
    title: "How to Host the Perfect Summer Picnic",
    description: "Plan your best picnic yet with tips for food, setup, and fun.",
    image: "/images/picnic1.jpg",
    path: "/community/perfect-summer-picnic",
    author: "Sandy S.",
    content: `Hosting the perfect summer picnic starts with planning. Choose a sunny day, scout a park with shade, and gather your essentials.

1. Pick the right spot: Look for parks with grass, restrooms, and maybe even BBQ pits.
2. Keep food simple: Think sandwiches, fruit, chips, and a refreshing lemonade.
3. Bring comfort: A cozy blanket, cushions, and even a portable speaker go a long way.
4. Think cleanup: Pack reusable cutlery and bags for trash.

With a bit of prep, you can turn any afternoon into a relaxing outdoor memory.`
  },
  {
    id: 2,
    slug: "bbq-grilling-tips",
    title: "BBQ Grilling Tips for Beginners",
    description: "Gas vs charcoal, best tools, and how to avoid rookie mistakes.",
    image: "/images/bbq.jpg",
    path: "/community/bbq-grilling-tips",
    author: "Marcus L.",
    content: `New to grilling? Here’s how to get started without burning dinner:

- Choose your grill: Charcoal gives flavor; gas offers convenience.
- Preheat properly: Always heat your grill 10–15 minutes before cooking.
- Oil your grates: This helps prevent sticking.
- Don’t flip too early: Let a good crust form before turning your meat.

Bonus tip: Always let meat rest a few minutes before serving for juicier bites.`
  },
  {
    id: 3,
    slug: "no-mess-snacks",
    title: "Top 10 No-Mess Picnic Snacks",
    description: "Portable snacks that stay fresh and don’t make a mess.",
    image: "/images/snacks.jpg",
    path: "/community/no-mess-snacks",
    author: "Sophie K.",
    content: `Snacks can make or break a picnic. Here are no-fuss, no-mess options:

1. Cheese cubes & grapes
2. Trail mix
3. Veggie sticks with hummus
4. Mini sandwiches
5. Hard-boiled eggs
6. Fruit kabobs
7. Granola bars
8. Popcorn
9. Pretzel bites
10. Mini quiches

All of these pack easily, require minimal cleanup, and taste great cold.`
  },
  {
    id: 4,
    slug: "picnic-games",
    title: "Best Picnic Games for Groups",
    description: "Classic and modern games to get everyone laughing.",
    image: "/images/games.jpg",
    path: "/community/picnic-games",
    author: "Daniel R.",
    content: `Keep everyone entertained with these classic group games:

- Frisbee or disc golf
- Tug-of-war
- Sack races
- Giant Jenga
- Water balloon toss
- Capture the Flag
- Cornhole
- Musical picnic blankets

Bring some simple props and you’ll have hours of fun.`
  },
  {
    id: 5,
    slug: "kid-friendly-foods",
    title: "Kid-Friendly Picnic Foods That Travel Well",
    description: "No-fuss foods for even the pickiest eaters.",
    image: "/images/kids-food.jpg",
    path: "/community/kid-friendly-foods",
    author: "Emily T.",
    content: `Feeding kids on a picnic doesn’t have to be hard:

- PB&J or turkey wraps
- Apple slices with peanut butter
- Cheese sticks
- Juice boxes
- Animal crackers
- Mini muffins
- Pasta salad with fun shapes

Pack it all in bento boxes and keep wet wipes handy.`
  },
  {
    id: 6,
    slug: "picnic-packing-checklist",
    title: "What to Pack in Your Picnic Basket",
    description: "Essential checklist to avoid the classic “I forgot...”",
    image: "/images/basket.jpg",
    path: "/community/picnic-packing-checklist",
    author: "Jamal N.",
    content: `Avoid picnic panic with this must-pack checklist:

- Blanket
- Utensils & napkins
- Plates & cups
- Trash bag
- Water bottle
- Ice packs or cooler
- Sunscreen
- Bug spray
- First aid kit
- Portable speaker or games

Check it twice and you’ll be ready for anything.`
  },
  {
    id: 7,
    slug: "eco-friendly-picnic",
    title: "Eco-Friendly Picnicking: Tips to Go Green",
    description: "Make your picnic planet-friendly with these easy habits.",
    image: "/images/eco.jpg",
    path: "/community/eco-friendly-picnic",
    author: "Leila C.",
    content: `Picnics and sustainability go hand in hand:

- Use reusable containers and cloth napkins
- Avoid plastic cutlery
- Pack drinks in thermoses instead of single-use bottles
- Leave no trace: clean up fully
- Choose local and organic foods when possible

Nature thanks you for being mindful.`
  },
  {
    id: 8,
    slug: "picnic-decor",
    title: "DIY Outdoor Picnic Decor Ideas",
    description: "Make your blanket setup shine with these creative tips.",
    image: "/images/decor.jpg",
    path: "/community/picnic-decor",
    author: "Tomás V.",
    content: `Give your picnic a Pinterest-worthy upgrade:

- Mason jars with wildflowers
- String lights powered by battery packs
- Bright tablecloths or layered blankets
- Wooden crates for serving stations
- Handwritten chalkboard menus

A little decor makes it feel like a special occasion.`
  },
  {
    id: 9,
    slug: "montreal-picnic-spots",
    title: "Montreal’s Hidden Picnic Gems",
    description: "Discover local parks and secret scenic spots.",
    image: "/images/montreal.jpg",
    path: "/community/montreal-picnic-spots",
    author: "Audrey P.",
    content: `Skip the crowded spots and explore these picnic gems:

- Parc de la Promenade-Bellerive
- Parc Jarry’s shady corners
- Parc Angrignon’s trails and pond
- Lachine Canal greenways
- Summit Woods on Mount Royal

Each offers a peaceful escape and picnic-perfect views.`
  },
  {
    id: 10,
    slug: "charcoal-vs-gas",
    title: "Charcoal or Gas: Which BBQ is Best?",
    description: "Flavor vs convenience—let’s break it down.",
    image: "/images/grill.jpg",
    path: "/community/charcoal-vs-gas",
    author: "David H.",
    content: `Choosing a BBQ grill? Here’s the deal:

**Charcoal**
+ Smoky flavor
+ High heat for searing
– Longer setup and cleanup

**Gas**
+ Quick start
+ Easy temperature control
– Less intense flavor

Choose what fits your lifestyle (or bring both!).`
  },
  {
    id: 11,
    slug: "how-to-play-molkky",
    title: "How to Play Mölkky, the Finnish Outdoor Game",
    description: "A fun, simple game you’ll want at every picnic.",
    image: "/images/molkky.jpg",
    path: "/community/how-to-play-molkky",
    author: "Olga B.",
    content: `Mölkky is perfect for picnics! Here's how to play:

1. Arrange 12 numbered pins.
2. Players take turns tossing the Mölkky stick.
3. Knock down pins: Score = number on pin OR count of pins.
4. First to 50 wins — but don’t go over!

It’s easy to learn and fun for all ages.`
  },
  {
    id: 12,
    slug: "picnic-playlist",
    title: "Perfect Picnic Playlist: Music for Every Mood",
    description: "Chill, fun, or romantic—set the vibe with these tunes.",
    image: "/images/playlist.jpg",
    path: "/community/picnic-playlist",
    author: "Chris J.",
    content: `Music makes the moment. Here are picnic-ready playlist ideas:

- Chill vibes: Jack Johnson, Norah Jones, Ben Howard
- Upbeat: Lizzo, Bruno Mars, Dua Lipa
- Romantic: Leon Bridges, Lana Del Rey
- Family-friendly: Disney classics, Beatles

Create one in advance and download it offline!`
  },
  {
    id: 13,
    slug: "rainy-day-picnics",
    title: "Rainy Day Alternatives for Planned Picnics",
    description: "Keep the fun going even when the sky doesn’t cooperate.",
    image: "/images/rainy.jpg",
    path: "/community/rainy-day-picnics",
    author: "Fatima E.",
    content: `Rainy day? No problem. Try these indoor alternatives:

- Indoor fort picnic with blankets
- Living room movie + snack setup
- Bake your picnic foods together
- Board games and card tournaments

You’ll still make memories — just a little cozier.`
  },
  {
    id: 14,
    slug: "picnic-date-guide",
    title: "The Ultimate Picnic Date Guide",
    description: "Romantic food, decor, and activities for two.",
    image: "/images/date.jpg",
    path: "/community/picnic-date-guide",
    author: "Julien M.",
    content: `Make your picnic date unforgettable:

- Bring a charcuterie board with wine or sparkling juice
- Add fairy lights and cozy blankets
- Plan a shared playlist
- Write handwritten notes or questions to ask each other
- End with stargazing or a sunset stroll

Simple touches go a long way.`
  },
  {
    id: 15,
    slug: "cooler-packing-tips",
    title: "Cooler Packing 101: Keep Your Food Fresh",
    description: "Smart packing strategies to avoid soggy or spoiled food.",
    image: "/images/cooler.jpg",
    path: "/community/cooler-packing-tips",
    author: "Isabelle D.",
    content: `Use your cooler like a pro:

- Layer ice packs at the bottom
- Use airtight containers
- Wrap sandwiches in wax paper
- Keep raw and cooked foods separate
- Put drinks in a separate cooler to avoid opening the food one

Your stomach (and your guests) will thank you.`
  },

{
  id: 16,
  slug: "easy-vegan-picnic",
  title: "Easy Vegan Picnic Recipes Everyone Will Love",
  description: "Tasty, plant-based options that travel well.",
  image: "/images/vegan.jpg",
  path: "/community/easy-vegan-picnic",
  author: "Melanie W.",
  content: `Going plant-based at your picnic? Try these crowd-pleasers:

- Chickpea salad wraps
- Vegan potato salad
- Hummus and veggie sticks
- Fruit skewers with mint
- No-bake energy balls

Delicious and eco-friendly to boot!`,
},
{
  id: 17,
  slug: "campfire-picnic-ideas",
  title: "Campfire Picnic Ideas for Cool Evenings",
  description: "Warm meals and cozy vibes for evening picnics.",
  image: "/images/campfire.jpg",
  path: "/community/campfire-picnic-ideas",
  author: "Ryan T.",
  content: `As the sun sets, light the fire and enjoy:

- Foil-wrapped veggies
- Campfire quesadillas
- Roasted marshmallows
- Mulled cider in thermoses
- Camp blankets and stories

Evenings outdoors can be magical with a little planning.`,
},
{
  id: 18,
  slug: "solo-picnic-mindfulness",
  title: "Mindful Solo Picnics for Self-Care",
  description: "Recharge in nature with a peaceful solo outing.",
  image: "/images/solo.jpg",
  path: "/community/solo-picnic-mindfulness",
  author: "Anika D.",
  content: `Enjoy your own company with:

- A journal and book
- Simple meal or snacks
- A yoga mat or meditation cushion
- Birdwatching or sketching tools
- Phone on airplane mode

Solo picnics are a gift to your future self.`,
},
{
  id: 19,
  slug: "picnic-photo-ideas",
  title: "Picnic Photography: Capture the Moment",
  description: "Creative ways to photograph your picnic setup.",
  image: "/images/photo.jpg",
  path: "/community/picnic-photo-ideas",
  author: "Nadia K.",
  content: `Want aesthetic picnic pics?

- Use golden hour light
- Capture overhead flat lays of your blanket
- Shoot through leaves or flowers for depth
- Include candid laughter and hands reaching for food

No need for fancy gear—just creativity!`,
},
{
  id: 20,
  slug: "pet-friendly-picnics",
  title: "Pet-Friendly Picnics: What to Bring for Your Furry Friend",
  description: "Make picnics safe and fun for your dog or cat.",
  image: "/images/pets.jpg",
  path: "/community/pet-friendly-picnics",
  author: "Leo F.",
  content: `Bring your pet along with:

- Water bowl and fresh water
- Treats and a chew toy
- Blanket for lounging
- Shade or umbrella
- Pet waste bags

Check park rules and keep them leashed if required.`,
},
{
  id: 21,
  slug: "late-night-park-tips",
  title: "Late-Night Picnics: Safety and Setup Tips",
  description: "What to pack and how to stay safe after sunset.",
  image: "/images/night.jpg",
  path: "/community/late-night-park-tips",
  author: "Camille B.",
  content: `Planning a night picnic?

- Bring headlamps or lanterns
- Pack warm drinks and blankets
- Stay in well-lit, permitted areas
- Keep your phone charged
- Let someone know your location

The stars are worth the prep!`,
}
];
export default communityBlogs;
