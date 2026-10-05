import type { CabaBarrio } from './caba'

export type ReportType = 'perdido' | 'encontrado' | 'resuelto'


export type PetType = 'perro' | 'gato' | 'otro'

export type PetSize = 'pequeño' | 'mediano' | 'grande'

export type PetGender = 'macho' | 'hembra' | 'desconocido'

export type PetStatus = 'buscando' | 'en_transito' | 'reunido'

export const PET_COLORS = [
  'Negro',
  'Blanco',
  'Marrón',
  'Dorado / Rubio',
  'Gris',
  'Atigrado',
  'Naranja / Rojizo',
  'Crema / Beige',
  'Manchado / Bicolor',
] as const

export type PetColor = (typeof PET_COLORS)[number]

export interface PetColorDefinition {
  label: PetColor
  hexPreview: string
  borderClass?: string
}

export const PET_COLOR_DEFINITIONS: PetColorDefinition[] = [
  { label: 'Negro', hexPreview: '#1e293b' },
  { label: 'Blanco', hexPreview: '#ffffff', borderClass: 'border-slate-300' },
  { label: 'Marrón', hexPreview: '#78350f' },
  { label: 'Dorado / Rubio', hexPreview: '#eab308' },
  { label: 'Gris', hexPreview: '#64748b' },
  { label: 'Atigrado', hexPreview: '#a16207' },
  { label: 'Naranja / Rojizo', hexPreview: '#ea580c' },
  { label: 'Crema / Beige', hexPreview: '#fef3c7', borderClass: 'border-amber-200' },
  { label: 'Manchado / Bicolor', hexPreview: 'conic-gradient(#1e293b 0deg 180deg, #ffffff 180deg 360deg)', borderClass: 'border-slate-300' },
]

/**
 * Estructura exacta de la entidad Mascota en el backend de NestJS
 */
export interface MascotaEntity {
  id: string
  titulo: string
  especie: PetType
  estado: ReportType
  barrio: string
  tamano?: string
  color?: string
  descripcion?: string
  contacto: string
  imagenUrl?: string
  recompensa?: boolean
  fechaPublicacion: string
}

/**
 * Estructura exacta enviada en el POST /mascotas al backend
 */
export interface CreateMascotaPayload {
  titulo: string
  especie: PetType
  estado: ReportType
  barrio: string
  tamano: string
  color: string
  descripcion: string
  contacto: string
  imagenUrl: string
  recompensa: boolean
}

/**
 * Modelo de datos enriquecido usado en la interfaz de usuario de React
 */
export interface PetPost {
  id: string
  reportType: ReportType
  title: string
  petName?: string
  petType: PetType
  breed?: string
  size: PetSize
  gender: PetGender
  colors: PetColor[]
  barrio: CabaBarrio
  approximateLocation?: string
  date: string
  description: string
  imageUrl: string
  contactName: string
  contactPhone: string
  reward?: boolean
  status: PetStatus
  createdAt: string
}

export interface PetFilterState {
  reportType: ReportType | 'todos'
  barrio: CabaBarrio | 'todos'
  petType: PetType | 'todos'
  size: PetSize | 'todos'
  color: PetColor | 'todos'
  searchQuery: string
}

/**
 * Convierte un registro del backend NestJS (MascotaEntity) al formato de componente PetPost
 */
export function mapMascotaEntityToPetPost(m: MascotaEntity): PetPost {
  // Parse colors array from comma-separated string or fallback
  const parsedColors: PetColor[] = []
  if (m.color) {
    const split = m.color.split(',').map((s) => s.trim())
    split.forEach((c) => {
      if (PET_COLORS.includes(c as PetColor)) {
        parsedColors.push(c as PetColor)
      }
    })
  }

  return {
    id: m.id,
    reportType: m.estado,
    title: m.titulo,
    petType: m.especie,
    size: (m.tamano as PetSize) || 'mediano',
    gender: 'desconocido',
    colors: parsedColors.length > 0 ? parsedColors : ['Negro'],
    barrio: m.barrio as CabaBarrio,
    approximateLocation: undefined,
    date: m.fechaPublicacion ? m.fechaPublicacion.split('T')[0] : new Date().toISOString().split('T')[0],
    description: m.descripcion || '',
    imageUrl:
      m.imagenUrl ||
      (m.especie === 'gato'
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'),
    contactName: m.contacto?.includes('-') ? m.contacto.split('-')[0].trim() : 'Contacto',
    contactPhone: m.contacto?.includes('-') ? m.contacto.split('-')[1].trim() : m.contacto,
    reward: m.recompensa ?? false,
    status: m.estado === 'perdido' ? 'buscando' : 'en_transito',
    createdAt: m.fechaPublicacion || new Date().toISOString(),
  }
}
