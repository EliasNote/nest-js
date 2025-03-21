import { Module } from '@nestjs/common';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [TransacaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
