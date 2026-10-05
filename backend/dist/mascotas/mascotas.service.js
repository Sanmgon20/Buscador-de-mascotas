"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MascotasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mascota_entity_1 = require("./entities/mascota.entity");
let MascotasService = class MascotasService {
    mascotaRepository;
    constructor(mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }
    async create(createMascotaDto) {
        const nuevaMascota = this.mascotaRepository.create(createMascotaDto);
        return await this.mascotaRepository.save(nuevaMascota);
    }
    async findAll(filter) {
        const where = {};
        if (filter?.barrio && filter.barrio !== 'todos') {
            where.barrio = filter.barrio;
        }
        if (filter?.especie) {
            where.especie = filter.especie;
        }
        if (filter?.estado && filter.estado !== 'todos') {
            where.estado = filter.estado;
        }
        else {
            where.estado = (0, typeorm_2.Not)(mascota_entity_1.EstadoMascota.RESUELTO);
        }
        if (filter?.busqueda) {
            where.titulo = (0, typeorm_2.ILike)(`%${filter.busqueda}%`);
        }
        return await this.mascotaRepository.find({
            where,
            order: {
                fechaPublicacion: 'DESC',
            },
        });
    }
    async findOne(id) {
        const mascota = await this.mascotaRepository.findOne({
            where: { id },
        });
        if (!mascota) {
            throw new common_1.NotFoundException(`Mascota con id ${id} no encontrada`);
        }
        return mascota;
    }
    async resolver(id) {
        const mascota = await this.findOne(id);
        mascota.estado = mascota_entity_1.EstadoMascota.RESUELTO;
        return await this.mascotaRepository.save(mascota);
    }
};
exports.MascotasService = MascotasService;
exports.MascotasService = MascotasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mascota_entity_1.Mascota)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MascotasService);
//# sourceMappingURL=mascotas.service.js.map