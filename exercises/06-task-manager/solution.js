/**
 * Módulo de gestión de tareas (Task Manager)
 *
 * Permite agregar tareas, marcarlas como completadas,
 * obtener estadísticas del tablero y filtrarlas por prioridad.
 */

// Prioridades válidas para una tarea
const VALID_PRIORITIES = ['low', 'medium', 'high'];

function addTask(tasks, title, priority = 'medium') {
  // CORREGIDO: Se valida que title sea un string no vacío antes de llamar .trim()
  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error('El título de la tarea debe ser un string no vacío');
  }
  if (!VALID_PRIORITIES.includes(priority)) {
    throw new Error(
      `Prioridad inválida: "${priority}". Use low, medium o high`,
    );
  }
  const task = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    title: title.trim(),
    priority,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function completeTask(tasks, taskId) {
  // CORREGIDO: Se verifica que la tarea exista antes de acceder a .status,
  // y se lanza un error descriptivo si no se encuentra
  const task = tasks.find((t) => t.id === taskId);
  if (task === undefined) {
    throw new Error(`No se encontró una tarea con id: ${taskId}`);
  }
  task.status = 'completed';
  return task;
}

function getTaskStats(tasks) {
  // CORREGIDO: Se valida que tasks sea un array antes de llamar .filter()
  // para evitar un TypeError cuando se pasa un valor incorrecto
  if (!Array.isArray(tasks)) {
    throw new Error('El parámetro tasks debe ser un array');
  }
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  return {
    total,
    completed,
    pending,
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

function filterByPriority(tasks, priority) {
  // CORREGIDO: Se verifica que cada tarea tenga la propiedad priority definida
  // antes de llamar .toLowerCase() para evitar TypeError en tareas malformadas
  const p = typeof priority === 'string' ? priority.toLowerCase() : '';
  if (!VALID_PRIORITIES.includes(p)) {
    throw new Error(
      `Prioridad inválida: "${priority}". Use low, medium o high`,
    );
  }
  return tasks.filter(
    (task) => task.priority !== undefined && task.priority.toLowerCase() === p,
  );
}

// Exportar para testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addTask, completeTask, getTaskStats, filterByPriority };
}

// Ejemplo de uso
if (require.main === module) {
  const board = [];
  const t1 = addTask(board, 'Revisar pull requests', 'high');
  const t2 = addTask(board, 'Escribir documentación', 'medium');
  addTask(board, 'Actualizar dependencias', 'low');
  completeTask(board, t1.id);
  console.log('Stats:', getTaskStats(board));
  console.log('High priority:', filterByPriority(board, 'high'));
}
