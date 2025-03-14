import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JogadoresModule,
    MongooseModule.forRoot(process.env.MONGO_URI!),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
