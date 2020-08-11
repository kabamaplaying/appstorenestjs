import { Usuario } from './../usuario/usuario.entity';
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, ManyToMany, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
@Entity('roles')
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type: 'varchar', nullable: false, length: 20})
    name: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @ManyToMany(type => Usuario, user => user.roles)
    @JoinColumn()
    usuario: Usuario[];

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;
  
    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date;
}