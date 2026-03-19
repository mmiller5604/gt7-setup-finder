// All circuits available in Gran Turismo 7, grouped by category.
// Layout variants are listed as separate entries where the game treats them distinctly.

const tracks = [
  // ── Circuit de la Sarthe ──────────────────────────────────────────
  "Circuit de la Sarthe",
  "Circuit de la Sarthe (No Chicane)",

  // ── Alsace ───────────────────────────────────────────────────────
  "Alsace - Village",
  "Alsace - Village II",

  // ── Autodromo Nazionale Monza ─────────────────────────────────────
  "Autodromo Nazionale Monza",
  "Autodromo Nazionale Monza (No Chicane)",

  // ── Blue Moon Bay ─────────────────────────────────────────────────
  "Blue Moon Bay Speedway",
  "Blue Moon Bay Speedway - Infield",

  // ── Brands Hatch ─────────────────────────────────────────────────
  "Brands Hatch Grand Prix",
  "Brands Hatch Indy",

  // ── Broad Bean Raceway ────────────────────────────────────────────
  "Broad Bean Raceway",

  // ── Circuit de Barcelona-Catalunya ───────────────────────────────
  "Circuit de Barcelona-Catalunya",
  "Circuit de Barcelona-Catalunya (National)",

  // ── Circuit de Sainte-Croix ───────────────────────────────────────
  "Circuit de Sainte-Croix - A",
  "Circuit de Sainte-Croix - B",
  "Circuit de Sainte-Croix - C",

  // ── Circuit Zandvoort ─────────────────────────────────────────────
  "Circuit Zandvoort",

  // ── Daytona ───────────────────────────────────────────────────────
  "Daytona International Speedway - Oval",
  "Daytona International Speedway - Road Course",

  // ── Deep Forest ───────────────────────────────────────────────────
  "Deep Forest Raceway",
  "Deep Forest Raceway Reverse",

  // ── Dragon Trail ──────────────────────────────────────────────────
  "Dragon Trail - Gardens",
  "Dragon Trail - Gardens Reverse",
  "Dragon Trail - Seaside",
  "Dragon Trail - Seaside Reverse",

  // ── Fuji Speedway ─────────────────────────────────────────────────
  "Fuji Speedway",
  "Fuji Speedway F",
  "Fuji Speedway GT",

  // ── Goodwood ─────────────────────────────────────────────────────
  "Goodwood Motor Circuit",

  // ── Grand Valley ─────────────────────────────────────────────────
  "Grand Valley - Speedway",
  "Grand Valley - Highway 1",
  "Grand Valley Reverse",

  // ── High Speed Ring ───────────────────────────────────────────────
  "High Speed Ring",
  "High Speed Ring Reverse",

  // ── Interlagos ───────────────────────────────────────────────────
  "Interlagos Circuit",
  "Interlagos Circuit (Short)",

  // ── Kyoto Driving Park ────────────────────────────────────────────
  "Kyoto Driving Park - Yamagiwa",
  "Kyoto Driving Park - Miyabi",
  "Kyoto Driving Park - Yamagiwa + Miyabi",

  // ── Lake Louise ───────────────────────────────────────────────────
  "Lake Louise",

  // ── Maggiore Lake ─────────────────────────────────────────────────
  "Maggiore Lake - National",
  "Maggiore Lake - Full",

  // ── Michigan Speedway ─────────────────────────────────────────────
  "Michigan Speedway",

  // ── Mount Panorama ────────────────────────────────────────────────
  "Mount Panorama Motor Racing Circuit",

  // ── Nürburgring ───────────────────────────────────────────────────
  "Nürburgring 24h",
  "Nürburgring GP",
  "Nürburgring Nordschleife",
  "Nürburgring Sprint",
  "Nürburgring Sprint Short",

  // ── Red Bull Ring ─────────────────────────────────────────────────
  "Red Bull Ring",
  "Red Bull Ring Short",

  // ── Sardegna ─────────────────────────────────────────────────────
  "Sardegna - Road Track A",
  "Sardegna - Road Track B",
  "Sardegna - Road Track C",
  "Sardegna - Windmills",

  // ── Spa-Francorchamps ─────────────────────────────────────────────
  "Circuit de Spa-Francorchamps",

  // ── Special Stage Route ───────────────────────────────────────────
  "Special Stage Route 5",
  "Special Stage Route 5 (Short)",
  "Special Stage Route 5 Reverse",
  "Special Stage Route 7",
  "Special Stage Route X",

  // ── Suzuka ────────────────────────────────────────────────────────
  "Suzuka Circuit",
  "Suzuka Circuit East",

  // ── Tokyo Expressway ─────────────────────────────────────────────
  "Tokyo Expressway - East Inner Loop",
  "Tokyo Expressway - East Outer Loop",
  "Tokyo Expressway - South Inner Loop",
  "Tokyo Expressway - South Outer Loop",
  "Tokyo Expressway - Central Inner Loop",
  "Tokyo Expressway - Central Outer Loop",

  // ── Trial Mountain ────────────────────────────────────────────────
  "Trial Mountain Circuit",
  "Trial Mountain Circuit Reverse",

  // ── Tsukuba ───────────────────────────────────────────────────────
  "Tsukuba Circuit",

  // ── Watkins Glen ─────────────────────────────────────────────────
  "Watkins Glen International",
  "Watkins Glen International Short",

  // ── Willow Springs ───────────────────────────────────────────────
  "Willow Springs - Big Willow",
  "Willow Springs - Horse Thief Mile",
]

export default tracks.map((track) => ({ value: track, label: track }))
