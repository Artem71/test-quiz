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
    this.getClues(catId)
    console.log('quiz', resp.data.clues.length);
    
    return resp.data
  }

  public async getClues(catId: number) {
    const resp = await this.get('/clues', { category: catId })
    console.log('clues', resp.data.length);
    
  }
}

export default new QuizApiService()