import { ObjectType, Field } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Post } from 'src/post/entities/post.entity'

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column()
  @Field()
  name: string

  @OneToMany(() => Post, post => post.author)
  @Field(() => [Post], { nullable: true })
  posts: Post[]
}
