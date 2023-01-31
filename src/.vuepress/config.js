const { description } = require('../../package')
const path = require("path");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'NADA Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  base: "/nada-documentation/",

  configureWebpack: {
    resolve: {
      alias: {
        "@imageBase": path.resolve(__dirname, '../.vuepress/public')
      }
    }
  },
  
  
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/ihsn/nada-documentation',
    editLinks: true,
    docsDir: 'src',
    docsBranch: 'main',
    editLinkText: 'Edit this page',
    lastUpdated: true,
    nav: [
      {
        text: 'Installation',
        link: '/installation-guide/',
      },
      {
        text: 'Admin guide',
        link: '/admin-guide/overview.html'
      },
      {
        text: 'NADA',
        link: 'https://github.com/ihsn/nada'
      }
    ],
    sidebar: [
      {
        title: 'Introduction',   // required
        path: '/intro/',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/intro/',
          '/intro/overview-ui',
        ]
      },
      {
        title: 'Installation guide',
        path: '/installation-guide/',
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/installation-guide/',
          '/installation-guide/installation-docker',
          '/installation-guide/installation-sqlsrv',
          '/installation-guide/php-settings',
          {
            title: "Configurations",
            path: "/installation-guide/configurations/",
            collapsable: false,
            children: [
              '/installation-guide/configurations/captcha',
              '/installation-guide/configurations/email',
              '/installation-guide/configurations/google-analytics',
            ]
          },
          {
            title: "Upgrade",
            path: "/installation-guide/upgrade/",
            collapsable: false,
            children: [
              '/installation-guide/upgrade/upgrade-52',
              '/installation-guide/upgrade/upgrade-50',
              '/installation-guide/upgrade/upgrade-44',
              '/installation-guide/upgrade/upgrade-43',
              '/installation-guide/upgrade/upgrade-42',
              '/installation-guide/upgrade/upgrade-40'
            ]
          },          
          '/installation-guide/debug',
        ],
        //initialOpenGroupIndex: -1 // optional, defaults to 0, defines the index of initially opened subgroup
      },

      {
        title: 'Getting started',   // required
        path: '/getting-started/',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/getting-started/'
        ]
      },

      {
        title: 'Administrator guide',
        collapsable: false, // optional, defaults to true
        sidebarDepth: 4,    // optional, defaults to 1
        children: [
          '/admin-guide/overview',
          '/admin-guide/core-concepts',
          '/admin-guide/organize-files',
          '/admin-guide/ui-vs-api',
          '/admin-guide/api-tools',
          '/admin-guide/general-troubleshooting',
          /*'/admin-guide/site-admin',*/
          {
            title: "Catalog administration",
            path: "/admin-guide/web-ui/",
            collapsable: true,
            sidebarDepth: 4,
            children: [
              '/admin-guide/web-ui/login',
              '/admin-guide/web-ui/dashboard',
              '/admin-guide/web-ui/site-configurations',
              '/admin-guide/web-ui/countries',
              '/admin-guide/web-ui/regions',
              '/admin-guide/web-ui/site-menus',
              '/admin-guide/web-ui/studies',              
              '/admin-guide/web-ui/collections',
              '/admin-guide/web-ui/facets',
              '/admin-guide/web-ui/citations',
              '/admin-guide/web-ui/licensed-requests',
              '/admin-guide/web-ui/users',
              '/admin-guide/web-ui/reports',
              '/admin-guide/web-ui/data-deposit',
              '/admin-guide/web-ui/data-deposit-admin',
              '/admin-guide/web-ui/translate',
              '/admin-guide/web-ui/backup',
              '/admin-guide/web-ui/use-api'              
            ]
          },
          '/admin-guide/admin-api'
        ],
        //initialOpenGroupIndex: -1 // optional, defaults to 0, defines the index of initially opened subgroup
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ['vuepress-plugin-code-copy', true]
  ],

  markdown: {
    linkify: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-imsize'));
    },
  },
}
