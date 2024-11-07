import Dexie, { type Table } from 'dexie';

export interface Message {
  id?: number;
  animeName: string;
  user: string;
  content: string;
  timestamp: Date;
}

export class AnimeDatabase extends Dexie {
  messages!: Table<Message>;

  constructor() {
    super('animeDatabase');
    this.version(1).stores({
      messages: '++id, animeName, timestamp'
    });
  }
}

export const db = new AnimeDatabase();