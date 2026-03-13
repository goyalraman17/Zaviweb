import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import JsonLd from '@/components/SEO/JsonLd';
import F6SOffer from '@/components/F6SOffer';
import { generateBreadcrumbSchema } from '@/lib/schemaData';

export const metadata: Metadata = {
  title: 'F6S Member Offer — 3 Months of Zavi Pro at 50% Off',
  description:
    'Exclusive F6S member offer: get 3 months of Zavi Pro at 50% off with secure Razorpay checkout.',
  alternates: { canonical: 'https://zavivoice.com/f6s' },
  openGraph: {
    title: 'F6S Member Offer — 3 Months of Zavi Pro at 50% Off',
    description:
      'Claim 3 months of Zavi Pro at 50% off. Built for founders, operators, and investors who write all day.',
    url: 'https://zavivoice.com/f6s',
  },
};

export default function F6SPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://zavivoice.com' },
    { name: 'F6S Member Offer', url: 'https://zavivoice.com/f6s' },
  ]);

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: 'F6S Member Offer - 3 Months of Zavi Pro at 50% Off',
    price: '11.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    category: 'SoftwareSubscription',
    seller: { '@type': 'Organization', name: 'Zavi AI' },
    description:
      'Exclusive F6S member offer for 3 months of Zavi Pro at 50% off with secure Razorpay checkout.',
  };

  return (
    <>
      <Navigation />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offerSchema} />
      <main className="min-h-screen bg-white">
        <F6SOffer />
      </main>
    </>
  );
}
