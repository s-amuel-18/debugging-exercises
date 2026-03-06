# Sistema de Reservas de Vuelos

**Tipo**: Error de Ejecución

## 📋 Historia de Usuario

Como agente de una aerolínea, necesito un módulo que calcule la duración de vuelos, determine la tarifa por asiento y registre reservas de pasajeros para gestionar correctamente las operaciones de vuelo.

## 🎯 Criterios de Aceptación

- `getFlightDuration` debe calcular la duración en minutos entre la salida y la llegada del vuelo
- `getFlightDuration` debe lanzar un error descriptivo cuando el vuelo no tiene horario definido
- `calculateFare` debe dividir la tarifa base entre los asientos disponibles y retornar el resultado redondeado a 2 decimales
- `calculateFare` debe lanzar un error descriptivo cuando no hay asientos disponibles (0 o negativo)
- `bookFlight` debe retornar una confirmación con código, nombre del pasajero, correo y estado
- `bookFlight` debe lanzar un error descriptivo cuando el pasajero no tiene correo de contacto registrado

## 🐛 Problema Reportado

El módulo falla en situaciones comunes de operación. El sistema se cae sin mensajes de error útiles cuando se procesan vuelos o pasajeros con datos incompletos.

**Ejemplos del problema**:

- Al llamar `getFlightDuration` con un vuelo sin horario asignado, el sistema lanza `TypeError: Cannot destructure property 'departure' of undefined` en lugar de un error descriptivo
- Al llamar `calculateFare` con un vuelo que tiene `availableSeats: 0`, la función retorna `Infinity` en lugar de lanzar un error
- Al llamar `bookFlight` con un pasajero que no tiene datos de contacto registrados, el sistema lanza `TypeError: Cannot read properties of undefined (reading 'email')` en lugar de un error descriptivo

## 📂 Archivos

- `buggy-code.js` - Código con los errores
- `test.js` - Pruebas para validar la solución (Jest)
- `solution.js` - Solución de referencia (para comparar después)

## ✅ Cómo Verificar la Solución

```bash
npm test exercises/16-flight-booking-system
```

Todas las pruebas deben pasar para considerar los errores corregidos.

**Nota**: Los tests están configurados para probar `buggy-code.js` por defecto.
Cuando corrijas los errores, cambia la línea de importación en `test.js` a `solution.js`
para verificar tu solución.

## ⚙️ Nivel de Dificultad

**Nivel**: Intermedio

**Tiempo Estimado**: 15-25 minutos
