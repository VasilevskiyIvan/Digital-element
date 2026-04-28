type TQueryRoot = Document | DocumentFragment | Element;

/**
 * Утилита для поиска DOM элементов
 * Упрощает работу с querySelector и data-атрибутами
 */
export class DomQuery {

  /**
   * Утилита для поиска DOM элементов
   * @param {TQueryRoot} defaultRoot - корневой элемент поиска
   */
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

  /**
   * Поиск по атрибуту
   * @param {string} attributeName - имя атрибута
   * @param {TQueryRoot} root - корень поиска
   * @returns {T | null}
   */
  public byAttr<T extends Element>(attributeName: string, root: TQueryRoot = this.defaultRoot): T | null {
    return this.one<T>(`[${attributeName}]`, root);
  }

  /**
   * Поиск всех элементов по data-ключу
   * @param {string} dataKey - ключ data-атрибута
   * @param {TQueryRoot} root - корень поиска
   * @returns {T[]}
   */
  public byDataAll<T extends Element>(dataKey: string, root: TQueryRoot = this.defaultRoot): T[] {
    return this.all<T>(`[${this.dataAttrName(dataKey)}]`, root);
  }

  /**
   * Поиск по data-значению
   * @param {string} dataKey - ключ data-атрибута
   * @param {string} value - значение атрибута
   * @param {TQueryRoot} root - корень поиска
   * @returns {T | null}
   */
  public byDataValue<T extends Element>(dataKey: string, value: string, root: TQueryRoot = this.defaultRoot): T | null {
    return this.one<T>(`[${this.dataAttrName(dataKey)}="${CSS.escape(value)}"]`, root);
  }

  /**
   * Поиск одного элемента с data-js
   * @param {string} value - значение data-js
   * @param {TQueryRoot} root - корень поиска
   * @returns {T | null}
   */
  public byDataJs<T extends Element>(value: string, root: TQueryRoot = this.defaultRoot): T | null {
    return this.byDataValue<T>("js", value, root);
  }

  /**
   * Поиск всех элементов с data-js
   * @param {string} value - значение data-js
   * @param {TQueryRoot} root - корень поиска
   * @returns {T[]}
   */
  public byDataJsAll<T extends Element>(value: string, root: TQueryRoot = this.defaultRoot): T[] {
    return this.all<T>(`[data-js="${CSS.escape(value)}"]`, root);
  }

}

/**
 * Глобальный экземпляр для поиска в DOM
 */
export const domQuery = new DomQuery();