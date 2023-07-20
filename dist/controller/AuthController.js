"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _client = require('@prisma/client');
var _bcryptjs = require('bcryptjs');
var _jsonwebtoken = require('jsonwebtoken');

const prisma = new (0, _client.PrismaClient)()

exports. default = {
  async authenticate(req, res) {
    const { email, senha } = req.body

    const user = await prisma.usuario.findUnique({ where: { email } })

    if (!user) {
      return res.json({ error: 'Usuário não encontrado' })
    }

    const isValuePassword = await _bcryptjs.compare.call(void 0, senha, user.senha)

    if (!isValuePassword) {
      return res.json({ error: 'Senha incorreta' })
    }

    const token = _jsonwebtoken.sign.call(void 0, { id: user.id }, "secret", { expiresIn: "1d" })

    const { id, admin } = user
    return res.json({ user: { id, admin, email }, token })
  }

}