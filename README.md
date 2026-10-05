# 🐾 Patitas CABA - Buscador de Mascotas Perdidas y Encontradas

Aplicación web full-stack para la publicación y búsqueda rápida de mascotas perdidas y encontradas en la **Ciudad Autónoma de Buenos Aires (CABA)**.

---

## 🚀 Inicio Rápido

### Requisitos previos
- Node.js (v18 o superior)
- npm
- Cuenta o proyecto en **Supabase** (PostgreSQL)

---

### 1. Configurar Backend (.env)

En la carpeta [`backend/.env`](file:///c:/Users/sanmg/OneDrive/Escritorio/Repo%20propio/Proyecto_Mascotas/backend/.env), colocá tu cadena de conexión `DATABASE_URL` de Supabase:

```env
DATABASE_URL=postgresql://postgres:[TU_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
PORT=3000
```

---

### 2. Ejecutar la Aplicación

Podés ejecutar todo desde la raíz del proyecto:

- **Frontend (React + Vite):**
  ```bash
  npm run dev
  ```
  *(Disponible en `http://localhost:5173`)*

- **Backend (NestJS API):**
  ```bash
  npm run dev:backend
  ```
  *(Disponible en `http://localhost:3000`)*

---

## 📡 Endpoints del Backend (`/mascotas`)

- **`GET /mascotas`**: Lista todas las publicaciones.
  - Soporta query params opcionales para filtrado:
    - `?barrio=Palermo`
    - `?especie=perro` (`perro` | `gato` | `otro`)
    - `?estado=perdido` (`perdido` | `encontrado`)
    - `?busqueda=toby`
- **`GET /mascotas/:id`**: Obtiene el detalle de una publicación por ID.
- **`POST /mascotas`**: Publica una nueva mascota perdida o encontrada.
  - Body JSON de ejemplo:
    ```json
    {
      "titulo": "Perro extraviado en Parque Centenario",
      "especie": "perro",
      "estado": "perdido",
      "barrio": "Caballito",
      "tamano": "mediano",
      "color": "Marrón",
      "descripcion": "Lleva collar azul y responde por Milo.",
      "contacto": "+5491145678901",
      "imagenUrl": "https://...",
      "recompensa": true
    }
    ```

---

## 📁 Estructura del Proyecto

```text
Proyecto_Mascotas/
├── backend/                  # API REST en NestJS + TypeORM + PostgreSQL (Supabase)
│   ├── src/
│   │   ├── mascotas/         # Módulo de mascotas (Entity, DTOs, Service, Controller)
│   │   ├── app.module.ts     # Configuración de TypeORM con DATABASE_URL y synchronize
│   │   └── main.ts           # Inicialización y CORS habilitado
│   └── .env                  # Variables de entorno (DATABASE_URL)
└── frontend/                 # Aplicación React + TypeScript + Vite + Tailwind CSS
```
