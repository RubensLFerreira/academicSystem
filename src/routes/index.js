import { Router } from "express";

import CursoController from "../controller/curso/CursoController";
import SemestreController from "../controller/semestre/SemestreController";
import ProfessorController from "../controller/professor/ProfessorController";
import AlunoController from "../controller/aluno/AlunoController";
import DisciplinaController from "../controller/disciplina/DisciplinaController";
import DisciplinaAlunoController from "../controller/DisciplinaAluno/DisciplinaAlunoController";

const router = Router();

// cursos
router.get("/cursos", CursoController.findAllCursos);
router.get("/curso/:id", CursoController.findCurso);
router.post("/curso", CursoController.createCurso);
router.put("/curso/:id", CursoController.updateCurso);
router.delete("/curso/:id", CursoController.deleteCurso);

// semestre
router.get("/semestres", SemestreController.findAllSemestres);
router.post("/semestre", SemestreController.createSemestre);
router.put("/semestre/:id", SemestreController.updateSemestre);
router.delete("/semestre/:id", SemestreController.deleteSemestre);

// professor
router.get("/professores", ProfessorController.findAllProfessores);
router.get("/professor/:id", ProfessorController.findProfessor);
router.post("/professor/curso/:id", ProfessorController.createProfessor);
router.put("/professor/:id", ProfessorController.updateProfessor);
router.delete("/professor/:id", ProfessorController.deleteProfessor);

// aluno
router.get("/alunos", AlunoController.findAllAlunos);
router.post("/aluno/curso/:id", AlunoController.createAluno);
router.put("/aluno/:id", AlunoController.updateAluno);
router.delete("/aluno/:id", AlunoController.deleteAluno);

// disciplina
router.get("/disciplinas", DisciplinaController.findAlldisciplina);
router.post(
  "/disciplina/professor/:id_professor/semestre/:id_semestre",
  DisciplinaController.createDisciplina
);
router.put("/disciplina/:id", DisciplinaController.updateDisciplina);
router.delete("/disciplina/:id", DisciplinaController.deleteDisciplina);

// disciplinas Alunos
router.get(
  "/disciplinasalunos",
  DisciplinaAlunoController.findAllDisciplinasAlunos
);
router.post(
  "/disciplinaaluno/disciplina/:id_disciplina/aluno/:id_aluno",
  DisciplinaAlunoController.createDisciplinaAluno
);
router.put(
  "/disciplinaaluno/:id",
  DisciplinaAlunoController.updateDisciplinaAluno
);
router.delete(
  "/disciplinaaluno/:id",
  DisciplinaAlunoController.deleteDisciplinaAluno
);

export { router };
