/**
 * Pruebas para Grade Book
 * Ejecutar con: npm test exercises/48-grade-book
 */

const { GradeBook, Student } = require('./buggy-code.js');

describe('Grade Book', () => {
  let gradeBook;

  beforeEach(() => {
    gradeBook = new GradeBook([
      { name: 'Exámenes', weight: 0.50 },
      { name: 'Tareas', weight: 0.30 },
      { name: 'Participación', weight: 0.20 },
    ]);
  });

  describe('GradeBook - nota ponderada de estudiante', () => {
    test('debe calcular la nota ponderada correctamente', () => {
      const student = new Student('S1', 'Ana');
      student.addGrade('Exámenes', 90);
      student.addGrade('Tareas', 80);
      student.addGrade('Participación', 70);
      // 90*0.5 + 80*0.3 + 70*0.2 = 45 + 24 + 14 = 83
      expect(gradeBook.getWeightedAverage(student)).toBeCloseTo(83);
    });

    test('debe manejar nota perfecta en todas las categorías', () => {
      const student = new Student('S2', 'Luis');
      student.addGrade('Exámenes', 100);
      student.addGrade('Tareas', 100);
      student.addGrade('Participación', 100);
      expect(gradeBook.getWeightedAverage(student)).toBe(100);
    });

    test('debe ponderar correctamente cuando las notas son muy distintas', () => {
      const student = new Student('S3', 'Eva');
      student.addGrade('Exámenes', 60);   // 60*0.5 = 30
      student.addGrade('Tareas', 100);    // 100*0.3 = 30
      student.addGrade('Participación', 100); // 100*0.2 = 20
      // total = 80
      expect(gradeBook.getWeightedAverage(student)).toBeCloseTo(80);
    });
  });

  describe('GradeBook - letra de calificación', () => {
    test('debe retornar A para notas >= 90', () => {
      const student = new Student('S4', 'Tom');
      student.addGrade('Exámenes', 95);
      student.addGrade('Tareas', 90);
      student.addGrade('Participación', 90);
      expect(gradeBook.getLetterGrade(student)).toBe('A');
    });

    test('debe retornar B para notas entre 80 y 89', () => {
      const student = new Student('S5', 'Mia');
      student.addGrade('Exámenes', 82);
      student.addGrade('Tareas', 85);
      student.addGrade('Participación', 80);
      expect(gradeBook.getLetterGrade(student)).toBe('B');
    });

    test('debe retornar F para notas < 60', () => {
      const student = new Student('S6', 'Sam');
      student.addGrade('Exámenes', 40);
      student.addGrade('Tareas', 50);
      student.addGrade('Participación', 60);
      expect(gradeBook.getLetterGrade(student)).toBe('F');
    });
  });

  describe('GradeBook - ranking y estadísticas del grupo', () => {
    test('debe ordenar estudiantes de mayor a menor nota ponderada', () => {
      const s1 = new Student('S7', 'Alice');
      const s2 = new Student('S8', 'Bob');
      const s3 = new Student('S9', 'Carol');

      [s1, s2, s3].forEach(s => {
        s.addGrade('Exámenes', 0);
        s.addGrade('Tareas', 0);
        s.addGrade('Participación', 0);
      });

      s1.grades['Exámenes'] = 70;
      s2.grades['Exámenes'] = 90;
      s3.grades['Exámenes'] = 80;

      const ranking = gradeBook.getRanking([s1, s2, s3]);
      expect(ranking[0].name).toBe('Bob');
      expect(ranking[1].name).toBe('Carol');
      expect(ranking[2].name).toBe('Alice');
    });

    test('debe calcular el promedio del grupo correctamente', () => {
      const students = ['S10', 'S11', 'S12'].map((id, i) => {
        const s = new Student(id, `Student${i}`);
        s.addGrade('Exámenes', [60, 80, 100][i]);
        s.addGrade('Tareas', [60, 80, 100][i]);
        s.addGrade('Participación', [60, 80, 100][i]);
        return s;
      });
      // Promedio ponderado de cada uno = su nota (pesos suman 1), promedio del grupo = 80
      expect(gradeBook.getClassAverage(students)).toBeCloseTo(80);
    });

    test('debe detectar estudiantes en riesgo (nota < 60)', () => {
      const passing = new Student('S13', 'Passing');
      passing.addGrade('Exámenes', 80);
      passing.addGrade('Tareas', 70);
      passing.addGrade('Participación', 60);

      const failing = new Student('S14', 'Failing');
      failing.addGrade('Exámenes', 40);
      failing.addGrade('Tareas', 50);
      failing.addGrade('Participación', 55);

      const atRisk = gradeBook.getAtRiskStudents([passing, failing]);
      expect(atRisk.length).toBe(1);
      expect(atRisk[0].name).toBe('Failing');
    });
  });
});
