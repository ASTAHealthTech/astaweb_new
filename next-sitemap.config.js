/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.astahealthtech.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.9,
  sitemapSize: 10000, // large enough to avoid splitting into sitemap-0.xml
  generateIndexSitemap: false, // disables index sitemap
  exclude: [],
  transform: async (config, url) => {
    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  }
}
