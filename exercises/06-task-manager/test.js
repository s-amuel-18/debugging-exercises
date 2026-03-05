/**
 * Pruebas para: Gestión de Tareas (Task Manager)
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/06-task-manager
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const {
  addTask,
  completeTask,
  getTaskStats,
  filterByPriority,
} = require('./buggy-code.js');
// const {
//   addTask,
//   completeTask,
//   getTaskStats,
//   filterByPriority,
// } = require('./solution.js');

describe('Gestión de Tareas (Task Manager) - Error de Ejecución', () => {
  let board;

  beforeEach(() => {
    board = [];
  });

  describe('addTask - Crear nueva tarea', () => {
    test('debe agregar una tarea con prioridad media por defecto', () => {
      const task = addTask(board, 'Comprar café');
      expect(task.title).toBe('Comprar café');
      expect(task.priority).toBe('medium');
      expect(task.status).toBe('pending');
      expect(board).toHaveLength(1);
    });

    test('debe limpiar espacios en blanco del título', () => {
      const task = addTask(board, '   Limpiar código   ');
      expect(task.title).toBe('Limpiar código');
    });

    test('debe lanzar un error si el título es inválido o no existe', () => {
      expect(() => addTask(board, undefined)).toThrow(
        'El título de la tarea debe ser un string no vacío',
      );
      expect(() => addTask(board, null)).toThrow(
        'El título de la tarea debe ser un string no vacío',
      );
    });
  });

  describe('completeTask - Completar tarea existente', () => {
    test('debe marcar una tarea existente como completada', () => {
      const task = addTask(board, 'Tarea 1');
      const completed = completeTask(board, task.id);
      expect(completed.status).toBe('completed');
    });

    test('debe lanzar error cuando se intenta completar una tarea inexistente', () => {
      expect(() => completeTask(board, 9999)).toThrow(
        'No se encontró una tarea con id: 9999',
      );
    });
  });

  describe('getTaskStats - Estadísticas de tareas', () => {
    test('debe retornar estadísticas correctas cuando hay tareas', () => {
      const t1 = addTask(board, 'T1');
      const t2 = addTask(board, 'T2');
      completeTask(board, t1.id);

      const stats = getTaskStats(board);
      expect(stats.total).toBe(2);
      expect(stats.completed).toBe(1);
      expect(stats.pending).toBe(1);
      expect(stats.completionRate).toBe(50);
    });

    test('debe manejar un arreglo de tareas vacío', () => {
      const stats = getTaskStats([]);
      expect(stats.total).toBe(0);
      expect(stats.completionRate).toBe(0);
    });

    test('debe lanzar un error descriptivo en lugar de crashear si arguments no es un array', () => {
      expect(() => getTaskStats(null)).toThrow(
        'El parámetro tasks debe ser un array',
      );
    });
  });

  describe('filterByPriority - Filtrar tareas', () => {
    test('debe retornar las tareas con la prioridad seleccionada', () => {
      addTask(board, 'T1', 'low');
      addTask(board, 'T2', 'high');
      addTask(board, 'T3', 'low');

      const lowTasks = filterByPriority(board, 'low');
      expect(lowTasks).toHaveLength(2);
      expect(lowTasks[0].priority).toBe('low');
    });

    test('debe ser insensible a mayúsculas y minúsculas en la entrada', () => {
      addTask(board, 'T1', 'high');
      const highTasks = filterByPriority(board, 'HIGH');
      expect(highTasks).toHaveLength(1);
    });

    test('debe saltar tareas malformadas que no posean propiedad priority sin lanzar error', () => {
      // Inyectar una tarea malformada manualmente
      board.push({ id: 123, title: 'Ghost task', status: 'pending' });
      addTask(board, 'Normal task', 'low');

      expect(() => filterByPriority(board, 'low')).not.toThrow();
      const results = filterByPriority(board, 'low');
      expect(results).toHaveLength(1);
    });
  });
});
