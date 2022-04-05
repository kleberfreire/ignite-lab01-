import { TestResolver } from './test.resolver';

import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';

import path from 'node:path';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [TestResolver],
})
export class HttpModule {}
