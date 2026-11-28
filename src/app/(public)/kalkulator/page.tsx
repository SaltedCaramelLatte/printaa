'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Printer,
  Copy,
  BookOpen,
  Send,
  HelpCircle,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { ROUTES } from '@/config/navigation.config';
import {
  PRICING_CONFIG,
  formatRupiah,
  formatPriceWithUnit,
} from '@/config/pricing.config';

type ServiceType = 'print' | 'photo' | 'binding' | 'photocopy';
type PrintMode = 'bw' | 'color' | 'image' | 'small_image';
type PhotoSizeKey = keyof typeof PRICING_CONFIG.photo.items;
type BindingOption = 'none' | 'jilid_warna' | 'spiral' | 'hardcover';

export default function KalkulatorPage(): JSX.Element {
  const [serviceType, setServiceType] = useState<ServiceType>('print');
  const [paperSize, setPaperSize] = useState<'A4' | 'F4'>('A4');
  const [printMode, setPrintMode] = useState<PrintMode>('color');
  const [photoSize, setPhotoSize] = useState<PhotoSizeKey>('foto3x4');
  const [withEdit, setWithEdit] = useState<boolean>(false);
  const [sheetCount, setSheetCount] = useState<number>(10);
  const [setCount, setSetCount] = useState<number>(1);
  const [bindingType, setBindingType] = useState<BindingOption>('none');
  const [notes, setNotes] = useState<string>('');

  const totalSheets = Math.max(1, sheetCount) * Math.max(1, setCount);

  // Perhitungan Biaya Cetak berdasarkan PRICING_CONFIG
  const getPrintUnitPrice = (): number => {
    switch (printMode) {
      case 'bw':
        // Jika di atas 1 lembar gunakan harga 500/lbr, jika 1 lembar 1000
        return totalSheets > 1
          ? PRICING_CONFIG.print.printHitamDiAtasSatu.price
          : PRICING_CONFIG.print.printWarna.price;
      case 'color':
        return PRICING_CONFIG.print.printWarna.price;
      case 'image':
        return PRICING_CONFIG.print.cetakGambar.price;
      case 'small_image':
        return PRICING_CONFIG.print.gambarKecil.price;
      default:
        return PRICING_CONFIG.print.printWarna.price;
    }
  };

  const getPhotoUnitPrice = (): number => {
    return PRICING_CONFIG.photo.items[photoSize].price;
  };

  const getBindingPricePerSet = (): number => {
    if (bindingType === 'jilid_warna') {
      return PRICING_CONFIG.print.jilidWarna.price;
    }
    return 0;
  };

  const isExactPricing =
    serviceType === 'print' ||
    serviceType === 'photo' ||
    (serviceType === 'binding' && bindingType === 'jilid_warna');

  // Kalkulasi subtotal
  let printCost = 0;
  let photoCost = 0;
  let editCost = 0;
  let bindingCost = 0;

  if (serviceType === 'print') {
    printCost = totalSheets * getPrintUnitPrice();
    if (withEdit) {
      editCost = totalSheets * PRICING_CONFIG.print.edit.price;
    }
    bindingCost = Math.max(1, setCount) * getBindingPricePerSet();
  } else if (serviceType === 'photo') {
    photoCost = totalSheets * getPhotoUnitPrice();
  } else if (serviceType === 'binding') {
    bindingCost = Math.max(1, setCount) * getBindingPricePerSet();
  }

  const grandTotal = printCost + photoCost + editCost + bindingCost;

  // Validasi minimal order foto
  const isPhotoBelowMin = serviceType === 'photo' && sheetCount < PRICING_CONFIG.photo.minOrder;

  const resetForm = (): void => {
    setServiceType('print');
    setPaperSize('A4');
    setPrintMode('color');
    setPhotoSize('foto3x4');
    setWithEdit(false);
    setSheetCount(10);
    setSetCount(1);
    setBindingType('none');
    setNotes('');
  };

  // Label helpers
  const serviceLabels: Record<ServiceType, string> = {
    print: 'Print Dokumen & Berkas',
    photo: 'Cetak Foto Digital',
    binding: 'Penjilidan Dokumen Saja',
    photocopy: 'Fotokopi Dokumen',
  };

  const printModeLabels: Record<PrintMode, { title: string; priceText: string }> = {
    color: {
      title: PRICING_CONFIG.print.printWarna.name,
      priceText: formatPriceWithUnit(PRICING_CONFIG.print.printWarna.price, PRICING_CONFIG.print.printWarna.unit),
    },
    bw: {
      title: 'Print Hitam Putih (B/W)',
      priceText: formatPriceWithUnit(PRICING_CONFIG.print.printHitamDiAtasSatu.price, PRICING_CONFIG.print.printHitamDiAtasSatu.unit) + ' (>1 lbr)',
    },
    image: {
      title: PRICING_CONFIG.print.cetakGambar.name,
      priceText: formatPriceWithUnit(PRICING_CONFIG.print.cetakGambar.price, PRICING_CONFIG.print.cetakGambar.unit),
    },
    small_image: {
      title: PRICING_CONFIG.print.gambarKecil.name,
      priceText: formatPriceWithUnit(PRICING_CONFIG.print.gambarKecil.price, PRICING_CONFIG.print.gambarKecil.unit),
    },
  };

  const bindingLabels: Record<BindingOption, string> = {
    none: 'Tanpa Jilid (Lembaran)',
    jilid_warna: `${PRICING_CONFIG.print.jilidWarna.name} (${formatPriceWithUnit(PRICING_CONFIG.print.jilidWarna.price, PRICING_CONFIG.print.jilidWarna.unit)})`,
    spiral: 'Jilid Spiral Kawat/Plastik (Konsultasi WA)',
    hardcover: 'Jilid Hard Cover Skripsi/Tesis (Konsultasi WA)',
  };

  // Generate WhatsApp order message with official calculated prices
  const generateWhatsAppMessage = (): string => {
    let msg = `Halo ${SITE_CONFIG.name}, saya ingin memesan cetak dengan estimasi rincian sebagai berikut:\n\n`;
    msg += `📄 *Layanan*: ${serviceLabels[serviceType]}\n`;

    if (serviceType === 'print') {
      msg += `📐 *Ukuran Kertas*: ${paperSize}\n`;
      msg += `🎨 *Mode Cetak*: ${printModeLabels[printMode].title} (${printModeLabels[printMode].priceText})\n`;
      if (withEdit) {
        msg += `✏️ *Jasa Edit Dokumen*: Ya (${formatPriceWithUnit(PRICING_CONFIG.print.edit.price, PRICING_CONFIG.print.edit.unit)})\n`;
      }
      msg += `📑 *Volume*: ${sheetCount} lembar × ${setCount} set (${totalSheets} lembar total)\n`;
      if (bindingType !== 'none') {
        msg += `📚 *Finishing Jilid*: ${bindingLabels[bindingType]}\n`;
      }
    } else if (serviceType === 'photo') {
      const p = PRICING_CONFIG.photo.items[photoSize];
      msg += `🖼️ *Ukuran Foto*: ${p.name} (${p.size}) - ${formatPriceWithUnit(p.price, p.unit)}\n`;
      msg += `📑 *Jumlah Cetak*: ${sheetCount} lembar × ${setCount} set (${totalSheets} lembar foto)\n`;
    } else if (serviceType === 'binding') {
      msg += `📚 *Pilihan Jilid*: ${bindingLabels[bindingType]}\n`;
      msg += `📦 *Jumlah Buku*: ${setCount} buku (${sheetCount} lembar/buku)\n`;
    } else {
      msg += `📑 *Volume*: ${sheetCount} lembar × ${setCount} set\n`;
    }

    if (notes.trim()) {
      msg += `📝 *Catatan Khusus*: ${notes.trim()}\n`;
    }

    if (isExactPricing && grandTotal > 0) {
      msg += `\n💰 *Total Estimasi Tarif Resmi*: ${formatRupiah(grandTotal)}\n`;
    } else {
      msg += `\n💰 *Tarif*: Mohon konfirmasi total resmi dari admin.\n`;
    }

    msg += `\nMohon dicek dan konfirmasi ketersediaannya. Berkas dokumen/foto akan saya kirimkan setelah pesan ini. Terima kasih!`;
    return msg;
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    generateWhatsAppMessage()
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-24">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            Kalkulator Estimasi Biaya Resmi Print AA
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Kalkulator Estimasi Biaya Cetak
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Simulasikan kebutuhan cetak berkas dokumen, pas foto, dan penjilidan Anda secara otomatis. Perhitungan menggunakan
            daftar tarif resmi Print AA dan langsung tersusun ke draf pesan WhatsApp.
          </p>

          {/* Pricing Policy Notice */}
          <div className="mt-8 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4" strokeWidth={3} />
            </div>
            <div className="text-sm text-emerald-900 leading-relaxed font-normal">
              <strong className="font-semibold">Tarif Terpusat & Akurat:</strong> Seluruh perhitungan pada kalkulator ini terhubung langsung ke konfigurasi harga resmi. Anda dapat langsung melihat rincian biaya tanpa kalkulasi manual dan mengirimkannya ke WhatsApp resmi toko.
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Form */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-8">
              {/* Step 1: Jenis Layanan */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  1. Pilih Jenis Layanan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setServiceType('print');
                      if (sheetCount < 1) {
                        setSheetCount(10);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      serviceType === 'print'
                        ? 'border-primary-600 bg-primary-50/80 text-primary-900 font-semibold ring-2 ring-primary-500/20 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                    }`}
                  >
                    <Printer className="w-5 h-5 mx-auto mb-1.5 text-primary-600" />
                    <span className="text-xs block">Print Dokumen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setServiceType('photo');
                      if (sheetCount < PRICING_CONFIG.photo.minOrder) {
                        setSheetCount(PRICING_CONFIG.photo.minOrder);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      serviceType === 'photo'
                        ? 'border-primary-600 bg-primary-50/80 text-primary-900 font-semibold ring-2 ring-primary-500/20 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 mx-auto mb-1.5 text-primary-600" />
                    <span className="text-xs block">Cetak Foto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('binding')}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      serviceType === 'binding'
                        ? 'border-primary-600 bg-primary-50/80 text-primary-900 font-semibold ring-2 ring-primary-500/20 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                    }`}
                  >
                    <BookOpen className="w-5 h-5 mx-auto mb-1.5 text-primary-600" />
                    <span className="text-xs block">Jilid Saja</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('photocopy')}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      serviceType === 'photocopy'
                        ? 'border-primary-600 bg-primary-50/80 text-primary-900 font-semibold ring-2 ring-primary-500/20 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                    }`}
                  >
                    <Copy className="w-5 h-5 mx-auto mb-1.5 text-primary-600" />
                    <span className="text-xs block">Fotokopi</span>
                  </button>
                </div>
              </div>

              {/* Sub-form: PRINT DOKUMEN */}
              {serviceType === 'print' && (
                <>
                  {/* Step 2: Ukuran Kertas */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                      2. Ukuran Kertas
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['A4', 'F4'] as const).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setPaperSize(size)}
                          className={`py-3 px-4 rounded-xl border text-sm transition-all ${
                            paperSize === size
                              ? 'border-primary-600 bg-primary-50 text-primary-900 font-bold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                          }`}
                        >
                          Kertas {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Mode Cetak & Tarif */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                      3. Mode Cetak & Tarif Resmi
                    </label>
                    <div className="space-y-2.5">
                      {(['color', 'bw', 'image', 'small_image'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setPrintMode(mode)}
                          className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                            printMode === mode
                              ? 'border-primary-600 bg-primary-50/70 text-primary-900 font-semibold'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                          }`}
                        >
                          <div>
                            <span className="text-sm block">{printModeLabels[mode].title}</span>
                            <span className="text-xs text-emerald-700 font-bold">
                              {printModeLabels[mode].priceText}
                            </span>
                          </div>
                          {printMode === mode && <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3b: Opsi Edit Dokumen */}
                  <div>
                    <label
                      onClick={() => setWithEdit(!withEdit)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        withEdit
                          ? 'border-primary-600 bg-primary-50/70 text-primary-900'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={withEdit}
                          onChange={(e) => setWithEdit(e.target.checked)}
                          className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <div>
                          <span className="text-sm font-semibold block">{PRICING_CONFIG.print.edit.name}</span>
                          <span className="text-xs text-gray-500 font-normal">
                            Bantuan tata letak & margin ({formatPriceWithUnit(PRICING_CONFIG.print.edit.price, PRICING_CONFIG.print.edit.unit)})
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-primary-700">
                        +{formatPriceWithUnit(PRICING_CONFIG.print.edit.price, PRICING_CONFIG.print.edit.unit)}
                      </span>
                    </label>
                  </div>

                  {/* Step 4: Finishing Jilid */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
                      4. Finishing Penjilidan
                    </label>
                    <select
                      value={bindingType}
                      onChange={(e) => setBindingType(e.target.value as BindingOption)}
                      className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 focus:outline-none focus:border-primary-500"
                    >
                      <option value="none">Tanpa Jilid (Lembaran Lepas)</option>
                      <option value="jilid_warna">
                        {PRICING_CONFIG.print.jilidWarna.name} (+{formatPriceWithUnit(PRICING_CONFIG.print.jilidWarna.price, PRICING_CONFIG.print.jilidWarna.unit)})
                      </option>
                      <option value="spiral">Jilid Spiral Kawat / Plastik (Konsultasi WA)</option>
                      <option value="hardcover">Jilid Hard Cover Skripsi / Tesis (Konsultasi WA)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Sub-form: CETAK FOTO DIGITAL */}
              {serviceType === 'photo' && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider">
                        2. Pilih Ukuran Pas Foto / Cetak Foto
                      </label>
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {PRICING_CONFIG.photo.minOrderNote}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {(Object.keys(PRICING_CONFIG.photo.items) as PhotoSizeKey[]).map((key) => {
                        const item = PRICING_CONFIG.photo.items[key];
                        const isSelected = photoSize === key;

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setPhotoSize(key)}
                            className={`p-3.5 rounded-2xl border text-left transition-all ${
                              isSelected
                                ? 'border-primary-600 bg-primary-50/70 text-primary-900 ring-2 ring-primary-500/20'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                            }`}
                          >
                            <span className="text-sm font-semibold block">{item.name}</span>
                            <span className="text-xs text-gray-500 block mb-1">{item.size}</span>
                            <span className="text-xs font-bold text-emerald-700">
                              {formatPriceWithUnit(item.price, item.unit)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Sub-form: JILID DOKUMEN SAJA */}
              {serviceType === 'binding' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    2. Pilih Jenis Jilid
                  </label>
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setBindingType('jilid_warna')}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        bindingType === 'jilid_warna'
                          ? 'border-primary-600 bg-primary-50/70 text-primary-900 font-semibold'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                      }`}
                    >
                      <div>
                        <span className="text-sm block">{PRICING_CONFIG.print.jilidWarna.name} (Mika + Bufalo)</span>
                        <span className="text-xs text-emerald-700 font-bold">
                          {formatPriceWithUnit(PRICING_CONFIG.print.jilidWarna.price, PRICING_CONFIG.print.jilidWarna.unit)}
                        </span>
                      </div>
                      {bindingType === 'jilid_warna' && <CheckCircle2 className="w-5 h-5 text-primary-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setBindingType('spiral')}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        bindingType === 'spiral'
                          ? 'border-primary-600 bg-primary-50/70 text-primary-900 font-semibold'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                      }`}
                    >
                      <div>
                        <span className="text-sm block">Jilid Spiral Kawat / Plastik</span>
                        <span className="text-xs text-gray-500">Tarif dikonfirmasi via WhatsApp</span>
                      </div>
                      {bindingType === 'spiral' && <CheckCircle2 className="w-5 h-5 text-primary-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setBindingType('hardcover')}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        bindingType === 'hardcover'
                          ? 'border-primary-600 bg-primary-50/70 text-primary-900 font-semibold'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white font-medium'
                      }`}
                    >
                      <div>
                        <span className="text-sm block">Jilid Hard Cover Skripsi / Tesis</span>
                        <span className="text-xs text-gray-500">Tarif dikonfirmasi via WhatsApp</span>
                      </div>
                      {bindingType === 'hardcover' && <CheckCircle2 className="w-5 h-5 text-primary-600" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Sub-form: FOTOKOPI */}
              {serviceType === 'photocopy' && (
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-sm text-amber-900 space-y-2">
                  <div className="font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    Layanan Penggandaan & Fotokopi
                  </div>
                  <p className="text-xs leading-relaxed text-amber-800">
                    Tarif fotokopi disesuaikan dengan volume berkas (satuan/buku) serta opsi bolak-balik (duplex).
                    Tentukan jumlah lembar di bawah dan kirim rincian ke WhatsApp untuk konfirmasi biaya langsung.
                  </p>
                </div>
              )}

              {/* Step Volume: Jumlah Lembar & Rangkap */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      {serviceType === 'photo' ? 'Jumlah Lembar Foto' : 'Jumlah Lembar Dokumen'}
                    </label>
                    {serviceType === 'photo' && (
                      <span className="text-[11px] font-bold text-amber-700">Min. 5</span>
                    )}
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setSheetCount((prev) => Math.max(serviceType === 'photo' ? 5 : 1, prev - 1))}
                      className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={serviceType === 'photo' ? 5 : 1}
                      value={sheetCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setSheetCount(val);
                      }}
                      className="w-full text-center py-2 text-sm font-bold text-gray-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setSheetCount((prev) => prev + 1)}
                      className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {isPhotoBelowMin && (
                    <p className="text-[11px] text-amber-600 mt-1 font-medium">
                      Perhatian: Minimal pemesanan cetak foto adalah 5 lembar.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Jumlah Rangkap (Set)
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setSetCount((prev) => Math.max(1, prev - 1))}
                      className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={setCount}
                      onChange={(e) => setSetCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-center py-2 text-sm font-bold text-gray-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setSetCount((prev) => prev + 1)}
                      className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Step Catatan Tambahan */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  Catatan Khusus (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Kertas tebal 80 gram, latar foto warna biru, jilid warna merah..."
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm font-normal text-gray-800 focus:outline-none focus:border-primary-500"
                />
              </div>

              {/* Reset button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Formulir
                </button>
              </div>
            </div>

            {/* Summary & WhatsApp Action Card */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Ringkasan Biaya</h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Tarif Resmi
                  </span>
                </div>

                <div className="py-5 space-y-3.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-normal">Layanan:</span>
                    <span className="font-semibold text-gray-900">{serviceLabels[serviceType]}</span>
                  </div>

                  {serviceType === 'print' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-normal">Ukuran & Mode:</span>
                        <span className="font-semibold text-gray-900">
                          {paperSize} • {printModeLabels[printMode].title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-normal">Tarif per Lembar:</span>
                        <span className="font-semibold text-emerald-700">
                          {formatRupiah(getPrintUnitPrice())}/lbr
                        </span>
                      </div>
                    </>
                  )}

                  {serviceType === 'photo' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-normal">Ukuran Pas Foto:</span>
                        <span className="font-semibold text-gray-900">
                          {PRICING_CONFIG.photo.items[photoSize].name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-normal">Tarif per Lembar:</span>
                        <span className="font-semibold text-emerald-700">
                          {formatRupiah(getPhotoUnitPrice())}/lbr
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-500 font-normal">Total Lembar:</span>
                    <span className="font-bold text-gray-900">
                      {sheetCount} lbr × {setCount} set ({totalSheets} lbr)
                    </span>
                  </div>

                  {serviceType === 'print' && withEdit && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-normal">Jasa Edit Dokumen:</span>
                      <span className="font-semibold text-gray-900">
                        {formatRupiah(editCost)}
                      </span>
                    </div>
                  )}

                  {bindingType !== 'none' && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-normal">Penjilidan:</span>
                      <span className="font-semibold text-gray-900">
                        {bindingType === 'jilid_warna'
                          ? formatRupiah(bindingCost)
                          : 'Konsultasi WA'}
                      </span>
                    </div>
                  )}

                  {/* Grand Total Box */}
                  <div className="pt-4 mt-2 border-t border-gray-100">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Total Estimasi Resmi:
                      </span>
                      <span className="text-2xl font-extrabold text-emerald-700">
                        {isExactPricing && grandTotal > 0 ? formatRupiah(grandTotal) : 'Konfirmasi WA'}
                      </span>
                    </div>
                    {isExactPricing && (
                      <p className="text-[11px] text-gray-400 text-right">
                        Sesuai konfigurasi harga resmi Print AA
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100">
                  {/* Send to WhatsApp CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Kirim Pesanan ke WhatsApp
                  </a>

                  <p className="text-center text-xs text-gray-400 mt-3 font-normal">
                    Rincian pesanan dan nominal akan terisi otomatis di chat WhatsApp
                  </p>
                </div>
              </div>

              {/* Help & Links */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200/80 text-xs text-gray-600 space-y-2">
                <div className="font-bold text-gray-900 flex items-center gap-1.5 text-sm">
                  <HelpCircle className="w-4 h-4 text-primary-600" />
                  Lihat Seluruh Daftar Layanan
                </div>
                <p className="leading-relaxed">
                  Ingin melihat seluruh daftar layanan dan spesifikasi lengkap? Buka{' '}
                  <Link href={ROUTES.services} className="text-primary-600 hover:underline font-semibold">
                    Katalog Layanan & Daftar Harga Resmi
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
