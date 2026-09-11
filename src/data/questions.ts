import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // LEVEL 1: Orbit Planet Dalam (Tingkat Mudah)
  {
    id: 1,
    question: "Planet manakah yang letaknya paling dekat dengan Matahari dan berukuran paling kecil di Tata Surya?",
    options: [
      "Merkurius",
      "Venus",
      "Mars",
      "Bumi"
    ],
    correctIndex: 0,
    difficulty: "mudah",
    level: 1,
    levelName: "Level 1: Orbit Planet Dalam",
    planetName: "Merkurius",
    planetBadgeColor: "bg-amber-500",
    explanation: "Merkurius adalah planet terdekat dengan Matahari (sekitar 58 juta km) dan merupakan planet terkecil di Tata Surya kita.",
    funFact: "Karena tidak punya atmosfer tebal untuk menahan panas, suhu siang di Merkurius bisa mencapai 430°C, tetapi malamnya anjlok hingga -180°C!"
  },
  {
    id: 2,
    question: "Planet yang sering dijuluki 'Bintang Fajar' atau 'Bintang Kejora' karena tampak sangat terang dan merupakan planet terpanas adalah...",
    options: [
      "Mars",
      "Merkurius",
      "Venus",
      "Saturnus"
    ],
    correctIndex: 2,
    difficulty: "mudah",
    level: 1,
    levelName: "Level 1: Orbit Planet Dalam",
    planetName: "Venus",
    planetBadgeColor: "bg-yellow-500",
    explanation: "Venus adalah planet terpanas (mencapai 470°C) akibat efek rumah kaca ekstrem dari atmosfer tebal karbon dioksida. Venus sering terlihat cerah di ufuk timur saat fajar.",
    funFact: "Venus berotasi berlawanan arah dengan sebagian besar planet lain. Di Venus, matahari terbit di barat dan terbenam di timur!"
  },
  {
    id: 3,
    question: "Bumi kita sering disebut sebagai 'Planet Biru'. Apa penyebab utama sebutan tersebut?",
    options: [
      "Warna bebatuan dan tanah di kutub",
      "Sekitar 71% permukaan Bumi tertutup air lautan",
      "Pancaran sinar Bulan saat malam hari",
      "Lapisan gas hidrogen di langit"
    ],
    correctIndex: 1,
    difficulty: "mudah",
    level: 1,
    levelName: "Level 1: Orbit Planet Dalam",
    planetName: "Bumi",
    planetBadgeColor: "bg-blue-500",
    explanation: "Dari luar angkasa, Bumi tampak berwarna biru cerah karena lebih dari 70% permukaannya diselimuti perairan samudra dan lautan luas.",
    funFact: "Bumi adalah satu-satunya tempat di Tata Surya yang terbukti memiliki kehidupan dan memiliki 1 satelit alami setia, yaitu Bulan."
  },

  // LEVEL 2: Sabuk Asteroid & Planet Raksasa (Tingkat Sedang)
  {
    id: 4,
    question: "Planet yang dijuluki 'Planet Merah' dan memiliki gunung berapi tertinggi bernama Olympus Mons adalah...",
    options: [
      "Yupiter",
      "Venus",
      "Merkurius",
      "Mars"
    ],
    correctIndex: 3,
    difficulty: "sedang",
    level: 2,
    levelName: "Level 2: Sabuk Asteroid & Raksasa Gas",
    planetName: "Mars",
    planetBadgeColor: "bg-rose-500",
    explanation: "Mars tampak berwarna merah kejinggaan karena debu dan bebatuan permukaannya kaya akan oksida besi (karat besi).",
    funFact: "Gunung Olympus Mons di Mars tingginya hampir 3 kali lipat dari Gunung Everest di Bumi!"
  },
  {
    id: 5,
    question: "Kelompok Planet Dalam (kebumian) dan Planet Luar (raksasa gas) dipisahkan oleh lintasan...",
    options: [
      "Cincin Saturnus",
      "Sabuk Asteroid",
      "Satelit Bulan",
      "Awan Debu Komet"
    ],
    correctIndex: 1,
    difficulty: "sedang",
    level: 2,
    levelName: "Level 2: Sabuk Asteroid & Raksasa Gas",
    planetName: "Sabuk Asteroid",
    planetBadgeColor: "bg-stone-500",
    explanation: "Sabuk Asteroid terletak di antara orbit planet Mars dan Yupiter, menjadi batas alami pemisah Planet Dalam dan Planet Luar.",
    funFact: "Di dalam Sabuk Asteroid terdapat jutaan bongkahan batu luar angkasa, termasuk planet katai terbesar bernama Ceres!"
  },
  {
    id: 6,
    question: "Planet terbesar dalam sistem Tata Surya kita yang memiliki pusaran badai terkenal bernama 'Bintik Merah Raksasa' adalah...",
    options: [
      "Yupiter",
      "Saturnus",
      "Neptunus",
      "Uranus"
    ],
    correctIndex: 0,
    difficulty: "sedang",
    level: 2,
    levelName: "Level 2: Sabuk Asteroid & Raksasa Gas",
    planetName: "Yupiter",
    planetBadgeColor: "bg-orange-500",
    explanation: "Yupiter adalah raja planet dengan diameter 11 kali lipat Bumi. Bintik Merah Raksasa merupakan badai antisiklon raksasa yang telah berlangsung ratusan tahun.",
    funFact: "Jika semua planet lain di Tata Surya digabungkan, massa Yupiter masih dua kali lipat lebih berat!"
  },
  {
    id: 7,
    question: "Planet yang paling mudah dikenali karena memiliki sistem cincin paling besar, megah, dan tersusun dari partikel es serta batu adalah...",
    options: [
      "Uranus",
      "Bumi",
      "Saturnus",
      "Mars"
    ],
    correctIndex: 2,
    difficulty: "sedang",
    level: 2,
    levelName: "Level 2: Sabuk Asteroid & Raksasa Gas",
    planetName: "Saturnus",
    planetBadgeColor: "bg-amber-400",
    explanation: "Saturnus memiliki cincin spektakuler yang membentang hingga ratusan ribu kilometer, namun ketebalannya rata-rata hanya puluhan meter.",
    funFact: "Kerapatan jenis Saturnus sangat rendah, bahkan lebih ringan daripada air. Andaikan ada kolam raksasa, Saturnus bisa mengapung!"
  },

  // LEVEL 3: Ujung Tata Surya & Gerak Antariksa (Tingkat Sulit)
  {
    id: 8,
    question: "Planet es raksasa berwarna biru kehijauan yang poros rotasinya sangat miring (98 derajat) sehingga tampak berputar menggelinding adalah...",
    options: [
      "Merkurius",
      "Neptunus",
      "Uranus",
      "Venus"
    ],
    correctIndex: 2,
    difficulty: "sulit",
    level: 3,
    levelName: "Level 3: Ujung Tata Surya & Orbit",
    planetName: "Uranus",
    planetBadgeColor: "bg-teal-400",
    explanation: "Uranus berotasi miring hampir 98 derajat ke samping, kemungkinan akibat tabrakan hebat dengan benda langit purba di masa lalu.",
    funFact: "Warna biru kehijauan Uranus berasal dari gas metana di atmosfer bagian atas yang menyerap warna merah sinar matahari."
  },
  {
    id: 9,
    question: "Planet urutan ke-8 (terjauh dari Matahari) yang dikenal sebagai planet pembuat badai dengan kecepatan angin supersonic adalah...",
    options: [
      "Neptunus",
      "Uranus",
      "Pluto",
      "Saturnus"
    ],
    correctIndex: 0,
    difficulty: "sulit",
    level: 3,
    levelName: "Level 3: Ujung Tata Surya & Orbit",
    planetName: "Neptunus",
    planetBadgeColor: "bg-indigo-500",
    explanation: "Neptunus adalah planet terluar di Tata Surya (setelah Pluto dikategorikan planet katai sejak 2006). Neptunus memiliki angin tercepat mencapai 2.100 km/jam!",
    funFact: "Satu kali revolusi mengelilingi Matahari bagi Neptunus memerlukan waktu sekitar 165 tahun waktu di Bumi!"
  },
  {
    id: 10,
    question: "Waktu yang dibutuhkan oleh sebuah planet untuk bergerak mengitari Matahari dalam satu putaran penuh pada orbitnya disebut...",
    options: [
      "Kala Rotasi",
      "Kala Revolusi",
      "Periode Gerhana",
      "Presesi Bumi"
    ],
    correctIndex: 1,
    difficulty: "sulit",
    level: 3,
    levelName: "Level 3: Ujung Tata Surya & Orbit",
    planetName: "Gerak Planet",
    planetBadgeColor: "bg-purple-500",
    explanation: "Kala Revolusi adalah waktu untuk mengitari Matahari (menentukan panjang 1 tahun). Sedangkan Kala Rotasi adalah waktu berputar pada porosnya sendiri (menentukan siang-malam).",
    funFact: "Semakin jauh jarak planet dari Matahari, semakin panjang pula garis orbit dan kala revolusinya!"
  }
];
