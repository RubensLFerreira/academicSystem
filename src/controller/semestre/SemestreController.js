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
    const { id_curso } = req.body;
    try {
      const curso = await prisma.curso.findUnique({
        where: { id: Number(id_curso) },
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

  // async createSemestre(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { cursoId } = req.body;

  //     const curso = await prisma.curso.findUnique({
  //       where: { id: Number(id) },
  //     });

  //     if (!curso) {
  //       return res.status(404).json({ message: "Este curso não existe!" });
  //     }

  //     const semestre = await prisma.semestre.create({
  //       data: {
  //         cursoId,
  //         cursoid: curso.id,
  //       },
  //       include: {
  //         curso: true,
  //       },
  //     });

  //     return res.status(200).json(semestre);
  //   } catch (error) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // },

  async updateSemestre(req, res) {
    const { id } = req.params;
    const { id_curso } = req.body;
    try {
      const semestre = await prisma.semestre.findUnique({
        where: { id: Number(id) },
      });

      if (!semestre) {
        return res.status(404).json({ message: "Este semestre não existe!" });
      }

      await prisma.semestre.update({
        where: { id: Number(id) },
        data: { id_curso },
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
