import React from 'react'
import { MapPin, Calendar } from 'lucide-react'
import type { PetPost } from '../types/pet'

interface PetCardProps {
  pet: PetPost
  onSelect: (pet: PetPost) => void
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onSelect }) => {
  const isPerdido = pet.reportType === 'perdido'

  return (
    <article
      onClick={() => onSelect(pet)}
      className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-200 group cursor-pointer flex flex-col"
    >
      {/* Photo with Overlay Badges */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={pet.imageUrl}
          alt={pet.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Status Badge: Smaller on mobile, beautifully proportioned on desktop */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span
            className={`px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${
              isPerdido
                ? 'bg-[#E11D48] text-white shadow-rose-900/10'
                : 'bg-[#10B981] text-white shadow-emerald-900/10'
            }`}
          >
            {isPerdido ? 'Perdido' : 'Encontrado'}
          </span>
          {pet.reward && (
            <span className="px-2 md:px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-extrabold bg-amber-400 text-amber-950 shadow-sm">
              Recompensa
            </span>
          )}
        </div>

        {/* Animal species tag */}
        <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] md:text-xs font-medium px-2.5 py-0.5 md:py-1 rounded-full capitalize">
          {pet.petType} • {pet.size}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs md:text-sm font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EA580C] shrink-0" />
            <span className="font-semibold text-slate-700">{pet.barrio}</span>
            {pet.approximateLocation && (
              <span className="truncate text-slate-400">· {pet.approximateLocation}</span>
            )}
          </div>

          <h3 className="font-bold text-[#0F172A] text-base md:text-lg lg:text-xl leading-snug group-hover:text-[#EA580C] transition-colors line-clamp-1 mb-2">
            {pet.title}
          </h3>

          <p className="text-xs md:text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {pet.description}
          </p>

          {/* Color badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {pet.colors.map((c) => (
              <span
                key={c}
                className="px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] md:text-xs font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs md:text-sm text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {new Date(pet.date).toLocaleDateString('es-AR', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
          <span className="text-[#EA580C] font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Ver contacto →
          </span>
        </div>
      </div>
    </article>
  )
}
