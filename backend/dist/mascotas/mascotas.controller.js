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
exports.MascotasController = void 0;
const common_1 = require("@nestjs/common");
const mascotas_service_1 = require("./mascotas.service");
const create_mascota_dto_1 = require("./dto/create-mascota.dto");
const filter_mascota_dto_1 = require("./dto/filter-mascota.dto");
let MascotasController = class MascotasController {
    mascotasService;
    constructor(mascotasService) {
        this.mascotasService = mascotasService;
    }
    async create(createMascotaDto) {
        return await this.mascotasService.create(createMascotaDto);
    }
    async findAll(query) {
        return await this.mascotasService.findAll(query);
    }
    async findOne(id) {
        return await this.mascotasService.findOne(id);
    }
    async resolver(id) {
        return await this.mascotasService.resolver(id);
    }
};
exports.MascotasController = MascotasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mascota_dto_1.CreateMascotaDto]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_mascota_dto_1.FilterMascotaDto]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/resolver'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MascotasController.prototype, "resolver", null);
exports.MascotasController = MascotasController = __decorate([
    (0, common_1.Controller)('mascotas'),
    __metadata("design:paramtypes", [mascotas_service_1.MascotasService])
], MascotasController);
//# sourceMappingURL=mascotas.controller.js.map