import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @MinLength(4, {
    // message: 'title is too short!'
  })
  @MaxLength(100)
  @Field()
  title: string

  @MinLength(4)
  @MaxLength(400)
  @Field({ nullable: true })
  content?: string

  @IsNotEmpty()
  @Field()
  authorId: string
}
