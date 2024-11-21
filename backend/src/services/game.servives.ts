import { GameDTO,CreateGameDTO } from "../dto/game.dto";
import Game from "../models/game.model";
import { GameMapper } from "../mapper/game.mapper";
import { notFound } from "../error/NotFoundError";

export class GameService {
    public async getGames(): Promise<GameDTO[]> {
        let gameList = await Game.findAll();
        return GameMapper.toDTOList(gameList);
    }

    public async getGameById(id: number): Promise<GameDTO> {
        let game = await Game.findByPk(id);
        if (game) {
            return GameMapper.toDTO(game);
        } else {
            notFound("Game");
        }
    }

    public async createGame(playerWhiteId:number|undefined, playerBlackId:number|undefined, isPublic:boolean): Promise<GameDTO> {
        /*
        TODO : creer toute les pièces de la partie a partir de Chesspiece.services
        */
        return GameMapper.toDTO(await Game.create({
            player_white_id: playerWhiteId,
            player_black_id: playerBlackId,
            is_public: isPublic,
            /*
            TODO : creer un gamestate dynamique a partir de Chesspiece.services
            */
            game_state: "",
            is_finished: false,
            winner_id: null,
            created_at: new Date()
        }));
    }


}

export const gameService = new GameService();