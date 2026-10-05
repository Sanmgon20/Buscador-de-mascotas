import React from 'react'
import { AlertCircle, Eye, Search, PlusCircle } from 'lucide-react'
import type { ReportType } from '../types/pet'

interface HeroSelectionProps {
  onSelectOption: (type: ReportType) => void
  onOpenCreateWithMode: (type: ReportType) => void
}

export const HeroSelection: React.FC<HeroSelectionProps> = ({
  onSelectOption,
  onOpenCreateWithMode,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#E7EFEA]/80 via-[#F3F7F5] to-transparent pt-6 md:pt-10 pb-6 md:pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight mb-2 md:mb-3">
          ¿En qué podemos ayudarte hoy?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Conectamos a vecinos de los 48 barrios de CABA para que ninguna mascota se quede sin hogar.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {/* Opción 1: Perdí mi mascota (Coral / Terracota #E11D48) */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-rose-200/80 hover:border-[#E11D48]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center mb-4 md:mb-5 group-hover:scale-105 transition-transform">
              <AlertCircle className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-1.5 md:mb-2">
              Perdí mi mascota
            </h3>
            <p className="text-sm md:text-base text-slate-500 mb-5 md:mb-7 leading-relaxed">
              Publicá una alerta con foto para que los vecinos de tu barrio y zonas cercanas puedan avisarte si la ven.
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => onOpenCreateWithMode('perdido')}
              className="flex-1 py-3 md:py-3.5 px-4 md:px-6 rounded-xl md:rounded-2xl bg-[#E11D48] hover:bg-[#be123c] text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2 shadow-sm shadow-rose-600/20 transition-transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 md:w-5 md:h-5" />
              Publicar búsqueda
            </button>
            <button
              onClick={() => onSelectOption('encontrado')}
              title="Ver mascotas que fueron encontradas recientemente"
              className="py-3 md:py-3.5 px-3 md:px-4 rounded-xl md:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 md:w-4.5 md:h-4.5" />
              <span className="hidden xs:inline">Ver hallazgos</span>
            </button>
          </div>
        </div>

        {/* Opción 2: Encontré / Vi una mascota (Verde Esmeralda #10B981) */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-emerald-200/80 hover:border-[#10B981]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center mb-4 md:mb-5 group-hover:scale-105 transition-transform">
              <Eye className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-1.5 md:mb-2">
              Encontré / Vi una mascota
            </h3>
            <p className="text-sm md:text-base text-slate-500 mb-5 md:mb-7 leading-relaxed">
              Avisá a la comunidad si rescataste o viste a un animal perdido o desorientado en la calle.
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => onOpenCreateWithMode('encontrado')}
              className="flex-1 py-3 md:py-3.5 px-4 md:px-6 rounded-xl md:rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 transition-transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 md:w-5 md:h-5" />
              Publicar aviso
            </button>
            <button
              onClick={() => onSelectOption('perdido')}
              title="Ver publicaciones de mascotas perdidas por sus dueños"
              className="py-3 md:py-3.5 px-3 md:px-4 rounded-xl md:rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 md:w-4.5 md:h-4.5" />
              <span className="hidden xs:inline">Ver perdidos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
