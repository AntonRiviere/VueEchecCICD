import chessPieceModel from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";
import ChessPiece from "../chessPiece.model";

class QueenPiece extends chessPieceModel {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): QueenPiece {
        return ChessPiece.createInstance("queen", color, position, gameId) as QueenPiece;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }

    public async getSlotsAvailable(): Promise<string[]> {

        let slotsAvailable: string[] = [];
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        //Déplacement du fou
        //haut gauche
        for(let i = parseInt(this.position[1]) + 1, j = this.position[0].charCodeAt(0) - 1; i <= 8 && j >= 97; i++, j--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //haut droite
        for(let i = parseInt(this.position[1]) + 1, j = this.position[0].charCodeAt(0) + 1; i <= 8 && j <= 104; i++, j++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //bas gauche
        for(let i = parseInt(this.position[1]) - 1, j = this.position[0].charCodeAt(0) - 1; i >= 1 && j >= 97; i--, j--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //bas droite
        for(let i = parseInt(this.position[1]) - 1, j = this.position[0].charCodeAt(0) + 1; i >= 1 && j <= 104; i--, j++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        // Implémentation spécifique pour la tour
        //haut
        for(let i = parseInt(this.position[1]) + 1; i <= 8; i++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${this.position[0]}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${this.position[0]}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${i}`, this.game_id)){
                break;
            }
        }
        //bas
        for(let i = parseInt(this.position[1]) - 1; i >= 1; i--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${this.position[0]}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${this.position[0]}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${i}`, this.game_id)){
                break;
            }
        }
        //gauche
        for(let i = this.position[0].charCodeAt(0) - 1; i >= 97; i--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(i)}${parseInt(this.position[1])}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
        }
        //droite
        for(let i = this.position[0].charCodeAt(0) + 1; i <= 104; i++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(i)}${parseInt(this.position[1])}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
        }
        return slotsAvailable;
    }


    private letterToIndex(s: string) {
        return s.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}

export default QueenPiece;