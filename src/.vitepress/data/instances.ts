export interface NadaInstance {
  name: string
  description: string
  url: string
  lat: number
  lng: number
}

export const instances: NadaInstance[] = [
  {
    name: 'World Bank Microdata Library',
    description: 'Microdata from World Bank surveys and programs',
    url: 'https://microdata.worldbank.org',
    lat: 38.9,
    lng: -77.0,
  },
  {
    name: 'FAO Microdata Catalogue',
    description: 'Food and Agriculture Organization datasets',
    url: 'https://microdata.fao.org',
    lat: 41.9,
    lng: 12.5,
  },
  {
    name: 'ILO Microdata Repository',
    description: 'International Labour Organization survey data',
    url: 'https://www.ilo.org/microdata',
    lat: 46.2,
    lng: 6.1,
  },
  {
    name: 'UNHCR Microdata Library',
    description: 'Refugee and displacement survey data',
    url: 'https://microdata.unhcr.org',
    lat: 46.22,
    lng: 6.14,
  },
  {
    name: 'DataFirst',
    description: 'University of Cape Town data portal',
    url: 'https://www.datafirst.uct.ac.za',
    lat: -33.9,
    lng: 18.4,
  },
  {
    name: 'Pacific Community (SPC)',
    description: 'Pacific regional statistics and data',
    url: 'https://sdd.spc.int',
    lat: -22.3,
    lng: 166.4,
  },
  {
    name: 'IHSN',
    description: 'International Household Survey Network catalog',
    url: 'https://catalog.ihsn.org',
    lat: 48.86,
    lng: 2.35,
  },
  {
    name: 'UNICEF Data',
    description: 'UNICEF household survey microdata',
    url: 'https://mics.unicef.org',
    lat: 40.75,
    lng: -73.98,
  },
]
