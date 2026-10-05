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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mascota = exports.EstadoMascota = exports.EspecieMascota = void 0;
const typeorm_1 = require("typeorm");
var EspecieMascota;
(function (EspecieMascota) {
    EspecieMascota["PERRO"] = "perro";
    EspecieMascota["GATO"] = "gato";
    EspecieMascota["OTRO"] = "otro";
})(EspecieMascota || (exports.EspecieMascota = EspecieMascota = {}));
var EstadoMascota;
(function (EstadoMascota) {
    EstadoMascota["PERDIDO"] = "perdido";
    EstadoMascota["ENCONTRADO"] = "encontrado";
    EstadoMascota["RESUELTO"] = "resuelto";
})(EstadoMascota || (exports.EstadoMascota = EstadoMascota = {}));
let Mascota = class Mascota {
    id;
    titulo;
    especie;
    estado;
    barrio;
    tamano;
    color;
    descripcion;
    contacto;
    imagenUrl;
    recompensa;
    fechaPublicacion;
};
exports.Mascota = Mascota;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Mascota.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Mascota.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EspecieMascota,
        default: EspecieMascota.PERRO,
    }),
    __metadata("design:type", String)
], Mascota.prototype, "especie", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoMascota,
        default: EstadoMascota.PERDIDO,
    }),
    __metadata("design:type", String)
], Mascota.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Mascota.prototype, "barrio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "tamano", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Mascota.prototype, "contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Mascota.prototype, "imagenUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Mascota.prototype, "recompensa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Mascota.prototype, "fechaPublicacion", void 0);
exports.Mascota = Mascota = __decorate([
    (0, typeorm_1.Entity)('mascotas')
], Mascota);
//# sourceMappingURL=mascota.entity.js.map