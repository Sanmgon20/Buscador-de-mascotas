import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, Not } from 'typeorm';
import { Mascota, EstadoMascota } from './entities/mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { FilterMascotaDto } from './dto/filter-mascota.dto';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
  ) {}

  async create(createMascotaDto: CreateMascotaDto): Promise<Mascota> {
    const nuevaMascota = this.mascotaRepository.create(createMascotaDto);
    return await this.mascotaRepository.save(nuevaMascota);
  }

  async findAll(filter?: FilterMascotaDto): Promise<Mascota[]> {
    const where: FindOptionsWhere<Mascota> = {};

    if (filter?.barrio && filter.barrio !== 'todos') {
      where.barrio = filter.barrio;
    }

    if (filter?.especie) {
      where.especie = filter.especie;
    }

    // Si se especifica un estado puntual (y no es 'todos') se filtra por ese estado.
    // Por defecto, solo se devuelven aquellas mascotas cuyo estado NO sea 'resuelto'.
    if (filter?.estado && (filter.estado as string) !== 'todos') {
      where.estado = filter.estado;
    } else {
      where.estado = Not(EstadoMascota.RESUELTO);
    }

    if (filter?.busqueda) {
      where.titulo = ILike(`%${filter.busqueda}%`);
    }

    return await this.mascotaRepository.find({
      where,
      order: {
        fechaPublicacion: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Mascota> {
    const mascota = await this.mascotaRepository.findOne({
      where: { id },
    });

    if (!mascota) {
      throw new NotFoundException(`Mascota con id ${id} no encontrada`);
    }

    return mascota;
  }

  /**
   * Marca una publicación como resuelta para que ya no aparezca en el feed principal
   */
  async resolver(id: string): Promise<Mascota> {
    const mascota = await this.findOne(id);
    mascota.estado = EstadoMascota.RESUELTO;
    return await this.mascotaRepository.save(mascota);
  }
}
