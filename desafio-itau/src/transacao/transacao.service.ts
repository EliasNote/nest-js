import { Injectable } from '@nestjs/common';
import { TransacaoCreateDto } from './dto/transacao-create-dto';
import { EstatisticaResponseDto } from './dto/estatistica-response-dto';

@Injectable()
export class TransacaoService {
  private transacoes: TransacaoCreateDto[] = [];

  cadastrarTransacao(dto: TransacaoCreateDto): void {
    this.transacoes.push(dto);
  }

  buscarTodos(): TransacaoCreateDto[] {
    return this.transacoes;
  }

  estatistica(): EstatisticaResponseDto {
    const limite = new Date();

    limite.setMinutes(limite.getMinutes() - 1);
    const dtos = this.transacoes.filter((x) => x.dataHora >= limite);

    const count = dtos.length;
    const sum = dtos.reduce((acc, curr) => acc + curr.valor, 0);
    const avg = count > 0 ? sum / count : 0;
    const min = count > 0 ? Math.min(...dtos.map((x) => x.valor)) : 0;
    const max = count > 0 ? Math.max(...dtos.map((x) => x.valor)) : 0;

    return new EstatisticaResponseDto(count, sum, avg, min, max);
  }
}
