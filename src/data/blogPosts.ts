export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  emoji: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "jak-koupit-matchu-v-cr",
    title: "Jak koupit kvalitní matchu v ČR: Kompletní průvodce",
    excerpt: "Hledáte, kde koupit matchu v Česku? Víme, na co si dát pozor — od kvality lístků až po certifikace. Vše v jednom průvodci.",
    category: "Průvodce",
    emoji: "🛒",
    readTime: 7,
    publishedAt: "2025-05-10",
    seoTitle: "Kde koupit matchu v ČR 2025 | Průvodce nákupem matchy",
    seoDescription: "Kompletní průvodce nákupem matchy v České republice. Jak poznat kvalitní matchu, na co si dát pozor a kde ji koupit online s doručením.",
    keywords: ["koupit matchu", "matcha ČR", "kde koupit matchu", "matcha online", "kvalitní matcha"],
    content: `
## Proč záleží na tom, kde matchu koupíte

Na českém trhu najdete desítky značek, které prodávají matchu. Bohužel většina z nich nabízí levný, průmyslový prášek kulinárnní kvality, který sice vypadá zeleně, ale v šálku chutná hořce a kravsky. Opravdová ceremonální matcha pochází výhradně z Japonska — ideálně z prefektury Uji nebo Nishio.

## 3 klíčové znaky kvalitní matchy

**1. Barva**
Opravdová prémiová matcha je živě zelená, téměř jako trávník. Pokud je prášek žlutý nebo hnědavý, jde o starý nebo nekvalitní produkt.

**2. Chuť**
Dobrá matcha je hladká, lehce sladká s výraznou tzv. umami chutí. Hořkost je minimální. Silná hořkost = špatná matcha.

**3. Certifikace**
Hledejte EU Organic nebo USDA Organic certifikaci. Ta zaručuje, že matcha neobsahuje pesticidy a těžké kovy.

## Kde koupit matchu online v ČR

Při nákupu online vždy zkontrolujte:

- **Původ**: Musí být uvedeno Japonsko, ideálně konkrétní region
- **Stupeň kvality**: Ceremonial Grade (ceremoniální) je nejvyšší
- **Balení**: Matcha se kazí světlem a vlhkem — hledejte vzduchotěsné, tmavé balení
- **Testování**: Laboratorní testy na pesticidy a těžké kovy jsou zárukou kvality

## Kolik stojí dobrá matcha?

Qualitní ceremonální matcha stojí reálně 400–900 Kč za 30g. Pokud narazíte na nabídky za 100 Kč za 100g, je to s největší pravděpodobností kulinárnní nebo dokonce padělková matcha bez jakékoliv certifikace.

## Závěr

Nákup matchy online je pohodlný, ale vyžaduje pozornost. Zaměřte se na japonský původ, certifikace a barvu prášku. Naše matcha 7A Ceremonial Grade splňuje všechna tato kritéria — pochází z Uji v Japonsku, má EU Organic i USDA Organic certifikaci a prochází nezávislými laboratorními testy od Eurofins.
    `
  },
  {
    slug: "matcha-vs-kava-energie-bez-kofeinu",
    title: "Matcha vs. káva: Proč přejít na matchu?",
    excerpt: "Trpíte po kávě nervozitou a crashem? Matcha dává klidnou, soustředěnou energii díky unikátní kombinaci L-theaninu a kofeinu. Porovnáme oboje.",
    category: "Zdraví",
    emoji: "⚡",
    readTime: 6,
    publishedAt: "2025-05-01",
    seoTitle: "Matcha vs. káva: Která je lepší pro energii a soustředění?",
    seoDescription: "Srovnání matchy a kávy z hlediska energie, soustředění a zdraví. Proč matcha dává klidnou energii bez nervozity a odpoledního propadu.",
    keywords: ["matcha vs kava", "matcha energie", "matcha kofein", "L-theanin matcha", "matcha zdraví"],
    content: `
## Kofein v matče vs. kofein v kávě

Obojí obsahuje kofein — ale matcha ho dodává úplně jinak. Jedna šálka matchy obsahuje přibližně 60–70 mg kofeinu. Káva má 80–120 mg. Na první pohled se zdá, že káva vyhrává. Ale čísla jsou klamavá.

## Tajemství matchy: L-theanin

Čajový list, ze kterého se vyrábí matcha, obsahuje aminokyselinu L-theanin. Ta v kombinaci s kofeinem vytváří naprosto unikátní efekt: **klidnou bdělost**. Vědecky se tomu říká "alert calmness".

L-theanin zpomaluje vstřebávání kofeinu a zabraňuje náhlým výkyvům. Výsledek:

- ✅ Energie nastupuje pomalu a drží 4–6 hodin
- ✅ Žádná nervozita ani bušení srdce
- ✅ Lepší schopnost soustředění a flow state
- ✅ Žádný odpolední crash

## Proč káva způsobuje crash

Káva vpraví kofein do těla rychle — a rychle také odezní. Navíc blokuje adenosin (hormon únavy) přímo, takže po odeznění efektu vás únava praská o to víc. Proto po kávě potřebujete další kávu.

## Kdo by měl zvážit přechod na matchu?

- Lidé pracující ve flow stavech (programátoři, kreativci, studenti)
- Ti, kteří jsou citliví na kofein a trpí po kávě nervozitou
- Lidé, kteří chtějí zredukovat příjem kávy, ale nechtějí přijít o energii
- Sportovci hledající přirozenou alternativu ke kofeinu

## Závěr

Káva není špatná. Ale matcha je chytřejší. Pokud chcete energii, která trvá a nezpůsobuje crash — matcha je odpověď.
    `
  },
  {
    slug: "matcha-latte-recept",
    title: "Matcha Latte recept: Jak ho udělat doma perfektně",
    excerpt: "Krok za krokem návod na dokonalý matcha latte doma — bez drahého kavárního vybavení. Klasický, ledový i veganský variant.",
    category: "Recepty",
    emoji: "🥛",
    readTime: 5,
    publishedAt: "2025-04-20",
    seoTitle: "Matcha Latte recept | Jak udělat doma krok za krokem",
    seoDescription: "Nejlepší recept na matcha latte doma. Klasická, ledová i veganská verze. Krok za krokem s tipy pro perfektní pěnu a bez hrudek.",
    keywords: ["matcha latte recept", "jak udělat matcha latte", "matcha latte doma", "ledové matcha latte", "veganský matcha latte"],
    content: `
## Co budete potřebovat

- 1–2 lžičky ceremonální matchy (2–4 g)
- 60 ml horké vody (70–80 °C, nikoliv vroucí)
- 150–200 ml mléka (plnotučné, ovesné nebo mandlové)
- Bambusová metlička (chasen) nebo elektrický šlehač

## Klasický matcha latte — postup

**Krok 1: Prosejte matchu**
Přes jemné sítko prosejte matchu do misky nebo šálku. Zabrání hrudkám.

**Krok 2: Přidejte vodu**
Přilijte 60 ml vody ohřáté na 75 °C (ne vroucí — zničí antioxidanty a prášek zhořkne).

**Krok 3: Metličkujte**
Bambusovou metličkou nebo elektrickým šlehačem šlehejte pohybem W nebo M po dobu 30–45 sekund, dokud nevznikne hustá pěna bez hrudek.

**Krok 4: Přidejte mléko**
Zahřejte mléko na 60–65 °C a přilijte přes matchu. Ideálně mléko napěňte — vznikne krásné latte art.

**Krok 5: Oslaďte dle chuti**
Opcionálně přidejte lžičku medu, agáve sirupu nebo javorového sirupu.

## Ledové matcha latte

Postup je stejný, ale po přípravě matchy (kroky 1–3) ji přelijte přes sklenici plnou ledu a doplňte studeným mlékem. Výsledek je osvěžující letní drink.

## Veganská verze

Nejlépe se pění ovesné mléko (oat milk). Mandlové mléko je lehčí a méně sladké. Kokosové mléko dodá tropický nádech.

## Tipy pro perfektní výsledek

- **Nikdy nepoužívejte vroucí vodu** — 70–80 °C je ideál
- **Prosejte matchu vždy** — hrudky se pak obtížně rozmíchají
- **Čerstvá matcha** je klíč — stará matcha chutná hořce bez ohledu na přípravu

## Závěr

Dokonalý matcha latte zvládnete doma za 5 minut. S naší 7A Ceremonial Grade matchou dostanete hedvábnou sladkost bez hořkosti — a připravíte si cafe-quality latte přímo v kuchyni.
    `
  },
  {
    slug: "matcha-ucinky-zdravi",
    title: "Matcha a zdraví: Co říká věda o účincích matchy",
    excerpt: "Antioxidanty, metabolismus, soustředění, imunita — co věda skutečně potvrzuje o účincích matchy na zdraví? Fakta bez marketingových přehánění.",
    category: "Zdraví",
    emoji: "🔬",
    readTime: 8,
    publishedAt: "2025-04-05",
    seoTitle: "Matcha účinky na zdraví | Co říká věda 2025",
    seoDescription: "Vědecky podložené účinky matchy na zdraví. Antioxidanty, L-theanin, metabolismus a imunita — co skutečně funguje a co je jen marketing.",
    keywords: ["matcha ucinky", "matcha zdraví", "matcha antioxidanty", "matcha výhody", "matcha benefity"],
    content: `
## Matcha jako superpotravina — co to znamená?

Výraz "superpotravina" je marketingový. Ale matcha si ho zaslouží více než většina potravin, které toto označení nesou. Proč? Protože při výrobě matchy se mele celý čajový list — takže přijímáte všechny živiny, ne jen ty, které se vylouhují do vody jako u klasického zeleného čaje.

## 1. Extrémně vysoký obsah antioxidantů (EGCG)

Matcha obsahuje katechiny — antioxidanty ze skupiny polyfenolů. Nejvýznamnější je EGCG (epigallokatekin gallát). Studie ukazují, že matcha obsahuje až 137× více EGCG než klasický zelený čaj.

Antioxidanty bojují proti volným radikálům, které poškozují buňky a urychlují stárnutí. EGCG má navíc prokázané protizánětlivé a protinádorové vlastnosti.

## 2. L-theanin a soustředění

L-theanin je aminokyselina přirozeně se vyskytující v čajovém listu. Zvyšuje produkci alfa mozkových vln — ty jsou spojené se stavem klidné bdělosti a kreativitou.

V kombinaci s kofeinem (který matcha také obsahuje) vytváří efekt zvaný "alert calmness" — soustředěnou energii bez úzkosti nebo nervozity.

## 3. Podpora metabolismu

Studie publikovaná v American Journal of Clinical Nutrition zjistila, že katechiny v zeleném čaji (a tedy i v matče) zvyšují termogenezi (spalování kalorií) o 8–10 %. To není zázrak, ale při pravidelné konzumaci reálný příspěvek k metabolismu.

## 4. Detoxikace chlorofylem

Matcha je tmavě zelená právě díky chlorofylu — produkce je záměrně zvýšena zakrýváním rostlin před sklizní. Chlorofyl pomáhá vylučovat těžké kovy a toxiny z těla.

## 5. Podpora imunity

EGCG a další polyfenoly v matče mají prokázané antimikrobiální vlastnosti. Navíc matcha obsahuje vitamín C, zinek a selen — živiny klíčové pro imunitní systém.

## Co věda nepotvrzuje

Nechte si ujít tyto přehnané tvrzení:
- "Matcha léčí rakovinu" — EGCG má protinádorový potenciál, ale léčba to není
- "Zhubnete díky matče" — metabolismus podpoří, ale dietu a pohyb nenahradí
- "Matcha nahradí léky" — funguje jako doplněk zdravého životního stylu, ne jako lék

## Závěr

Věda za matchou stojí — antioxidanty, L-theanin a protizánětlivé účinky jsou vědecky doložené. Při pravidelné konzumaci prémiové ceremonální matchy přidáváte do svého života reálný zdravotní benefit.
    `
  },
  {
    slug: "matcha-smoothie-recepty",
    title: "5 nejlepších matcha smoothie receptů pro každý den",
    excerpt: "Matcha smoothie je rychlá, výživná snídaně nebo svačina plná antioxidantů. Přinášíme 5 receptů od klasiky po exotiku.",
    category: "Recepty",
    emoji: "🥤",
    readTime: 4,
    publishedAt: "2025-03-18",
    seoTitle: "Matcha smoothie recepty | 5 nejlepších receptů 2025",
    seoDescription: "5 nejlepších receptů na matcha smoothie. Od klasického zeleného smoothie po tropický a čokoládový variant. Rychlá příprava, maximum živin.",
    keywords: ["matcha smoothie", "matcha smoothie recept", "zelené smoothie", "matcha snídaně", "matcha recept"],
    content: `
## Proč matcha smoothie?

Smoothie je rychlý způsob, jak dostat do těla matchu i s dalšími živinami. Navíc matcha skvěle kombinuje s ovocem, zeleninou i proteinem. Výsledek je krémové, zelené a extrémně výživné.

---

## 1. Klasické zelené matcha smoothie

**Ingredience:**
- 1 lžička matchy
- 1 banán (zmrazený)
- 200 ml ovesného mléka
- hrst špenátu
- 1 lžíce mandlového másla

**Příprava:** Vše rozmixujte v blenderu dozlatova. Podávejte ihned.

---

## 2. Tropické matcha smoothie

**Ingredience:**
- 1 lžička matchy
- 100 g manga (zmrazené)
- 100 g ananasu
- 150 ml kokosového mléka
- šťáva z 1 limetky

**Příprava:** Mixujte do hladka. Skvělé studené, ideálně s ledem.

---

## 3. Proteinové matcha smoothie (post-workout)

**Ingredience:**
- 1,5 lžičky matchy
- 1 odměrka vanilkového proteinu
- 200 ml mandlového mléka
- 1 banán
- 1 lžíce ovesných vloček

**Příprava:** Mixujte 60 sekund. Výborné do 30 minut po tréninku.

---

## 4. Čokoládové matcha smoothie

**Ingredience:**
- 1 lžička matchy
- 1 lžíce kakaa
- 1 zmrazený banán
- 200 ml ovesného mléka
- 3 datle (pro sladkost)

**Příprava:** Mixujte do hladka. Překvapivě chutná kombinace — zemitá matcha + hluboké kakao.

---

## 5. Matcha detox smoothie

**Ingredience:**
- 1 lžička matchy
- 200 ml vody (kokosová voda)
- hrst okurky
- hrst špenátu
- šťáva z 1 citronu
- pár lístků máty
- 1 lžička medu

**Příprava:** Mixujte a přeceďte přes sítko pro hedvábnější texturu.

---

## Tipy pro perfektní matcha smoothie

1. **Matchu rozpusťte zvlášť** ve 2 lžících vody před přidáním do blenderu — zabrání hrudkám
2. **Zmrazené ovoce** dělá smoothie hustší a studenější bez přidávání ledu
3. **Nepřidávejte příliš sladkých surovin** — matcha má vlastní umami sladkost
    `
  },
  {
    slug: "jak-pripravit-matchu-tradicne",
    title: "Jak připravit matchu tradičně: Japonský čajový rituál doma",
    excerpt: "Tradiční příprava matchy není složitá. Chasen, chawan, horká voda a pár minut soustředění — a máte autentický japonský čajový zážitek.",
    category: "Průvodce",
    emoji: "🍵",
    readTime: 6,
    publishedAt: "2025-03-01",
    seoTitle: "Jak připravit matchu tradičně | Japonský čajový rituál",
    seoDescription: "Průvodce tradiční přípravou matchy doma. Jak použít bambusovou metličku, správná teplota vody a poměry pro koisu a usuchu styl.",
    keywords: ["jak připravit matchu", "příprava matchy", "matcha recept", "tradiční matcha", "matcha chasen"],
    content: `
## Co je tradiční příprava matchy?

V Japonsku existuje tisíciletý čajový rituál (chado — "cesta čaje"). Doma nepotřebujete celý obřad, ale základní princip stojí za to dodržet. Výsledkem je šálek matchy, který je nesrovnatelně lepší než cokoli připraveného jinak.

## Co budete potřebovat

- **Chasen** — bambusová metlička (nezbytná, nic ji plně nenahradí)
- **Chawan** — japonská čajová miska (nebo hluboký šálek)
- **Chashaku** — bambusová lžička (nebo lžička na 2 g)
- **Sítko** — pro prosévání matchy
- **Horká voda** — 75–80 °C (ne vroucí!)

## Styl přípravy: Usucha vs. Koicha

**Usucha** (tenká matcha) — běžný každodenní způsob
- 2 g matchy (1 lžičku)
- 70 ml vody 75–80 °C
- Hustá pěna, lehčí chuť

**Koicha** (hustá matcha) — ceremonální, silnější
- 4 g matchy (2 lžičky)
- 40 ml vody 75–80 °C
- Hustá pasta, intenzivní chuť bez pěny

## Postup přípravy (usucha)

**1. Ohřejte misku**
Nalijte do misky trochu horké vody, prohřejte ji a vodu vylijte. Vytřete do sucha. Teplá miska udrží matchu déle teplou.

**2. Prosejte matchu**
Přes jemné sítko prosejte 2 g matchy do misky. Eliminuje hrudky.

**3. Přidejte vodu**
Přilijte 70 ml vody ohřáté na 75–80 °C. Nikdy vroucí — zničí chlorofyl a antioxidanty a matcha zhořkne.

**4. Šlehejte technikou W**
Chasen držte uvolněně (ne jako tužku). Pohybujte metličkou rychle dopředu a dozadu pohybem M nebo W po dobu 30–45 sekund. Pohyb by měl být z zápěstí, ne z celé ruky.

**5. Dokončení**
Na konci proveďte pomalý kruhový pohyb po okraji misky a metličku vyjměte uprostřed. Vznikne jemná, hladká pěna.

## Jak pečovat o chasen

Po každém použití chasen opláchněte studenou vodou a nechte vyschnout na stojánku nebo v pozici "bambus vzhůru nohama". Nikdy nedávejte do myčky.

## Závěr

Tradiční příprava matchy trvá 5 minut a je sama o sobě mini-rituálem. Ten krátký okamžik soustředění před prvním douškem je velká část toho, proč lidé matchu milují.
    `
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(p => p.category === category);
}

export const blogCategories = ["Všechny", "Recepty", "Zdraví", "Průvodce"];
