import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAlldisciplina(req, res) {
    try {
      const disciplinas = await prisma.disciplina.findMany();
      return res.status(200).json(disciplinas);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createDisciplina(req, res) {
    const { id_professor } = req.params;
    const { id_semestre } = req.params;
    const { nome, ch } = req.body;

    try {
      const professor = await prisma.professor.findFirst({
        where: { id: Number(id_professor) },
      });

      const semestre = await prisma.semestre.findFirst({
        where: { id: Number(id_semestre) },
      });

      if (!professor || !semestre) {
        return res
          .status(404)
          .json({ message: "Este professor/semestre não existe!" });
      }

      const disciplina = await prisma.disciplina.create({
        data: {
          nome,
          ch,
          professorid: professor.id,
          semestreid: semestre.id,
        },
        include: {
          professor: true,
          semestre: true,
        },
      });

      return res.status(201).json(disciplina);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateDisciplina(req, res) {
    const { id } = req.params;
    const { nome, ch, professorid, semestreid } = req.body;

    try {
      const disciplina = await prisma.disciplina.findFirst({
        where: { id: Number(id) },
      });

      if (!disciplina) {
        return res.status(404).json({ message: "Esta disciplina não existe!" });
      }

      disciplina = await prisma.disciplina.update({
        where: {
          id: Number(id),
        },
        data: {
          nome,
          ch,
          professorid,
          semestreid,
        },
      });

      return res
        .status(200)
        .json({ message: "Disciplina atualizada com sucesso!" });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async deleteDisciplina(req, res) {
    const { id } = req.params;

    try {
      const disciplina = await prisma.disciplina.findFirst({
        where: { id: Number(id) },
      });

      if (!disciplina) {
        return res.status(404).json({ message: "Esta disciplina não existe!" });
      }

      return res
        .status(200)
        .json({ message: "Disciplina deleta com sucesso!" });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
