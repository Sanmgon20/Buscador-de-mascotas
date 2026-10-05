import React from 'react'
import { PawPrint } from 'lucide-react'

interface NavbarProps {
  onGoHome: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onGoHome }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 md:gap-4 text-left group transition-transform active:scale-95 cursor-pointer"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#0F172A] flex items-center justify-center text-white shadow-md shadow-slate-900/10">
            <PawPrint className="w-5 h-5 md:w-6 md:h-6 text-[#EA580C] transform group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg md:text-2xl text-[#0F172A] tracking-tight leading-none flex items-center gap-2">
              BuscaPatas
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-wider px-1.5 md:px-2 py-0.5 rounded bg-orange-100 text-[#EA580C]">
                Bs As
              </span>
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">Mascotas perdidas y encontradas</p>
          </div>
        </button>
      </div>
    </header>
  )
}
