import { IsEmail, MinLength, MaxLength } from "class-validator"
import { ObjectType, Field, Int } from "type-graphql"
import { Entity, BaseEntity, PrimaryGeneratedColumn, Index, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("user")
@ObjectType()
export class UserModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    readonly id: number

    @Index()
    @Column({ type: "varchar", unique: true, nullable: true })
    @Field({ nullable: true })
    @IsEmail()
    email: string

    @Column({ type: "varchar", nullable: true })
    @Field({ nullable: true })
    @MinLength(4)
    @MaxLength(20)
    name: string

    @Index()
    @Column({ type: "text"})
    @Field(() => String)
    address: string

    @CreateDateColumn()
    @Field()
    createdAt: Date

    @UpdateDateColumn()
    @Field()
    updatedAt: Date
}
