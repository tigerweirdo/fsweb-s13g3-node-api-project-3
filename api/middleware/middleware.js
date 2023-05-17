const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

async function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "Kullanıcı adı eksik." });
  } else {
    req.name = name.trim();
    next();
  }
}

async function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({ message: "Gönderi metni eksik." });
  } else {
    req.text = text.trim();
    next();
  }
}
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
