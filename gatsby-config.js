module.exports = {
  siteMetadata: {
    title: "gatsby-portfolio-2021",
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-127585723-1",
      },
    },
    "gatsby-plugin-react-helmet",
  ],
};
