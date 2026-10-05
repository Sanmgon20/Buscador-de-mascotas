import { EspecieMascota, EstadoMascota } from '../entities/mascota.entity';

export class CreateMascotaDto {
  titulo: string;
  especie: EspecieMascota;
  estado: EstadoMascota;
  barrio: string;
  tamano?: string;
  color?: string;
  descripcion?: string;
  contacto: string;
  imagenUrl?: string;
  recompensa?: boolean;
}
