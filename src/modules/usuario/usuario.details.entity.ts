import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('usuario_details')
export class UsuarioDetails extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar',   length: 250, nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;
}
