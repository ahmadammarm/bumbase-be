const authRoutes = require('./auth');
const geminiRoutes = require('./gemini');
const categoryRoutes = require('./category');
const fileRoutes = require('./file');
const recipeRoutes = require('./recipe');
const healthCheck = require('./health');

module.exports = {
  authRoutes,
  geminiRoutes,
  categoryRoutes,
  fileRoutes,
  recipeRoutes,
  healthCheck,
};
