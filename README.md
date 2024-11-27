# Kuepa EduTech - Prueba Técnica Full Stack JavaScript

## Contexto del Proyecto

Este proyecto fue desarrollado como parte de una prueba técnica para Kuepa EduTech, con un tiempo de desarrollo de **19 horas y 29 minutos**. Por ello, el enfoque principal fue cumplir con los requerimientos básicos priorizando funcionalidad, diseño modular y usabilidad.

El sistema simula una plataforma de clases virtuales con un **chat en tiempo real**, administrado por roles, que permite a estudiantes y moderadores interactuar fluidamente.

Debido al tiempo asignado, el software se encuentra optimizado para ejecutarse en **modo desarrollo**.

---

## Ejecución del Proyecto

### 1. Configuración del Entorno

Se requiere un archivo `.env` en la raíz del proyecto. Este es un ejemplo de configuración:

```
PORT=3000
MONGODB_URI=mongodb://192.168.1.xxx:27017/
MONGODB_USER=root
MONGODB_PASS=6512
JWT_SECRET=your_jwt_secret_key
```

### 2. Requisitos Previos

- **Base de datos:** MongoDB (imagen Docker utilizada: [[docker-compose](https://github.com/luisdanielta/mmr-docker)]).

### 3. Instalación y Ejecución

1. **Clonar el repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-repositorio>
   ```

2. **Instalar dependencias**:

   ```bash
   npm install -E
   ```

3. **Iniciar el servidor**:
   ```bash
   npm run dev
   ```

> **Nota:** Este comando debe ejecutarse tanto para el backend como para el frontend.

---

## Descripción del Proyecto

### Backend

- **Framework utilizado:** Express.js.
- **Arquitectura:** Hexagonal.
  - **Rutas:** basada en roles (estudiantes, moderadores).
  - **Seguridad:** Autenticación con JWT.
  - **Funcionalidades clave:**
    - CRUD de datos.
    - Servidor WebSocket para mensajes en tiempo real.
    - Persistencia en MongoDB.

### Frontend

- **Framework utilizado:** React.js.
- **Características principales:**
  - Formularios robustos con validaciones.
  - Interfaz responsive básica.
  - Cliente WebSocket para gestionar mensajes en tiempo real.
  - Manejo de roles y autenticación.

### Roles en el Sistema

- **Estudiante:** Puede enviar y recibir mensajes en el chat.
- **Moderador:** Tiene control administrativo, como editar títulos.

---

## Enfoque de Diseño

El diseño de este software se centró en cumplir los requisitos básicos de la prueba:

- Comunicación en tiempo real mediante WebSockets.
- Autenticación segura y control de acceso por roles.
- Persistencia de datos en MongoDB.

> **Nota:** Por limitaciones de tiempo, ciertas funcionalidades avanzadas (como pruebas unitarias y mejoras en la experiencia de usuario) quedaron fuera del alcance del desarrollo actual.
