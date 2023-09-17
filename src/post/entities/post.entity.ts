import { ObjectType, Field } from '@nestjs/graphql'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Author } from 'src/authors/entities/author.entity'

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column()
  @Field()
  title: string

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  content?: string

  @Column()
  @Field()
  authorId: string

  @ManyToMany(() => Author, author => author.posts)
  @Field(() => Author)
  author: Author
}
