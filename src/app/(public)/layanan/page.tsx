import { Metadata } from 'next';
import Link from 'next/link';
import {
  Printer,
  Copy,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight,
  Phone,
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { ROUTES } from '@/config/navigation.config';
import { PRICING_CONFIG, formatPriceWithUnit } from '@/config/pricing.config';

export const metadata: Metadata = {
  title: 'Layanan & Daftar Harga Resmi',
  description:
    'Daftar harga resmi layanan percetakan, print warna, cetak pas foto, dan jilid di Print & Fotocopy AA Makassar. Transparan, cepat, dan terpercaya.',
};

interface ServiceItem {
  name: string;
  desc: string;
  price?: string;
  priceBadge?: string;
  minOrderNote?: string;
  specs: string[];
}

interface ServiceCategory {
  title: string;
  badge: string;
  icon: typeof Printer;
  description: string;
  items: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: 'Print Dokumen & Berkas',
    badge: 'Tarif Resmi',
    icon: Printer,
    description:
      'Pencetakan dokumen akademik, kantor, dan berkas pribadi dengan mesin cetak berkualitas, teks tajam, dan warna akurat.',
    items: [
      {
        name: PRICING_CONFIG.print.printHitamDiAtasSatu.name,
        desc: PRICING_CONFIG.print.printHitamDiAtasSatu.description,
        price: formatPriceWithUnit(PRICING_CONFIG.print.printHitamDiAtasSatu.price, PRICING_CONFIG.print.printHitamDiAtasSatu.unit),
        specs: ['Kertas HVS 70g & 80g', 'Ukuran A4 & F4', 'Berlaku untuk cetak > 1 lembar'],
      },
      {
        name: PRICING_CONFIG.print.printWarna.name,
        desc: PRICING_CONFIG.print.printWarna.description,
        price: formatPriceWithUnit(PRICING_CONFIG.print.printWarna.price, PRICING_CONFIG.print.printWarna.unit),
        specs: ['Warna proporsional & jelas', 'Cocok untuk materi presentasi & grafik', 'Kertas HVS A4 & F4'],
      },
      {
        name: PRICING_CONFIG.print.cetakGambar.name,
        desc: PRICING_CONFIG.print.cetakGambar.description,
        price: formatPriceWithUnit(PRICING_CONFIG.print.cetakGambar.price, PRICING_CONFIG.print.cetakGambar.unit),
        specs: ['Resolusi gambar visual tinggi', 'Tinta tajam & presisi', 'Bagan, grafik, dan ilustrasi'],
      },
      {
        name: PRICING_CONFIG.print.gambarKecil.name,
        desc: PRICING_CONFIG.print.gambarKecil.description,
        price: formatPriceWithUnit(PRICING_CONFIG.print.gambarKecil.price, PRICING_CONFIG.print.gambarKecil.unit),
        specs: ['Gambar ukuran kecil pada lembaran', 'Hemat untuk tugas sekolah/kuliah', 'Teks tetap terbaca jelas'],
      },
      {
        name: PRICING_CONFIG.print.edit.name,
        desc: PRICING_CONFIG.print.edit.description,
        price: formatPriceWithUnit(PRICING_CONFIG.print.edit.price, PRICING_CONFIG.print.edit.unit),
        specs: ['Bantuan perapian margin dokumen', 'Pengecekan tata letak sebelum print', 'Format skripsi/makalah'],
      },
    ],
  },
  {
    title: 'Cetak Foto Digital',
    badge: 'Min. 5 Lembar',
    icon: Sparkles,
    description:
      'Layanan cetak pas foto resmi instansi dan foto kenangan dengan kertas foto glossy premium berkualitas tinggi.',
    items: [
      {
        name: PRICING_CONFIG.photo.items.foto2x3.name,
        desc: PRICING_CONFIG.photo.items.foto2x3.description,
        price: formatPriceWithUnit(PRICING_CONFIG.photo.items.foto2x3.price, PRICING_CONFIG.photo.items.foto2x3.unit),
        minOrderNote: PRICING_CONFIG.photo.minOrderNote,
        specs: ['Ukuran standar 2x3 cm', 'Kertas foto glossy berkualitas', 'Bisa ganti warna latar (merah/biru)'],
      },
      {
        name: PRICING_CONFIG.photo.items.foto3x4.name,
        desc: PRICING_CONFIG.photo.items.foto3x4.description,
        price: formatPriceWithUnit(PRICING_CONFIG.photo.items.foto3x4.price, PRICING_CONFIG.photo.items.foto3x4.unit),
        minOrderNote: PRICING_CONFIG.photo.minOrderNote,
        specs: ['Ukuran standar 3x4 cm untuk ijazah', 'Hasil cetak tajam & tahan pudar', 'Kertas foto khusus'],
      },
      {
        name: PRICING_CONFIG.photo.items.foto4x6.name,
        desc: PRICING_CONFIG.photo.items.foto4x6.description,
        price: formatPriceWithUnit(PRICING_CONFIG.photo.items.foto4x6.price, PRICING_CONFIG.photo.items.foto4x6.unit),
        minOrderNote: PRICING_CONFIG.photo.minOrderNote,
        specs: ['Ukuran standar 4x6 cm buku nikah/lamaran', 'Warna cerah & akurat', 'Kertas glossy tebal'],
      },
      {
        name: PRICING_CONFIG.photo.items.foto3R.name,
        desc: PRICING_CONFIG.photo.items.foto3R.description,
        price: formatPriceWithUnit(PRICING_CONFIG.photo.items.foto3R.price, PRICING_CONFIG.photo.items.foto3R.unit),
        minOrderNote: PRICING_CONFIG.photo.minOrderNote,
        specs: ['Dimensi 8.9 x 12.7 cm', 'Cocok untuk album kenangan keluarga', 'Hasil cetak jernih'],
      },
      {
        name: PRICING_CONFIG.photo.items.foto4R.name,
        desc: PRICING_CONFIG.photo.items.foto4R.description,
        price: formatPriceWithUnit(PRICING_CONFIG.photo.items.foto4R.price, PRICING_CONFIG.photo.items.foto4R.unit),
        minOrderNote: PRICING_CONFIG.photo.minOrderNote,
        specs: ['Dimensi 10.2 x 15.2 cm (Ukuran populer)', 'Kualitas cetak foto profesional', 'Bahan awet'],
      },
      {
        name: PRICING_CONFIG.photo.items.foto5R.name,
        desc: PRICING_CONFIG.photo.items.foto5R.description,
        price: formatPriceWithUnit(PRICING_CONFIG.photo.items.foto5R.price, PRICING_CONFIG.photo.items.foto5R.unit),
        minOrderNote: PRICING_CONFIG.photo.minOrderNote,
        specs: ['Dimensi 12.7 x 17.8 cm', 'Ideal untuk bingkai foto meja & dinding', 'Detail warna tajam'],
      },
    ],
  },
  {
    title: 'Penjilidan & Finishing',
    badge: 'Rapi & Kuat',
    icon: BookOpen,
    description:
      'Finishing berkas tugas kuliah, makalah, laporan kerja, dan skripsi agar terlindung aman dan siap diserahkan.',
    items: [
      {
        name: PRICING_CONFIG.print.jilidWarna.name,
        desc: PRICING_CONFIG.print.jilidWarna.description,
        price: formatPriceWithUnit(PRICING_CONFIG.print.jilidWarna.price, PRICING_CONFIG.print.jilidWarna.unit),
        specs: ['Cover mika bening depan', 'Kertas buffalo belakang warna bebas', 'Lakban kuat & presisi'],
      },
      {
        name: 'Jilid Spiral Plastik & Kawat',
        desc: 'Memudahkan berkas dibuka 360 derajat untuk kalender, buku agenda, modul praktikum, dan portofolio.',
        priceBadge: 'Konsultasi WA',
        specs: ['Pilihan ring plastik atau kawat', 'Kapasitas hingga ratusan lembar', 'Pengerjaan cepat'],
      },
      {
        name: 'Jilid Hard Cover Skripsi & Tesis',
        desc: 'Standar baku penjilidan formal untuk sidang akhir, tesis, disertasi, dan laporan tahunan kantor.',
        priceBadge: 'Konsultasi WA',
        specs: ['Tulisan emas timbul (Hotprint / Foil)', 'Pita pembatas halaman', 'Kuat & tahan lama'],
      },
    ],
  },
  {
    title: 'Fotokopi & Penggandaan',
    badge: 'Cepat & Jelas',
    icon: Copy,
    description:
      'Layanan penggandaan berkas cepat, bersih, dan jelas untuk kebutuhan satuan maupun jumlah partai besar.',
    items: [
      {
        name: 'Fotokopi Dokumen Satuan / Lembaran',
        desc: 'Penggandaan berkas KTP, KK, ijazah, surat keputusan, dan dokumen resmi.',
        priceBadge: 'Konsultasi WA',
        specs: ['Ukuran A4 dan F4/Folio', 'Bisa 1 sisi atau bolak-balik (Duplex)', 'Kontras optimal'],
      },
      {
        name: 'Fotokopi Buku & Modul Pelajaran',
        desc: 'Penggandaan buku referensi, modul pelatihan, dan bahan kuliah tebal.',
        priceBadge: 'Konsultasi WA',
        specs: ['Kerapian halaman terjamin', 'Bisa langsung sekalian jilid', 'Pengerjaan cepat'],
      },
    ],
  },
  {
    title: 'Laminasi & Scan Dokumen',
    badge: 'Perlindungan Arsip',
    icon: Layers,
    description:
      'Perlindungan fisik dan digitalisasi dokumen berharga Anda agar tahan air, debu, dan awet sepanjang waktu.',
    items: [
      {
        name: 'Laminasi Panas (Thermal)',
        desc: 'Melindungi sertifikat, piagam, ijazah, ID card, dan kartu penting dari air dan sobek.',
        priceBadge: 'Konsultasi WA',
        specs: ['Plastik laminasi tebal & jernih', 'Ukuran KTP hingga F4', 'Rekat rapat tanpa gelembung'],
      },
      {
        name: 'Scan Dokumen ke PDF / Gambar',
        desc: 'Mengubah berkas fisik menjadi file digital beresolusi tinggi untuk pendaftaran online.',
        priceBadge: 'Konsultasi WA',
        specs: ['Format PDF atau JPG/PNG', 'Bisa kirim langsung ke WA/Email', 'File bersih & lurus'],
      },
    ],
  },
];

export default function LayananPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-200 py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-6">
              <Printer className="w-3.5 h-3.5" />
              Katalog Layanan & Daftar Harga Resmi
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
              Layanan Percetakan & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                Fotokopi {SITE_CONFIG.name}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Seluruh harga resmi Print AA tercantum transparan dan bersumber dari konfigurasi harga resmi. Anda dapat langsung
              mensimulasikan estimasi biaya cetak menggunakan Kalkulator Cetak interaktif kami.
            </p>
          </div>

          {/* Pricing Active Banner */}
          <div className="mt-10 p-6 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-emerald-600/20">
                <Check className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                  Daftar Tarif Resmi Aktif
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Terverifikasi
                  </span>
                </h2>
                <p className="text-sm text-emerald-850 leading-relaxed font-normal mt-0.5">
                  Print hitam mulai <strong>{formatPriceWithUnit(PRICING_CONFIG.print.printHitamDiAtasSatu.price, PRICING_CONFIG.print.printHitamDiAtasSatu.unit)}</strong>, print warna <strong>{formatPriceWithUnit(PRICING_CONFIG.print.printWarna.price, PRICING_CONFIG.print.printWarna.unit)}</strong>, jilid warna <strong>{formatPriceWithUnit(PRICING_CONFIG.print.jilidWarna.price, PRICING_CONFIG.print.jilidWarna.unit)}</strong>, dan pas foto mulai <strong>{formatPriceWithUnit(PRICING_CONFIG.photo.items.foto2x3.price, PRICING_CONFIG.photo.items.foto2x3.unit)}</strong> ({PRICING_CONFIG.photo.minOrderNote}).
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href={ROUTES.calculator}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
              >
                Simulasikan Biaya
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-custom space-y-16">
          {serviceCategories.map((category, catIdx) => {
            const Icon = category.icon;

            return (
              <div key={catIdx} className="bg-white rounded-3xl border border-gray-200/80 p-8 lg:p-10 shadow-sm">
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{category.title}</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200/60 text-xs font-semibold">
                          {category.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 font-normal">{category.description}</p>
                    </div>
                  </div>

                  <Link
                    href={ROUTES.calculator}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors self-start md:self-auto"
                  >
                    Hitung di Kalkulator
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-6 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-primary-200 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-snug">{item.name}</h3>
                          {item.price ? (
                            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0 shadow-sm">
                              {item.price}
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 shrink-0">
                              {item.priceBadge ?? 'Konsultasi WA'}
                            </span>
                          )}
                        </div>

                        {item.minOrderNote && (
                          <div className="mb-2">
                            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                              {item.minOrderNote}
                            </span>
                          </div>
                        )}

                        <p className="text-sm text-gray-600 mb-4 leading-relaxed font-normal">{item.desc}</p>
                        <ul className="space-y-2 mb-6">
                          {item.specs.map((spec, specIdx) => (
                            <li key={specIdx} className="flex items-start gap-2 text-xs text-gray-600 font-normal">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">Tersedia di Print AA</span>
                        <a
                          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                            `Halo Print & Fotocopy AA, saya ingin memesan layanan ${item.name}${item.price ? ` (${item.price})` : ''}. Mohon informasinya.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                          Pesan via WA
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quality Guarantees */}
      <section className="container-custom pt-8 pb-12">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-3">Komitmen Mutu & Transparansi Biaya</h2>
            <p className="text-gray-300 text-sm leading-relaxed font-normal">
              Setiap pesanan di Print AA dikerjakan dengan cermat demi memastikan hasil cetak rapi, bersih, dan sesuai tarif resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-700">
            <div className="flex items-start gap-3">
              <FileCheck2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Pengecekan Sebelum Cetak</h3>
                <p className="text-xs text-gray-400 mt-1 font-normal">Kami bantu periksa margin dan format berkas sebelum dicetak massal.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary-400 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Jaminan Kerapian Jilid</h3>
                <p className="text-xs text-gray-400 mt-1 font-normal">Menggunakan bahan cover berkualitas dan mesin presisi agar jilid awet.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Pemesanan Online Fleksibel</h3>
                <p className="text-xs text-gray-400 mt-1 font-normal">Cukup kirim dokumen via WhatsApp, datang langsung tinggal ambil.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
