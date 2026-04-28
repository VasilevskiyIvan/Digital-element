type TQueryRoot = Document | DocumentFragment | Element;

/**
 *
 */
export class DomQuery {

  constructor(private readonly defaultRoot: TQueryRoot = document) { }

  private dataAttrName(dataKey: string) {
    return `data-${dataKey}`;
  }

  private one<T extends Element>(selector: string, root: TQueryRoot = this.defaultRoot): T | null {
    return root.querySelector(selector) as T | null;
  }

  private all<T extends Element>(selector: string, root: TQueryRoot = this.defaultRoot): T[] {
    return Array.from(root.querySelectorAll(selector)) as T[];
  }

  public byAttr<T extends Element>(attributeName: string, root: TQueryRoot = this.defaultRoot): T | null {
    return this.one<T>(`[${attributeName}]`, root);
  }

  public byDataAll<T extends Element>(dataKey: string, root: TQueryRoot = this.defaultRoot): T[] {
    return this.all<T>(`[${this.dataAttrName(dataKey)}]`, root);
  }

  public byDataValue<T extends Element>(dataKey: string, value: string, root: TQueryRoot = this.defaultRoot): T | null {
    return this.one<T>(`[${this.dataAttrName(dataKey)}="${CSS.escape(value)}"]`, root);
  }

  public byDataJs<T extends Element>(value: string, root: TQueryRoot = this.defaultRoot): T | null {
    return this.byDataValue<T>("js", value, root);
  }

  public byDataJsAll<T extends Element>(value: string, root: TQueryRoot = this.defaultRoot): T[] {
    return this.all<T>(`[data-js="${CSS.escape(value)}"]`, root);
  }

}

export const domQuery = new DomQuery();
