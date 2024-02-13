
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.KEY_API) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  // API key is valid, proceed to the next middleware or route handler
  next();
};

module.exports = validateApiKey;
