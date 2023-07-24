import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const prisma = new PrismaClient()

export default {
  async authenticate(req, res) {
    const { email, senha } = req.body

    const user = await prisma.usuario.findUnique({ where: { email } })

    if (!user) {
      return res.json({ error: 'Usuário não encontrado' })
    }

    const isValuePassword = await compare(senha, user.senha)

    if (!isValuePassword) {
      return res.json({ error: 'Senha incorreta' })
    }

    const token = sign({ id: user.id }, "secret", { expiresIn: "1d" })

    const { id, nome, admin, } = user
    return res.json({ user: { id, nome, admin, email }, token })
  }

}