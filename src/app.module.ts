import { Module } from '@nestjs/common'

import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'

import { join } from 'path'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { PostModule } from './post/post.module'
import { AuthorsModule } from './authors/authors.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'shop',
      entities: [__dirname + '/**/*.entity{.ts}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    // MODULES
    PostModule,
    AuthorsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
