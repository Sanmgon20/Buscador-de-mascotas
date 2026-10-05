import type {
  MascotaEntity,
  CreateMascotaPayload,
  PetFilterState,
} from '../types/pet'

// URL base de la API tomada de variables de entorno o localhost por defecto
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Servicio para interactuar con la API REST de NestJS (/mascotas)
 */
export const mascotasApi = {
  /**
   * Obtiene la lista de mascotas desde el backend aplicando filtros opcionales
   */
  async getMascotas(filters?: Partial<PetFilterState>): Promise<MascotaEntity[]> {
    const params = new URLSearchParams()

    if (filters?.barrio && filters.barrio !== 'todos') {
      params.append('barrio', filters.barrio)
    }

    if (filters?.petType && filters.petType !== 'todos') {
      params.append('especie', filters.petType)
    }

    if (filters?.reportType && filters.reportType !== 'todos') {
      params.append('estado', filters.reportType)
    }

    if (filters?.searchQuery && filters.searchQuery.trim() !== '') {
      params.append('busqueda', filters.searchQuery.trim())
    }

    const queryString = params.toString()
    const url = `${API_BASE_URL}/mascotas${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: no se pudieron cargar las mascotas`)
    }

    return await response.json()
  },

  /**
   * Envía una petición POST a /mascotas con la estructura exacta de la entidad Mascota
   */
  async createMascota(payload: CreateMascotaPayload): Promise<MascotaEntity> {
    const response = await fetch(`${API_BASE_URL}/mascotas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const message = errorData?.message || `Error ${response.status} al publicar la mascota`
      throw new Error(Array.isArray(message) ? message.join(', ') : message)
    }

    return await response.json()
  },

  /**
   * Obtiene una mascota específica por su ID
   */
  async getMascotaById(id: string): Promise<MascotaEntity> {
    const response = await fetch(`${API_BASE_URL}/mascotas/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: mascota no encontrada`)
    }

    return await response.json()
  },

  /**
   * Marca una publicación como resuelta en el backend (PATCH /mascotas/:id/resolver)
   */
  async resolverMascota(id: string): Promise<MascotaEntity> {
    const response = await fetch(`${API_BASE_URL}/mascotas/${id}/resolver`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const message = errorData?.message || `Error ${response.status} al marcar publicación como resuelta`
      throw new Error(Array.isArray(message) ? message.join(', ') : message)
    }

    return await response.json()
  },
}

