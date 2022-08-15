import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllSemestres(req, res) {
    try {
      const semestres = await prisma.semestre.findMany();
      return res.json(semestres);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async createSemestre(req, res) {
    const { cursoid } = req.body;
    try {
      const curso = await prisma.curso.findUnique({
        where: { id: Number(cursoid) },
      });

      if (!curso) {
        return res.status(404).json({ message: "Este curso não existe!" });
      }

      const semestre = await prisma.semestre.create({
        data: {
          cursoid: curso.id,
        },
        include: {
          curso: true,
        },
      });
      return res.status(200).json(semestre);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateSemestre(req, res) {
    const { id } = req.params;
    const { cursoid } = req.body;
    try {
      const semestre = await prisma.semestre.findFirst({
        where: { id: Number(id) },
      });

      if (!semestre) {
        return res.status(404).json({ message: "Este semestre não existe!" });
      }

      semestre = await prisma.semestre.update({
        where: { id: Number(id) },
        data: {
          cursoid,
        },
      });

      return res.status(200).json({ message: "Curso editado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteSemestre(req, res) {
    const { id } = req.params;
    try {
      const semestre = await prisma.semestre.delete({
        where: { id: Number(id) },
      });

      if (!semestre) {
        return res.status(404).json({ message: "Este semestre não existe!" });
      }
      return res
        .status(200)
        .json({ message: "Semestre deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
