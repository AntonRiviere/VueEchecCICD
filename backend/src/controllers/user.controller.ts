import {
    Controller, Get, Route,Delete,Patch,Path,Post,Body,Security

} from "tsoa";
import {
    UserInputDTO,
    UserInputPatchDTO,
    UserOutputDTO,
  } from "../dto/user.dto";
import { userService } from "../services/user.services";



@Route("users")
export class UserController extends Controller {
    // Récupère tous les utilisateurs
    @Get("/")
    public async getAllUsers(): Promise<UserOutputDTO[]> {
      return userService.getAllUsers();
    }
  
    // Récupère un utilisateur par ID
    @Get("{id}")
    public async getUserById(@Path() id: number): Promise<UserOutputDTO> {
      return userService.getUserById(id);
    }
  
    // Crée un nouvel utilisateur
    @Post("/")
    public async createUser(
      @Body() requestBody: UserInputDTO,
    ): Promise<UserOutputDTO> {
      const { username, password } = requestBody;
      return userService.createUser(username, password);
    }
  
    // Supprime un utilisateur par ID
    @Delete("{id}")
    public async deleteUser(@Path() id: number): Promise<void> {
      await userService.deleteUser(id);
    }
  
    // Met à jour un utilisateur par ID
    @Patch("{id}")
    public async updateUser(
      @Path() id: number,
      @Body() requestBody: UserInputPatchDTO,
    ): Promise<UserOutputDTO> {
      const { username, password } = requestBody;
      return userService.updateUser(id, username, password);
    }

    @Get("/winrate/{id}")
    public async getWinrate(@Path() id: number): Promise<number> {
      return userService.getWinrate(id);
    }


    @Get("/classement/winrate")
    public async getClassement(): Promise<{ username: string; winrate: number }[]> {
      return userService.getClassement();
    }


  }