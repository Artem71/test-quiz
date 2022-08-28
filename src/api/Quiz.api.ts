import BaseApiService from './Base.api'
import { IQuizApiService } from '../interfaces/api/quizApi.interface'
import { ICategory } from '../interfaces/models/category.model'
import { IQuiz } from '../interfaces/models/quiz.model'

class QuizApiService extends BaseApiService implements IQuizApiService {
  /**
   * Метод получения списка категорий
   * 
   * @count количество запрашиваемых категорий
   * @offset отступ для паганиции
   */
  public async getCategories(params?: Partial<{count: number, offset: number}>): Promise<ICategory[]> {
    const resp = await this.get('/categories', params)
    return resp.data
  }

  /**
   * Получение квиза по айдишнику категории
   * 
   * @param catId айдишник категории
   */
  public async getQuizByCategory(catId: number): Promise<IQuiz> {
    const resp = await this.get('/category', { id: catId })
    return resp.data
  }
}

export default new QuizApiService()