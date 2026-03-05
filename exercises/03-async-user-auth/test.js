/**
 * Pruebas para: Autenticación Asíncrona (API Externa)
 *
 * Por defecto prueban buggy-code.js para que veas los errores.
 * Cambia a solution.js cuando hayas corregido el código.
 *
 * Ejecutar con: npm test exercises/03-async-user-auth
 */

// IMPORTANTE: Cambiar esta línea para probar tu solución
const {
  registerUser,
  authenticateUser,
  findUserByEmail,
} = require('./buggy-code.js');
// const { registerUser, authenticateUser, findUserByEmail } = require('./solution.js');

describe('Autenticación Asíncrona - JSONPlaceholder API', () => {
  // Datos de usuarios reales en JSONPlaceholder para pruebas
  const VALID_USER_EMAIL = 'Sincere@april.biz';
  const VALID_USER_PASS = 'Bret'; // Usamos username como password

  describe('findUserByEmail - Búsqueda en API externa', () => {
    test('debe retornar los datos del usuario si el email existe', async () => {
      const user = await findUserByEmail(VALID_USER_EMAIL);
      expect(user).not.toBeNull();
      expect(user.email).toBe(VALID_USER_EMAIL);
      expect(user).toHaveProperty('id');
    });

    test('debe retornar null si el usuario no existe', async () => {
      const user = await findUserByEmail('non-existent-email-12345@test.com');
      expect(user).toBeNull();
    });

    test('debe ser una operación asíncrona', () => {
      const result = findUserByEmail(VALID_USER_EMAIL);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('registerUser - Registro de usuarios', () => {
    test('debe simular el registro de un nuevo usuario correctamente', async () => {
      const userData = {
        email: 'new-user-ai@example.com',
        name: 'Antigravity AI',
      };
      const user = await registerUser(userData);

      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
    });

    test('debe lanzar un error si el correo ya existe en la API externa', async () => {
      const userData = {
        email: VALID_USER_EMAIL,
        name: 'Existing User',
      };

      // Debe rechazar con el error de registro
      await expect(registerUser(userData)).rejects.toThrow(
        'El correo electrónico ya está registrado',
      );
    });
  });

  describe('authenticateUser - Validación de credenciales', () => {
    test('debe autenticar correctamente con credenciales válidas (email + username)', async () => {
      const user = await authenticateUser(VALID_USER_EMAIL, VALID_USER_PASS);
      expect(user).not.toBeNull();
      expect(user.email).toBe(VALID_USER_EMAIL);
    });

    test('debe retornar null para una contraseña (username) incorrecta', async () => {
      const user = await authenticateUser(VALID_USER_EMAIL, 'wrong_password');
      expect(user).toBeNull();
    });

    test('debe retornar null si el usuario no existe', async () => {
      const user = await authenticateUser('ghost@example.com', 'any');
      expect(user).toBeNull();
    });
  });
});
