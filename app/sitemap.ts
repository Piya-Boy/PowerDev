import { MetadataRoute } from 'next'
import path from 'path'
import fs from 'fs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://powerdev.netlify.app'
  
  // Define static routes that should always be included
  const staticRoutes = ['', '/forms']
  
  // Get dynamic project routes from the projects directory
  const projectsDir = path.join(process.cwd(), 'app', 'projects')
  const projectRoutes = fs.existsSync(projectsDir) 
    ? fs.readdirSync(projectsDir)
        .filter(file => file.match(/^\d+$/)) // Only include numeric project folders
        .map(file => `/projects/${file}`)
    : []

  // Combine all routes
  const routes = [...staticRoutes, ...projectRoutes]

  // Generate sitemap entries for each route
  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}${route}`,
        th: `${baseUrl}/th${route}`,
      },
    },
  }))

  return sitemapEntries
} 