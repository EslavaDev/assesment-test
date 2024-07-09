# Proyecto de Pedidos con Pruebas Unitarias

Este proyecto demuestra cómo implementar un servicio de pedidos en Node.js, incluyendo pruebas unitarias para asegurar la calidad del código.

## Requisitos

- Node.js (versión recomendada: LTS)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio o descarga el código fuente.
2. Navega hasta el directorio del proyecto en tu terminal.
3. Ejecuta `npm install` para instalar las dependencias del proyecto.

## Ejecución de Pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando en la terminal:

```bash
npm run test
```

Este comando ejecutará todas las pruebas definidas en el proyecto utilizando Jest.

## Cobertura de Pruebas

Para generar un informe de cobertura de pruebas, ejecuta:

```bash
npm run run test:coverage
```

Esto generará un informe de cobertura en el directorio `coverage` de tu proyecto, mostrando qué partes del código están cubiertas por las pruebas.

## Pasos Adicionales

- **Configuración de Jest**: El proyecto utiliza Jest para pruebas unitarias. Jest se configura automáticamente al ejecutar `npm install`.
- **Ejecutar Pruebas Específicas**: Si deseas ejecutar pruebas específicas, puedes hacerlo utilizando el nombre del archivo de prueba o el nombre de la función de prueba. Por ejemplo:

```bash
npx jest order-services.test.js
```


## Contribuciones

Las contribuciones son bienvenidas. Antes de enviar cambios, asegúrate de que las pruebas pasen y de actualizar la documentación según sea necesario.


