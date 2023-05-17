const express = require('express');

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
const Posts = require('../posts/posts-model');
const Users = require('./users-model');

// ara yazılım fonksiyonları da gereklidir

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    let users = await Users.get();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateUserId, (req, res, next) => {
  // USER NESNESİNİ DÖNDÜRÜN
  res.json(req.user);
  // user id yi getirmek için bir ara yazılım gereklidir
});

router.post('/', validateUser, (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  Users.insert({ name: req.name })
    .then((user) => res.json(user))
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    await Users.update(req.params.id, { name: req.name });
    let updated = await Users.getById(req.params.id);
    res.status(201).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await Users.remove(req.params.id);
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    let userPosts = await Users.getUserPosts(req.params.id);
    res.json(userPosts);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    let insertedPost = await Posts.insert({
      user_id: req.params.id,
      text: req.text,
    });
    res.json(insertedPost);
  } catch (error) {
    next(error);
  }
});

router.use((err, res, req) => {
  res.status(err.status || 500).json({
    customMessage: 'Bir hata oluştu',
    message: err.message,
  });
});

// routerı dışa aktarmayı unutmayın
module.exports = router;