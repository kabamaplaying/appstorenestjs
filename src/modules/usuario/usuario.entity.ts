
import { Rol } from './../rol/rol.entity';
import { UsuarioDetails } from './usuario.details.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, ManyToMany, JoinColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuario')
export class Usuario extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @OneToOne(type=> UsuarioDetails, {cascade: true, nullable: true, eager: true})
  @JoinColumn({name: 'detail_id'})
  details: UsuarioDetails;

  @ManyToMany(() => Rol, rol => rol.usuario, {eager: true})
  @JoinTable({name: 'user_roles'})
  roles: Rol[];


}
