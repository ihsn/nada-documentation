import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NADA Documentation',
  description: 'Data catalog',
  base: '/nada-documentation/',
  cleanUrls: false,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Introduction', link: '/intro/' },
      { text: 'Installation', link: '/installation-guide/' },
      { text: 'Getting started', link: '/getting-started/' },
      { text: 'Admin guide', link: '/admin-guide/overview' },
      { text: 'Showcase', link: '/showcase/' },
      { text: 'NADA', link: 'https://github.com/ihsn/nada' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'About NADA', link: '/intro/' },
          { text: 'Catalog UI overview', link: '/intro/overview-ui' },
          { text: 'Community', link: '/intro/community' }
        ]
      },
      {
        text: 'Installation',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/installation-guide/' },
          {
            text: 'Platform guides',
            collapsed: false,
            items: [
              { text: 'Linux server', link: '/installation-guide/platform-linux' },
              { text: 'Windows server', link: '/installation-guide/platform-windows' }
            ]
          },
          { text: 'Docker', link: '/installation-guide/installation-docker' },
          { text: 'Git', link: '/installation-guide/installation-git' },
          {
            text: 'Database',
            collapsed: false,
            items: [
              { text: 'MySQL / MariaDB', link: '/installation-guide/database-mysql' },
              { text: 'Microsoft SQL Server', link: '/installation-guide/installation-sqlsrv' },
              { text: 'Migrations (CLI)', link: '/installation-guide/database-migrations-cli' }
            ]
          },
          { text: 'Solr', link: '/installation-guide/installation-solr' },
          { text: 'PHP settings', link: '/installation-guide/php-settings' },
          {
            text: 'Server configuration',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/installation-guide/configurations/' },
              { text: 'Captcha', link: '/installation-guide/configurations/captcha' },
              { text: 'Email', link: '/installation-guide/configurations/email' },
              { text: 'Email (advanced)', link: '/installation-guide/configurations/email-advanced' },
              { text: 'Google Analytics', link: '/installation-guide/configurations/google-analytics' },
              { text: 'Customizing themes', link: '/installation-guide/configurations/customizing-themes' },
              { text: 'Clean URLs', link: '/installation-guide/configurations/clean-urls' },
              { text: 'CSP', link: '/installation-guide/configurations/csp' },
              { text: 'Custom public access fields', link: '/installation-guide/configurations/custom-public-access-fields' }
            ]
          },
          {
            text: 'Upgrade',
            collapsed: true,
            items: [
              { text: 'Upgrade overview', link: '/installation-guide/upgrade/' },
              { text: 'Upgrade to 5.6', link: '/installation-guide/upgrade/upgrade-56' },
              { text: 'Upgrade to 5.5', link: '/installation-guide/upgrade/upgrade-55' },
              { text: 'Upgrade to 5.4', link: '/installation-guide/upgrade/upgrade-54' },
              { text: 'Upgrade to 5.2', link: '/installation-guide/upgrade/upgrade-52' },
              { text: 'Upgrade to 5.0', link: '/installation-guide/upgrade/upgrade-50' },
              { text: 'Upgrade to 4.4', link: '/installation-guide/upgrade/upgrade-44' },
              { text: 'Upgrade to 4.3', link: '/installation-guide/upgrade/upgrade-43' },
              { text: 'Upgrade to 4.2', link: '/installation-guide/upgrade/upgrade-42' },
              { text: 'Upgrade to 4.0', link: '/installation-guide/upgrade/upgrade-40' }
            ]
          },
          {
            text: 'Upgrade guide',
            collapsed: false,
            items: [
              { text: 'Migrate 4.x → 5.x (Linux)', link: '/installation-guide/upgrade/migration-4x-to-5x-linux' },
              { text: 'Migrar 4.x → 5.x (Linux) — Español', link: '/installation-guide/upgrade/migration-4x-to-5x-linux-es' }
            ]
          },
          { text: 'Debug', link: '/installation-guide/debug' }
        ]
      },
      {
        text: 'Getting started',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/getting-started/' },
          { text: 'Microdata', link: '/getting-started/microdata' },
          { text: 'Documents', link: '/getting-started/documents' },
          { text: 'Indicators', link: '/getting-started/indicators' },
          { text: 'Geospatial', link: '/getting-started/geospatial' }
        ]
      },
      {
        text: 'Concepts',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/admin-guide/overview' },
          { text: 'Core concepts', link: '/admin-guide/core-concepts' },
          { text: 'Organize files', link: '/admin-guide/organize-files' }
        ]
      },
      {
        text: 'Managing content',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/admin-guide/content/' },
          { text: 'Data access types', link: '/admin-guide/content/data-access-types' },
          { text: 'Microdata', link: '/admin-guide/content/microdata' },
          { text: 'Geospatial', link: '/admin-guide/content/geospatial' },
          { text: 'Indicators & time series', link: '/admin-guide/content/indicators' },
          { text: 'Tables', link: '/admin-guide/content/tables' },
          { text: 'Documents', link: '/admin-guide/content/documents' },
          { text: 'Images', link: '/admin-guide/content/images' },
          { text: 'Videos', link: '/admin-guide/content/videos' },
          { text: 'Scripts', link: '/admin-guide/content/scripts' },
          { text: 'Indicators — Admin UI', link: '/admin-guide/content/indicators-admin' },
          { text: 'Indicators — Catalog frontend', link: '/admin-guide/content/indicators-frontend' },
          { text: 'Entry lifecycle', link: '/admin-guide/content/lifecycle' },
          { text: 'Visualizations & preview', link: '/admin-guide/content/visualizations' }
        ]
      },
      {
        text: 'Site administration',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/admin-guide/web-ui/' },
          { text: 'Login', link: '/admin-guide/web-ui/login' },
          { text: 'Dashboard', link: '/admin-guide/web-ui/dashboard' },
          {
            text: 'Studies',
            collapsed: false,
            items: [
              { text: 'Manage studies', link: '/admin-guide/web-ui/studies' },
              { text: 'Licensed requests', link: '/admin-guide/web-ui/licensed-requests' },
              { text: 'Collections', link: '/admin-guide/web-ui/collections' },
              { text: 'Bulk data access', link: '/admin-guide/web-ui/bulk-data-access' }
            ]
          },
          { text: 'Citations', link: '/admin-guide/web-ui/citations' },
          { text: 'Users', link: '/admin-guide/web-ui/users' },
          {
            text: 'Menu & pages',
            collapsed: false,
            items: [
              { text: 'Menu & pages', link: '/admin-guide/web-ui/site-menus' },
              { text: 'Customizing the home page', link: '/admin-guide/web-ui/customizing-home-page' }
            ]
          },
          {
            text: 'Data deposit',
            collapsed: false,
            items: [
              { text: 'Data deposit', link: '/admin-guide/web-ui/data-deposit' },
              { text: 'Data deposit admin', link: '/admin-guide/web-ui/data-deposit-admin' }
            ]
          },
          {
            text: 'Reports',
            collapsed: false,
            items: [
              { text: 'Reports', link: '/admin-guide/web-ui/reports' },
              { text: 'Analytics reports', link: '/admin-guide/web-ui/analytics-reports' },
              { text: 'API logs', link: '/admin-guide/web-ui/api-logs' },
              { text: 'Site logs', link: '/admin-guide/web-ui/site-logs' }
            ]
          },
          {
            text: 'Settings',
            collapsed: true,
            items: [
              { text: 'Site configurations', link: '/admin-guide/web-ui/site-configurations' },
              { text: 'File manager', link: '/admin-guide/web-ui/file-manager' },
              { text: 'Regions', link: '/admin-guide/web-ui/regions' },
              { text: 'Countries', link: '/admin-guide/web-ui/countries' },
              { text: 'Translate', link: '/admin-guide/web-ui/translate' },
              { text: 'Facets', link: '/admin-guide/web-ui/facets' },
              { text: 'Codelists', link: '/admin-guide/web-ui/codelists' },
              { text: 'Data structures', link: '/admin-guide/web-ui/data-structures' },
              { text: 'Database migration', link: '/admin-guide/web-ui/database-migration' }
            ]
          },
          { text: 'Troubleshooting', link: '/admin-guide/general-troubleshooting' }
        ]
      },
      {
        text: 'API & automation',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/api-guide/' },
          { text: 'UI vs API', link: '/admin-guide/ui-vs-api' },
          { text: 'Tools (NADAR / PyNADA)', link: '/admin-guide/api-tools' },
          { text: 'Use cases', link: '/admin-guide/admin-api' },
          { text: 'Extended API examples', link: '/admin-guide/api-guide-extended' },
          { text: 'Data API access', link: '/admin-guide/content/data-api' },
          { text: 'Public / end-user API', link: '/admin-guide/web-ui/use-api' },
          { text: 'Widgets', link: '/admin-guide/widgets' },
          { text: 'Widgets API', link: '/admin-guide/widgets-api' },
          { text: 'Extend login', link: '/admin-guide/extend-login' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ihsn/nada-documentation' }
    ],

    editLink: {
      pattern: 'https://github.com/ihsn/nada-documentation/edit/main/src/:path',
      text: 'Edit this page'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  },

  markdown: {
    linkify: true
  },

  ignoreDeadLinks: [
    /^https?:\/\/localhost/
  ]
})
