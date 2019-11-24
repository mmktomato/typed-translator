interface MessageDictionary {
  [key: string]: string;
}

export type MessageDictionaries = { [locale: string]: MessageDictionary };

type Values = { [key: string]: string };

export interface MessageToken {
  id: string;
  values?: Values;
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

    return token.values ? this.replaceVariables(dict[token.id], token.values) : dict[token.id];
  }

  private replaceVariables(template: string, values: Values): string {
    return Object.entries(values).reduce((acc, [key, value]) => {
      const regex = new RegExp(`{${key}}`, "g");
      acc = acc.replace(regex, value);
      return acc;
    }, template);
  }
}
