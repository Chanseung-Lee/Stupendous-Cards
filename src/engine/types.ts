export type Intent =
  | { kind: "playCard"; cardId: string; boardIndex?: number; targetId?: string }
  | { kind: "attack"; attackerId: string; targetId: string }
  | { kind: "endTurn" };

export type Event =
  // Turn flow
  | { kind: "turnStarted"; playerId: string; turnNumber: number }
  | { kind: "turnEnded"; playerId: string }
  | { kind: "manaRefilled"; playerId: string; maxMana: number }
  | { kind: "manaSpent"; playerId: string; amount: number }

  // Cards moving between zones

  | { kind: "cardDrawn"; playerId: string; cardId: string; definitionId: string }
  | { kind: "drawFailed"; playerId: string }
  | { kind: "cardBurned"; playerId: string; cardId: string; definitionId: string }
  | { kind: "cardPlayed"; playerId: string; cardId: string; definitionId: string; boardIndex?: number; targetId?: string }
  | { kind: "minionSummoned"; playerId: string; minionId: string; definitionId: string; boardIndex: number }

  // Combat and effects
  | { kind: "attacked"; attackerId: string; targetId: string }
  | { kind: "triggered"; sourceId: string }
  | { kind: "damaged"; targetId: string; amount: number; sourceId?: string }
  | { kind: "healed"; targetId: string; amount: number; sourceId?: string }
  | { kind: "statsChanged"; minionId: string; attackDelta: number; healthDelta: number; sourceId: string }
  | { kind: "minionDied"; minionId: string }
  | { kind: "cardCreated"; playerId: string; cardId: string; definitionId: string }

  // End of game
  | { kind: "gameEnded"; winnerId: string | null };

export type CardInstance = {
  id: string;            // unique per copy, e.g. "c17"
  definitionId: string;  // which card it is, e.g. "xiangling"
};

export type HeroState = {
  id: string;            // what targetId uses to point at this hero
  health: number;
  maxHealth: number;
};

export type MinionState = {
  id: string;
  definitionId: string;
  attack: number;
  health: number;
  maxHealth: number;          // healing can't go above this; buffs raise it
  hasTaunt: boolean;
  hasRush: boolean;
  cantAttack: boolean;        // Neuvillette
  summonedThisTurn: boolean;  // can't attack unless it has Rush
  hasAttackedThisTurn: boolean;
  seeded: boolean;            // Nahida
};

export type PlayerState = {
  id: string;
  hero: HeroState;
  mana: number;
  maxMana: number;
  hand: CardInstance[];
  deck: CardInstance[];       // index 0 is the top card
  board: MinionState[];       // left to right
  cardsPlayed: number;        // Raiden
};

export type GameResult =
  | { kind: "ongoing" }
  | { kind: "won"; winnerId: string }
  | { kind: "draw" };

export type GameState = {
  players: [PlayerState, PlayerState];
  activePlayerIndex: 0 | 1;
  turnNumber: number;
  rngState: number;
  nextInstanceId: number;
  result: GameResult;
};