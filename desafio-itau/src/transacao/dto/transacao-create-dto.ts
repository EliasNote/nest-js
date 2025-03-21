/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';

export class TransacaoCreateDto {
  readonly valor: number;
  @Type(() => Date)
  readonly dataHora: Date;
}
