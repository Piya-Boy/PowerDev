/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://powerdev.netlify.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/*'],
      },
    ],
    additionalSitemaps: [
      'https://powerdev.netlify.app/sitemap.xml',
      'https://powerdev.netlify.app/th/sitemap.xml',
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*', '/_next/*'],
  alternateRefs: [
    {
      href: 'https://powerdev.netlify.app',
      hreflang: 'en',
    },
    {
      href: 'https://powerdev.netlify.app/th',
      hreflang: 'th',
    },
  ],
} 