const autoprefixer = require('autoprefixer');

module.exports = {
  siteMetadata: {
    title: 'Dan - Shai',
    author: 'technology-for-good',
    description: 'Gatsby 2 to Gatsby 5 upgrade',
    siteUrl: 'https://github.com/Technological-Unemployment/gatsbyv2-scientific-blog-machine-learning/',
  },
  pathPrefix: '/gatsbyv2-scientific-blog-machine-learning/',
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'dan-blog',
        short_name: 'dan-blog',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/omega.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-transformer-csv',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-graph',
            options: {
              language: 'mermaid', // default
              theme: 'neutral', // could also be dark, forest, or neutral
            },
          },
          'gatsby-remark-katex',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          autoprefixer({
            overrideBrowserslist: ['last 4 versions'],
          }),
        ],
        postcssOptions: {
          precision: 8, // Removed since 'precision' is no longer valid for postcss-loader.
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
  ],
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

