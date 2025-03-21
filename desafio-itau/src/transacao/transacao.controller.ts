import { Body, Controller, Post, Get } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoCreateDto } from './dto/transacao-create-dto';
import { EstatisticaResponseDto } from './dto/estatistica-response-dto';

@Controller('/')
export class TransacaoController {
  constructor(private transacaoService: TransacaoService) {}

  @Post('/transacao')
  cadastrar(@Body() dto: TransacaoCreateDto): void {
    this.transacaoService.cadastrarTransacao(dto);
  }

  @Get('/transacao')
  buscarTodos(): TransacaoCreateDto[] {
    return this.transacaoService.buscarTodos();
  }

  @Get('/estatistica')
  estatistica(): EstatisticaResponseDto {
    return this.transacaoService.estatistica();
  }
}
