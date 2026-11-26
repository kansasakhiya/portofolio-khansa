/**
 * ==========================================================================
 * SCRIPT.JS — PORTOFOLIO KHANSA SAKHIYA PUTRI
 * Fitur: Konfigurasi Tema Tailwind, Dukungan 2 Bahasa (ID & EN),
 *        Galeri Projek IT & Khansa Beauty Nails, Sertifikat, dan Lightbox Modal
 * ==========================================================================
 */

/**
 * 1. KONFIGURASI PALET WARNA SOFT PINK & ROSE GOLD UNTUK TAILWIND CSS
 */
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          serif: ['"Playfair Display"', 'serif'],
        },
        colors: {
          blush: {
            50: '#FFF9FB',
            100: '#FFEFF4',
            200: '#FFDCE7',
            300: '#FFB8CE',
            400: '#F48FB1',
            500: '#E85D88',
            600: '#D81B60',
            700: '#AD1457',
            800: '#880E4F',
            900: '#2D1B22',
          },
          rosegold: {
            100: '#FBECE8',
            200: '#F5D5CC',
            300: '#E8B4A6',
            400: '#D99382',
            500: '#C57664',
            600: '#A65B4A',
          },
        },
        boxShadow: {
          soft: '0 12px 35px -10px rgba(232, 93, 136, 0.16)',
          glow: '0 12px 28px -6px rgba(216, 27, 96, 0.25)',
        },
      },
    },
  };
}

/**
 * 2. STATE GLOBAL BAHASA, FILTER & MODAL LIGHTBOX
 */
let currentLang = 'id';
let currentFilter = 'all';
let activeModalList = [];
let currentModalIndex = 0;

/**
 * 3. KAMUS TERJEMAHAN BILINGUAL (BAHASA INDONESIA & ENGLISH)
 */
const translations = {
  id: {
    nav_about: 'Tentang',
    nav_skills: 'Keahlian',
    nav_gallery: 'Projek & Galeri',
    nav_certificates: 'Sertifikat',
    nav_contact: 'Kontak',
    hero_badge: 'Pelajar SMKN 1 Blitar • TKJ',
    hero_eyebrow: 'Portofolio Pribadi & Kreatif',
    hero_subtitle:
      'Pelajar jurusan <strong class="text-blush-900 font-semibold">Teknik Komputer dan Jaringan (TKJ)</strong> di SMKN 1 Blitar yang menekuni pengembangan database MySQL &amp; aplikasi web sebagai <strong class="text-blush-700 font-semibold">Junior IT</strong>, sekaligus merintis brand kecantikan kuku <strong class="text-blush-600 font-semibold">Khansa Beauty Nails</strong>.',
    pill_junior_it: 'Junior IT (TKJ)',
    pill_mysql: 'MySQL & Web App',
    hero_cta_primary: 'Lihat Karya & Galeri',
    hero_cta_secondary: 'Hubungi Saya',
    badge_it_sub: 'TKJ • MySQL & Web',
    badge_nail_sub: 'Nail Art Studio',
    about_badge: 'Tentang Saya',
    about_title: 'Memadukan Logika Teknologi & Sentuhan Seni Kecantikan',
    about_p1:
      'Halo! Saya <strong class="text-blush-900">Khansa Sakhiya Putri</strong>, pelajar aktif jurusan <strong class="text-blush-700">Teknik Komputer dan Jaringan (TKJ)</strong> di <strong class="text-blush-900">SMKN 1 Blitar</strong>. Saya memiliki ketertarikan kuat dalam pengelolaan basis data relasional MySQL, pembuatan aplikasi kasir berbasis web, serta konfigurasi dasar jaringan komputer.',
    about_p2:
      'Di samping dunia teknologi informasi, saya juga mengelola <em class="italic">small business</em> kecantikan kuku bernama <strong class="text-blush-600">Khansa Beauty Nails</strong>. Melalui usaha ini, saya menghadirkan layanan manicure, <em class="italic">gel polish</em>, desain <em class="italic">nail art</em> estetik, dan <em class="italic">nail extension</em> yang mengutamakan ketelitian, kebersihan, serta kepuasan setiap pelanggan.',
    role_it_tag: 'Kompetensi TKJ',
    role_it_desc:
      'Fokus pada perancangan struktur basis data yang rapi, pengembangan aplikasi web operasional, serta pemahaman infrastruktur jaringan komputer.',
    role_it_li1: 'Perancangan &amp; manajemen basis data relasional <strong>MySQL</strong> (ERD &amp; Query SQL).',
    role_it_li2: 'Pengembangan <strong>Aplikasi Kasir Berbasis Web</strong> untuk pencatatan transaksi &amp; stok.',
    role_it_li3: 'Konfigurasi dasar jaringan komputer, IP addressing, dan troubleshooting perangkat.',
    role_it_link: 'Lihat Projek IT',
    role_nail_tag: 'Small Business',
    role_nail_desc:
      'Menghadirkan layanan perawatan kuku, gel polish, dan desain nail art estetik yang higienis serta personal bagi setiap klien.',
    role_nail_li1: 'Layanan <strong>Nail Gel Polish</strong>, manicure prep higienis, dan <strong>Nail Extension</strong>.',
    role_nail_li2: 'Desain <strong>Custom Nail Art</strong> bertema soft pink coquette, chrome glaze, hingga floral.',
    role_nail_li3: 'Layanan konsultasi desain, reservasi jadwal fleksibel, serta perawatan <strong>Gel Removal</strong>.',
    role_nail_link: 'Lihat Galeri & Pricelist',
    skills_badge: 'Kompetensi & Keterampilan',
    skills_title: 'Keahlian Saya',
    skills_subtitle:
      'Keterampilan praktis yang saya kuasai dan terus kembangkan di bidang teknologi informasi maupun seni perawatan kuku.',
    skills_it_sub: 'Database, Pemrograman Web & Jaringan Komputer',
    skills_nail_sub: 'Estetika Kuku, Nail Art & Layanan Pelanggan',
    gallery_badge: 'Portofolio & Dokumentasi',
    gallery_title: 'Projek IT & Khansa Beauty Nails',
    gallery_subtitle:
      'Klik pada kartu projek atau hasil karya nail art untuk melihat <strong>Full Dokumentasi</strong> dalam tampilan pratinjau penuh.',
    filter_all: 'Semua',
    filter_it: 'Projek IT',
    card_full_doc: 'Full Dokumentasi',
    card_hover_zoom: 'Klik untuk Full Dokumentasi',
    cert_badge: 'Sertifikasi Kompetensi',
    cert_title: 'Sertifikat Saya',
    cert_subtitle:
      'Sertifikat resmi pencapaian kompetensi keahlian di bidang Teknik Komputer dan Jaringan.',
    cert_btn_preview: 'Lihat Full Sertifikat',
    contact_badge: 'Terhubung & Reservasi',
    contact_title: 'Mari Terhubung dengan Saya',
    contact_subtitle:
      'Ingin berdiskusi seputar projek IT atau melakukan reservasi nail art di <strong>Khansa Beauty Nails</strong>? Hubungi saya melalui saluran resmi di bawah ini.',
    contact_ig_personal_label: 'Instagram Pribadi',
    contact_ig_personal_desc: 'Ikuti keseharian dan aktivitas belajar saya di SMKN 1 Blitar.',
    contact_ig_nail_label: 'Instagram Khansa Beauty Nails',
    contact_ig_nail_desc: 'Lihat katalog desain nail art terbaru, promo bulanan, dan testimoni klien.',
    contact_wa_label: 'WhatsApp Khansa Beauty Nails',
    btn_open_ig: 'Buka Instagram',
    btn_open_catalog: 'Lihat Katalog IG',
    btn_chat_wa: 'Chat WhatsApp Otomatis',
    footer_copyright:
      '&copy; 2026 <strong class="text-blush-900">Khansa Sakhiya Putri</strong> &mdash; Pelajar SMKN 1 Blitar &amp; Founder Khansa Beauty Nails',
    footer_back_top: 'Kembali ke Atas',
    toast_copied: 'berhasil disalin ke clipboard!'
  },
  en: {
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_gallery: 'Projects & Gallery',
    nav_certificates: 'Certificates',
    nav_contact: 'Contact',
    hero_badge: 'Student at SMKN 1 Blitar • TKJ',
    hero_eyebrow: 'Personal & Creative Portfolio',
    hero_subtitle:
      'A <strong class="text-blush-900 font-semibold">Computer &amp; Network Engineering (TKJ)</strong> student at SMKN 1 Blitar passionate about MySQL database systems and web applications as a <strong class="text-blush-700 font-semibold">Junior IT</strong>, while running her nail art studio <strong class="text-blush-600 font-semibold">Khansa Beauty Nails</strong>.',
    pill_junior_it: 'Junior IT (TKJ)',
    pill_mysql: 'MySQL & Web App',
    hero_cta_primary: 'View Works & Gallery',
    hero_cta_secondary: 'Contact Me',
    badge_it_sub: 'TKJ • MySQL & Web',
    badge_nail_sub: 'Nail Art Studio',
    about_badge: 'About Me',
    about_title: 'Blending Technology Logic with the Art of Beauty',
    about_p1:
      'Hello! I am <strong class="text-blush-900">Khansa Sakhiya Putri</strong>, an active student majoring in <strong class="text-blush-700">Computer and Network Engineering (TKJ)</strong> at <strong class="text-blush-900">SMKN 1 Blitar</strong>. I enjoy designing structured MySQL relational databases, building web-based cashier applications, and configuring fundamental computer networks.',
    about_p2:
      'Alongside my journey in information technology, I founded and manage a nail beauty small business called <strong class="text-blush-600">Khansa Beauty Nails</strong>. Through this brand, I offer hygienic manicures, <em class="italic">gel polish</em>, aesthetic <em class="italic">nail art</em>, and <em class="italic">nail extensions</em> crafted with precision and care.',
    role_it_tag: 'TKJ Competency',
    role_it_desc:
      'Focused on clean database architecture, operational web application development, and foundational network infrastructure.',
    role_it_li1: 'Relational database design &amp; management using <strong>MySQL</strong> (ERD &amp; SQL Queries).',
    role_it_li2: 'Developing a <strong>Web-Based Cashier App</strong> for transaction &amp; inventory tracking.',
    role_it_li3: 'Basic network configuration, IP addressing, and hardware/software troubleshooting.',
    role_it_link: 'Explore IT Projects',
    role_nail_tag: 'Small Business',
    role_nail_desc:
      'Delivering hygienic nail care, glossy gel polish, and personalized aesthetic nail art designs for every client.',
    role_nail_li1: '<strong>Nail Gel Polish</strong>, hygienic cuticle manicure prep, and <strong>Nail Extensions</strong>.',
    role_nail_li2: '<strong>Custom Nail Art</strong> designs ranging from soft pink coquette to rose gold chrome and floral tips.',
    role_nail_li3: 'Design consultation, flexible appointment scheduling, and gentle <strong>Gel Removal</strong> care.',
    role_nail_link: 'View Gallery & Pricelist',
    skills_badge: 'Skills & Expertise',
    skills_title: 'My Skills',
    skills_subtitle:
      'Practical capabilities I have developed across both information technology and professional nail care.',
    skills_it_sub: 'Database Management, Web Apps & Networking',
    skills_nail_sub: 'Nail Aesthetics, Custom Nail Art & Client Care',
    gallery_badge: 'Portfolio & Documentation',
    gallery_title: 'IT Projects & Khansa Beauty Nails',
    gallery_subtitle:
      'Click any project or nail documentation card to open its <strong>Full Documentation</strong> in full-screen preview.',
    filter_all: 'All',
    filter_it: 'IT Projects',
    card_full_doc: 'Full Documentation',
    card_hover_zoom: 'Click for Full Documentation',
    cert_badge: 'Competency Certification',
    cert_title: 'My Certificate',
    cert_subtitle:
      'Official competency certification in Computer and Network Engineering (TKJ).',
    cert_btn_preview: 'View Full Certificate',
    contact_badge: 'Connect & Booking',
    contact_title: 'Let’s Get in Touch',
    contact_subtitle:
      'Interested in discussing an IT project or booking a nail session at <strong>Khansa Beauty Nails</strong>? Reach out through the official channels below.',
    contact_ig_personal_label: 'Personal Instagram',
    contact_ig_personal_desc: 'Follow my daily life and school journey at SMKN 1 Blitar.',
    contact_ig_nail_label: 'Khansa Beauty Nails Instagram',
    contact_ig_nail_desc: 'Browse the latest nail art catalog, monthly promos, and client reviews.',
    contact_wa_label: 'Khansa Beauty Nails WhatsApp',
    btn_open_ig: 'Open Instagram',
    btn_open_catalog: 'View IG Catalog',
    btn_chat_wa: 'Auto WhatsApp Chat',
    footer_copyright:
      '&copy; 2026 <strong class="text-blush-900">Khansa Sakhiya Putri</strong> &mdash; SMKN 1 Blitar Student &amp; Founder of Khansa Beauty Nails',
    footer_back_top: 'Back to Top',
    toast_copied: 'copied to clipboard!'
  }
};

/**
 * 4. GENERATOR SVG RESOLUSI TINGGI UNTUK DOKUMENTASI IT, NAIL ART, PRICELIST & SERTIFIKAT
 */
function svgToDataUri(svgString) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString.trim());
}

// SVG 1: Sistem Database MySQL (ERD Diagram & Relasi Tabel)
const mysqlSvgUri = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
    <defs>
      <linearGradient id="dbBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D1B22"/>
        <stop offset="100%" stop-color="#4A2533"/>
      </linearGradient>
      <linearGradient id="pinkBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E85D88"/>
        <stop offset="100%" stop-color="#D81B60"/>
      </linearGradient>
    </defs>
    <rect width="900" height="600" fill="url(#dbBg)"/>
    <g opacity="0.12" stroke="#FFB8CE" stroke-width="1">
      <line x1="0" y1="100" x2="900" y2="100"/><line x1="0" y1="200" x2="900" y2="200"/>
      <line x1="0" y1="300" x2="900" y2="300"/><line x1="0" y1="400" x2="900" y2="400"/>
      <line x1="150" y1="0" x2="150" y2="600"/><line x1="450" y1="0" x2="450" y2="600"/><line x1="750" y1="0" x2="750" y2="600"/>
    </g>
    <rect x="40" y="34" width="820" height="52" rx="14" fill="#3B212B" stroke="#E85D88" stroke-width="1.5"/>
    <circle cx="70" cy="60" r="7" fill="#F48FB1"/><circle cx="94" cy="60" r="7" fill="#FFDCE7"/><circle cx="118" cy="60" r="7" fill="#E8B4A6"/>
    <text x="150" y="65" font-family="monospace" font-size="16" font-weight="bold" fill="#FFEFF4">MySQL Relational Schema — db_khansa_store (3NF)</text>

    <!-- Garis Relasi ERD -->
    <path d="M 310 215 L 365 215 L 365 260 L 420 260" fill="none" stroke="#F48FB1" stroke-width="3" stroke-dasharray="6 4"/>
    <path d="M 590 260 L 635 260 L 635 215 L 670 215" fill="none" stroke="#F48FB1" stroke-width="3" stroke-dasharray="6 4"/>
    <path d="M 505 370 L 505 425" fill="none" stroke="#FFB8CE" stroke-width="3"/>

    <!-- Tabel 1: pelanggan -->
    <rect x="60" y="130" width="250" height="175" rx="14" fill="#FFF9FB" stroke="#F48FB1" stroke-width="2"/>
    <rect x="60" y="130" width="250" height="40" rx="14" fill="url(#pinkBar)"/>
    <text x="185" y="155" font-family="monospace" font-size="15" font-weight="bold" fill="#FFFFFF" text-anchor="middle">tbl_pelanggan</text>
    <text x="80" y="195" font-family="monospace" font-size="13" font-weight="bold" fill="#D81B60">PK  id_pelanggan INT</text>
    <text x="80" y="222" font-family="monospace" font-size="13" fill="#2D1B22">    nama_lengkap VARCHAR</text>
    <text x="80" y="249" font-family="monospace" font-size="13" fill="#2D1B22">    no_whatsapp VARCHAR</text>
    <text x="80" y="276" font-family="monospace" font-size="13" fill="#6E4E5B">    created_at TIMESTAMP</text>

    <!-- Tabel 2: transaksi -->
    <rect x="420" y="160" width="210" height="210" rx="14" fill="#FFF9FB" stroke="#E85D88" stroke-width="2.5"/>
    <rect x="420" y="160" width="210" height="40" rx="14" fill="url(#pinkBar)"/>
    <text x="525" y="185" font-family="monospace" font-size="15" font-weight="bold" fill="#FFFFFF" text-anchor="middle">tbl_transaksi</text>
    <text x="436" y="224" font-family="monospace" font-size="12.5" font-weight="bold" fill="#D81B60">PK id_transaksi INT</text>
    <text x="436" y="250" font-family="monospace" font-size="12.5" font-weight="bold" fill="#A65B4A">FK id_pelanggan INT</text>
    <text x="436" y="276" font-family="monospace" font-size="12.5" font-weight="bold" fill="#A65B4A">FK id_produk INT</text>
    <text x="436" y="302" font-family="monospace" font-size="12.5" fill="#2D1B22">   total_bayar DECIMAL</text>
    <text x="436" y="328" font-family="monospace" font-size="12.5" fill="#6E4E5B">   tgl_order DATETIME</text>

    <!-- Tabel 3: produk -->
    <rect x="670" y="130" width="185" height="175" rx="14" fill="#FFF9FB" stroke="#F48FB1" stroke-width="2"/>
    <rect x="670" y="130" width="185" height="40" rx="14" fill="url(#pinkBar)"/>
    <text x="762" y="155" font-family="monospace" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">tbl_produk</text>
    <text x="684" y="195" font-family="monospace" font-size="12.5" font-weight="bold" fill="#D81B60">PK id_produk INT</text>
    <text x="684" y="222" font-family="monospace" font-size="12.5" fill="#2D1B22">   nama_item</text>
    <text x="684" y="249" font-family="monospace" font-size="12.5" fill="#2D1B22">   harga INT</text>
    <text x="684" y="276" font-family="monospace" font-size="12.5" fill="#6E4E5B">   stok INT</text>

    <!-- SQL Query Console Box -->
    <rect x="60" y="425" width="795" height="130" rx="16" fill="#24131A" stroke="#F48FB1" stroke-width="1.5"/>
    <text x="85" y="458" font-family="monospace" font-size="14" fill="#F48FB1">SELECT t.id_transaksi, p.nama_lengkap, pr.nama_item, t.total_bayar</text>
    <text x="85" y="486" font-family="monospace" font-size="14" fill="#FFEFF4">FROM tbl_transaksi t</text>
    <text x="85" y="512" font-family="monospace" font-size="14" fill="#FFB8CE">INNER JOIN tbl_pelanggan p ON t.id_pelanggan = p.id_pelanggan</text>
    <text x="85" y="538" font-family="monospace" font-size="14" fill="#E8B4A6">INNER JOIN tbl_produk pr ON t.id_produk = pr.id_produk;</text>
  </svg>
`);

// SVG 2: Aplikasi Kasir Berbasis Web (Web POS Interface Mockup)
const cashierSvgUri = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
    <defs>
      <linearGradient id="posBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFEFF4"/>
        <stop offset="100%" stop-color="#FFDCE7"/>
      </linearGradient>
      <linearGradient id="btnRose" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E85D88"/>
        <stop offset="100%" stop-color="#D81B60"/>
      </linearGradient>
    </defs>
    <rect width="900" height="600" fill="url(#posBg)"/>
    <!-- Browser Frame -->
    <rect x="45" y="35" width="810" height="530" rx="22" fill="#FFFFFF" stroke="#F48FB1" stroke-width="2"/>
    <rect x="45" y="35" width="810" height="48" rx="22" fill="#FFF9FB"/>
    <line x1="45" y1="83" x2="855" y2="83" stroke="#FFDCE7" stroke-width="2"/>
    <circle cx="76" cy="59" r="7" fill="#E85D88"/><circle cx="100" cy="59" r="7" fill="#F48FB1"/><circle cx="124" cy="59" r="7" fill="#E8B4A6"/>
    <rect x="160" y="46" width="420" height="26" rx="13" fill="#FFEFF4"/>
    <text x="370" y="63" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#AD1457" text-anchor="middle">localhost/aplikasi-kasir-web • Point of Sale System</text>

    <!-- Katalog Produk Kiri -->
    <text x="75" y="122" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#2D1B22">Katalog Produk &amp; Layanan</text>
    <rect x="75" y="140" width="225" height="120" rx="16" fill="#FFF9FB" stroke="#FFB8CE" stroke-width="1.5"/>
    <rect x="92" y="156" width="44" height="44" rx="12" fill="#FFDCE7"/>
    <text x="92" y="222" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2D1B22">Nail Gel Polish</text>
    <text x="92" y="244" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#D81B60">Rp 45.000</text>

    <rect x="318" y="140" width="225" height="120" rx="16" fill="#FFF9FB" stroke="#FFB8CE" stroke-width="1.5"/>
    <rect x="335" y="156" width="44" height="44" rx="12" fill="#FBECE8"/>
    <text x="335" y="222" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2D1B22">Custom Nail Art</text>
    <text x="335" y="244" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#D81B60">Rp 65.000</text>

    <rect x="75" y="278" width="225" height="120" rx="16" fill="#FFF9FB" stroke="#FFB8CE" stroke-width="1.5"/>
    <rect x="92" y="294" width="44" height="44" rx="12" fill="#FFDCE7"/>
    <text x="92" y="360" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2D1B22">Nail Extension</text>
    <text x="92" y="382" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#D81B60">Rp 95.000</text>

    <rect x="318" y="278" width="225" height="120" rx="16" fill="#FFF9FB" stroke="#FFB8CE" stroke-width="1.5"/>
    <rect x="335" y="294" width="44" height="44" rx="12" fill="#FBECE8"/>
    <text x="335" y="360" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2D1B22">Gel Removal</text>
    <text x="335" y="382" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#D81B60">Rp 25.000</text>

    <!-- Ringkasan Transaksi Harian -->
    <rect x="75" y="420" width="468" height="115" rx="16" fill="#FFEFF4" stroke="#F48FB1"/>
    <text x="98" y="452" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#880E4F">Rekap Transaksi Hari Ini (MySQL Sync)</text>
    <text x="98" y="482" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#2D1B22">14 Transaksi • Rp 895.000</text>
    <text x="98" y="512" font-family="Arial, sans-serif" font-size="12" fill="#6E4E5B">Stok otomatis terbarui &amp; siap cetak struk PDF</text>

    <!-- Panel Keranjang Kasir Kanan -->
    <rect x="565" y="105" width="260" height="430" rx="20" fill="#FFF9FB" stroke="#E85D88" stroke-width="2"/>
    <text x="588" y="142" font-family="Arial, sans-serif" font-size="17" font-weight="bold" fill="#2D1B22">Keranjang Kasir</text>
    <line x1="588" y1="158" x2="802" y2="158" stroke="#FFDCE7" stroke-width="1.5"/>
    <text x="588" y="190" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#2D1B22">1x Custom Nail Art</text>
    <text x="802" y="190" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#D81B60" text-anchor="end">Rp 65.000</text>
    <text x="588" y="224" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#2D1B22">1x Nail Gel Polish</text>
    <text x="802" y="224" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#D81B60" text-anchor="end">Rp 45.000</text>

    <line x1="588" y1="365" x2="802" y2="365" stroke="#F48FB1" stroke-dasharray="4 4"/>
    <text x="588" y="398" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#6E4E5B">Total Bayar</text>
    <text x="802" y="400" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#D81B60" text-anchor="end">Rp 110.000</text>

    <rect x="588" y="430" width="214" height="44" rx="14" fill="url(#btnRose)"/>
    <text x="695" y="457" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Proses Pembayaran</text>
    <rect x="588" y="484" width="214" height="34" rx="12" fill="#FFEFF4" stroke="#F48FB1"/>
    <text x="695" y="505" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#AD1457" text-anchor="middle">Cetak Struk Transaksi</text>
  </svg>
`);

// SVG 3: Hasil Nail 1 — Soft Pink Coquette Nail Art
const nailCoquetteSvgUri = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
    <defs>
      <linearGradient id="coqBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFEFF4"/>
        <stop offset="50%" stop-color="#FFDCE7"/>
        <stop offset="100%" stop-color="#FBECE8"/>
      </linearGradient>
      <linearGradient id="nailPink" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFB8CE"/>
        <stop offset="60%" stop-color="#FFDBE6"/>
        <stop offset="100%" stop-color="#FFF5F8"/>
      </linearGradient>
    </defs>
    <rect width="900" height="600" fill="url(#coqBg)"/>
    <circle cx="150" cy="120" r="95" fill="#FFFFFF" opacity="0.45"/>
    <circle cx="760" cy="480" r="120" fill="#FFFFFF" opacity="0.4"/>

    <!-- 5 Kuku Almond Estetik dengan Aksen Coquette Bow & Mutiara -->
    <g transform="translate(155, 130)">
      <rect x="0" y="60" width="92" height="230" rx="46" fill="url(#nailPink)" stroke="#E85D88" stroke-width="2.5"/>
      <ellipse cx="30" cy="125" rx="8" ry="38" fill="#FFFFFF" opacity="0.65"/>
      <circle cx="46" cy="180" r="8" fill="#FFFFFF" stroke="#E8B4A6" stroke-width="1.5"/>

      <rect x="122" y="25" width="96" height="265" rx="48" fill="url(#nailPink)" stroke="#E85D88" stroke-width="2.5"/>
      <ellipse cx="152" cy="95" rx="9" ry="44" fill="#FFFFFF" opacity="0.65"/>
      <path d="M 170 165 C 148 145, 138 185, 170 165 C 192 145, 202 185, 170 165 Z" fill="#E85D88"/>
      <circle cx="170" cy="165" r="6" fill="#FFFFFF"/>

      <rect x="248" y="0" width="100" height="290" rx="50" fill="url(#nailPink)" stroke="#D81B60" stroke-width="2.5"/>
      <ellipse cx="280" cy="75" rx="10" ry="48" fill="#FFFFFF" opacity="0.7"/>
      <path d="M 298 145 C 272 122, 260 168, 298 145 C 324 122, 336 168, 298 145 Z" fill="#D81B60"/>
      <circle cx="298" cy="145" r="7" fill="#FFF9FB"/>
      <circle cx="298" cy="185" r="6" fill="#FFFFFF" stroke="#E8B4A6"/>
      <circle cx="298" cy="212" r="5" fill="#FFFFFF" stroke="#E8B4A6"/>

      <rect x="378" y="25" width="96" height="265" rx="48" fill="url(#nailPink)" stroke="#E85D88" stroke-width="2.5"/>
      <ellipse cx="408" cy="95" rx="9" ry="44" fill="#FFFFFF" opacity="0.65"/>
      <circle cx="426" cy="155" r="8" fill="#FFFFFF" stroke="#E8B4A6" stroke-width="1.5"/>
      <circle cx="426" cy="185" r="6" fill="#FFFFFF" stroke="#E8B4A6" stroke-width="1.5"/>

      <rect x="504" y="65" width="90" height="225" rx="45" fill="url(#nailPink)" stroke="#E85D88" stroke-width="2.5"/>
      <ellipse cx="534" cy="130" rx="8" ry="36" fill="#FFFFFF" opacity="0.65"/>
      <path d="M 549 180 C 531 164, 523 196, 549 180 C 567 164, 575 196, 549 180 Z" fill="#E85D88"/>
    </g>

    <rect x="260" y="495" width="380" height="46" rx="23" fill="#FFFFFF" opacity="0.92" stroke="#F48FB1"/>
    <text x="450" y="523" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#880E4F" text-anchor="middle">Khansa Beauty Nails • Coquette Edition</text>
  </svg>
`);

// SVG 4: Hasil Nail 2 — Rose Gold Glaze & Chrome Nails
const nailChromeSvgUri = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
    <defs>
      <linearGradient id="rgBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FBECE8"/>
        <stop offset="50%" stop-color="#FFDCE7"/>
        <stop offset="100%" stop-color="#F5D5CC"/>
      </linearGradient>
      <linearGradient id="chromeNail" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F5D5CC"/>
        <stop offset="35%" stop-color="#E8B4A6"/>
        <stop offset="65%" stop-color="#FFF5F3"/>
        <stop offset="100%" stop-color="#D99382"/>
      </linearGradient>
    </defs>
    <rect width="900" height="600" fill="url(#rgBg)"/>

    <path d="M 140 130 L 146 148 L 164 154 L 146 160 L 140 178 L 134 160 L 116 154 L 134 148 Z" fill="#FFFFFF"/>
    <path d="M 760 120 L 767 142 L 789 149 L 767 156 L 760 178 L 753 156 L 731 149 L 753 142 Z" fill="#FFFFFF"/>

    <g transform="translate(155, 130)">
      <rect x="0" y="60" width="92" height="230" rx="46" fill="url(#chromeNail)" stroke="#C57664" stroke-width="2.5"/>
      <ellipse cx="32" cy="145" rx="12" ry="62" fill="#FFFFFF" opacity="0.72"/>

      <rect x="122" y="25" width="96" height="265" rx="48" fill="url(#chromeNail)" stroke="#C57664" stroke-width="2.5"/>
      <ellipse cx="155" cy="130" rx="13" ry="74" fill="#FFFFFF" opacity="0.75"/>

      <rect x="248" y="0" width="100" height="290" rx="50" fill="url(#chromeNail)" stroke="#A65B4A" stroke-width="2.5"/>
      <ellipse cx="282" cy="115" rx="14" ry="82" fill="#FFFFFF" opacity="0.8"/>

      <rect x="378" y="25" width="96" height="265" rx="48" fill="url(#chromeNail)" stroke="#C57664" stroke-width="2.5"/>
      <ellipse cx="410" cy="130" rx="13" ry="74" fill="#FFFFFF" opacity="0.75"/>

      <rect x="504" y="65" width="90" height="225" rx="45" fill="url(#chromeNail)" stroke="#C57664" stroke-width="2.5"/>
      <ellipse cx="534" cy="145" rx="11" ry="60" fill="#FFFFFF" opacity="0.72"/>
    </g>

    <rect x="250" y="495" width="400" height="46" rx="23" fill="#FFFFFF" opacity="0.92" stroke="#D99382"/>
    <text x="450" y="523" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#880E4F" text-anchor="middle">Khansa Beauty Nails • Rose Gold Glaze</text>
  </svg>
`);

// SVG 5: Hasil Nail 3 — Minimalist Floral French Tip
const nailFloralSvgUri = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
    <defs>
      <linearGradient id="flBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF9FB"/>
        <stop offset="100%" stop-color="#FFEFF4"/>
      </linearGradient>
      <linearGradient id="sheerBase" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFE6EE"/>
        <stop offset="100%" stop-color="#FFF5F8"/>
      </linearGradient>
    </defs>
    <rect width="900" height="600" fill="url(#flBg)"/>

    <g transform="translate(155, 130)">
      <rect x="0" y="60" width="92" height="230" rx="46" fill="url(#sheerBase)" stroke="#F48FB1" stroke-width="2.5"/>
      <path d="M 3 105 Q 46 130 89 105 L 89 95 A 45 45 0 0 0 3 95 Z" fill="#E85D88"/>
      <circle cx="46" cy="185" r="6" fill="#F48FB1"/>

      <rect x="122" y="25" width="96" height="265" rx="48" fill="url(#sheerBase)" stroke="#F48FB1" stroke-width="2.5"/>
      <path d="M 125 72 Q 170 98 215 72 L 215 62 A 47 47 0 0 0 125 62 Z" fill="#E85D88"/>
      <g transform="translate(170, 155)">
        <circle cx="0" cy="-11" r="7" fill="#FFFFFF"/><circle cx="11" cy="-3" r="7" fill="#FFFFFF"/>
        <circle cx="7" cy="10" r="7" fill="#FFFFFF"/><circle cx="-7" cy="10" r="7" fill="#FFFFFF"/>
        <circle cx="-11" cy="-3" r="7" fill="#FFFFFF"/><circle cx="0" cy="0" r="5" fill="#F48FB1"/>
      </g>

      <rect x="248" y="0" width="100" height="290" rx="50" fill="url(#sheerBase)" stroke="#E85D88" stroke-width="2.5"/>
      <path d="M 251 50 Q 298 78 345 50 L 345 40 A 49 49 0 0 0 251 40 Z" fill="#D81B60"/>
      <g transform="translate(298, 135)">
        <circle cx="0" cy="-12" r="8" fill="#FFFFFF"/><circle cx="12" cy="-3" r="8" fill="#FFFFFF"/>
        <circle cx="8" cy="11" r="8" fill="#FFFFFF"/><circle cx="-8" cy="11" r="8" fill="#FFFFFF"/>
        <circle cx="-12" cy="-3" r="8" fill="#FFFFFF"/><circle cx="0" cy="0" r="5.5" fill="#E85D88"/>
      </g>
      <g transform="translate(278, 205)">
        <circle cx="0" cy="-8" r="5.5" fill="#FFFFFF"/><circle cx="8" cy="-2" r="5.5" fill="#FFFFFF"/>
        <circle cx="5" cy="7" r="5.5" fill="#FFFFFF"/><circle cx="-5" cy="7" r="5.5" fill="#FFFFFF"/>
        <circle cx="-8" cy="-2" r="5.5" fill="#FFFFFF"/><circle cx="0" cy="0" r="4" fill="#F48FB1"/>
      </g>

      <rect x="378" y="25" width="96" height="265" rx="48" fill="url(#sheerBase)" stroke="#F48FB1" stroke-width="2.5"/>
      <path d="M 381 72 Q 426 98 471 72 L 471 62 A 47 47 0 0 0 381 62 Z" fill="#E85D88"/>
      <g transform="translate(426, 165)">
        <circle cx="0" cy="-11" r="7" fill="#FFFFFF"/><circle cx="11" cy="-3" r="7" fill="#FFFFFF"/>
        <circle cx="7" cy="10" r="7" fill="#FFFFFF"/><circle cx="-7" cy="10" r="7" fill="#FFFFFF"/>
        <circle cx="-11" cy="-3" r="7" fill="#FFFFFF"/><circle cx="0" cy="0" r="5" fill="#F48FB1"/>
      </g>

      <rect x="504" y="65" width="90" height="225" rx="45" fill="url(#sheerBase)" stroke="#F48FB1" stroke-width="2.5"/>
      <path d="M 507 110 Q 549 134 591 110 L 591 100 A 44 44 0 0 0 507 100 Z" fill="#E85D88"/>
    </g>

    <rect x="245" y="495" width="410" height="46" rx="23" fill="#FFFFFF" opacity="0.95" stroke="#F48FB1"/>
    <text x="450" y="523" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#880E4F" text-anchor="middle">Khansa Beauty Nails • Floral French Tip</text>
  </svg>
`);

// SVG 6: Pricelist Khansa Beauty Nails (Poster Daftar Harga Resmi)
const nailPricelistSvgUri = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650">
    <defs>
      <linearGradient id="plBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF9FB"/>
        <stop offset="55%" stop-color="#FFEFF4"/>
        <stop offset="100%" stop-color="#FFDCE7"/>
      </linearGradient>
      <linearGradient id="plHeader" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E85D88"/>
        <stop offset="100%" stop-color="#D81B60"/>
      </linearGradient>
    </defs>
    <rect width="900" height="650" fill="url(#plBg)"/>
    <rect x="42" y="34" width="816" height="582" rx="28" fill="#FFFFFF" stroke="#E85D88" stroke-width="2.5"/>
    <rect x="58" y="50" width="784" height="550" rx="20" fill="none" stroke="#F48FB1" stroke-width="1.5" stroke-dasharray="6 5"/>

    <rect x="235" y="76" width="430" height="36" rx="18" fill="url(#plHeader)"/>
    <text x="450" y="99" font-family="Arial, sans-serif" font-size="14" font-weight="bold" letter-spacing="3" fill="#FFFFFF" text-anchor="middle">OFFICIAL TREATMENT MENU</text>
    <text x="450" y="156" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="#2D1B22" text-anchor="middle">Khansa Beauty Nails</text>
    <text x="450" y="184" font-family="Arial, sans-serif" font-size="15" font-weight="bold" letter-spacing="2" fill="#D81B60" text-anchor="middle">PRICELIST &amp; SERVICES</text>

    <rect x="110" y="215" width="680" height="72" rx="16" fill="#FFF9FB" stroke="#FFDCE7" stroke-width="2"/>
    <text x="140" y="248" font-family="Georgia, serif" font-size="21" font-weight="bold" fill="#2D1B22">1. Nail Gel Polish</text>
    <text x="140" y="271" font-family="Arial, sans-serif" font-size="13" fill="#6E4E5B">Termasuk cuticle prep rapi, base coat, warna pilihan &amp; glossy top coat</text>
    <rect x="615" y="232" width="150" height="38" rx="19" fill="#FFEFF4" stroke="#F48FB1"/>
    <text x="690" y="257" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#D81B60" text-anchor="middle">Rp 45.000</text>

    <rect x="110" y="301" width="680" height="72" rx="16" fill="#FFF9FB" stroke="#FFDCE7" stroke-width="2"/>
    <text x="140" y="334" font-family="Georgia, serif" font-size="21" font-weight="bold" fill="#2D1B22">2. Custom Nail Art</text>
    <text x="140" y="357" font-family="Arial, sans-serif" font-size="13" fill="#6E4E5B">Desain hand-painted, coquette bow, chrome glaze, pearl &amp; charm</text>
    <rect x="615" y="318" width="150" height="38" rx="19" fill="#FFEFF4" stroke="#F48FB1"/>
    <text x="690" y="343" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#D81B60" text-anchor="middle">Rp 65.000+</text>

    <rect x="110" y="387" width="680" height="72" rx="16" fill="#FFF9FB" stroke="#FFDCE7" stroke-width="2"/>
    <text x="140" y="420" font-family="Georgia, serif" font-size="21" font-weight="bold" fill="#2D1B22">3. Nail Extension</text>
    <text x="140" y="443" font-family="Arial, sans-serif" font-size="13" fill="#6E4E5B">Soft gel tips extension (bentuk almond / coffin / square) + gel color</text>
    <rect x="615" y="404" width="150" height="38" rx="19" fill="#FFEFF4" stroke="#F48FB1"/>
    <text x="690" y="429" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#D81B60" text-anchor="middle">Rp 95.000</text>

    <rect x="110" y="473" width="680" height="72" rx="16" fill="#FFF9FB" stroke="#FFDCE7" stroke-width="2"/>
    <text x="140" y="506" font-family="Georgia, serif" font-size="21" font-weight="bold" fill="#2D1B22">4. Gel Removal</text>
    <text x="140" y="529" font-family="Arial, sans-serif" font-size="13" fill="#6E4E5B">Pembersihan gel polish lembut tanpa merusak kuku asli + vitamin kuku</text>
    <rect x="615" y="490" width="150" height="38" rx="19" fill="#FFEFF4" stroke="#F48FB1"/>
    <text x="690" y="515" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#D81B60" text-anchor="middle">Rp 25.000</text>

    <text x="450" y="582" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#880E4F" text-anchor="middle">Booking via WhatsApp: +62 812-3456-7890 • Instagram: @khansabeautynails</text>
  </svg>
`);

// SVG 7: Sertifikat Kompetensi Teknik Komputer dan Jaringan (TKJ) — SMKN 1 Blitar
const certificateSvgUri = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700" viewBox="0 0 1000 700">
    <defs>
      <linearGradient id="certBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF9FB"/>
        <stop offset="50%" stop-color="#FFEFF4"/>
        <stop offset="100%" stop-color="#FBECE8"/>
      </linearGradient>
      <linearGradient id="certGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E85D88"/>
        <stop offset="50%" stop-color="#D81B60"/>
        <stop offset="100%" stop-color="#C57664"/>
      </linearGradient>
    </defs>
    <rect width="1000" height="700" fill="url(#certBg)"/>
    <rect x="30" y="30" width="940" height="640" rx="26" fill="none" stroke="#E85D88" stroke-width="3.5"/>
    <rect x="46" y="46" width="908" height="608" rx="20" fill="none" stroke="#D99382" stroke-width="1.5" stroke-dasharray="8 6"/>

    <rect x="360" y="78" width="280" height="36" rx="18" fill="url(#certGold)"/>
    <text x="500" y="101" font-family="Arial, sans-serif" font-size="13" font-weight="bold" letter-spacing="3" fill="#FFFFFF" text-anchor="middle">SMK NEGERI 1 BLITAR</text>

    <text x="500" y="168" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="#2D1B22" text-anchor="middle">SERTIFIKAT KOMPETENSI</text>
    <text x="500" y="202" font-family="Arial, sans-serif" font-size="15" font-weight="bold" letter-spacing="3" fill="#D81B60" text-anchor="middle">TEKNIK KOMPUTER DAN JARINGAN (TKJ)</text>

    <text x="500" y="256" font-family="Arial, sans-serif" font-size="16" fill="#6E4E5B" text-anchor="middle">Diberikan dengan bangga kepada:</text>
    <text x="500" y="318" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="#2D1B22" text-anchor="middle">Khansa Sakhiya Putri</text>
    <line x1="230" y1="338" x2="770" y2="338" stroke="#E85D88" stroke-width="2"/>

    <text x="500" y="384" font-family="Arial, sans-serif" font-size="16" fill="#5E414D" text-anchor="middle">Telah menyelesaikan uji kompetensi keahlian dan dinyatakan kompeten pada bidang:</text>
    <text x="500" y="424" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#AD1457" text-anchor="middle">Administrasi Jaringan Komputer &amp; Basis Data MySQL</text>

    <rect x="355" y="458" width="290" height="38" rx="19" fill="#FFFFFF" stroke="#F48FB1" stroke-width="1.5"/>
    <text x="500" y="482" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#D81B60" text-anchor="middle">No. Reg: TKJ-SMKN1BLT-2026</text>

    <line x1="160" y1="585" x2="360" y2="585" stroke="#880E4F" stroke-width="1.5"/>
    <text x="260" y="608" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#5E414D" text-anchor="middle">Ketua Kompetensi Keahlian TKJ</text>

    <circle cx="500" cy="575" r="34" fill="#FFDCE7" stroke="#D81B60" stroke-width="2.5"/>
    <text x="500" y="573" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#D81B60" text-anchor="middle">KOMPETEN</text>
    <text x="500" y="588" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#880E4F" text-anchor="middle">TKJ • BLITAR</text>

    <line x1="640" y1="585" x2="840" y2="585" stroke="#880E4F" stroke-width="1.5"/>
    <text x="740" y="608" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#5E414D" text-anchor="middle">Kepala SMKN 1 Blitar</text>
  </svg>
`);

/**
 * 5. DATA KEAHLIAN BILINGUAL (TANPA PERSENTASE KOMPETENSI)
 */
const skillsData = {
  it: [
    {
      icon: 'database',
      name: { id: 'MySQL & Perancangan Database', en: 'MySQL & Database Design' },
      desc: {
        id: 'Pembuatan ERD, normalisasi tabel, relasi Primary/Foreign Key, dan query SQL.',
        en: 'ERD modeling, table normalization, Primary/Foreign Key relations, and SQL queries.'
      }
    },
    {
      icon: 'shopping-bag',
      name: { id: 'Aplikasi Kasir Berbasis Web', en: 'Web-Based Cashier Application' },
      desc: {
        id: 'Pengembangan sistem Point of Sale (POS) untuk pencatatan transaksi dan manajemen stok.',
        en: 'Developing Point of Sale (POS) systems for transaction tracking and inventory control.'
      }
    },
    {
      icon: 'network',
      name: { id: 'Jaringan Komputer Dasar (TKJ)', en: 'Computer Networking Fundamentals' },
      desc: {
        id: 'Konfigurasi jaringan lokal (LAN), pengalamatan IP, crimping kabel, dan routing dasar.',
        en: 'Local Area Network (LAN) setup, IP addressing, cabling, and basic routing configuration.'
      }
    },
    {
      icon: 'code',
      name: { id: 'HTML, CSS & Logika Pemrograman', en: 'HTML, CSS & Programming Logic' },
      desc: {
        id: 'Membangun tampilan antarmuka web responsif dan alur logika CRUD terstruktur.',
        en: 'Building responsive web interfaces and structured CRUD application logic.'
      }
    }
  ],
  nailish: [
    {
      icon: 'sparkles',
      name: { id: 'Nail Gel Polish & Manicure Prep', en: 'Nail Gel Polish & Manicure Prep' },
      desc: {
        id: 'Perawatan kutikula higienis dan aplikasi gel polish halus dengan hasil berkilau tahan lama.',
        en: 'Hygienic cuticle preparation and smooth gel polish application with long-lasting shine.'
      }
    },
    {
      icon: 'heart',
      name: { id: 'Custom Nail Art Design', en: 'Custom Nail Art Design' },
      desc: {
        id: 'Melukis desain coquette bow, floral minimalis, French tip, hingga aksen mutiara & charm.',
        en: 'Hand-painted coquette bows, minimalist florals, French tips, and pearl/charm accents.'
      }
    },
    {
      icon: 'gem',
      name: { id: 'Nail Extension & Gel Removal', en: 'Nail Extension & Gel Removal' },
      desc: {
        id: 'Pemasangan soft gel nail extension presisi serta pembersihan gel aman bagi kuku alami.',
        en: 'Precision soft gel nail extensions and gentle gel removal safe for natural nails.'
      }
    },
    {
      icon: 'store',
      name: { id: 'Manajemen Khansa Beauty Nails', en: 'Khansa Beauty Nails Management' },
      desc: {
        id: 'Pengelolaan jadwal booking pelanggan, katalog media sosial, dan pelayanan klien.',
        en: 'Managing client appointment bookings, social media catalogs, and customer care.'
      }
    }
  ]
};

/**
 * 6. DATA PORTOFOLIO BILINGUAL (SUDAH TERHUBUNG KE FILE .JPEG & DESKRIPSI TERBARU)
 */
const portfolioItems = [
  {
    id: 'it-mysql',
    category: 'it',
    badge: { id: 'Projek IT • Database', en: 'IT Project • Database' },
    title: { id: 'Sistem Database MySQL', en: 'MySQL Database System' },
    shortDesc: {
      id: 'Perancangan skema basis data relasional (ERD), normalisasi tabel 3NF, serta query SQL terstruktur untuk pengelolaan data transaksi.',
      en: 'Relational database schema design (ERD), 3NF table normalization, and structured SQL queries for transaction data management.'
    },
    fullDesc: {
      id: 'Dokumentasi lengkap projek Sistem Database MySQL yang dikerjakan pada kompetensi TKJ SMKN 1 Blitar. Mencakup perancangan Entity Relationship Diagram (ERD), relasi antar tabel pelanggan, produk, dan transaksi menggunakan Primary Key & Foreign Key, serta implementasi query JOIN untuk laporan data yang akurat.',
      en: 'Full documentation of the MySQL Database System project built during TKJ studies at SMKN 1 Blitar. Includes Entity Relationship Diagram (ERD) modeling, relational mapping across customer, product, and transaction tables with Primary/Foreign Keys, and JOIN queries for accurate reporting.'
    },
    meta1Label: { id: 'Teknologi', en: 'Technologies' },
    meta1Value: { id: 'MySQL, SQL Query, ERD Design, Normalisasi 3NF', en: 'MySQL, SQL Queries, ERD Design, 3NF Normalization' },
    meta2Label: { id: 'Status Projek', en: 'Project Status' },
    meta2Value: { id: 'Dokumentasi Praktikum TKJ • Selesai', en: 'TKJ Lab Documentation • Completed' },
    image: 'database.jpeg',
    githubUrl: null,
    actionUrl: null
  },
  {
    id: 'it-cashier',
    category: 'it',
    badge: { id: 'Projek IT • Web App', en: 'IT Project • Web App' },
    title: { id: 'Aplikasi Kasir Berbasis Web', en: 'Web-Based Cashier App' },
    shortDesc: {
      id: 'Aplikasi Point of Sale (POS) berbasis web untuk pencatatan transaksi penjualan, kalkulasi total otomatis, dan pembaruan stok.',
      en: 'Web-based Point of Sale (POS) application for recording sales transactions, automatic total calculation, and real-time stock updates.'
    },
    fullDesc: {
      id: 'Aplikasi Kasir Berbasis Web yang dirancang untuk membantu operasional usaha kecil maupun toko. Mendukung input item layanan/produk, perhitungan total pembayaran otomatis, pencatatan riwayat transaksi terintegrasi database MySQL, serta rekap pendapatan harian.',
      en: 'A Web-Based Cashier Application built to streamline small business and retail operations. Supports product/service item entry, automatic payment calculation, MySQL-integrated transaction history, and daily revenue summaries.'
    },
    meta1Label: { id: 'Tech Stack', en: 'Tech Stack' },
    meta1Value: { id: 'HTML, CSS, JavaScript, PHP & MySQL', en: 'HTML, CSS, JavaScript, PHP & MySQL' },
    meta2Label: { id: 'Repository', en: 'Repository' },
    meta2Value: { id: 'Tersedia di GitHub', en: 'Available on GitHub' },
    image: 'kasir.jpeg',
    githubUrl: 'https://github.com/khansasakhiya/aplikasi-kasir-web',
    actionLabel: { id: 'Buka Repository GitHub', en: 'Open GitHub Repository' },
    actionUrl: 'https://github.com/khansasakhiya/aplikasi-kasir-web'
  },
  {
    id: 'nail-result-1',
    category: 'nailish',
    badge: { id: 'Hasil Nail Art #1', en: 'Nail Art Result #1' },
    title: { id: 'Red Cat Eye', en: 'Red Cat Eye' },
    shortDesc: {
      id: 'Desain press-on nails dengan perpaduan warna merah yang elegan dan efek cat eye yang memberikan kilauan indah saat terkena cahaya. Tampilan ini menciptakan kesan mewah, anggun, dan menawan, cocok untuk kamu yang ingin tampil percaya diri dengan sentuhan kuku yang memikat.',
      en: 'A beautiful press-on nails design featuring an elegant red shade with a stunning cat-eye effect that creates a captivating shine under the light. This design brings a luxurious, graceful, and charming look, perfect for adding a touch of elegance to your style.'
    },
    fullDesc: {
      id: 'Desain press-on nails dengan perpaduan warna merah yang elegan dan efek cat eye yang memberikan kilauan indah saat terkena cahaya. Tampilan ini menciptakan kesan mewah, anggun, dan menawan, cocok untuk kamu yang ingin tampil percaya diri dengan sentuhan kuku yang memikat.',
      en: 'A beautiful press-on nails design featuring an elegant red shade with a stunning cat-eye effect that creates a captivating shine under the light. This design brings a luxurious, graceful, and charming look, perfect for adding a touch of elegance to your style.'
    },
    meta1Label: { id: 'Jenis & Efek', en: 'Style & Finish' },
    meta1Value: { id: 'Press-On Nails • Red Magnetic Cat Eye', en: 'Press-On Nails • Red Magnetic Cat Eye' },
    meta2Label: { id: 'Kesan Tampilan', en: 'Look & Vibe' },
    meta2Value: { id: 'Mewah, Anggun & Menawan', en: 'Luxurious, Graceful & Charming' },
    image: 'cateye.jpeg',
    githubUrl: null,
    actionLabel: { id: 'Tanya Desain Ini via WhatsApp', en: 'Inquire This Design on WhatsApp' },
    actionUrl: 'https://wa.me/6281234567890?text=halo%20kak%20mau%20tanya%20tanya%20tentang%20nails'
  },
  {
    id: 'nail-result-2',
    category: 'nailish',
    badge: { id: 'Hasil Nail Art #2', en: 'Nail Art Result #2' },
    title: { id: 'Red Nail Art Motif', en: 'Red Nail Art Motif' },
    shortDesc: {
      id: 'Desain kuku dengan perpaduan warna merah dan sentuhan motif nail art yang memberikan tampilan unik dan menarik. Setiap detail motif menambah keindahan kuku, menciptakan kesan manis, artistik, dan elegan.',
      en: 'A nail art design featuring a combination of red shades and beautiful artistic details. Each motif adds a unique and charming touch, creating a sweet, creative, and elegant look.'
    },
    fullDesc: {
      id: 'Desain kuku dengan perpaduan warna merah dan sentuhan motif nail art yang memberikan tampilan unik dan menarik. Setiap detail motif menambah keindahan kuku, menciptakan kesan manis, artistik, dan elegan.',
      en: 'A nail art design featuring a combination of red shades and beautiful artistic details. Each motif adds a unique and charming touch, creating a sweet, creative, and elegant look.'
    },
    meta1Label: { id: 'Teknik & Desain', en: 'Technique & Design' },
    meta1Value: { id: 'Red Shades & Hand-Painted Motif Art', en: 'Red Shades & Hand-Painted Motif Art' },
    meta2Label: { id: 'Kesan Tampilan', en: 'Look & Vibe' },
    meta2Value: { id: 'Manis, Artistik & Elegan', en: 'Sweet, Creative & Elegant' },
    image: 'estetik.jpeg',
    githubUrl: null,
    actionLabel: { id: 'Tanya Desain Ini via WhatsApp', en: 'Inquire This Design on WhatsApp' },
    actionUrl: 'https://wa.me/6281234567890?text=halo%20kak%20mau%20tanya%20tanya%20tentang%20nails'
  },
  {
    id: 'nail-result-3',
    category: 'nailish',
    badge: { id: 'Hasil Nail Art #3', en: 'Nail Art Result #3' },
    title: { id: 'Press-On Nails', en: 'Press-On Nails' },
    shortDesc: {
      id: 'Press-on nails merupakan kuku palsu praktis yang dapat dipasang dan dilepas dengan mudah. Dirancang agar bisa digunakan kembali, sehingga memberikan kemudahan bagi siapa saja untuk mengganti tampilan kuku sesuai keinginan.',
      en: 'Press-on nails are practical artificial nails that can be easily applied and removed. They are designed to be reusable, allowing you to change your nail look whenever you like.'
    },
    fullDesc: {
      id: 'Press-on nails merupakan kuku palsu praktis yang dapat dipasang dan dilepas dengan mudah. Dirancang agar bisa digunakan kembali, sehingga memberikan kemudahan bagi siapa saja untuk mengganti tampilan kuku sesuai keinginan.',
      en: 'Press-on nails are practical artificial nails that can be easily applied and removed. They are designed to be reusable, allowing you to change your nail look whenever you like.'
    },
    meta1Label: { id: 'Keunggulan', en: 'Key Features' },
    meta1Value: { id: 'Praktis, Mudah Dipasang & Reusable', en: 'Practical, Easy to Apply & Reusable' },
    meta2Label: { id: 'Cocok Untuk', en: 'Best For' },
    meta2Value: { id: 'Ganti Tampilan Kuku Kapan Saja', en: 'Switching Nail Looks Anytime' },
    image: 'kotak.jpeg',
    githubUrl: null,
    actionLabel: { id: 'Tanya Desain Ini via WhatsApp', en: 'Inquire This Design on WhatsApp' },
    actionUrl: 'https://wa.me/6281234567890?text=halo%20kak%20mau%20tanya%20tanya%20tentang%20nails'
  },
  {
    id: 'nail-pricelist',
    category: 'nailish',
    badge: { id: 'Pricelist Resmi', en: 'Official Pricelist' },
    title: { id: 'Pricelist Khansa Beauty Nails', en: 'Khansa Beauty Nails Pricelist' },
    shortDesc: {
      id: 'Daftar harga resmi berbagai layanan perawatan dan kecantikan kuku di Khansa Beauty Nails, mulai dari Nail Gel Polish, Custom Nail Art, Press-On Nails, Nail Extension, hingga Gel Removal. Dilengkapi rincian paket yang jelas dan terjangkau agar kamu lebih mudah memilih perawatan sesuai keinginan.',
      en: 'Official price list for nail care and beauty treatments at Khansa Beauty Nails, ranging from Nail Gel Polish, Custom Nail Art, Press-On Nails, and Nail Extensions to Gel Removal. Designed with clear and affordable package details so you can easily choose your preferred treatment.'
    },
    fullDesc: {
      id: 'Daftar harga resmi berbagai layanan perawatan dan kecantikan kuku di Khansa Beauty Nails, mulai dari Nail Gel Polish, Custom Nail Art, Press-On Nails, Nail Extension, hingga Gel Removal. Dilengkapi rincian paket yang jelas dan terjangkau agar kamu lebih mudah memilih perawatan kuku sesuai kebutuhan dan gaya favoritmu.',
      en: 'Official price list for nail care and beauty treatments at Khansa Beauty Nails, ranging from Nail Gel Polish, Custom Nail Art, Press-On Nails, and Nail Extensions to Gel Removal. Designed with clear and affordable package details so you can easily choose the treatment that best matches your needs and favorite style.'
    },
    meta1Label: { id: 'Daftar Layanan', en: 'Available Services' },
    meta1Value: { id: 'Gel Polish, Custom Nail Art, Press-On, Extension & Removal', en: 'Gel Polish, Custom Nail Art, Press-On, Extension & Removal' },
    meta2Label: { id: 'Reservasi', en: 'Booking' },
    meta2Value: { id: 'WhatsApp & Instagram @khansabeautynails', en: 'WhatsApp & Instagram @khansabeautynails' },
    image: 'pl.jpeg',
    githubUrl: null,
    actionLabel: { id: 'Booking Sekarang via WhatsApp', en: 'Book Now via WhatsApp' },
    actionUrl: 'https://wa.me/6281234567890?text=halo%20kak%20mau%20tanya%20tanya%20tentang%20nails'
  }
];

/**
 * 7. DATA SERTIFIKAT BILINGUAL (SUDAH TERHUBUNG KE SERTIF.JPEG)
 */
const certificateItem = {
  id: 'cert-tkj-smkn1blitar',
  badge: { id: 'Sertifikat Kompetensi • TKJ', en: 'Competency Certificate • TKJ' },
  title: {
    id: 'Sertifikat Kompetensi Teknik Komputer dan Jaringan (TKJ)',
    en: 'Competency Certificate in Computer and Network Engineering (TKJ)'
  },
  issuer: {
    id: 'Diterbitkan oleh SMKN 1 Blitar • Kompetensi Keahlian TKJ',
    en: 'Issued by SMKN 1 Blitar • Computer & Network Engineering Program'
  },
  fullDesc: {
    id: 'Sertifikat resmi yang menyatakan bahwa Khansa Sakhiya Putri telah mengikuti dan lulus uji kompetensi keahlian Teknik Komputer dan Jaringan (TKJ) di SMKN 1 Blitar.',
    en: 'Official certificate confirming that Khansa Sakhiya Putri has completed and passed the competency assessment in Computer and Network Engineering (TKJ) at SMKN 1 Blitar.'
  },
  meta1Label: { id: 'Institusi Penerbit', en: 'Issuing Institution' },
  meta1Value: { id: 'SMKN 1 Blitar (Jurusan TKJ)', en: 'SMKN 1 Blitar (TKJ Department)' },
  meta2Label: { id: 'Status Sertifikasi', en: 'Certification Status' },
  meta2Value: { id: 'Kompeten • Terverifikasi', en: 'Competent • Verified' },
  image: 'sertif.jpeg', // <-- Foto Sertifikat
  actionUrl: null
};

/**
 * 8. FUNGSI RENDER DAFTAR KEAHLIAN (TANPA PERSENTASE)
 */
function renderSkills() {
  const itContainer = document.getElementById('itSkillsContainer');
  const nailContainer = document.getElementById('nailSkillsContainer');
  if (!itContainer || !nailContainer) return;

  itContainer.innerHTML = skillsData.it.map(skill => `
    <div class="p-4 rounded-2xl bg-blush-50/80 border border-blush-200/80 hover:border-blush-400 transition-colors flex items-start gap-3.5">
      <span class="w-9 h-9 rounded-xl bg-blush-100 text-blush-600 flex items-center justify-center shrink-0 mt-0.5">
        <i data-lucide="${skill.icon}" class="w-4 h-4"></i>
      </span>
      <div class="space-y-1">
        <span class="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-white text-blush-800 border border-blush-200 shadow-2xs">
          ${skill.name[currentLang]}
        </span>
        <p class="text-xs sm:text-sm text-[#5E414D] leading-relaxed">
          ${skill.desc[currentLang]}
        </p>
      </div>
    </div>
  `).join('');

  nailContainer.innerHTML = skillsData.nailish.map(skill => `
    <div class="p-4 rounded-2xl bg-white/90 border border-rosegold-200 hover:border-blush-400 transition-colors flex items-start gap-3.5">
      <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-blush-500 to-rosegold-500 text-white flex items-center justify-center shrink-0 mt-0.5">
        <i data-lucide="${skill.icon}" class="w-4 h-4"></i>
      </span>
      <div class="space-y-1">
        <span class="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-blush-100 text-blush-800 border border-blush-200">
          ${skill.name[currentLang]}
        </span>
        <p class="text-xs sm:text-sm text-[#5E414D] leading-relaxed">
          ${skill.desc[currentLang]}
        </p>
      </div>
    </div>
  `).join('');
}

/**
 * 9. FUNGSI RENDER KARTU PORTOFOLIO & GALERI (STRICT FRAME CONTAINMENT)
 */
function renderPortfolio(filter = 'all') {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  const t = translations[currentLang];

  grid.innerHTML = filtered.map(item => {
    const isIt = item.category === 'it';
    return `
      <article
        onclick="openLightbox('portfolio', '${item.id}')"
        class="group cursor-pointer bg-white rounded-[1.85rem] overflow-hidden border border-blush-200 shadow-soft hover:border-blush-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
      >
        <!-- Bingkai Gambar Terbatas Tinggi Tetap 210px (Tidak Pernah Menutupi Judul & Penjelasan) -->
        <div class="gallery-image-frame bg-blush-100 border-b border-blush-100">
          <img
            src="${item.image}"
            alt="${item.title[currentLang]}"
            class="transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-blush-900/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-blush-800 text-[11px] font-bold shadow">
              <i data-lucide="maximize-2" class="w-3 h-3 text-blush-600"></i>
              ${t.card_hover_zoom}
            </span>
          </div>

          <!-- Badge Kategori -->
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm ${
            isIt
              ? 'bg-white/95 text-blush-800 border border-blush-200'
              : 'bg-gradient-to-r from-blush-500 to-blush-600 text-white'
          }">
            ${item.badge[currentLang]}
          </span>
        </div>

        <!-- Kontainer Teks Putih Solid Terpisah di Bawah Gambar -->
        <div class="card-body bg-white p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <h3 class="font-serif text-lg sm:text-xl font-bold text-blush-900 group-hover:text-blush-600 transition-colors">
              ${item.title[currentLang]}
            </h3>
            <p class="text-xs sm:text-sm text-[#6E4E5B] leading-relaxed">
              ${item.shortDesc[currentLang]}
            </p>
          </div>

          <!-- Footer Kartu: Tombol Full Dokumentasi + Link GitHub Khusus Aplikasi Kasir -->
          <div class="pt-3 border-t border-blush-100 flex items-center justify-between gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-blush-600 group-hover:text-blush-700"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
              <span>${t.card_full_doc}</span>
            </button>

            ${
              item.githubUrl
                ? `<a
                    href="${item.githubUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    onclick="event.stopPropagation()"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blush-100 hover:bg-blush-600 text-blush-800 hover:text-white transition-colors"
                  >
                    <i data-lucide="github" class="w-3.5 h-3.5"></i>
                    <span>GitHub</span>
                  </a>`
                : `<span class="text-[11px] font-semibold text-blush-500 bg-blush-50 px-2.5 py-1 rounded-lg border border-blush-200/70">
                    ${isIt ? 'SMKN 1 Blitar' : 'Khansa Beauty Nails'}
                  </span>`
            }
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * 10. FUNGSI RENDER SERTIFIKAT TUNGGAL (KOMPETENSI TKJ)
 */
function renderCertificate() {
  const container = document.getElementById('certificateContainer');
  if (!container) return;

  const t = translations[currentLang];

  container.innerHTML = `
    <article
      onclick="openLightbox('certificate', '${certificateItem.id}')"
      class="group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-blush-200 shadow-soft hover:border-blush-400 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <!-- Bingkai Gambar Sertifikat Terbatas Tinggi 240px -->
      <div class="certificate-image-frame bg-blush-100 border-b border-blush-100">
        <img
          src="${certificateItem.image}"
          alt="${certificateItem.title[currentLang]}"
          class="transition-transform duration-500 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-blush-900/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-blush-800 text-xs font-bold shadow-lg">
            <i data-lucide="zoom-in" class="w-4 h-4 text-blush-600"></i>
            ${t.cert_btn_preview}
          </span>
        </div>
      </div>

      <!-- Kontainer Teks Sertifikat Solid White di Bawah Gambar -->
      <div class="card-body bg-white p-6 sm:p-7 space-y-4">
        <div class="space-y-1.5">
          <span class="inline-block text-[11px] font-bold uppercase tracking-wider text-blush-600">
            ${certificateItem.badge[currentLang]}
          </span>
          <h3 class="font-serif text-xl sm:text-2xl font-bold text-blush-900 group-hover:text-blush-600 transition-colors">
            ${certificateItem.title[currentLang]}
          </h3>
          <p class="text-xs sm:text-sm text-[#6E4E5B]">
            ${certificateItem.issuer[currentLang]}
          </p>
        </div>

        <div class="pt-3 border-t border-blush-100">
          <button
            type="button"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-blush-50 group-hover:bg-blush-600 text-blush-700 group-hover:text-white border border-blush-200 group-hover:border-blush-600 transition-all"
          >
            <i data-lucide="file-check-2" class="w-4 h-4"></i>
            <span>${t.cert_btn_preview}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * 11. FUNGSI PENGALIH BAHASA DINAMIS (ID | EN)
 */
function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;

  // Perbarui gaya tombol aktif ID | EN pada Desktop & Mobile
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isSelected = btn.getAttribute('data-lang') === lang;
    if (isSelected) {
      btn.classList.add('bg-gradient-to-r', 'from-blush-500', 'to-blush-600', 'text-white', 'shadow-sm');
      btn.classList.remove('text-blush-700', 'hover:text-blush-900');
    } else {
      btn.classList.remove('bg-gradient-to-r', 'from-blush-500', 'to-blush-600', 'text-white', 'shadow-sm');
      btn.classList.add('text-blush-700', 'hover:text-blush-900');
    }
  });

  // Terapkan kamus terjemahan pada seluruh elemen [data-i18n]
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Render ulang komponen dinamis (Keahlian, Galeri Portofolio, Sertifikat, dan Modal jika terbuka)
  renderSkills();
  renderPortfolio(currentFilter);
  renderCertificate();
  if (!document.getElementById('lightboxModal').classList.contains('hidden')) {
    updateLightboxContent();
  }
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/**
 * 12. FILTER KATEGORI GALERI (SEMUA | PROJEK IT | KHANSA BEAUTY NAILS)
 */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('bg-gradient-to-r', 'from-blush-500', 'to-blush-600', 'text-white', 'shadow-sm');
      b.classList.add('text-blush-800', 'hover:bg-blush-100');
    });

    btn.classList.add('bg-gradient-to-r', 'from-blush-500', 'to-blush-600', 'text-white', 'shadow-sm');
    btn.classList.remove('text-blush-800', 'hover:bg-blush-100');

    currentFilter = btn.getAttribute('data-filter');
    renderPortfolio(currentFilter);
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });
});

/**
 * 13. KONTROL FULL-SCREEN LIGHTBOX MODAL
 */
const lightboxModal = document.getElementById('lightboxModal');
const modalImage = document.getElementById('modalImage');
const modalCategoryBadge = document.getElementById('modalCategoryBadge');
const modalCounter = document.getElementById('modalCounter');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalMeta1Label = document.getElementById('modalMeta1Label');
const modalMeta1Value = document.getElementById('modalMeta1Value');
const modalMeta2Label = document.getElementById('modalMeta2Label');
const modalMeta2Value = document.getElementById('modalMeta2Value');
const modalActionWrapper = document.getElementById('modalActionWrapper');
const modalActionLink = document.getElementById('modalActionLink');
const modalActionText = document.getElementById('modalActionText');
const prevModalBtn = document.getElementById('prevModalBtn');
const nextModalBtn = document.getElementById('nextModalBtn');

function openLightbox(type, itemId) {
  if (type === 'portfolio') {
    activeModalList = currentFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === currentFilter);
  } else {
    activeModalList = [certificateItem];
  }

  const idx = activeModalList.findIndex(item => item.id === itemId);
  currentModalIndex = idx >= 0 ? idx : 0;

  updateLightboxContent();
  lightboxModal.classList.remove('hidden');
  lightboxModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function updateLightboxContent() {
  const item = activeModalList[currentModalIndex];
  if (!item) return;

  modalImage.src = item.image;
  modalImage.alt = item.title[currentLang];
  modalCategoryBadge.textContent = item.badge[currentLang];
  modalCounter.textContent = `${currentModalIndex + 1} / ${activeModalList.length}`;
  modalTitle.textContent = item.title[currentLang];
  modalDescription.textContent = item.fullDesc[currentLang];
  modalMeta1Label.textContent = item.meta1Label[currentLang];
  modalMeta1Value.textContent = item.meta1Value[currentLang];
  modalMeta2Label.textContent = item.meta2Label[currentLang];
  modalMeta2Value.textContent = item.meta2Value[currentLang];

  // Sembunyikan panah navigasi jika hanya ada 1 item (misalnya Sertifikat)
  const showNav = activeModalList.length > 1;
  prevModalBtn.classList.toggle('hidden', !showNav);
  nextModalBtn.classList.toggle('hidden', !showNav);

  // Tampilkan tombol aksi hanya jika item memiliki actionUrl
  if (item.actionUrl && item.actionLabel) {
    modalActionWrapper.classList.remove('hidden');
    modalActionLink.href = item.actionUrl;
    modalActionText.textContent = item.actionLabel[currentLang];
  } else {
    modalActionWrapper.classList.add('hidden');
  }
}

function navigateModal(step) {
  if (activeModalList.length <= 1) return;
  currentModalIndex = (currentModalIndex + step + activeModalList.length) % activeModalList.length;
  updateLightboxContent();
}

function closeLightbox() {
  lightboxModal.classList.add('hidden');
  lightboxModal.classList.remove('flex');
  document.body.style.overflow = '';
}

document.getElementById('closeModalBtn').addEventListener('click', closeLightbox);
prevModalBtn.addEventListener('click', () => navigateModal(-1));
nextModalBtn.addEventListener('click', () => navigateModal(1));

lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (lightboxModal.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateModal(-1);
  if (e.key === 'ArrowRight') navigateModal(1);
});

// Dukungan Gestur Swipe Sentuh pada Modal Mobile
let touchStartX = 0;
lightboxModal.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightboxModal.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) {
    navigateModal(diff > 0 ? 1 : -1);
  }
}, { passive: true });

/**
 * 14. MENU HAMBURGER MOBILE
 */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIconOpen = document.getElementById('menuIconOpen');
const menuIconClose = document.getElementById('menuIconClose');

mobileMenuBtn.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuIconOpen.classList.toggle('hidden', isHidden);
  menuIconClose.classList.toggle('hidden', !isHidden);
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIconOpen.classList.remove('hidden');
    menuIconClose.classList.add('hidden');
  });
});

/**
 * 15. SALIN TEKS KE CLIPBOARD & NOTIFIKASI TOAST
 */
let toastTimer;
function showToast(text) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  toastMsg.textContent = text;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2600);
}

function copyToClipboard(value) {
  const tempInput = document.createElement('textarea');
  tempInput.value = value;
  tempInput.style.position = 'fixed';
  tempInput.style.opacity = '0';
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast(`${value} ${translations[currentLang].toast_copied}`);
  } catch (err) {
    showToast(value);
  }
  document.body.removeChild(tempInput);
}

/**
 * 16. ANIMASI SCROLL REVEAL & INISIALISASI HALAMAN
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

window.addEventListener('DOMContentLoaded', () => {
  setLanguage('id');
  initScrollReveal();
});