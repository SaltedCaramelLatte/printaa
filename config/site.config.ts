/**
 * Site Configuration
 *
 * Contains all site-specific information including:
 * - Site name, URL, and description
 * - Contact information (email, WhatsApp, address)
 * - Social media links
 *
 * Values can be overridden via environment variables for deployment flexibility.
 */
export const SITE_CONFIG = {
  /** Site name shown in header and metadata */
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Print & Fotocopy AA',

  /** Full organization name for formal contexts */
  fullName: 'Print & Fotocopy AA',

  /** Site URL - used for metadata and canonical URLs */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  /** Site description for SEO and metadata */
  description:
    'Print & Fotocopy AA - Jasa print dan fotocopy murah di Makassar',

  /** WhatsApp number for contact (format: 62812xxxxxxxx) */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890',

  /** Organization email address */
  email: 'contact@example.com',

  /** Instagram handle (with @) */
  instagram: '@yourorganization',

  /** Physical address of the organization */
  address: 'Jalan rajawali Asr Lompobattang No.12A Blok A, Panambungan, Kec. Mariso, Kota Makassar, Sulawesi Selatan 90124',
} as const;
