import React from 'react'
import { MapPin, Search, X, SlidersHorizontal, Palette } from 'lucide-react'
import { CABA_BARRIOS } from '../types/caba'
import type { CabaBarrio } from '../types/caba'
import { PET_COLOR_DEFINITIONS } from '../types/pet'
import type { PetFilterState, PetType, PetSize, ReportType, PetColor } from '../types/pet'

interface PetFiltersProps {
  filters: PetFilterState
  onChange: (filters: PetFilterState) => void
  totalCount: number
}

export const PetFilters: React.FC<PetFiltersProps> = ({
  filters,
  onChange,
  totalCount,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  const handleBarrioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...filters,
      barrio: e.target.value === 'todos' ? 'todos' : (e.target.value as CabaBarrio),
    })
  }

  const handleColorChange = (color: PetColor | 'todos') => {
    onChange({
      ...filters,
      color,
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...filters,
      searchQuery: e.target.value,
    })
  }

  const handleReportTypeChange = (type: ReportType | 'todos') => {
    onChange({
      ...filters,
      reportType: type,
    })
  }

  const handlePetTypeChange = (type: PetType | 'todos') => {
    onChange({
      ...filters,
      petType: type,
    })
  }

  const handleSizeChange = (size: PetSize | 'todos') => {
    onChange({
      ...filters,
      size,
    })
  }

  const resetFilters = () => {
    onChange({
      reportType: 'todos',
      barrio: 'todos',
      petType: 'todos',
      size: 'todos',
      color: 'todos',
      searchQuery: '',
    })
  }

  const hasActiveFilters =
    filters.reportType !== 'todos' ||
    filters.barrio !== 'todos' ||
    filters.petType !== 'todos' ||
    filters.size !== 'todos' ||
    filters.color !== 'todos' ||
    filters.searchQuery.trim() !== ''

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/80 shadow-xs p-4 md:p-6 mb-6 md:mb-8">
      {/* Search Input & Quick Barrio Select */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 md:gap-4 mb-3 md:mb-4">
        {/* Text Search */}
        <div className="sm:col-span-7 relative">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-slate-400 absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, calle o detalle..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] transition-all placeholder:text-slate-400"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ ...filters, searchQuery: '' })}
              className="absolute right-3.5 md:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>

        {/* CABA Barrio Selector */}
        <div className="sm:col-span-5 relative">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#EA580C] absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={filters.barrio}
            onChange={handleBarrioChange}
            className="w-full pl-10 md:pl-12 pr-8 py-2.5 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-sm md:text-base font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] transition-all appearance-none cursor-pointer"
          >
            <option value="todos">Todos los barrios de CABA</option>
            {CABA_BARRIOS.map((barrio) => (
              <option key={barrio} value={barrio}>
                {barrio}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs md:text-sm">
            ▼
          </div>
        </div>
      </div>

      {/* Pill Filters for Report Type */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => handleReportTypeChange('todos')}
            className={`px-3.5 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.reportType === 'todos'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => handleReportTypeChange('perdido')}
            className={`px-3.5 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.reportType === 'perdido'
                ? 'bg-[#E11D48] text-white shadow-xs shadow-rose-900/20'
                : 'bg-rose-50 text-[#E11D48] hover:bg-rose-100'
            }`}
          >
            🚨 Perdidos
          </button>
          <button
            onClick={() => handleReportTypeChange('encontrado')}
            className={`px-3.5 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.reportType === 'encontrado'
                ? 'bg-[#10B981] text-white shadow-xs shadow-emerald-900/20'
                : 'bg-emerald-50 text-[#10B981] hover:bg-emerald-100'
            }`}
          >
            👀 Vistos / En Tránsito
          </button>
          <button
            onClick={() => handleReportTypeChange('resuelto')}
            className={`px-3.5 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.reportType === 'resuelto'
                ? 'bg-slate-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            ✅ Resueltos
          </button>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              showAdvanced || filters.petType !== 'todos' || filters.size !== 'todos' || filters.color !== 'todos'
                ? 'bg-orange-50 text-[#EA580C] font-semibold border border-orange-200/60'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Filtros {filters.color !== 'todos' ? '(Color)' : ''}</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 text-xs md:text-sm text-slate-500 font-medium ml-auto">
          <span>{totalCount} {totalCount === 1 ? 'mascota' : 'mascotas'}</span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[#E11D48] hover:text-rose-700 font-semibold underline decoration-dotted cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 text-xs md:text-sm">
          {/* Species & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-medium mb-1.5 md:mb-2">Especie:</label>
              <div className="flex gap-2">
                {(['todos', 'perro', 'gato', 'otro'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => handlePetTypeChange(type)}
                    className={`px-3 md:px-4 py-1.5 rounded-xl capitalize transition-colors cursor-pointer ${
                      filters.petType === type
                        ? 'bg-[#0F172A] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type === 'todos' ? 'Todas' : type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1.5 md:mb-2">Tamaño:</label>
              <div className="flex gap-2">
                {(['todos', 'pequeño', 'mediano', 'grande'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-3 md:px-4 py-1.5 rounded-xl capitalize transition-colors cursor-pointer ${
                      filters.size === size
                        ? 'bg-[#0F172A] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {size === 'todos' ? 'Todos' : size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Standard Pet Color Filter */}
          <div>
            <div className="flex items-center gap-1.5 text-slate-500 font-medium mb-2">
              <Palette className="w-4 h-4 text-[#EA580C]" />
              <span>Filtrar por color estándar:</span>
              {filters.color !== 'todos' && (
                <button
                  onClick={() => handleColorChange('todos')}
                  className="text-[#E11D48] hover:text-rose-700 ml-auto font-semibold cursor-pointer"
                >
                  Quitar filtro de color
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleColorChange('todos')}
                className={`px-3 md:px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filters.color === 'todos'
                    ? 'bg-[#0F172A] text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Cualquier color
              </button>
              {PET_COLOR_DEFINITIONS.map(({ label, hexPreview, borderClass }) => {
                const isSelected = filters.color === label
                return (
                  <button
                    key={label}
                    onClick={() => handleColorChange(label)}
                    className={`flex items-center gap-2 px-3 md:px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EA580C] border-[#EA580C] text-white font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full shrink-0 ${borderClass ? `border ${borderClass}` : ''}`}
                      style={{ background: hexPreview }}
                    />
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
