import { EspecieMascota, EstadoMascota } from '../entities/mascota.entity';

export class FilterMascotaDto {
  barrio?: string;
  especie?: EspecieMascota;
  estado?: EstadoMascota;
  busqueda?: string;
}
