import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() dto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarAtualizarJogador(dto);
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.buscarPorEmail(email);
    }
    return await this.jogadoresService.consultarTodos();
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    await this.jogadoresService.deletarPorEmail(email);
  }
}
