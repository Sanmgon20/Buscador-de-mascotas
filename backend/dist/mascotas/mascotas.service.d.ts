import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { FilterMascotaDto } from './dto/filter-mascota.dto';
export declare class MascotasService {
    private readonly mascotaRepository;
    constructor(mascotaRepository: Repository<Mascota>);
    create(createMascotaDto: CreateMascotaDto): Promise<Mascota>;
    findAll(filter?: FilterMascotaDto): Promise<Mascota[]>;
    findOne(id: string): Promise<Mascota>;
    resolver(id: string): Promise<Mascota>;
}
