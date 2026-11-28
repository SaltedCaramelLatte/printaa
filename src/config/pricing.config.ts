/**
 * Pricing Configuration - Print & Fotocopy AA
 *
 * Konfigurasi terpusat seluruh daftar harga layanan resmi Print AA.
 * Semua nilai harga wajib dikelola dari file ini. Jika ingin menaikkan atau menurunkan harga,
 * cukup ubah angka di file ini dan seluruh halaman website (Katalog Layanan & Kalkulator)
 * akan otomatis mengikuti perubahan tersebut.
 */

export interface PricingItem {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly unit: string;
  readonly description?: string;
  readonly minOrder?: number;
}

export interface PhotoPricingItem extends PricingItem {
  readonly size: string;
}

export const PRICING_CONFIG = {
  // =========================================================================
  // 1. LAYANAN PRINT & JILID
  // =========================================================================
  print: {
    printWarna: {
      id: 'print_warna',
      name: 'Print Warna',
      price: 1000,
      unit: '/lembar',
      description: 'Cetak dokumen teks dan gambar berwarna proporsional',
    },
    gambarKecil: {
      id: 'gambar_kecil',
      name: 'Gambar Kecil',
      price: 1000,
      unit: '/lembar',
      description: 'Cetak gambar berukuran kecil pada lembar dokumen',
    },
    edit: {
      id: 'edit_dokumen',
      name: 'Jasa Edit Dokumen',
      price: 1000,
      unit: '/lembar',
      description: 'Penyesuaian margin, perapian tata letak, dan format file',
    },
    printHitamDiAtasSatu: {
      id: 'print_hitam',
      name: 'Print Hitam (di atas 1 lembar)',
      price: 500,
      unit: '/lembar',
      description: 'Cetak teks hitam putih untuk pesanan lebih dari 1 lembar',
    },
    cetakGambar: {
      id: 'cetak_gambar',
      name: 'Cetak Gambar',
      price: 1000,
      unit: '/lembar',
      description: 'Cetak grafis, gambar, atau bagan visual',
    },
    jilidWarna: {
      id: 'jilid_warna',
      name: 'Jilid Warna',
      price: 5000,
      unit: '/buku',
      description: 'Penjilidan rapi dengan cover mika bening dan bufalo warna',
    },
  },

  // =========================================================================
  // 2. CETAK FOTO (Minimal pemesanan: 5 lembar)
  // =========================================================================
  photo: {
    minOrder: 5,
    minOrderNote: 'Minimal pemesanan: 5 lembar',
    items: {
      foto2x3: {
        id: 'foto_2x3',
        name: 'Pas Foto 2x3',
        size: '2x3 cm',
        price: 1000,
        unit: '/lembar',
        minOrder: 5,
        description: 'Ukuran pas foto 2x3 cm untuk berkas pendaftaran',
      },
      foto3x4: {
        id: 'foto_3x4',
        name: 'Pas Foto 3x4',
        size: '3x4 cm',
        price: 1000,
        unit: '/lembar',
        minOrder: 5,
        description: 'Ukuran pas foto 3x4 cm untuk ijazah dan dokumen resmi',
      },
      foto4x6: {
        id: 'foto_4x6',
        name: 'Pas Foto 4x6',
        size: '4x6 cm',
        price: 1500,
        unit: '/lembar',
        minOrder: 5,
        description: 'Ukuran pas foto 4x6 cm standar buku nikah dan instansi',
      },
      foto3R: {
        id: 'foto_3R',
        name: 'Cetak Foto 3R',
        size: '8.9 x 12.7 cm (3R)',
        price: 3000,
        unit: '/lembar',
        minOrder: 5,
        description: 'Cetak foto ukuran 3R dengan kertas foto glossy',
      },
      foto4R: {
        id: 'foto_4R',
        name: 'Cetak Foto 4R',
        size: '10.2 x 15.2 cm (4R)',
        price: 4000,
        unit: '/lembar',
        minOrder: 5,
        description: 'Cetak foto ukuran album 4R dengan hasil tajam',
      },
      foto5R: {
        id: 'foto_5R',
        name: 'Cetak Foto 5R',
        size: '12.7 x 17.8 cm (5R)',
        price: 5000,
        unit: '/lembar',
        minOrder: 5,
        description: 'Cetak foto ukuran bingkai 5R berkualitas tinggi',
      },
    },
  },
} as const;

/**
 * Format angka nominal ke format Rupiah Indonesia yang rapi dan konsisten
 * Contoh:
 * formatRupiah(1000) -> "Rp1.000"
 * formatRupiah(500)  -> "Rp500"
 */
export function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

/**
 * Format harga beserta satuannya
 * Contoh:
 * formatPriceWithUnit(1000, "/lembar") -> "Rp1.000/lembar"
 */
export function formatPriceWithUnit(amount: number, unit: string): string {
  return `${formatRupiah(amount)}${unit}`;
}
