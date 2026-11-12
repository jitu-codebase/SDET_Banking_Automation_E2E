export class TestDataContext {
  private readonly data = new Map<string, unknown>();

  set<T>(key: string, value: T): void {
    this.data.set(key, value);
  }

  get<T>(key: string): T {
    if (!this.data.has(key)) {
      throw new Error(`This key is not present in data Context : ${key}`);
    }
    return this.data.get(key) as T;
  }

  getAll(): Partial<unknown> {
    return Object.fromEntries(this.data.entries()) as Partial<unknown>;
  }

  has(key: string): boolean {
    return this.data.has(key);
  }

  clear(): void {
    this.data.clear();
  }
}
