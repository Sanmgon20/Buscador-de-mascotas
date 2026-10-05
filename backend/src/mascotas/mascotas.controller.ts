import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { FilterMascotaDto } from './dto/filter-mascota.dto';
import { Mascota } from './entities/mascota.entity';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMascotaDto: CreateMascotaDto): Promise<Mascota> {
    return await this.mascotasService.create(createMascotaDto);
  }

  @Get()
  async findAll(@Query() query: FilterMascotaDto): Promise<Mascota[]> {
    return await this.mascotasService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Mascota> {
    return await this.mascotasService.findOne(id);
  }

  @Patch(':id/resolver')
  async resolver(@Param('id') id: string): Promise<Mascota> {
    return await this.mascotasService.resolver(id);
  }
}
