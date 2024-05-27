/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:BMpuek8QH4sHIZjs@cluster0.wliucov.mongodb.net/',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
