import { Module, forwardRef } from '@nestjs/common'
import { AuthorsService } from './authors.service'
import { AuthorsResolver } from './authors.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Author } from './entities/author.entity'
import { PostModule } from 'src/post/post.module'

@Module({
  imports: [TypeOrmModule.forFeature([Author]), forwardRef(() => PostModule)],
  providers: [AuthorsResolver, AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
