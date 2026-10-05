import React, { useState } from 'react'
import { X, MapPin, Calendar, Phone, MessageCircle, CheckCircle2 } from 'lucide-react'
import type { PetPost } from '../types/pet'

interface PetDetailModalProps {
  pet: PetPost | null
  onClose: () => void
  onResolve?: (petId: string) => Promise<void> | void
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({
  pet,
  onClose,
  onResolve,
}) => {
  const [isResolving, setIsResolving] = useState(false)
  if (!pet) return null

  const isPerdido = pet.reportType === 'perdido'

  // Clean phone number for WhatsApp link (argentina mobile)
  const cleanPhone = pet.contactPhone.replace(/\D/g, '')
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hola ${pet.contactName}, me comunico por la publicación en Patitas CABA sobre "${pet.title}".`
  )}`

  const handleResolveClick = async () => {
    if (!onResolve) return
    const confirm = window.confirm(
      '¿Deseás marcar esta publicación como resuelta? Ya no se mostrará en el feed principal de búsqueda.'
    )
    if (!confirm) return

    try {
      setIsResolving(true)
      await onResolve(pet.id)
      onClose()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al marcar como resuelta')
    } finally {
      setIsResolving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Pet Image */}
        <div className="relative aspect-4/3 sm:aspect-16/10 w-full bg-slate-900">
          <img
            src={pet.imageUrl}
            alt={pet.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-1.5 items-start">
            <span
              className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wider shadow-md ${
                isPerdido ? 'bg-[#E11D48] text-white' : 'bg-[#10B981] text-white'
              }`}
            >
              {isPerdido ? 'Mascota Perdida' : 'Mascota Encontrada'}
            </span>
            {pet.reward && (
              <span className="px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-extrabold bg-amber-400 text-amber-950 shadow-md">
                Recompensa ofrecida
              </span>
            )}
          </div>
        </div>

        {/* Pet Body Details */}
        <div className="p-5 md:p-8 flex-1 space-y-4 md:space-y-6">
          <div>
            <div className="flex items-center gap-1.5 text-[#EA580C] font-semibold text-xs md:text-sm uppercase tracking-wider mb-1.5">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <span>Barrio {pet.barrio}, CABA</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0F172A] leading-tight">
              {pet.title}
            </h2>
            {pet.approximateLocation && (
              <p className="text-xs md:text-sm text-slate-500 mt-1 md:mt-1.5">
                📍 {pet.approximateLocation}
              </p>
            )}
          </div>

          {/* Key Attributes Tags */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100 text-center">
            <div>
              <span className="block text-[10px] md:text-xs uppercase font-bold text-slate-400">Especie</span>
              <span className="font-bold text-sm md:text-base text-[#0F172A] capitalize">{pet.petType}</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="block text-[10px] md:text-xs uppercase font-bold text-slate-400">Tamaño</span>
              <span className="font-bold text-sm md:text-base text-[#0F172A] capitalize">{pet.size}</span>
            </div>
            <div>
              <span className="block text-[10px] md:text-xs uppercase font-bold text-slate-400">Sexo</span>
              <span className="font-bold text-sm md:text-base text-[#0F172A] capitalize">{pet.gender}</span>
            </div>
          </div>

          {/* Color badges */}
          <div>
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Colores de la mascota
            </h4>
            <div className="flex flex-wrap gap-2">
              {pet.colors.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs md:text-sm font-semibold"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 mb-1.5">Descripción</h4>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              {pet.description}
            </p>
          </div>

          {/* Extra details (date, breed) */}
          <div className="text-xs md:text-sm text-slate-500 space-y-1.5">
            {pet.breed && <p><strong>Raza / Tipo:</strong> {pet.breed}</p>}
            <p className="flex items-center gap-1.5 text-slate-400 pt-1">
              <Calendar className="w-4 h-4" />
              Reportado el {new Date(pet.date).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Contact Box */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Contacto directo
            </h4>
            <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-200/80 flex flex-col gap-3 md:gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Publicado por</p>
                  <p className="text-base md:text-xl font-bold text-[#0F172A]">{pet.contactName}</p>
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-600">{pet.contactPhone}</span>
              </div>

              <div className="flex gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-5 rounded-xl md:rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  Escribir por WhatsApp
                </a>
                <a
                  href={`tel:${pet.contactPhone}`}
                  className="py-3.5 px-5 rounded-xl md:rounded-2xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  Llamar
                </a>
              </div>
            </div>
          </div>

          {/* Resolver / Cerrar publicación */}
          {onResolve && (
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-500/5 p-4 rounded-2xl border border-amber-500/20">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-[#0F172A] block">¿Ya se resolvió este caso?</span>
                Si la mascota ya regresó a su casa, marcala como resuelta.
              </div>
              <button
                onClick={handleResolveClick}
                disabled={isResolving}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-300 hover:border-emerald-600 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                <span>{isResolving ? 'Actualizando...' : 'Marcar como Resuelto'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
