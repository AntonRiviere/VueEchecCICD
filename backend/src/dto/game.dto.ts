export interface CreateGameDTO {
    playerWhiteId?: number;   // ID du joueur jouant les blancs (peut être null pour un joueur invité)
    playerBlackId?: number;  // ID du joueur jouant les noirs (peut être null pour un joueur invité)
    isPublic: boolean;       // Si la partie est publique ou non
}

export interface GameDTO {
    id: number;                // ID de la partie
    playerWhiteId: number| null;     // ID du joueur blanc
    playerBlackId: number | null;  // ID du joueur noir, peut être null
    gameState: { [key: string]: { [key: string]: string } }; // État du jeu (ex: JSON de l’échiquier)
    isFinished: boolean;  // Statut de la partie
    winnerId: number | null;   // ID du gagnant, peut être null si la partie est en cours
    isPublic: boolean;         // Si la partie est publique ou non
    turnCount: number;         // Nombre de tours
    createdAt: Date;           // Date de création de la partie
    finishedAt: Date;           // Dernière mise à jour de la partie
    countRuleFiftyMoves: number; // Nombre de coups sans prise de pièce
}

export interface UpdateGameDTO {
    gameState?: { [key: string]: { [key: string]: string } }; // Nouveau JSON de l'échiquier
    isFinished: boolean;  // Statut de la partie
    winnerId?: number | null;           // ID du gagnant si la partie est terminée
    finishedAt?: Date;                   // Date de la fin de la partie
    turnCount?: number;        // Nombre de tours
    countRuleFiftyMoves?: number; // Nombre de coups sans prise de pièce
}