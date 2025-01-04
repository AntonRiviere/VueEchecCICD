import ChessPiece from '../chessPiece.model';
import chessPieceServices from "../../services/chessPiece.services";
import moveServices from "../../services/move.services";
import {gameService} from "../../services/game.services";
import { GameDTO } from '../../dto/game.dto';


class PawnPiece extends ChessPiece {


    constructor(pawnPiece : PawnPiece) {
        super(pawnPiece);
    }


    public static createInstance(piece_type: string, color: string, position: string, gameId: number): PawnPiece {
        return ChessPiece.createInstance("pawn", color, position, gameId) as PawnPiece;
    }

    private letterToIndex(letter: string): number {
        return letter.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    public async getSlotsAvailable(toCheck : boolean, gameDto:GameDTO |null =null,removeSlot : boolean =true): Promise<string[]> {
        let slotsAvailable: string[] = [];
        let game = gameDto ? gameDto : await gameService.getGameById(this.game_id);
        let kingPosition = await chessPieceServices.getKingPosition(game, this.color);
        if(!toCheck &&!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        if (!toCheck && await chessPieceServices.isCheck(this.game_id)){
            let possibilities = await (await chessPieceServices.slotsAvailableForOutOfCheck(this.game_id));
            for (let [piece, slots] of possibilities) {
                if (piece.pieceType == this.piece_type && piece.color == this.color && piece.position == this.position) {
                    slotsAvailable = slotsAvailable.concat(slots);
                }
            }            
            return slotsAvailable;
        }
        if(this.color == 'white' && parseInt(this.position[1]) == 8) {
            return ['promote'];
        }
        if(this.color == 'black' && parseInt(this.position[1]) == 1) {
            return ['promote'];
        }
        //vérification d'une pièce devant le pion
        if((this.position[1]!=='8'&& this.color=='white')||(this.position[1]!=='1'&& this.color=='black')){
            let chessPieceInfront : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPositionWithDTO(`${this.position[0]}${parseInt(this.position[1]) + 1}`, game) : await chessPieceServices.isChessPieceInPositionWithDTO(`${this.position[0]}${parseInt(this.position[1]) - 1}`, game);
            if(!chessPieceInfront) {
                slotsAvailable.push(this.color == 'white' ? `${this.position[0]}${parseInt(this.position[1]) + 1}` : `${this.position[0]}${parseInt(this.position[1]) - 1}`);
            }
        }
        //vérification si le pion n'a pas bougé si il y a une pièce deux cases devant
        if(!this.has_moved){
            let chessPieceTwoInfront : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPositionWithDTO(`${this.position[0]}${parseInt(this.position[1]) + 2}`, game) : await chessPieceServices.isChessPieceInPositionWithDTO(`${this.position[0]}${parseInt(this.position[1]) - 2}`, game);
            if(!chessPieceTwoInfront) {
                    slotsAvailable.push(this.color == 'white' ? `${this.position[0]}${parseInt(this.position[1]) + 2}` : `${this.position[0]}${parseInt(this.position[1]) - 2}`);
            }
        }
        //vérification des pièces à prendre
        let chessPieceLeft : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}`, game) : await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`, game);
        if(chessPieceLeft && !await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`, game)) {
            slotsAvailable.push(this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`);
        }
        let chessPieceRight : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}`, game) : await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`, game);
        if(chessPieceRight && !await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`, game)){
            slotsAvailable.push(this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`);
        }
        if(await chessPieceServices.isTurn(this.game_id, this.color) ){
            return await chessPieceServices.removeSlotAvailablesForInCheck(game,slotsAvailable,this.position);
        }
        return slotsAvailable;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }



    public async promotePiece(pieceType: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        if(pieceType == 'king' || pieceType == 'pawn') {throw new Error("Le pion ne peut pas être promu en roi ou en pion");}
        if(!(await this.getSlotsAvailable(false)).includes('promote')) {throw new Error("Le pion ne peut pas être promu");}
        const [currentXLetter, currentY] = this.position.split('');
        const newX = this.letterToIndex(currentXLetter)+1;

        if(this.color == 'white') {

            if(parseInt(currentY) == 8 && pieceType != 'pawn' && newX >0 && newX < 9) {
                await chessPieceServices.updateChessPiece(this.id, pieceType, this.color, `${currentXLetter}${parseInt(currentY)}`, this.game_id,this.has_moved);
            }
        }else {
            if(parseInt(currentY) == 1 && pieceType != 'pawn' && newX >0 && newX < 9) {
                await chessPieceServices.updateChessPiece(this.id, pieceType, this.color, `${currentXLetter}${parseInt(currentY)}`, this.game_id,this.has_moved);
            }
        }

        await gameService.nextTurnAfterPromote(this.game_id, this.position,pieceType);
        console.log(`PawnPiece is promoted to ${pieceType}`);
    }





}

export default PawnPiece;