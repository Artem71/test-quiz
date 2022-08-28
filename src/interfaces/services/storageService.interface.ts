export interface IStorageService {
  get(key: string): string | null
  set(key: string, val: any): void
  remove (key: string): void
}