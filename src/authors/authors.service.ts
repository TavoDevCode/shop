import { PostService } from './../post/post.service'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { CreateAuthorInput } from './dto/create-author.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Author } from './entities/author.entity'
import { Repository } from 'typeorm'
import { Post } from 'src/post/entities/post.entity'

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @Inject(forwardRef(() => PostService)) private postService: PostService
  ) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const author = this.authorRepository.create(createAuthorInput)
    return await this.authorRepository.save(author)
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({})
  }

  async findAuthorById(id: string): Promise<Author> {
    return await this.authorRepository.findOneBy({ id })
  }

  async posts(authorId: string): Promise<Post[]> {
    return this.postService.authorPosts(authorId)
  }
}
