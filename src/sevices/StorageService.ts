import { IStorageService } from '../interfaces/services/storageService.interface'

class StorageService implements IStorageService {
  get(key: string): string | null {
    return localStorage.getItem(key)
  }

  set(key: string, val: any): void {
    const item = typeof val === 'string' ? val : JSON.stringify(val)
    localStorage.setItem(key, item)
  }

  remove (key: string): void {
    if (this.get(key)) {
      localStorage.removeItem(key)
    }
  }
}

export default new StorageService()