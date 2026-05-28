import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { configProvider } from './app.config.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

console.log('Resolved static path:', join(__dirname, '..', 'public'));
console.log('__dirname is:', __dirname);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
