import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import type { Relation } from 'typeorm'
import { Nemesis } from './Nemesis.js'

@Entity('character')
export class Character {
    @PrimaryGeneratedColumn('increment')
    declare id: number

    @Column({ type: 'text' })
    declare name: string

    @Column({ type: 'text', nullable: true })
    declare gender: string | null

    @Column({ type: 'text', nullable: true })
    declare ability: string | null

    @Column({ name: 'minimal_distance', type: 'numeric', nullable: true })
    declare minimalDistance: number | null

    @Column({ type: 'numeric', nullable: true })
    declare weight: number | null

    @Column({ type: 'timestamp without time zone', nullable: true })
    declare born: string | Date | null

    @Column({ name: 'in_space_since', type: 'timestamp without time zone', nullable: true })
    declare inSpaceSince: string | Date | null

    @Column({ name: 'beer_consumption', type: 'integer' })
    declare beerConsumption: number

    @Column({ name: 'knows_the_answer', type: 'boolean' })
    declare knowsTheAnswer: boolean

    @OneToMany(() => Nemesis, (nemesis) => nemesis.character)
    declare nemeses: Relation<Nemesis[]>
}
