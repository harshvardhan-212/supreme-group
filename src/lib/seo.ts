import type { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function generateSEO({
  title = 'Supreme Group | Soft Trims and NVH Solutions',
  description = 'Performance in motion - Evolving the drive with 360-degree nonwoven solutions for seamless rides',
  keywords = ['Supreme Group', 'Automotive', 'NVH Solutions', 'Soft Trims', 'Nonwoven'],
  image = '/og-image.jpg',
  url = '/',
  type = 'website',
}: SEOProps = {}): Metadata {
  const siteUrl = process.env.SITE_URL || 'https://supremegroup.co.in';
  const fullUrl = `${siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Supreme Group' }],
    creator: 'Supreme Group',
    publisher: 'Supreme Group',
    robots: 'index, follow',
    openGraph: {
      type,
      title,
      description,
      url: fullUrl,
      siteName: 'Supreme Group',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImage],
      creator: '@supremegroup',
    },
    alternates: {
      canonical: fullUrl,
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
      other: {
        'msvalidate.01': process.env.BING_VERIFICATION || '',
      },
    },
  };
}