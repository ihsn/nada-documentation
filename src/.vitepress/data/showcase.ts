export interface ShowcaseItem {
  name: string
  org?: string
  description: string
  url: string
  country: string
  category: 'International Organization' | 'UN Agency' | 'Academic' | 'National' | 'Demo'
  screenshot?: string
}

export const showcaseItems: ShowcaseItem[] = [
  {
    name: 'World Bank Microdata Catalog',
    org: 'World Bank Group',
    description: 'Development and poverty research microdata from World Bank surveys and programs worldwide.',
    url: 'https://microdata.worldbank.org',
    country: 'International',
    category: 'International Organization',
    screenshot: '/images/showcase/worldbank.jpg',
  },
  {
    name: 'IHSN Survey Catalog',
    org: 'International Household Survey Network',
    description: 'Household survey data from national statistics offices across the developing world.',
    url: 'https://catalog.ihsn.org',
    country: 'International',
    category: 'International Organization',
    screenshot: '/images/showcase/ihsn.jpg',
  },
  {
    name: 'UNHCR Microdata Library',
    org: 'UN High Commissioner for Refugees',
    description: 'Refugee and displacement survey data collected by UNHCR field operations worldwide.',
    url: 'https://microdata.unhcr.org',
    country: 'International',
    category: 'UN Agency',
    screenshot: '/images/showcase/unhcr.jpg',
  },
  {
    name: 'DataFirst',
    org: 'University of Cape Town',
    description: 'South African research data repository with microdata from surveys, censuses, and administrative records.',
    url: 'https://www.datafirst.uct.ac.za/dataportal/index.php/catalog',
    country: 'South Africa',
    category: 'Academic',
    screenshot: '/images/showcase/datafirst.jpg',
  },
  {
    name: 'Economics Research Forum',
    description: 'Economic research data repository serving the Arab world and neighboring regions.',
    url: 'https://www.erfdataportal.com/index.php/catalog',
    country: 'Egypt',
    category: 'Academic',
    screenshot: '/images/showcase/erf.png',
  },
  {
    name: 'NADA Demo Catalog',
    description: 'A live demonstration instance showcasing NADA features across all supported data types.',
    url: 'https://nada-demo.ihsn.org',
    country: 'International',
    category: 'Demo',
    screenshot: '/images/showcase/nada-demo.jpg',
  },
]

export const categoryIcons: Record<ShowcaseItem['category'], string> = {
  'International Organization': '🌐',
  'UN Agency': '🇺🇳',
  'Academic': '🎓',
  'National': '🏛️',
  'Demo': '🔬',
}
