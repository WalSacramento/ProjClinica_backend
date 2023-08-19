import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default {
  async dailyData(req, res) {
    const { id } = req.params
    const { data } = req.body

    const transformDateInitial = (date) => {
      const transformedDate = `${date}T00:00:00.000Z`
      return transformedDate
    }

    const transformDateFinal = (date) => {
      const transformedDate = `${date}T23:59:59.000Z`
      return transformedDate
    }

    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })
      const consults = await prisma.consulta.findMany({
        where: {
          data_de_criacao: {
            gte: new Date(transformDateInitial(data)),
            lte: new Date(transformDateFinal(data))
          }, clinicaId: Number(id)
        },
        select: {
          id: true,
          data_de_criacao: true,
          paciente: {
            select: {
              nome: true,
            }
          },
          procedimento: {
            select: {
              nome: true,
            }
          },
          profissional: {
            select: {
              nome: true,
            },
          },
          valor_da_consulta: true,
          tipo_de_pagamento: true
        }
      })

      const numberOfConsults = consults.length

      const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0)

      function groupConsultsByProfissional(consults) {
        const consultsByProfissional = {};
      
        consults.forEach(consult => {
          const profissionalName = consult.profissional.nome;
          if (!consultsByProfissional[profissionalName]) {
            consultsByProfissional[profissionalName] = [];
          }
          consultsByProfissional[profissionalName].push(consult);
        });
      
        return consultsByProfissional;
      }

      const consultsByProfissional = groupConsultsByProfissional(consults);

      const valueForProfissional = Object.keys(consultsByProfissional).map(profissional => {
        const consults = consultsByProfissional[profissional];
        const numberOfConsults = consults.length;
        const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0);
        return { profissional, numberOfConsults, totalValue };
      })

      return res.json(valueForProfissional)
    } catch (error) {
      return res.json({ error })
    }
  }


}