import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: "4smx2mje",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Upload an image from local file or URL
// Note: Currently not used in seed(), but kept for future image seeding needs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadImage(filePath) {
  const fullPath = resolve(__dirname, "..", filePath);
  const buffer = readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, {
    filename: filePath.split("/").pop(),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function seed() {
  console.log("Seeding Sanity...");

  // 1. Categories
  const categories = [
    { _id: "cat-slots", _type: "category", name: "מכונות מזל", slug: { _type: "slug", current: "slots" }, icon: "slots", description: "כל מה שצריך לדעת על מכונות מזל אונליין" },
    { _id: "cat-poker", _type: "category", name: "פוקר", slug: { _type: "slug", current: "poker" }, icon: "poker", description: "טורנירים, אסטרטגיות וטיפים לפוקר" },
    { _id: "cat-live", _type: "category", name: "קזינו חי", slug: { _type: "slug", current: "live" }, icon: "live", description: "משחקי קזינו חי עם דילרים אמיתיים" },
    { _id: "cat-roulette", _type: "category", name: "רולטה", slug: { _type: "slug", current: "roulette" }, icon: "roulette", description: "אסטרטגיות רולטה ומדריכים" },
    { _id: "cat-blackjack", _type: "category", name: "בלאק ג׳ק", slug: { _type: "slug", current: "blackjack" }, icon: "blackjack", description: "מדריכי בלאק ג׳ק ואסטרטגיה בסיסית" },
    { _id: "cat-sports", _type: "category", name: "הימורי ספורט", slug: { _type: "slug", current: "sports" }, icon: "sports", description: "טיפים והמלצות להימורי ספורט" },
  ];

  for (const cat of categories) {
    await client.createOrReplace(cat);
    console.log(`  ✓ Category: ${cat.name}`);
  }

  // 2. Author
  const author = {
    _id: "author-raz",
    _type: "author",
    name: "רז כהן",
    bio: "מומחה קזינו אונליין עם ניסיון של למעלה מ-10 שנים בתעשייה. בודק ומדרג את הקזינו המובילים בישראל.",
  };
  await client.createOrReplace(author);
  console.log(`  ✓ Author: ${author.name}`);

  // 3. Casinos (without logos — we'll use placeholder text for now)
  const casinos = [
    {
      _id: "casino-bet365",
      _type: "casino",
      name: "Bet365",
      slug: { _type: "slug", current: "bet365" },
      rating: 5,
      description: "אחד מהקזינו המובילים בעולם עם מבחר ענק של משחקים, בונוסים נדיבים ושירות לקוחות מעולה.",
      bonusTitle: "בונוס הצטרפות",
      bonusAmount: "₪1,000",
      wageringRequirement: "x30",
      affiliateLink: "https://example.com/bet365",
      featured: true,
      clicks: 0,
      pros: ["מבחר משחקים ענק", "אפליקציה מעולה", "בונוס הצטרפות גבוה"],
      cons: ["דרישות הימור גבוהות"],
      categories: [{ _type: "reference", _ref: "cat-slots", _key: "c1" }, { _type: "reference", _ref: "cat-live", _key: "c2" }],
    },
    {
      _id: "casino-888",
      _type: "casino",
      name: "888 Casino",
      slug: { _type: "slug", current: "888-casino" },
      rating: 4,
      description: "קזינו ותיק ואמין עם רישיון אירופי, מבחר משחקי שולחן מרשים ותמיכה בעברית.",
      bonusTitle: "בונוס ללא הפקדה",
      bonusAmount: "₪88",
      wageringRequirement: "x25",
      affiliateLink: "https://example.com/888",
      featured: true,
      clicks: 0,
      pros: ["תמיכה בעברית", "ללא הפקדה ראשונית", "רישיון אירופי"],
      cons: ["מבחר סלוטים מוגבל"],
      categories: [{ _type: "reference", _ref: "cat-blackjack", _key: "c1" }, { _type: "reference", _ref: "cat-roulette", _key: "c2" }],
    },
    {
      _id: "casino-betway",
      _type: "casino",
      name: "Betway",
      slug: { _type: "slug", current: "betway" },
      rating: 4,
      description: "פלטפורמה מודרנית עם חוויית משתמש מעולה, הימורי ספורט ומשחקי קזינו במקום אחד.",
      bonusTitle: "בונוס ראשון",
      bonusAmount: "₪500",
      wageringRequirement: "x35",
      affiliateLink: "https://example.com/betway",
      featured: true,
      clicks: 0,
      pros: ["עיצוב מודרני", "הימורי ספורט + קזינו", "משיכות מהירות"],
      cons: ["בונוס נמוך יחסית"],
      categories: [{ _type: "reference", _ref: "cat-sports", _key: "c1" }, { _type: "reference", _ref: "cat-live", _key: "c2" }],
    },
    {
      _id: "casino-unibet",
      _type: "casino",
      name: "Unibet",
      slug: { _type: "slug", current: "unibet" },
      rating: 5,
      description: "קזינו פרימיום עם קזינו חי מהשורה הראשונה, מגוון רחב של שיטות תשלום ובונוסים שבועיים.",
      bonusTitle: "בונוס הפקדה",
      bonusAmount: "₪750",
      wageringRequirement: "x30",
      affiliateLink: "https://example.com/unibet",
      featured: true,
      clicks: 0,
      pros: ["קזינו חי מעולה", "בונוסים שבועיים", "שיטות תשלום מגוונות"],
      cons: ["אין אפליקציה ייעודית"],
      categories: [{ _type: "reference", _ref: "cat-live", _key: "c1" }, { _type: "reference", _ref: "cat-poker", _key: "c2" }],
    },
    {
      _id: "casino-leovegas",
      _type: "casino",
      name: "LeoVegas",
      slug: { _type: "slug", current: "leovegas" },
      rating: 5,
      description: "מלך הקזינו המובייל — חוויית סלוטים מהשורה הראשונה עם מאות משחקים ובונוס הצטרפות מרשים.",
      bonusTitle: "בונוס + ספינים",
      bonusAmount: "₪1,500",
      wageringRequirement: "x40",
      affiliateLink: "https://example.com/leovegas",
      featured: true,
      clicks: 0,
      pros: ["מובייל מצוין", "1500+ משחקים", "ספינים חינם"],
      cons: ["דרישות הימור גבוהות"],
      categories: [{ _type: "reference", _ref: "cat-slots", _key: "c1" }],
    },
    {
      _id: "casino-royalpanda",
      _type: "casino",
      name: "Royal Panda",
      slug: { _type: "slug", current: "royal-panda" },
      rating: 4,
      description: "קזינו מהימן עם חוויה מעולה, מבחר רחב של משחקי אמת וקזינו חי, ותמיכה מפורסמת בשחקנים מישראל.",
      bonusTitle: "בונוס הצטרפות",
      bonusAmount: "₪600",
      wageringRequirement: "x35",
      affiliateLink: "https://example.com/royalpanda",
      featured: true,
      clicks: 0,
      pros: ["תמיכה מעולה לישראליים", "קזינו חי איכותי", "משחקים מעודכנים"],
      cons: ["בונוס סטנדרטי"],
      categories: [{ _type: "reference", _ref: "cat-live", _key: "c1" }, { _type: "reference", _ref: "cat-slots", _key: "c2" }],
    },

  ];

  for (const casino of casinos) {
    await client.createOrReplace(casino);
    console.log(`  ✓ Casino: ${casino.name}`);
  }

  // 4. Blog Posts
  const posts = [
    {
      _id: "post-slots-guide",
      _type: "post",
      title: "המדריך המלא למכונות מזל אונליין ב-2026",
      slug: { _type: "slug", current: "slots-guide-2026" },
      author: { _type: "reference", _ref: "author-raz" },
      categories: [{ _type: "reference", _ref: "cat-slots", _key: "c1" }],
      publishedAt: "2026-02-15T10:00:00Z",
      seoTitle: "מדריך מכונות מזל אונליין 2026 | Royal Spinz",
      seoDescription: "כל מה שצריך לדעת על משחקי סלוטים אונליין - טיפים, אסטרטגיות ובונוסים הכי שווים.",
      body: [
        { _type: "block", _key: "b1", style: "h2", children: [{ _type: "span", _key: "s1", text: "מה הם סלוטים אונליין?" }] },
        { _type: "block", _key: "b2", style: "normal", children: [{ _type: "span", _key: "s2", text: "מכונות מזל אונליין הן הגרסה הדיגיטלית של מכונות המזל המסורתיות שאתם מכירים מבתי קזינו. הן עובדות על בסיס מחולל מספרים אקראי (RNG) שמבטיח תוצאות הוגנות בכל סיבוב." }] },
        { _type: "block", _key: "b3", style: "h2", children: [{ _type: "span", _key: "s3", text: "איך לבחור סלוט טוב?" }] },
        { _type: "block", _key: "b4", style: "normal", children: [{ _type: "span", _key: "s4", text: "כשאתם בוחרים מכונת מזל, שימו לב ל-RTP (Return to Player) — אחוז ההחזר לשחקן. סלוטים עם RTP מעל 96% נחשבים טובים. בנוסף, בדקו את התנודתיות — תנודתיות גבוהה מעניקה זכיות גדולות אך נדירות, ותנודתיות נמוכה מעניקה זכיות קטנות אך תכופות." }] },
        { _type: "block", _key: "b5", style: "h2", children: [{ _type: "span", _key: "s5", text: "טיפים למשחק חכם" }] },
        { _type: "block", _key: "b6", style: "normal", children: [{ _type: "span", _key: "s6", text: "הגדירו תקציב לפני שאתם מתחילים לשחק ועמדו בו. נצלו בונוסים וספינים חינם כדי להכיר משחקים חדשים בלי סיכון. ותמיד זכרו — הימורים צריכים להיות בידור, לא מקור הכנסה." }] },
      ],
    },
    {
      _id: "post-casino-bonuses",
      _type: "post",
      title: "בונוסי קזינו: איך לנצל אותם נכון",
      slug: { _type: "slug", current: "casino-bonuses-guide" },
      author: { _type: "reference", _ref: "author-raz" },
      categories: [{ _type: "reference", _ref: "cat-slots", _key: "c1" }],
      publishedAt: "2026-02-10T10:00:00Z",
      seoTitle: "מדריך בונוסי קזינו | Royal Spinz",
      seoDescription: "למדו איך לנצל בונוסי קזינו אונליין בצורה חכמה - בונוסי הצטרפות, ספינים חינם ועוד.",
      body: [
        { _type: "block", _key: "b1", style: "h2", children: [{ _type: "span", _key: "s1", text: "סוגי בונוסים" }] },
        { _type: "block", _key: "b2", style: "normal", children: [{ _type: "span", _key: "s2", text: "בונוסי הצטרפות הם הנפוצים ביותר — הקזינו מכפיל את ההפקדה הראשונה שלכם עד סכום מסוים. בונוסים ללא הפקדה מאפשרים לשחק בלי להפקיד כסף בכלל. ספינים חינם ניתנים בדרך כלל על סלוטים ספציפיים." }] },
        { _type: "block", _key: "b3", style: "h2", children: [{ _type: "span", _key: "s3", text: "דרישות הימור" }] },
        { _type: "block", _key: "b4", style: "normal", children: [{ _type: "span", _key: "s4", text: "כל בונוס מגיע עם דרישות הימור — מספר הפעמים שצריך להמר את סכום הבונוס לפני שאפשר למשוך רווחים. דרישת x30 אומרת שאם קיבלתם בונוס של 100 שקל, תצטרכו להמר 3,000 שקל לפני משיכה." }] },
      ],
    },
    {
      _id: "post-live-casino",
      _type: "post",
      title: "קזינו חי: החוויה הכי קרובה לוגאס",
      slug: { _type: "slug", current: "live-casino-guide" },
      author: { _type: "reference", _ref: "author-raz" },
      categories: [{ _type: "reference", _ref: "cat-live", _key: "c1" }],
      publishedAt: "2026-02-05T10:00:00Z",
      seoTitle: "מדריך קזינו חי | Royal Spinz",
      seoDescription: "גלו את עולם הקזינו החי - דילרים אמיתיים, משחקים בזמן אמת וחוויה כמו בלאס וגאס.",
      body: [
        { _type: "block", _key: "b1", style: "h2", children: [{ _type: "span", _key: "s1", text: "מה זה קזינו חי?" }] },
        { _type: "block", _key: "b2", style: "normal", children: [{ _type: "span", _key: "s2", text: "קזינו חי מאפשר לכם לשחק עם דילרים אמיתיים בזמן אמת דרך שידור וידאו. אתם יכולים לראות את הדילר מחלק קלפים, מסובב את גלגל הרולטה, ואפילו לדבר איתו דרך הצ׳אט." }] },
        { _type: "block", _key: "b3", style: "h2", children: [{ _type: "span", _key: "s3", text: "המשחקים הפופולריים" }] },
        { _type: "block", _key: "b4", style: "normal", children: [{ _type: "span", _key: "s4", text: "בלאק ג׳ק, רולטה ובקרא הם המשחקים הפופולריים ביותר בקזינו חי. ספקים כמו Evolution Gaming ו-Pragmatic Play Live מציעים גם משחקי שואו ייחודיים כמו Crazy Time ו-Mega Ball." }] },
      ],
    },
  ];

  for (const post of posts) {
    await client.createOrReplace(post);
    console.log(`  ✓ Post: ${post.title}`);
  }

  console.log("\n✅ Seeding complete! Content uploaded to Sanity.");
  console.log("Note: Casino logos need to be uploaded manually via Sanity Studio at /studio");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
