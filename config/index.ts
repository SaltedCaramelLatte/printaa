/**
 * Configuration Index
 *
 * This file re-exports all configuration from organized config files
 * and contains content-specific configuration (HOME_CONTENT, ABOUT_CONTENT).
 *
 * Configuration is split into:
 * - site.config.ts - Site information, contact details
 * - domain.config.ts - Business domain categories and classifications
 * - navigation.config.ts - Routes and navigation structure
 */

// Re-export from organized config files
export { SITE_CONFIG } from './site.config';
export { ARTICLE_CATEGORIES, EVENT_CATEGORIES, DIVISIONS, GALLERY_CATEGORIES } from './domain.config';
export { ROUTES, ADMIN_ROUTES, AUTH_ROUTES, type RouteValue } from './navigation.config';

// =============================================================================
// CONTENT CONFIGURATION (Static Homepage & About Page)
// =============================================================================

/**
 * Home Settings Type Definition
 */
export interface HomeSettings {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    description: string;
    primaryCTA: {
      text: string;
      link: string;
    };
    secondaryCTA: {
      text: string;
      link: string;
    };
    backgroundImage: string;
    stats: readonly {
      value: string;
      label: string;
    }[];
  };
  features: {
    title: string;
    description: string;
    items: readonly {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  cta: {
    title: string;
    description: string;
    primaryCTA: {
      text: string;
      link: string;
    };
    secondaryCTA: {
      text: string;
      phone: string;
    };
  };
}

/**
 * About Settings Type Definition
 */
export interface AboutSettings {
  story: string;
  mission: readonly string[];
  vision: string;
  values: readonly {
    title: string;
    description: string;
    icon?: string;
  }[];
  statistics?: {
    activeMembers: string;
    eventsPerYear: string;
    divisions: string;
    yearsActive: string;
  };
  timeline: readonly {
    year: string;
    title: string;
    description: string;
  }[];
  affiliations?: readonly {
    name: string;
    type: string;
    description: string;
  }[];
  certifications?: readonly {
    name: string;
    year: string;
  }[];
}

/**
 * Homepage Content
 * Static content for the homepage sections
 */
export const HOME_CONTENT = {
  hero: {
    badge: 'Jasa Makassar',
    title: 'Printing & Fotokopi',
    titleHighlight: 'AA',
    subtitle: 'UIN Alauddin Makassar',
    description:
      'Murah, Cepat, Profesional, dan Terpercaya. Layanan percetakan dan fotokopi terbaik untuk kebutuhan akademik dan profesional Anda.',
    primaryCTA: {
      text: 'Kenali Kami',
      link: '/about',
    },
    secondaryCTA: {
      text: 'Lihat Program',
      link: '#features',
    },
    backgroundImage: '/images/hero-bg.jpg',
    stats: [
      { value: '3', label: 'Anggota Aktif' },
      { value: '78k+', label: 'Pesanan Offline' },
      { value: '23k+', label: 'Pesanan Online' },
    ],
  },
  features: {
    title: 'Layanan Kami',
    description: 'Solusi print, fotokopi, scan, dan kebutuhan cetak lainnya dengan hasil berkualitas dan harga bersahabat.',
    items: [
      {
        title: 'Print',
        description: 'Cetak dokumen hitam putih maupun warna dengan hasil tajam',
        icon: 'Printer',
      },
      {
        title: 'Fotokopi',
        description: 'Fotokopi cepat, rapi, dan berkualitas untuk berbagai kebutuhan',
        icon: 'Copy',
      },
      {
        title: 'Scan Dokumen',
        description: 'Scan dokumen dengan hasil jernih dalam format PDF maupun gambar',
        icon: 'FileText',
      },
      {
        title: 'Jilid',
        description: 'Layanan finishing agar dokumen lebih rapi, awet, dan profesional.',
        icon: 'BookOpen',
      },
    ],
  },
  cta: {
    title: 'Kontak Kami',
    description: 'Melayani kebutuhan cetak untuk pelajar, mahasiswa, dan umum. Hubungi kami untuk informasi lebih lanjut atau konsultasi layanan.',
    primaryCTA: {
      text: 'Hubungi Kami',
      link: '/contact',
    },
    secondaryCTA: {
      text: 'WhatsApp',
      phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6285343971885',
    },
  },
} as const;

/**
 * About Page Content
 * Static content for the about page sections
 */
export const ABOUT_CONTENT = {
  story: 'Berawal dari sebuah langkah sederhana, Print AA tumbuh menjadi penyedia layanan print dan fotokopi yang dipercaya banyak pelanggan. Kami terus berinovasi untuk memberikan hasil terbaik dengan proses yang cepat dan pelayanan yang ramah.',
  mission: [
    'Memberikan layanan print dan fotokopi yang cepat serta berkualitas. ', 
    'Mengutamakan kepuasan pelanggan melalui pelayanan yang ramah. ',
    'Menyediakan harga yang terjangkau tanpa mengurangi kualitas. ',
    'Terus berinovasi mengikuti perkembangan teknologi percetakan',
  ],
  vision:
    'Menjadi mitra terpercaya untuk kebutuhan print, fotokopi, dan layanan dokumen lainnya',
  values: [
    {
      title: 'Integritas',
      description: 'Menjunjung tinggi kejujuran, tanggung jawab, dan profesionalisme dalam setiap layanan.',
      icon: 'BookOpen',
    },
    {
      title: 'Kolaborasi',
      description: 'Bekerja sama untuk mencapai tujuan bersama',
      icon: 'Users',
    },
    {
      title: 'Inovasi',
      description: 'Terus berinovasi dalam semua program dan aktivitas kami',
      icon: 'HeartHandshake',
    },
    {
      title: 'Dedikasi',
      description: 'Sepenuhnya berkomitmen pada pertumbuhan organisasi dan keunggulan',
      icon: 'Briefcase',
    },
  ],
  statistics: {
    activeMembers: '3+',
    eventsPerYear: '20+',
    divisions: '8',
    yearsActive: '2022',
  },
  timeline: [
    {
      year: '2022',
      title: 'Awal Perjalanan',
      description: 'Memulai usaha dengan hanya 1 perangkat dan semangat memberikan layanan terbaik',
    },
    {
      year: '2023',
      title: 'Pertumbuhan & Ekspansi',
      description: 'Menerima lebih banyak pesanan dan memperluas layanan ke berbagai segmen pelanggan',
    },
    {
      year: '2024',
      title: 'Pengembangan Layanan',
      description: 'Meningkatkan kualitas layanan dan memperkenalkan inovasi baru untuk memenuhi kebutuhan pelanggan',
    },
    {
      year: '2025',
      title: 'Kepercayaan Pelanggan',
      description: 'Mendapatkan kepercayaan dari pelanggan setia dan menjadi pilihan utama untuk layanan print dan fotokopi di wilayah kami',
    },
    {
      year: '2026',
      title: 'Terus Berkembang',
      description: 'Berkomitmen untuk terus berkembang, berinovasi, dan memberikan layanan terbaik bagi pelanggan kami',
    }
  ],
  affiliations: [
    {
      name: 'akasaproject.id',
      type: 'Furniture & Interior',
      description: 'Mitra terpercaya untuk kebutuhan furniture dan interior berkualitas',
    },
    {
      name: 'ctngr.idn',
      type: 'Clothing & Apparel',
      description: 'Mitra terpercaya untuk kebutuhan pakaian dan apparel berkualitas',
    },
    {
      name: 'Ilham Ducting',
      type: 'airflow & ducting',
      description: 'Mitra terpercaya untuk kebutuhan airflow dan ducting berkualitas',
    },
  ],
  certifications: [
    {
      name: 'Quality Certification',
      year: '2023',
    },
    {
      name: 'ISO 9001:2015',
      year: '2022',
    },
  ],
} as const;
