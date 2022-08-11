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
    const { nome, ch } = req.body;
    const { id_semestre } = req.params;
    const { id_curso } = req.params;
    const { id_professor } = req.params;

    try {
      const semestre = await prisma.semestre.findUnique({
        where: { id: Number(id_semestre) },
      });
      const curso = await prisma.curso.findUnique({
        where: { id: Number(id_curso) },
      });
      const professor = await prisma.professor.findUnique({
        where: { id: Number(id_professor) },
      });
  
      if (!semestre || !curso || !professor) {
        return res
          .status(404)
          .json({ message: "Não foi possível encontrar curso, semestre, prof" });
      }
  
      const disciplina = await prisma.disciplina.create({
        data: {
          nome,
          ch,
          semestreid: semestre.id,
          cursoid: curso.id,
          professorid: professor.id,
        },
        include: {
          curso: true,
          professor: true,
          semestre: true,
        },
      });
      return req.status(201).json(disciplina);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
