import { Column, PrimaryGeneratedColumn, ManyToOne, Entity, JoinColumn } from 'typeorm'
import type { Relation } from 'typeorm'
import { Nemesis } from './Nemesis.js'

@Entity('secret')
export class Secret {
    @PrimaryGeneratedColumn('increment')
    declare id: number

    @Column({ name: 'secret_code', type: 'bigint' })
    declare secretCode: number

    @ManyToOne(() => Nemesis, (nemesis) => nemesis.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'nemesis_id' })
    declare nemesis: Relation<Nemesis>
}
