import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum EspecieMascota {
  PERRO = 'perro',
  GATO = 'gato',
  OTRO = 'otro',
}

export enum EstadoMascota {
  PERDIDO = 'perdido',
  ENCONTRADO = 'encontrado',
  RESUELTO = 'resuelto',
}

@Entity('mascotas')
export class Mascota {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  titulo!: string;

  @Column({
    type: 'enum',
    enum: EspecieMascota,
    default: EspecieMascota.PERRO,
  })
  especie!: EspecieMascota;

  @Column({
    type: 'enum',
    enum: EstadoMascota,
    default: EstadoMascota.PERDIDO,
  })
  estado!: EstadoMascota;

  @Column({ type: 'varchar', length: 100 })
  barrio!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tamano!: string; // Tamaño: pequeño, mediano, grande

  @Column({ type: 'varchar', length: 255, nullable: true })
  color!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @Column({ type: 'varchar', length: 150 })
  contacto!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imagenUrl!: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  recompensa!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  fechaPublicacion!: Date;
}
