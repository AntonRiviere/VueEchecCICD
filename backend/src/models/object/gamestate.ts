import chessPieceService from "../../services/chessPiece.services";
import { chessPieceDto } from "../../dto/chessPiece.dto";

class Gamestate {
    public whitePieces: { [key: string]: chessPieceDto };
    public blackPieces: { [key: string]: chessPieceDto };
    public gameId: number;

    constructor(gameId: number) {
        this.whitePieces = {};
        this.blackPieces = {};
        this.gameId = gameId;
    }

    public numberToLetter(num: number): string {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        if (num < 1 || num > 26) {
            throw new Error('Le nombre doit être compris entre 1 et 26');
        }
        return alphabet[num - 1];
    }

    public async initStartGame(gameId: number): Promise<void> {
        for (let i = 0; i < 8; i++) {
            let piece = await chessPieceService.createChessPiece('pawn', 'white', `${this.numberToLetter(i+1)}2`, gameId);
            this.whitePieces[piece.position] = piece;
            piece = await chessPieceService.createChessPiece('pawn', 'black', `${this.numberToLetter(i+1)}7`, gameId);
            this.blackPieces[piece.position] = piece;
        }
        this.whitePieces['a1'] = await chessPieceService.createChessPiece('rook', 'white', 'a1', gameId);
        this.whitePieces['h1'] = await chessPieceService.createChessPiece('rook', 'white', 'h1', gameId);
        this.blackPieces['a8'] = await chessPieceService.createChessPiece('rook', 'black', 'a8', gameId);
        this.blackPieces['h8'] = await chessPieceService.createChessPiece('rook', 'black', 'h8', gameId);
        this.whitePieces['b1'] = await chessPieceService.createChessPiece('knight', 'white', 'b1', gameId);
        this.whitePieces['g1'] = await chessPieceService.createChessPiece('knight', 'white', 'g1', gameId);
        this.blackPieces['b8'] = await chessPieceService.createChessPiece('knight', 'black', 'b8', gameId);
        this.blackPieces['g8'] = await chessPieceService.createChessPiece('knight', 'black', 'g8', gameId);
        this.whitePieces['c1'] = await chessPieceService.createChessPiece('bishop', 'white', 'c1', gameId);
        this.whitePieces['f1'] = await chessPieceService.createChessPiece('bishop', 'white', 'f1', gameId);
        this.blackPieces['c8'] = await chessPieceService.createChessPiece('bishop', 'black', 'c8', gameId);
        this.blackPieces['f8'] = await chessPieceService.createChessPiece('bishop', 'black', 'f8', gameId);
        this.whitePieces['d1'] = await chessPieceService.createChessPiece('queen', 'white', 'd1', gameId);
        this.blackPieces['d8'] = await chessPieceService.createChessPiece('queen', 'black', 'd8', gameId);
        this.whitePieces['e1'] = await chessPieceService.createChessPiece('king', 'white', 'e1', gameId);
        this.blackPieces['e8'] = await chessPieceService.createChessPiece('king', 'black', 'e8', gameId);
    }

    public toJson(): any {
        const result: { [key: string]: string } = {};
        for (const key in this.whitePieces) {
            const piece = this.whitePieces[key];
            result[piece.position] = piece.pieceType;
        }
        for (const key in this.blackPieces) {
            const piece = this.blackPieces[key];
            result[piece.position] = piece.pieceType;
        }
        return result;
    }
}

export default Gamestate;