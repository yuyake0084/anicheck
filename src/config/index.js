/* @flow */

module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Anicheck',
    titleTemplate: '%s / Anicheck',
    meta: [
      {
        name: 'description',
        content: 'This is an application for checking animation that brings moisture on dry days.',
      },
    ],
  },
};
