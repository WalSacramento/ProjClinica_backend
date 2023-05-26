import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default {
  async createConsult(req, res) {
    const { id } = req.params
    const { valor_da_consulta, paciente } = req.body


    try {
      const doctor = await prisma.medico.findUnique({ where: { id: Number(id) } })

      if (!doctor) {
        return res.json({ message: "Não foram encontrados médicos com esse ID!" })
      }

      const consult = await prisma.consulta.create({
        data: {
          valor_da_consulta,
          paciente,
          medicoId: doctor.id,
        },
        include: {
          medico: true,
        },
      })
      return res.json(consult)
    }
    catch (error) {
      return res.json({ message: error.message })
    }
  },

  async findAllConsults(req, res) {
    try {
      const consults = await prisma.consulta.findMany({
        select: {
          medico: {
            select: {
              nome: true,
            },
          },
          id: true,
          valor_da_consulta: true,
          paciente: true,

        }
      })

      return res.json(consults)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findConsult(req, res) {
    try {
      const { id } = req.params
      const consult = await prisma.consulta.findUnique({
        where: { id: Number(id) },
        select: {
          medico: {
            select: {
              nome: true,
            },
          },
          id: true,
          valor_da_consulta: true,
          paciente: true,
          data_de_criacao: true
        }
      })

      if (!consult) return res.json({ error: "Não foram encontrados registros de consultas com esse ID!" })

      return res.json(consult)

    } catch (error) {
      return res.json({ error })

    }
  },

  async updateConsult(req, res) {
    const { id } = req.params
    const { valor_da_consulta, paciente, medicoId } = req.body

    try {
      const consult = await prisma.consulta.findUnique({ where: { id: Number(id) } })

      if (!consult) {
        return res.json({ message: "Não foram encontrados registros de consultas com esse ID!" })
      }

      await prisma.consulta.update({
        where: { id: Number(id) },
        data: {
          valor_da_consulta,
          paciente,
          medicoId,
        }
      })

      return res.json({ message: "Registro de consulta atualizado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  },

  async deleteConsult(req, res) {
    const { id } = req.params

    try {
      const post = await prisma.consulta.findUnique({ where: { id: Number(id) } })

      if (!post) {
        return res.json({ message: "Não foram encontrados registros de consultas com esse ID!" })
      }

      await prisma.consulta.delete({ where: { id: Number(id) } })

      return res.json({ message: "Registro de consulta apagado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  }

}