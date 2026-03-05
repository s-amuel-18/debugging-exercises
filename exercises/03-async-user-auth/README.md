# Sistema de Autenticación Asíncrono (API Externa)

**Tipo**: Error Asíncrono

## 📋 Historia de Usuario

Como desarrollador del equipo de backend, necesito migrar nuestro módulo de autenticación para que utilice una API externa de usuarios. Esto nos permitirá centralizar la gestión de identidades y asegurar que las validaciones se realicen contra datos reales, utilizando operaciones asíncronas modernas.

## 🎯 Criterios de Aceptación

- Se debe buscar un usuario por su correo electrónico utilizando la API de JSONPlaceholder.
- Para el registro (`registerUser`), se debe verificar primero si el email existe. Si no existe, se realiza una petición POST a la API para "crear" el usuario.
- Si el usuario ya existe al intentar registrarse, el sistema debe lanzar el error: `"El correo electrónico ya está registrado"`.
- Para la autenticación (`authenticateUser`), se debe validar que el email exista y que la contraseña coincida con el campo `username` del usuario devuelto por la API.
- Todas las funciones deben ser asíncronas y manejar correctamente las promesas devueltas por `fetch`.

## ⚙️ Documentación de la API

Este ejercicio utiliza **JSONPlaceholder**, una API REST falsa para pruebas.

- **Base URL**: `https://jsonplaceholder.typicode.com/users`
- **Buscar por email**: `GET /users?email={email}`
- **Registrar usuario**: `POST /users` (envía `{ email, name }`)
- **Nota**: El método POST en JSONPlaceholder simula la creación pero no persiste cambios reales en su servidor.

## 🐛 Problema Reportado

El equipo de integración ha reportado fallos críticos después de la migración:

1. La función `findUserByEmail` parece devolver objetos extraños o fallar inmediatamente con errores de tipo.
2. Es imposible registrar nuevos usuarios; se recibe el error de "ya existe" incluso cuando el email es inventado.
3. El proceso de autenticación permite el acceso con cualquier contraseña (o a veces ninguna), siempre que el email sea válido.

**Ejemplos del problema**:

- Al llamar a `findUserByEmail('Sincere@april.biz')`, se obtiene `undefined` o un error en lugar del objeto del usuario.
- Al intentar registrar `nuevo-email@test.com`, se recibe: `"El correo electrónico ya está registrado"`.
- Al autenticar con email válido pero contraseña `"incorrecta"`, la función devuelve el usuario en lugar de `null`.

## 📂 Archivos

- `buggy-code.js` - Código con errores en el manejo de Promesas y `fetch`.
- `test.js` - Pruebas automatizadas (Jest).
- `solution.js` - Solución corregida.

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/03-async-user-auth
```

> **Nota**: Este ejercicio requiere conexión a internet para realizar las peticiones a la API externa.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
