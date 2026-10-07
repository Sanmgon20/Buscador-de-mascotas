import { useState, useMemo, useEffect, useCallback } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSelection } from './components/HeroSelection'
import { PetFilters } from './components/PetFilters'
import { PetCard } from './components/PetCard'
import { PetDetailModal } from './components/PetDetailModal'
import { CreatePostModal } from './components/CreatePostModal'
import { MOCK_PETS } from './data/mockPets'
import { mascotasApi } from './services/api'
import { mapMascotaEntityToPetPost } from './types/pet'
import type { PetPost, PetFilterState, ReportType, CreateMascotaPayload } from './types/pet'
import { Plus, SearchX, HeartHandshake, Loader2, WifiOff, RefreshCw } from 'lucide-react'

export function App() {
  const [pets, setPets] = useState<PetPost[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const [selectedPet, setSelectedPet] = useState<PetPost | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [createInitialType, setCreateInitialType] = useState<ReportType>('perdido')

  const [filters, setFilters] = useState<PetFilterState>({
    reportType: 'todos',
    barrio: 'todos',
    petType: 'todos',
    size: 'todos',
    color: 'todos',
    searchQuery: '',
  })

  // Cargar publicaciones desde el backend de NestJS.
  // Cuando el filtro es 'resuelto', se pasa el estado al backend porque
  // por defecto el backend excluye las mascotas resueltas del feed.
  const fetchMascotas = useCallback(async (currentFilters?: PetFilterState) => {
    try {
      setIsLoading(true)
      setApiError(null)

      // Solo pasamos el estado al backend si es 'resuelto' (caso especial)
      // Para el resto, el filtrado lo hace el cliente sobre el resultado completo
      const apiFilters =
        currentFilters?.reportType === 'resuelto'
          ? { reportType: 'resuelto' as const }
          : undefined

      const data = await mascotasApi.getMascotas(apiFilters)

      if (data && data.length > 0) {
        setPets(data.map(mapMascotaEntityToPetPost))
        setIsLiveApi(true)
      } else {
        setPets(currentFilters?.reportType === 'resuelto' ? [] : MOCK_PETS)
        setIsLiveApi(true)
      }
    } catch (err) {
      console.warn('Backend desconectado o no accesible, usando datos locales:', err)
      setApiError('El backend no está respondiendo. Mostrando publicaciones locales de prueba.')
      setPets(MOCK_PETS)
      setIsLiveApi(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMascotas()
  }, [fetchMascotas])

  // Re-fetch al backend cuando el usuario activa/desactiva el filtro "Resueltos"
  // porque el backend excluye resueltos por defecto y hay que pedirlos explícitamente
  useEffect(() => {
    fetchMascotas(filters)
    // Solo recargamos del backend cuando cambia reportType (el resto filtra en cliente)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.reportType])

  // Lógica de filtrado en cliente (aplica sobre los datos ya cargados del backend)
    try {
      setIsLoading(true)
      setApiError(null)

      // Solo pasamos el estado al backend si es 'resuelto' (caso especial)
      // Para el resto, el filtrado lo hace el cliente sobre el resultado completo
      const apiFilters =
        currentFilters?.reportType === 'resuelto'
          ? { reportType: 'resuelto' as const }
          : undefined

      const data = await mascotasApi.getMascotas(apiFilters)

      if (data && data.length > 0) {
        setPets(data.map(mapMascotaEntityToPetPost))
        setIsLiveApi(true)
      } else {
        setPets(currentFilters?.reportType === 'resuelto' ? [] : MOCK_PETS)
        setIsLiveApi(true)
      }
    } catch (err) {
      console.warn('Backend desconectado o no accesible, usando datos locales:', err)
      setApiError('El backend no está respondiendo. Mostrando publicaciones locales de prueba.')
      setPets(MOCK_PETS)
      setIsLiveApi(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMascotas()
  }, [fetchMascotas])

  // Re-fetch al backend cuando el usuario activa/desactiva el filtro "Resueltos"
  // porque el backend excluye resueltos por defecto y hay que pedirlos explícitamente
  useEffect(() => {
    fetchMascotas(filters)
    // Solo recargamos del backend cuando cambia reportType (el resto filtra en cliente)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.reportType])

  // Lógica de filtrado en cliente (aplica sobre los datos ya cargados del backend)
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Filtro por tipo de reporte (ya fue aplicado al backend para 'resuelto',
      // pero lo mantenemos aquí para 'perdido'/'encontrado' sin refetch)
      if (filters.reportType !== 'todos' && pet.reportType !== filters.reportType) {
        return false
      }
      // Filtro por barrio de CABA
      if (filters.barrio !== 'todos' && pet.barrio !== filters.barrio) {
        return false
      }
      // Filtro por especie
      if (filters.petType !== 'todos' && pet.petType !== filters.petType) {
        return false
      }
      // Filtro por tamaño
      if (filters.size !== 'todos' && pet.size !== filters.size) {
        return false
      }
      // Filtro por color estándar
      if (filters.color !== 'todos' && !pet.colors.includes(filters.color)) {
        return false
      }
      // Búsqueda por texto (título, descripción, barrio, o color)
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim()
        const matchTitle = pet.title.toLowerCase().includes(query)
        const matchDesc = pet.description.toLowerCase().includes(query)
        const matchBarrio = pet.barrio.toLowerCase().includes(query)
        const matchLoc = pet.approximateLocation?.toLowerCase().includes(query) ?? false
        const matchName = pet.petName?.toLowerCase().includes(query) ?? false
        const matchColor = pet.colors.some((c) => c.toLowerCase().includes(query))

        if (!matchTitle && !matchDesc && !matchBarrio && !matchLoc && !matchName && !matchColor) {
          return false
        }
      }
      return true
    })
  }, [pets, filters])

  const handleHeroSelectOption = (type: ReportType) => {
    setFilters((prev) => ({ ...prev, reportType: type }))
  }

  const handleOpenCreateWithMode = (type: ReportType) => {
    setCreateInitialType(type)
    setIsCreateOpen(true)
  }

  // Guardar publicación en el backend vía POST /mascotas
  const handleCreatePost = async (payload: CreateMascotaPayload) => {
    try {
      const createdEntity = await mascotasApi.createMascota(payload)
      const mapped = mapMascotaEntityToPetPost(createdEntity)
      setPets((prev) => [mapped, ...prev])
      setIsLiveApi(true)
      setApiError(null)
    } catch (err) {
      console.error('Error al persistir en backend:', err)
      // Si el backend no está disponible, guardamos localmente para no frustrar la experiencia
      const fallbackPet: PetPost = {
        id: `local-${Date.now()}`,
        reportType: payload.estado,
        title: payload.titulo,
        petType: payload.especie,
        size: payload.tamano as any,
        gender: 'desconocido',
        colors: payload.color.split(',').map((c) => c.trim()) as any,
        barrio: payload.barrio as any,
        date: new Date().toISOString().split('T')[0],
        description: payload.descripcion,
        imageUrl: payload.imagenUrl,
        contactName: payload.contacto.split('-')[0]?.trim() || 'Contacto',
        contactPhone: payload.contacto.split('-')[1]?.trim() || payload.contacto,
        reward: payload.recompensa,
        status: payload.estado === 'perdido' ? 'buscando' : 'en_transito',
        createdAt: new Date().toISOString(),
      }
      setPets((prev) => [fallbackPet, ...prev])
      throw new Error(
        'El servidor backend no está conectado. Se guardó temporalmente en la vista local.'
      )
    }
  }

  // Marcar una mascota como resuelta en el backend
  const handleResolvePet = async (petId: string) => {
    try {
      await mascotasApi.resolverMascota(petId)
      // Removerla inmediatamente del feed
      setPets((prev) => prev.filter((p) => p.id !== petId))
    } catch (err) {
      console.error('Error al resolver en backend:', err)
      // En caso de modo local, remover de todas formas para mejor UX
      setPets((prev) => prev.filter((p) => p.id !== petId))
    }
  }

  const resetAllFilters = () => {

    setFilters({
      reportType: 'todos',
      barrio: 'todos',
      petType: 'todos',
      size: 'todos',
      color: 'todos',
      searchQuery: '',
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F7F5] text-slate-800">
      {/* Navbar without top Publicar button */}
      <Navbar onGoHome={resetAllFilters} />

      {/* Backend connection notice (if offline) */}
      {apiError && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-between">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-[#EA580C] shrink-0" />
              <span>{apiError}</span>
            </div>
            <button
  onClick={() => fetchMascotas()}
  className="flex items-center gap-1 font-bold text-[#EA580C] hover:underline cursor-pointer shrink-0"
>
              <RefreshCw className="w-3.5 h-3.5" />
              Reconectar API
            </button>
          </div>
        </div>
      )}

      {/* Hero Selection (Perdí mi mascota / Encontré una mascota) */}
      <HeroSelection
        onSelectOption={handleHeroSelectOption}
        onOpenCreateWithMode={handleOpenCreateWithMode}
      />

      {/* Main Feed Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Dynamic Filters Bar */}
        <PetFilters
          filters={filters}
          onChange={setFilters}
          totalCount={filteredPets.length}
        />

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center my-6 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#10B981] animate-spin" />
            <p className="text-sm font-semibold text-slate-600">
              Conectando con la base de datos de mascotas...
            </p>
          </div>
        ) : filteredPets.length > 0 ? (
          /* Results Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onSelect={(selected) => setSelectedPet(selected)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 text-center my-6 md:my-10 shadow-xs">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#10B981] mx-auto mb-3 md:mb-4">
              <SearchX className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-[#0F172A] mb-1.5 md:mb-2">
              No encontramos publicaciones con estos filtros
            </h3>
            <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
              Probá seleccionando otro color, barrio de CABA o eliminando los filtros activos para ver más avisos.
            </p>
            <button
              onClick={resetAllFilters}
              className="py-2.5 md:py-3.5 px-5 md:px-7 bg-[#0F172A] hover:bg-slate-800 text-white text-xs md:text-sm font-bold rounded-xl md:rounded-2xl transition-all cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </main>

      {/* Mobile Floating Action Button (FAB) */}
      <div className="sm:hidden fixed bottom-5 right-5 z-40">
        <button
          onClick={() => handleOpenCreateWithMode('perdido')}
          className="w-14 h-14 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white shadow-xl shadow-slate-900/30 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
          aria-label="Publicar mascota"
        >
          <Plus className="w-7 h-7 text-[#EA580C]" />
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white/80 backdrop-blur-xs py-6 md:py-8 text-center text-xs md:text-sm text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium text-slate-600">
            <HeartHandshake className="w-4 h-4 md:w-5 md:h-5 text-[#EA580C]" />
            <span>Comunidad de rescate y búsqueda de CABA</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                isLiveApi
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-amber-50 text-amber-700 border border-amber-200/60'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLiveApi ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              {isLiveApi ? 'API NestJS Conectada' : 'Modo Local'}
            </span>
            <p>© {new Date().getFullYear()} Patitas CABA · 48 Barrios Conectados</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PetDetailModal
        pet={selectedPet}
        onClose={() => setSelectedPet(null)}
        onResolve={handleResolvePet}
      />


      <CreatePostModal
        isOpen={isCreateOpen}
        initialReportType={createInitialType}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  )
}

export default App
