import { PrismaClient } from "@prisma/client";
import { json } from "express";
const prisma = new PrismaClient();

export default {
  async findAllProfessores(req, res) {
    try {
      const professores = await prisma.professor.findMany();
      return res.status(200).json(professores);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async findProfessor(req, res) {
    try {
      const { id } = req.params;
      const professor = await prisma.professor.findUnique({
        where: { id: Number(id) },
      });

      if (!professor) {
        return res.status(404).json({ message: "Este professor não existe!" });
      }

      return res.status(200).json(professor);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createProfessor(req, res) {
    const { id } = req.params;
    const { nome, idade, email, formacao } = req.body;

    try {
      const curso = await prisma.curso.findUnique({
        where: { id: Number(id) },
      });

      if (!curso) {
        return res.status(404).json({ message: "Este curso não existe!" });
      }

      const professor = await prisma.professor.create({
        data: {
          nome,
          idade,
          email,
          formacao,
          cursoid: curso.id,
        },
        include: {
          curso: true,
        },
      });

      return res.status(200).json(professor);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível cadastrar o professor!" });
    }
  },

  async updateProfessor(req, res) {
    const { id } = req.params;
    const { nome, idade, email, formacao } = req.body;

    try {
      const professor = await prisma.professor.findUnique({
        where: { id: Number(id) },
      });

      if (!professor) {
        return res.status(404).json({ message: "Este professor não existe!" });
      }

      professor = await prisma.professor.update({
        where: {
          id: Number(id),
        },
        data: {
          nome,
          idade,
          email,
          formacao,
        },
      });

      return res.json({
        message: "Cadastro professor atualizado com sucesso!",
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async deleteProfessor(req, res) {
    try {
      const { id } = req.params;

      const professor = await prisma.professor.findUnique({
        where: { id: Number(id) },
      });

      if (!professor) {
        res.status(404).json({ error: "Este professor não está cadastrado!" });
      }

      await prisma.professor.delete({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: "Professor deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
