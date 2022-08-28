import axios from 'axios'

export default class BaseApiService {
  private readonly BASE_PATH = 'https://jservice.io/api'

  protected get(path: string, params?: Record<string, string | number>) {
    const fullPath = this.BASE_PATH + path
    return axios.get(fullPath, { params })
  }
}