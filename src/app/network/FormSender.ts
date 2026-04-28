export type TSendResult =
  | { ok: true; }
  | { ok: false; error: string; };

/**
 * Отправка данных формы на сервер
 */
export class FormSender {

  private readonly endpoint: string;

  /**
   * Отправка данных формы на сервер
   * @param {string} endpoint - адрес API для отправки
   */
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Отправка данных
   * @param {Record<string, string>} payload - данные формы
   * @returns {Promise<TSendResult>} результат отправки
   */
  public async send(payload: Record<string, string>): Promise<TSendResult> {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return { ok: false, error: `Request failed: ${response.status}` };
      }

      return { ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return { ok: false, error: message };
    }
  }

}