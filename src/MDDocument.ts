// TODO: Should this extend Document or XMLDocument?
class MDDocument extends Document {
  constructor() {
    super();

    this.createElementNS("http://specml.org/spec/", "File");
    this.append(file);
  }

  createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions | undefined
  ): HTMLElementTagNameMap[K];
  createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions | undefined
  ): HTMLElementDeprecatedTagNameMap[K];
  createElement(
    tagName: string,
    options?: ElementCreationOptions | undefined
  ): HTMLElement;
  createElement(
    tagName: unknown,
    options?: unknown
  ):
    | HTMLElement
    | HTMLElementTagNameMap[K]
    | HTMLElementDeprecatedTagNameMap[K] {
    return this.createElementNS("http://specml.org/spec/", tagName, options);
  }
}
