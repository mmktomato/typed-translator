import { MessageResolver, MessageDictionaries, MessageToken } from "./MessageResolver";


class ResolverHolder {
  private instance: MessageResolver | null = null;

  set resolver(newResolver: MessageResolver) {
    this.instance = newResolver;
  }

  get resolver() {
    if (!this.instance) {
      throw new Error("Message translation is not initialized.");
    }
    return this.instance;
  }
}
const resolverHolder = new ResolverHolder();


export const initTranslation = (dictionaries: MessageDictionaries) => {
  resolverHolder.resolver = new MessageResolver(dictionaries);
};

export const setLocale = (locale: string) => {
  const resolver = resolverHolder.resolver;
  resolver.locale = locale;
};

export const translate = (token: MessageToken) => {
  const resolver = resolverHolder.resolver;
  return resolver.resolve(token);
};
