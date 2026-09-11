import { PlanetGuide } from '../types';

export const PLANETS_ENCYCLOPEDIA: PlanetGuide[] = [
  {
    name: "Merkurius",
    alias: "Planet Terkecil & Terdekat",
    order: 1,
    type: "Planet Terestrial (Dalam)",
    color: "#e2b87a",
    iconBg: "from-amber-600 to-amber-800",
    summary: "Planet terdekat dengan Matahari dan tidak memiliki satelit alami maupun atmosfer tebal.",
    features: [
      "Jarak ke Matahari: ~58 juta km",
      "Kala Revolusi: 88 hari Bumi",
      "Kala Rotasi: 59 hari Bumi",
      "Jumlah Satelit: 0"
    ],
    funFact: "Permukaannya penuh dengan kawah mirip seperti permukaan Bulan!"
  },
  {
    name: "Venus",
    alias: "Bintang Kejora / Planet Terpanas",
    order: 2,
    type: "Planet Terestrial (Dalam)",
    color: "#f59e0b",
    iconBg: "from-yellow-500 to-amber-600",
    summary: "Planet kembaran Bumi dalam hal ukuran, namun suhunya sangat panas mencapai 470°C akibat efek rumah kaca.",
    features: [
      "Jarak ke Matahari: ~108 juta km",
      "Kala Revolusi: 225 hari Bumi",
      "Kala Rotasi: 243 hari Bumi (Retrograde)",
      "Jumlah Satelit: 0"
    ],
    funFact: "Arah rotasinya terbalik (searah jarum jam), sehingga Matahari terbit dari barat!"
  },
  {
    name: "Bumi",
    alias: "Planet Biru & Rumah Kehidupan",
    order: 3,
    type: "Planet Terestrial (Dalam)",
    color: "#3b82f6",
    iconBg: "from-blue-500 to-emerald-600",
    summary: "Satu-satunya planet di Tata Surya yang memiliki air berwujud cair dan atmosfer kaya oksigen untuk kehidupan.",
    features: [
      "Jarak ke Matahari: ~150 juta km (1 SA)",
      "Kala Revolusi: 365,25 hari (1 tahun)",
      "Kala Rotasi: 24 jam (1 hari)",
      "Jumlah Satelit: 1 (Bulan)"
    ],
    funFact: "Sekitar 71% permukaan Bumi adalah perairan dan memiliki medan magnet pelindung radiasi!"
  },
  {
    name: "Mars",
    alias: "Planet Merah",
    order: 4,
    type: "Planet Terestrial (Dalam)",
    color: "#ef4444",
    iconBg: "from-red-500 to-rose-700",
    summary: "Planet berbatu merah dengan atmosfer tipis, memiliki kutub es dan gunung berapi tertinggi di tata surya.",
    features: [
      "Jarak ke Matahari: ~228 juta km",
      "Kala Revolusi: 687 hari Bumi",
      "Kala Rotasi: 24,6 jam",
      "Jumlah Satelit: 2 (Phobos dan Deimos)"
    ],
    funFact: "Warna merahnya berasal dari senyawa oksida besi (karat besi) di tanahnya!"
  },
  {
    name: "Yupiter",
    alias: "Raja Planet / Raksasa Gas",
    order: 5,
    type: "Planet Raksasa Gas (Luar)",
    color: "#f97316",
    iconBg: "from-orange-500 to-amber-700",
    summary: "Planet terbesar di Tata Surya kita dengan badai bintik merah raksasa yang lebih besar dari Bumi.",
    features: [
      "Jarak ke Matahari: ~778 juta km",
      "Kala Revolusi: 11,86 tahun Bumi",
      "Kala Rotasi: Tercepat! ~9 jam 55 menit",
      "Jumlah Satelit: Lebih dari 95 satelit (Ganymede terbesar)"
    ],
    funFact: "Ganymede, salah satu bulannya Yupiter, berukuran lebih besar daripada planet Merkurius!"
  },
  {
    name: "Saturnus",
    alias: "Mahkota Cincin Megah",
    order: 6,
    type: "Planet Raksasa Gas (Luar)",
    color: "#fbbf24",
    iconBg: "from-yellow-400 to-amber-600",
    summary: "Planet tercantik dengan ribuan cincin konsentris yang terbuat dari miliaran serpihan es dan batu angkasa.",
    features: [
      "Jarak ke Matahari: ~1,4 miliar km",
      "Kala Revolusi: 29,5 tahun Bumi",
      "Kala Rotasi: ~10 jam 33 menit",
      "Jumlah Satelit: Lebih dari 140 satelit (Titan terbesar)"
    ],
    funFact: "Massa jenis Saturnus sangat ringan, lebih kecil dari air! Jika ada lautan cukup besar, Saturnus akan terapung!"
  },
  {
    name: "Uranus",
    alias: "Planet Es Berguling",
    order: 7,
    type: "Planet Raksasa Es (Luar)",
    color: "#2dd4bf",
    iconBg: "from-teal-400 to-cyan-600",
    summary: "Planet es raksasa berwarna cyan biru kehijauan yang berputar miring hampir rebah pada bidang orbitnya.",
    features: [
      "Jarak ke Matahari: ~2,87 miliar km",
      "Kala Revolusi: 84 tahun Bumi",
      "Kala Rotasi: ~17 jam 14 menit",
      "Kemiringan Sumbu: 97,8 derajat"
    ],
    funFact: "Kutub utara dan selatan Uranus bergantian menghadap matahari selama 42 tahun berturut-turut!"
  },
  {
    name: "Neptunus",
    alias: "Penjaga Batas & Planet Angin Badai",
    order: 8,
    type: "Planet Raksasa Es (Luar)",
    color: "#6366f1",
    iconBg: "from-indigo-500 to-blue-700",
    summary: "Planet terjauh di Tata Surya dengan warna biru tua yang pekat dan kecepatan badai paling kencang.",
    features: [
      "Jarak ke Matahari: ~4,5 miliar km",
      "Kala Revolusi: 165 tahun Bumi",
      "Kala Rotasi: ~16 jam 6 menit",
      "Satelit Terbesar: Triton"
    ],
    funFact: "Neptunus baru menyelesaikan satu putaran orbit penuh mengelilingi matahari sejak pertama ditemukan pada 1846!"
  }
];
