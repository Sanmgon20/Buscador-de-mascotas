import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { FilterMascotaDto } from './dto/filter-mascota.dto';
import { Mascota } from './entities/mascota.entity';
export declare class MascotasController {
    private readonly mascotasService;
    constructor(mascotasService: MascotasService);
    create(createMascotaDto: CreateMascotaDto): Promise<Mascota>;
    findAll(query: FilterMascotaDto): Promise<Mascota[]>;
    findOne(id: string): Promise<Mascota>;
    resolver(id: string): Promise<Mascota>;
}
