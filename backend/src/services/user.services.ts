import { Op } from "sequelize";
import { UserOutputDTO } from "../dto/user.dto";
import { notFound } from "../error/NotFoundError";
import { UserMapper } from "../mapper/user.mapper";
import Game from "../models/game.model";
import { User } from "../models/user.model";

export class UserService {
  // Récupère tous les utilisateurs
  public async getAllUsers(): Promise<UserOutputDTO[]> {
    let userList = await User.findAll();
    return UserMapper.toOutputDtoList(userList);
  }

  // Récupère un utilisateur par ID
  public async getUserById(id: number): Promise<UserOutputDTO> {
    let user = await User.findByPk(id);
    if (user) {
      return UserMapper.toOutputDto(user);
    } else {
      notFound("User");
    }
  }

  // Crée un nouvel utilisateur
  public async createUser(
    username: string,
    password: string,
  ): Promise<UserOutputDTO> {

    let user = await User.findOne({ where: { username } });

    if (user) {
      throw new Error("Username already exists");
    }

    return UserMapper.toOutputDto(
      await User.create({ username: username, password: btoa(password) }),
    );
  }

  // Supprime un utilisateur par ID
  public async deleteUser(id: number): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      user.destroy();
    } else {
      notFound("User");
    }
  }

  // Met à jour un utilisateur
  public async updateUser(
    id: number,
    username?: string,
    password?: string,
  ): Promise<UserOutputDTO> {
    const user = await User.findByPk(id);
    if (user) {
      if (username) user.username = username;
      if (password) user.password = password;
      await user.save();
      return UserMapper.toOutputDto(user);
    } else {
      notFound("User");
    }
  }

  public async getWinrate(userId: number): Promise<number> {
    const games = await Game.findAll({
      where: {
        [Op.or]: [
          { player_white_id: userId },
          { player_black_id: userId }
        ],
        is_finished: true
      }
    });

    const totalGames = games.length;
    const wonGames = games.filter(game => game.winner_id === userId).length;

    if (totalGames === 0) {
      return 0;
    }

    return (wonGames / totalGames) * 100;
  }

  public async getClassement(): Promise<{ username: string, winrate: number }[]> {
    let users = await User.findAll();
    let winrates = [];

    for (let user of users) {
      let winrate = await this.getWinrate(user.id);
      winrates.push({ username: user.username, winrate });
    }

    winrates.sort((a, b) => b.winrate - a.winrate);

    return winrates;
  }
}

export const userService = new UserService();
