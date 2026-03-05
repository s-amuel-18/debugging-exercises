/**
 * Módulo de autenticación de usuarios
 *
 * Funciones para gestionar el registro y la validación de credenciales
 * utilizando la API externa JSONPlaceholder para la búsqueda de usuarios.
 */

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Busca un usuario por su correo electrónico usando la API externa.
 *
 * @param {string} email - Correo del usuario a buscar
 * @returns {Promise<Object|null>} El usuario encontrado o null
 */
async function findUserByEmail(email) {
  // CORREGIDO: Se debe esperar a fetch y luego esperar a response.json().
  // Además, la API filtra por query string y devuelve un array.
  const response = await fetch(`${API_URL}?email=${email}`);
  const users = await response.json();

  // Si el array tiene elementos, retornamos el primero (el usuario)
  return users.length > 0 ? users[0] : null;
}

/**
 * Registra un nuevo usuario.
 * Nota: JSONPlaceholder no persiste los datos enviados vía POST.
 *
 * @param {Object} userData - Datos del nuevo usuario ({ email, name })
 * @returns {Promise<Object>} El usuario registrado
 */
async function registerUser(userData) {
  // CORREGIDO: Se agregó await para esperar el resultado de la búsqueda.
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error('El correo electrónico ya está registrado');
  }

  // Simular operación de guardado vía POST
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  // CORREGIDO: Se debe esperar el resultado del "guardado"
  const newUser = await response.json();
  return newUser;
}

/**
 * Valida las credenciales de un usuario.
 *
 * @param {string} email - Correo proporcionado
 * @param {string} password - Contraseña proporcionada (simulada)
 * @returns {Promise<Object|null>} El usuario si es válido, null en caso contrario
 */
async function authenticateUser(email, password) {
  // CORREGIDO: Se debe esperar la respuesta de la API externa
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  // Simulación de validación de contraseña (en este ejercicio, aceptamos cualquier
  // contraseña que coincida con el "username" del usuario en JSONPlaceholder para pruebas)
  // CORREGIDO: Se agregó await para simular el proceso asíncrono de verificación
  const isMatch = await new Promise((resolve) => {
    setTimeout(() => {
      // Usamos el username como password para la simulación
      resolve(user.username === password);
    }, 50);
  });

  return isMatch ? user : null;
}

// Exportar para pruebas
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    findUserByEmail,
    registerUser,
    authenticateUser,
  };
}
