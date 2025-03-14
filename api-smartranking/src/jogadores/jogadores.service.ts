import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(dto: CriarJogadorDto): Promise<Jogador> {
    this.logger.log(`criarJogadorDto: ${JSON.stringify(dto)}`);

    const { email } = dto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email });

    if (jogadorEncontrado) {
      return this.atualizar(jogadorEncontrado, dto);
    }

    return this.criar(dto);
  }

  async consultarTodos(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
  }

  async buscarPorEmail(email: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ email });

    if (!jogador) {
      throw new NotFoundException(
        `Jogador com o email ${email} não encontrado`,
      );
    }

    return jogador;
  }

  async deletarPorEmail(email: string): Promise<void> {
    const jogadorEncontrado = await this.buscarPorEmail(email);
    await this.jogadorModel.deleteOne({ _id: jogadorEncontrado._id }).exec();
  }

  private async criar(dto: CriarJogadorDto): Promise<Jogador> {
    const { nome, telefoneCelular, email } = dto;
    const jogador = new this.jogadorModel({
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRankig: 1,
      urlFoto: 'www.google.com',
    });

    return jogador.save();
  }

  private async atualizar(
    jogador: Jogador,
    dto: CriarJogadorDto,
  ): Promise<Jogador> {
    Object.assign(jogador, dto);
    return jogador.save();
  }
}
