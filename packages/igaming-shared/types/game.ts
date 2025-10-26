export interface Game {
  id: number;
  name: string;
  provider: number; // provider id
  cover?: string | undefined;
  coverLarge?: string | undefined;
  date: string;
}

export interface Provider {
  id: number;
  name: string;
  logo: string;
}

export interface Group {
  id: number;
  name: string;
  games: number[]; // array of game ids
}
