module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "index.js",
      "test.js"
    ],
    preprocessors: {
      "index.js": ["webpack"],
      "test.js": ["webpack"]
    },
    browsers: ["PhantomJS"]
  })
};