"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _client = require('@prisma/client');
const prisma = new (0, _client.PrismaClient)()

exports. default = {
  async createProcediment(req, res) {
    const { id } = req.params
    const { nome, tipo_de_procedimento  } = req.body


    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })

      if (!clinic) {
        return res.json({ message: "Não foram encontradas clinincas com esse ID!" })
      }

      const procedimentType = await prisma.tipo_de_procedimento.findUnique({ where: { id: Number(id) } })

      if (!procedimentType) {
        return res.json({ message: "Não foram encontrados tipos de procedimentos com esse ID!" })
      }

      const existingProcediment = await prisma.procedimento.findFirst({
        where: {
          nome,
          tipo_de_procedimentoId : procedimentType.id
        }
      })

      if (existingProcediment) {
        return res.json({ error: 'Esse procedimento já existe nesta clínica' })
      }

      const procediment = await prisma.procedimento.create({
        data: {
          nome,
          tipo_de_procedimentoId: procedimentType.id,
        },
        include: {
          tipo_de_procedimento: true
        },
      })
      return res.json(procediment)
    }
    catch (error) {
      return res.json({ message: error.message })
    }
  },

  async findAllProcedimentTypes(req, res) {
    try {
      const procedimentTypes = await prisma.tipo_de_procedimento.findMany({
        select: {
          id: true,
          nome: true,
          clinica: {
            select: {
              nome: true,
              id: true,
            }
          }
        }
      })

      return res.json(procedimentTypes)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findProcedimentType(req, res) {
    try {
      const { id } = req.params
      const procedimentType = await prisma.tipo_de_procedimento.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          nome: true,
          clinica: {
            select: {
              nome: true,
              id: true,
            }
          }
        }
      })

      if (!procedimentType) return res.json({ error: "Não foram encontrados tipos de procedimentos com esse ID!" })

      return res.json(procedimentType)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findProcedimentTypesForName(req, res) {
    try {
      const { nome } = req.body;


      const procedimentType = await prisma.tipo_de_procedimento.findMany({
        where: { nome: { contains: nome, mode: 'insensitive' } },
      });

      if (tipo_de_procedimento.length === 0) {
        return res.json({ error: 'Não foram encontrados tipos de procedimento com esse nome.' });
      }

      return res.json(procedimentType);
    } catch (error) {
      return res.json({ error });
    }
  },

  async updateProcedimentType(req, res) {
    const { id } = req.params
    const { nome } = req.body

    try {
      const procedimentType = await prisma.tipo_de_procedimento.findUnique({ where: { id: Number(id) } })

      if (!procedimentType) {
        return res.json({ message: "Não foram encontrados tipos de procedimento com esse ID!" })
      }

      await prisma.tipo_de_procedimento.update({
        where: { id: Number(id) },
        data: {
          nome
        }
      })

      return res.json({ message: "Tipo de procedimento atualizado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  },

  async deleteProcedimentType(req, res) {
    const { id } = req.params

    try {
      const procedimentType = await prisma.tipo_de_procedimento.findUnique({ where: { id: Number(id) } })

      if (!procedimentType) {
        return res.json({ message: "Não foram encontrados tipos de procedimento com esse ID!" })
      }

      await prisma.tipo_de_procedimento.delete({ where: { id: Number(id) } })

      return res.json({ message: "Tipo de procedimento apagado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  }

}