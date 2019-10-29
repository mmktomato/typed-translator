interface MessageDictionary {
  [key: string]: string;
}

export type MessageDictionaryMap = Map<string, MessageDictionary>;

export interface MessageToken {
  id: string;
  values: {};
}

export class MessageResolver {
  locale: string = "";

  constructor(private readonly dictionaries: MessageDictionaryMap) {
  }

  resolve(token: MessageToken): string {
    if (!this.locale) {
      throw new Error("\"locale\" is not set.");
    }

    const dict = this.dictionaries.get(this.locale);
    if (!dict) {
      throw new Error(`Messages for ${this.locale} is not available.`);
    }

    // TODO: replace variables.
    return dict[token.id];
  }
}
