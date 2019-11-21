interface MessageDictionary {
  [key: string]: string;
}

export type MessageDictionaries = { [locale: string]: MessageDictionary };

export interface MessageToken {
  id: string;
  values: {};
}

export class MessageResolver {
  locale: string = "";

  constructor(private readonly dictionaries: MessageDictionaries) {
  }

  resolve(token: MessageToken): string {
    if (!this.locale) {
      throw new Error("\"locale\" is not set.");
    }

    const dict = this.dictionaries[this.locale];
    if (!dict) {
      throw new Error(`Messages for ${this.locale} is not available.`);
    }

    // TODO: replace variables.
    return dict[token.id];
  }
}
