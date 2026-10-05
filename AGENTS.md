# AGENTS.md - Proyecto Buscador de Mascotas CABA

## Descripción del Proyecto
Aplicación web responsive (mobile-first) optimizada para celulares y computadoras, orientada a la publicación y búsqueda rápida de mascotas perdidas y encontradas.

## Alcance Inicial (Fase 1)
- Ámbito geográfico: Barrios de CABA (Ciudad Autónoma de Buenos Aires), Argentina.
- Funcionalidad principal:
  1. Pantalla de inicio para elegir: "Perdí mi mascota" o "Encontré / Vi una mascota".
  2. Formulario interactivo y rápido para publicar un hallazgo o pérdida.
  3. Buscador con filtros dinámicos (Barrio de CABA, Especie, Color, Tamaño, Estado).
  4. Vista detallada de cada publicación con foto y contacto.

## Arquitectura y Stack Tecnológico
- **Lenguaje:** TypeScript (estricto).
- **Frontend:** React (Vite) optimizado para pantallas móviles (Mobile-first) con CSS/Tailwind.
- **Backend:** Node.js / NestJS o API en TypeScript.
- **Base de Datos:** SQL (PostgreSQL/MySQL o SQLite para desarrollo local).
- **Manejo de Imágenes:** Almacenamiento local o servicio en la nube (ej. Cloudinary), guardando únicamente la URL/ruta en la base de datos SQL.

## Reglas de Desarrollo
- Mantener el código modular, limpio y bien tipado con TypeScript.
- El diseño debe ser prioritariamente para celulares (Mobile-First).
- Incluir un listado estándar o enum con los barrios oficiales de CABA para los filtros y publicaciones.