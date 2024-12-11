import ChessPiece from '../chessPiece.model';
import chessPieceServices from "../../services/chessPiece.services";


class KnightPiece extends ChessPiece {
    public moveTo(position: string): void {
        const [positionX, positionY] = position.split('');
        // Implémentation spécifique pour le cavalier
        console.log(`Knight moves to position (${positionX}, ${positionY})`);
    }
    
    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        // Implémentation spécifique pour le cavalier
        //2haut 1gauche
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 2}`, this.game_id)
            && parseInt(this.position[1]) + 2 <= 8 && this.position[0].charCodeAt(0) - 1 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 2}`);
        }
        //2haut 1droite
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 2}`, this.game_id)
            && parseInt(this.position[1]) + 2 <= 8 && this.position[0].charCodeAt(0) + 1 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 2}`);
        }
        //2bas 1gauche
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 2}`, this.game_id)
            && parseInt(this.position[1]) - 2 >= 1 && this.position[0].charCodeAt(0) - 1 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 2}`);
        }
        //2bas 1droite
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 2}`, this.game_id)
            && parseInt(this.position[1]) - 2 >= 1 && this.position[0].charCodeAt(0) + 1 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 2}`);
        }
        //2gauche 1haut
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) + 1}`, this.game_id)
            && parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) - 2 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) + 1}`);
        }
        //2gauche 1bas
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) - 1}`, this.game_id)
            && parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) - 2 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) - 1}`);
        }
        //2droite 1haut
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) + 1}`, this.game_id)
            && parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) + 2 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) + 1}`);
        }
        //2droite 1bas
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) - 1}`, this.game_id)
            && parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) + 2 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) - 1}`);
        }
        return slotsAvailable;
    }
}

export default KnightPiece;