import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllDisciplinasAlunos(req, res) {
    try {
      const disciplinasAlunos = await prisma.disciplinaaluno.findMany();
      return res.status(200).json(disciplinasAlunos);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async createDisciplinaAluno(req, res) {
    const { id_disciplina } = req.params;
    const { id_aluno } = req.params;

    try {
      const disciplina = await prisma.disciplina.findUnique({
        where: { id: Number(id_disciplina) },
      });
      const aluno = await prisma.aluno.findUnique({
        where: { id: Number(id_aluno) },
      });

      if (!aluno || !disciplina) {
        return res
          .status(404)
          .json({ message: "Este aluno/disciplina não existe!" });
      }

      const disciplinaAluno = await prisma.disciplinaaluno.create({
        data: {
          disciplinaid: disciplina.id,
          alunoid: aluno.id,
        },
        include: {
          disciplina: true,
          aluno: true,
        },
      });

      return res.status(201).json(disciplinaAluno);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateDisciplinaAluno(req, res) {
    const { id } = req.params;
    const { disciplinaid, alunoid } = req.body;

    try {
      const disciplinaAluno = await prisma.disciplinaaluno.findFirst({
        where: { id: Number(id) },
      });

      if (!disciplinaAluno) {
        return res
          .status(404)
          .json({ message: "Esta disciplina/aluno não existe!" });
      }

      disciplinaAluno = await prisma.disciplinaaluno.update({
        where: {
          id: Number(id),
        },
        data: {
          disciplinaid,
          alunoid,
        },
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async deleteDisciplinaAluno(req, res) {
    const { id } = req.params;
    try {
      await prisma.disciplinaaluno.delete({
        where: { id: Number(id) },
      });

      return res
        .status(200)
        .json({ message: "Disciplina/aluno deleta com sucesso!" });
      return res
        .status(200)
        .json({ message: "disciplina_aluno deletado com sucesso!" });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
