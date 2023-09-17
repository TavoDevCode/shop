import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { AuthorsService } from './authors.service'
import { Author } from './entities/author.entity'
import { CreateAuthorInput } from './dto/create-author.input'
// import { UpdateAuthorInput } from './dto/update-author.input'

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  createAuthor(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput) {
    return this.authorsService.create(createAuthorInput)
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll()
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id') id: string) {
    return this.authorsService.findAuthorById(id)
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    return this.authorsService.posts(author.id)
  }
}
