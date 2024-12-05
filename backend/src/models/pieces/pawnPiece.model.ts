import ChessPiece from '../chessPiece.model';
import chessPieceServices from "../../services/chessPiece.services";

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


    public moveTo(positionX: string, positionY: number): void {
        console.log(`PawnPiece moves to position (${positionX}, ${positionY})`);
        const [currentXLetter, currentY] = this.position.split('');
        const currentX = this.letterToIndex(currentXLetter);

        const newX = this.letterToIndex(positionX);
        console.log("1");
        if(newX < 0 || newX > 7 || positionY < 1 || positionY > 7) {
            console.log("Invalid move");
            return;
        }
        console.log("2");
        if(this.position === `${positionX}${positionY}`) {
            console.log("Invalid move");
            return;
        }
        console.log("3");
        if (!this.has_moved) {
            if (positionY - parseInt(currentY) > 2) {
                console.log("Invalid move");
                return;
            }
        }
        console.log("4");
        if(this.isMovePossible(newX, positionY)) {
            this.has_moved = true;
            this.position = `${positionX}${positionY}`;
        }

        console.log(`PawnPiece moves to position (${positionX}, ${positionY})`);
    }

    public isMovePossible(positionX: number, positionY: number): boolean {
        console.log("isMovePossible");
        const [currentXLetter, currentY] = this.position.split('');
        const currentX = this.letterToIndex(currentXLetter);
        if(this.isPieceThere(positionX, positionY)) {
            console.log("5");
            if(this.canTakePiece(positionX, positionY)){
                console.log("6");
                return true;
            }
        }
        return false;

    }

    public canTakePiece(positionX: number, positionY: number): boolean {
        if(this.isPieceAlly(positionX, positionY)) {
            console.log("Invalid move");
            return false;
        }

        const [currentXLetter, currentY] = this.position.split('');
        const currentX = this.letterToIndex(currentXLetter);

        if(this.color == "White" && (currentX + 1 === positionX && (parseInt(currentY) + 1 === positionY || parseInt(currentY) - 1 === positionY))) {
            return true;
        } else if(this.color == "Black" && (currentX - 1 === positionX && (parseInt(currentY) + 1 === positionY || parseInt(currentY) - 1 === positionY))) {
            return true;
        } else {
            console.log("Invalid move");
            return false;
        }
    }

    public async promotePiece(pieceType: string): Promise<void> {
        const [currentXLetter, currentY] = this.position.split('');
        const newX = this.letterToIndex(currentXLetter);

        if(newX >= 0 || newX <= 8 || (parseInt(currentY) == 0 || parseInt(currentY) == 8)) {

            await chessPieceServices.updateChessPiece(this.id, pieceType, this.color, `${newX}${parseInt(currentY)}`, this.game_id);
        }

        console.log(`PawnPiece is promoted to ${pieceType}`);
    }




}

export default PawnPiece;