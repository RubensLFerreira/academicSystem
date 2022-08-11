import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllAlunos(req, res) {
    try {
      const alunos = await prisma.aluno.findMany();
      return res.status(200).json(alunos);
    } catch (error) {
      return res.status(400).json({ Message: error.Message });
    }
  },

  async createAluno(req, res) {
    const { id } = req.params;
    const { matricula, nome, sobrenome, email, genero } = req.body;
    try {
      const curso = await prisma.curso.findUnique({
        where: { id: Number(id) },
      });

      if (!curso) {
        return res.status(404).json({ message: "Este curso não existe!" });
      }

      const aluno = await prisma.aluno.create({
        data: {
          matricula,
          nome,
          sobrenome,
          email,
          genero,
          cursoid: curso.id,
        },
        include: {
          curso: true,
        },
      });

      return res.status(200).json(aluno);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateAluno(req, res) {
    const { id } = req.params;
    const { matricula, nome, sobrenome, email, genero } = req.body;

    try {
      const aluno = await prisma.aluno.findUnique({
        where: { id: Number(id) },
      });

      if (!aluno) {
        return res.status(404).json({ message: "Este professor não existe!" });
      }

      aluno = await prisma.aluno.update({
        where: {
          id: Number(id),
        },
        data: {
          matricula,
          nome,
          sobrenome,
          email,
          genero,
        },
      });

      return res.json({ message: "Cadastro aluno atualizado com sucesso!" });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async deleteAluno(req, res) {
    try {
      const { id } = req.params;
      const aluno = await prisma.aluno.findUnique({
        where: { id: Number(id) },
      });

      if (!aluno) {
        res.status(404).json({ error: "Este aluno não está cadastrado!" });
      }

      await prisma.aluno.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: "Aluno deletado com sucesso!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
