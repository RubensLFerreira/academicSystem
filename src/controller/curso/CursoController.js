import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllCursos(req, res) {
    try {
      const cursos = await prisma.curso.findMany();
      return res.json(cursos);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async findCurso(req, res) {
    const { id } = req.params;
    try {
      const curso = await prisma.curso.findUnique({
        where: { id: Number(id) },
      });

      if (!curso) {
        return res.status(404).json({ message: "Este curso não existe!" });
      }

      return res.status(200).json(curso);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createCurso(req, res) {
    try {
      const { nome, area, duracao } = req.body;
      const curso = await prisma.curso.findUnique({ where: { nome } });

      if (curso) {
        return res
          .status(404)
          .json({ message: "Este curso já foi cadastrado!" });
      }

      await prisma.curso.create({
        data: {
          nome,
          area,
          duracao,
        },
      });
      return res.status(201).json(curso);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateCurso(req, res) {
    try {
      const { id } = req.params;
      const { nome, area, duracao } = req.body;

      let curso = await prisma.curso.findUnique({ where: { id: Number(id) } });

      if (!curso) {
        res.status(404).json({ message: error.message });
      }

      curso = await prisma.curso.update({
        where: { id: Number(id) },
        data: { nome, area, duracao },
      });

      return res.status(200).json("Curso atualizado com sucesso!");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteCurso(req, res) {
    try {
      const { id } = req.params;
      await prisma.curso.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: "Curso deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
