export class EstatisticaResponseDto {
  constructor(
    public count: number,
    public sum: number,
    public avg: number,
    public min: number,
    public max: number,
  ) {}
}
