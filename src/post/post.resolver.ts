import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { PostService } from './post.service'
import { Post } from './entities/post.entity'
import { CreatePostInput } from './dto/create-post.input'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  posts() {
    return this.postService.findAll()
  }

  @Query(() => Post, { name: 'post' })
  post(@Args('id') id: string) {
    return this.postService.findPostById(id)
  }

  @Mutation(() => Post, { name: 'createPost' })
  createPost(@Args('CreatePostInput') postInput: CreatePostInput) {
    return this.postService.create(postInput)
  }

  @ResolveField()
  author(@Parent() post: Post) {
    return this.postService.author(post.authorId)
  }
}
