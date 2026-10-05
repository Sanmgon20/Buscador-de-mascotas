import React, { useState } from 'react'
import { X, Camera, AlertCircle, Eye, Check, Loader2 } from 'lucide-react'
import { CABA_BARRIOS } from '../types/caba'
import type { CabaBarrio } from '../types/caba'
import { PET_COLOR_DEFINITIONS } from '../types/pet'
import type {
  PetType,
  PetSize,
  PetGender,
  ReportType,
  PetColor,
  CreateMascotaPayload,
} from '../types/pet'

interface CreatePostModalProps {
  isOpen: boolean
  initialReportType?: ReportType
  onClose: () => void
  onSubmit: (payload: CreateMascotaPayload) => Promise<void> | void
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  initialReportType = 'perdido',
  onClose,
  onSubmit,
}) => {
  const [reportType, setReportType] = useState<ReportType>(initialReportType)
  const [title, setTitle] = useState('')
  const [petName, setPetName] = useState('')
  const [petType, setPetType] = useState<PetType>('perro')
  const [breed, setBreed] = useState('')
  const [size, setSize] = useState<PetSize>('mediano')
  const [gender, setGender] = useState<PetGender>('desconocido')
  const [selectedColors, setSelectedColors] = useState<PetColor[]>([])
  const [barrio, setBarrio] = useState<CabaBarrio>('Palermo')
  const [approximateLocation, setApproximateLocation] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [reward, setReward] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sincronizar el tipo de reporte si se abre con un modo específico
  React.useEffect(() => {
    setReportType(initialReportType)
  }, [initialReportType])

  if (!isOpen) return null

  const handleToggleColor = (color: PetColor) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Por favor ingresá un título o resumen para la publicación.')
      return
    }
    if (selectedColors.length === 0) {
      setError('Por favor seleccioná al menos un color característico de la mascota.')
      return
    }
    if (!contactName.trim() || !contactPhone.trim()) {
      setError('Por favor completá tu nombre y teléfono de contacto.')
      return
    }

    // Imagen por defecto si no se proporciona una URL
    const finalImageUrl =
      imageUrl.trim() ||
      (petType === 'gato'
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80')

    // Estructura exacta requerida por la entidad Mascota de NestJS
    const payload: CreateMascotaPayload = {
      titulo: title.trim(),
      especie: petType,
      estado: reportType,
      barrio,
      tamano: size,
      color: selectedColors.join(', '),
      descripcion: [
        description.trim(),
        petName.trim() ? `Nombre: ${petName.trim()}` : '',
        approximateLocation.trim() ? `Referencia: ${approximateLocation.trim()}` : '',
        breed.trim() ? `Raza: ${breed.trim()}` : '',
        gender !== 'desconocido' ? `Sexo: ${gender}` : '',
      ]
        .filter(Boolean)
        .join('. '),
      contacto: `${contactName.trim()} - ${contactPhone.trim()}`,
      imagenUrl: finalImageUrl,
      recompensa: reportType === 'perdido' ? reward : false,
    }

    try {
      setIsSubmitting(true)
      setError(null)
      await onSubmit(payload)

      // Limpiar formulario y cerrar
      setTitle('')
      setPetName('')
      setSelectedColors([])
      setDescription('')
      setImageUrl('')
      setContactName('')
      setContactPhone('')
      setApproximateLocation('')
      setBreed('')
      setReward(false)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar la publicación')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-2xl font-black text-[#0F172A]">
              Nueva Publicación
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">Ciudad Autónoma de Buenos Aires</p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 md:p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 md:space-y-6">
          {error && (
            <div className="p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-rose-50 border border-rose-200 text-[#E11D48] text-xs md:text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Toggle Perdí / Encontré */}
          <div>
            <label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
              ¿Cuál es la situación? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReportType('perdido')}
                className={`py-3 md:py-3.5 px-3 md:px-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                  reportType === 'perdido'
                    ? 'border-[#E11D48] bg-rose-50/70 text-[#E11D48]'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#E11D48]" />
                Perdí mi mascota
              </button>
              <button
                type="button"
                onClick={() => setReportType('encontrado')}
                className={`py-3 md:py-3.5 px-3 md:px-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                  reportType === 'encontrado'
                    ? 'border-[#10B981] bg-emerald-50/70 text-[#10B981]'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Eye className="w-4 h-4 md:w-5 md:h-5 text-[#10B981]" />
                Encontré / Vi una
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
              Título de la publicación *
            </label>
            <input
              type="text"
              required
              placeholder={
                reportType === 'perdido'
                  ? 'Ej: Buscamos a Toby, caniche blanco en Caballito'
                  : 'Ej: Perro rescatado en Av. Corrientes y Medrano'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C]"
            />
          </div>

          {/* Species & Size */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">Especie *</label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value as PetType)}
                className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base font-medium focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro animal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">Tamaño *</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as PetSize)}
                className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base font-medium focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>

          {/* Standard Pet Color Checkboxes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs md:text-sm font-bold text-slate-700">
                Colores de la mascota * <span className="text-slate-400 font-normal">(Podés marcar más de uno)</span>
              </label>
              {selectedColors.length > 0 && (
                <span className="text-[11px] md:text-xs font-bold text-[#EA580C] bg-orange-50 px-2.5 py-0.5 rounded-md">
                  {selectedColors.length} {selectedColors.length === 1 ? 'elegido' : 'elegidos'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 bg-slate-50/70 p-3 md:p-4 rounded-2xl border border-slate-200/80">
              {PET_COLOR_DEFINITIONS.map(({ label, hexPreview, borderClass }) => {
                const isSelected = selectedColors.includes(label)
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleToggleColor(label)}
                    className={`flex items-center gap-2.5 p-2 md:p-2.5 rounded-xl text-left border text-xs md:text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#EA580C] bg-orange-50/70 text-[#0F172A] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {/* Custom Checkbox Indicator */}
                    <div
                      className={`w-4 h-4 md:w-4.5 md:h-4.5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-[#EA580C] border-[#EA580C] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    {/* Color Swatch Dot */}
                    <span
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full shrink-0 ${borderClass ? `border ${borderClass}` : ''}`}
                      style={{ background: hexPreview }}
                    />

                    <span className="truncate">{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Pet Name & Sex */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
                Nombre de la mascota
              </label>
              <input
                type="text"
                placeholder={reportType === 'perdido' ? 'Ej: Rocky' : 'Opcional / Desconocido'}
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">Sexo</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as PetGender)}
                className="w-full px-3.5 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base font-medium focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="desconocido">No lo sé</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>
          </div>

          {/* Barrio CABA (Required) */}
          <div>
            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
              Barrio de CABA *
            </label>
            <select
              value={barrio}
              onChange={(e) => setBarrio(e.target.value as CabaBarrio)}
              className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] cursor-pointer"
            >
              {CABA_BARRIOS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Location details & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
                Esquinas o punto de referencia
              </label>
              <input
                type="text"
                placeholder="Ej: Rivadavia y Medrano"
                value={approximateLocation}
                onChange={(e) => setApproximateLocation(e.target.value)}
                className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
                Fecha del hecho
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Breed */}
          <div>
            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">Raza (si sabés)</label>
            <input
              type="text"
              placeholder="Ej: Mestizo, Caniche, Siamés..."
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
              Foto (URL de imagen)
            </label>
            <div className="relative">
              <Camera className="w-4 h-4 md:w-5 md:h-5 text-slate-400 absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="Pegá un link a la foto (o dejalo vacío para foto sugerida)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none"
              />
            </div>
            <p className="text-[11px] md:text-xs text-slate-400 mt-1.5">
              * Podés dejar el campo vacío para asignar una imagen representativa.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
              Descripción o detalles clave
            </label>
            <textarea
              rows={3}
              placeholder="Describí collar, comportamiento, si necesita medicación o cualquier seña particular..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none resize-none"
            />
          </div>

          {/* Reward checkbox for lost pets */}
          {reportType === 'perdido' && (
            <label className="flex items-center gap-2.5 text-xs md:text-sm font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={reward}
                onChange={(e) => setReward(e.target.checked)}
                className="w-4 h-4 text-[#EA580C] rounded focus:ring-orange-400 cursor-pointer"
              />
              <span>Ofrezco recompensa económica a quien lo encuentre</span>
            </label>
          )}

          {/* Contact Details */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Datos para que te contacten
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Matías"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">
                  WhatsApp / Celular *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej: +54911..."
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-400 text-white font-extrabold text-sm md:text-base shadow-md shadow-slate-900/10 transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Publicando mascota...</span>
                </>
              ) : (
                <span>Publicar aviso ahora</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
