"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _client = require('@prisma/client');

const prisma = new (0, _client.PrismaClient)()

exports. default = {
  async createDoctor(req, res) {

    try {
      const { nome, email } = req.body

      let doctor = await prisma.medico.findUnique({ where: { email } })

      if (doctor) {
        return res.json({ error: "Já existe um médico com esse email" })
      }

      doctor = await prisma.medico.create({
        data: {
          nome,
          email
        }
      })

      return res.json(doctor)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findAllDoctors(req, res) {
    try {
      const doctors = await prisma.medico.findMany()
      return res.json(doctors)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findDoctor(req, res) {
    try {
      const { id } = req.params
      const doctor = await prisma.medico.findUnique({
        where: { id: Number(id) }
      })

      if (!doctor) return res.json({ error: "Não foram encontrados médicos com esse ID!" })

      return res.json(doctor)

    } catch (error) {
      return res.json({ error })

    }
  },

  async updateDoctor(req, res) {
    try {
      const { id } = req.params
      const { nome, email } = req.body

      let doctor = await prisma.medico.findUnique({
        where: { id: Number(id) }
      })

      if (!doctor) return res.json({ error: "Não foram encontrados médicos com esse ID!" })

      doctor = await prisma.medico.update(
        {
          where: { id: Number(id) },
          data: { nome, email }
        })

      return res.json(doctor);
    } catch (error) {
      res.json({ error })
    }
  },

  async deleteDoctor(req, res) {
    try {
      const { id } = req.params

      const doctor = await prisma.medico.findUnique({
        where: { id: Number(id) }
      })

      if (!doctor) return res.json({ error: "Não foram encontrados médicos com esse ID!" })

      await prisma.medico.delete({ where: { id: Number(id) } })

      return res.json({ message: "Médico deletado!" })

    } catch (error) {
      return res.json({ error })

    }
  },

}