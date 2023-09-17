import { AuthorsService } from './../authors/authors.service'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { Post } from './entities/post.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePostInput } from './dto/create-post.input'
import { Author } from 'src/authors/entities/author.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject(forwardRef(() => AuthorsService)) private authorsService: AuthorsService
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({})
  }

  async findPostById(id: string): Promise<Post> {
    return await this.postRepository.findOneBy({ id })
  }

  async authorPosts(authorId: string): Promise<Post[]> {
    return await this.postRepository.find({
      where: {
        authorId
      }
    })
  }

  async create(post: CreatePostInput): Promise<Post> {
    const newPost = this.postRepository.create(post)

    return await this.postRepository.save(newPost)
  }

  async author(id: string): Promise<Author> {
    return this.authorsService.findAuthorById(id)
  }
}
