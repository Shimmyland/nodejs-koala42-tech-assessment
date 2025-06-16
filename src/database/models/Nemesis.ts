import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import type { Relation } from 'typeorm'
import { Character } from './Character.js'
import { Secret } from './Secret.js'

@Entity('nemesis')
export class Nemesis {
    @PrimaryGeneratedColumn('increment')
    declare id: number

    @Column({ type: 'integer' })
    declare years: number | null

    @Column({ name: 'is_alive', type: 'boolean' })
    declare isAlive: boolean

    @ManyToOne(() => Character, (character) => character.nemeses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'character_id' })
    declare character: Relation<Character>

    @OneToMany(() => Secret, (secret) => secret.nemesis)
    declare secrets: Relation<Secret[]>
}
