"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken');

 function AuthMiddleware(req, res, next) {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const [, token] = authorization.split(" ")

  try {
    const decoded = _jsonwebtoken.verify.call(void 0, token, "secret")
    const { id } = decoded

    req.userId = id
    next()
  }
  catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
} exports.AuthMiddleware = AuthMiddleware;