import { ICategory } from '../models/category.model'
import { IQuiz } from '../models/quiz.model'

export interface IQuizApiService {
  getCategories(params?: Partial<{ count: number, offset: number }>): Promise<ICategory[]>
  getQuizByCategory(catId: number): Promise<IQuiz>
}