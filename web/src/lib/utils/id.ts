/** 產生帶前綴的唯一識別碼，例如 id("p") → "p-1718000000000-3f2a"。 */
export function id(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
