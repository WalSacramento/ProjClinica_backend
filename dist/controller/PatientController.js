"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _client = require('@prisma/client');

const prisma = new (0, _client.PrismaClient)()

exports. default = {

  async createPatient(req, res) {
    try {
      const { id } = req.params
      const { nome, cpf, data_de_nascimento, telefone, sexo } = req.body

      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })

      if (!clinic) {
        return res.json({ error: 'Não existe clínica com esse id!' })
      }

      const existingPatient = await prisma.paciente.findFirst({
        where: {
          cpf,
          clinicaId: clinic.id
        }
      })

      if (existingPatient) {
        return res.json({ error: 'Já existe um paciente com esse CPF cadastrado nesta clinica!' })
      }

      const patient = await prisma.paciente.create({
        data: {
          nome,
          cpf,
          data_de_nascimento,
          telefone,
          sexo,
          clinicaId: clinic.id
        },
        include: {
          clinica: true
        }
      })

      return res.json(patient)
    } catch (error) {
      console.error('Ocorreu um erro:', error)
      return res.json({ error: 'Ocorreu um erro durante o processamento da solicitação' })
    }
  },

  async findAllPatients(req, res) {
    try {
      const patients = await prisma.profissional.findMany()
      return res.json(patients)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findPatient(req, res) {
    try {
      const { id } = req.params
      const patient = await prisma.paciente.findUnique({
        where: { id: Number(id) }
      })

      if (!patient) return res.json({ error: "Não foram encontrados pacientes com esse ID!" })

      return res.json(patient)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findPatientForName(req, res) {
    try {
      const { nome } = req.body;
      const patient = await prisma.paciente.findMany({
        where: { nome: { contains: nome, mode: 'insensitive' } }
      });

      if (patient.length === 0) {
        return res.json({ error: 'Não foram encontrados pacientes com esse nome.' });
      }

      return res.json(patient);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findPatientForDateOfBirth(req, res) {
    try {
      const { data_de_nascimento } = req.body;
      const patient = await prisma.paciente.findMany({
        where: { data_de_nascimento: { contains: data_de_nascimento, mode: 'insensitive' } }
      });

      if (patient.length === 0) {
        return res.json({ error: 'Não foram encontrados pacientes com essa data de nascimento.' });
      }

      return res.json(patient);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findPatientForCPF(req, res) {
    try {
      const { cpf } = req.body;
      const patient = await prisma.paciente.findMany({
        where: { cpf: { contains: cpf, mode: 'insensitive' } }
      });

      if (patient.length === 0) {
        return res.json({ error: 'Não foram encontrados pacientes com esse CPF.' });
      }

      return res.json(patient);
    } catch (error) {
      return res.json({ error });
    }
  },


  async updatePatient(req, res) {
    try {
      const { id } = req.params
      const { nome, cpf, data_de_nascimento, telefone, sexo } = req.body

      let patient = await prisma.paciente.findUnique({
        where: { id: Number(id) }
      })

      if (!paciente) return res.json({ error: "Não foram encontrados pacientes com esse ID!" })

      patient = await prisma.paciente.update(
        {
          where: { id: Number(id) },
          data: { nome, cpf, data_de_nascimento, telefone, sexo, clinicaId }
        })

      return res.json(patient);
    } catch (error) {
      res.json({ error })
    }
  },

  async deletePatient(req, res) {
    try {
      const { id } = req.params

      const patient = await prisma.paciente.findUnique({
        where: { id: Number(id) }
      })

      if (!patient) return res.json({ error: "Não foram encontrados pacientes com esse ID!" })

      await prisma.patient.delete({ where: { id: Number(id) } })

      return res.json({ message: "Paciente deletado!" })

    } catch (error) {
      return res.json({ error })

    }
  },

}