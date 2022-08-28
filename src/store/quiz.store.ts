import { makeAutoObservable, runInAction } from "mobx"
import quizApiService from '../api/Quiz.api'
import { ICategory } from '../interfaces/models/category.model'
import { IQuizApiService } from '../interfaces/api/quizApi.interface'
import { IClue, IQuiz } from '../interfaces/models/quiz.model'

class QuizStore {
  private _MAX_LENGTH = 10
  private _categories: ICategory[] = []
  private _quiz: IQuiz | null = null
  private _quizApiService!: IQuizApiService

  constructor(quizApiService: IQuizApiService) {
    makeAutoObservable(this)
    this._quizApiService = quizApiService
  }

  get categories(): ICategory[] {
    return this._categories
  }

  get quiz(): IQuiz | null {
    return this._quiz
  }

  public async fetchCategories() {
    try {
      const categories = await this._quizApiService.getCategories({ count: 100 })
      runInAction(() => {
        this._setCategories(categories)
      })
    } catch (err) {
      console.log('error getCategories', err)
    }
  }

  public async fetchQuizByCategory(id: number) {
    try {
      const quiz = await this._quizApiService.getQuizByCategory(id)
      runInAction(() => {
        this._setQuiz(quiz)
      })
    } catch (err) {
      console.log('error getQuestionsByCategory', err)
    }
  }

  // Нам подходят только те категории, где больше 10 вопросов
  private _setCategories(categories: ICategory[]) {
    const length = categories.length

    for (let i = 0; i < length; i++) {
      if (categories[i].clues_count > this._MAX_LENGTH) {
        this._categories.push(categories[i])
      }

      if (this._categories.length >= this._MAX_LENGTH) {
        return
      }
    }
  }

  private _setQuiz(quiz: IQuiz) {
    // Формируем массив с вопросами уникальными по сложности 
    const clues = quiz.clues.reduce((acc, clue) => {
      const isHasValue = acc.find((c) => c.value === clue.value)
      if (!isHasValue && clue.value && acc.length < this._MAX_LENGTH) {
        acc.push(clue)
      }
      
      return acc
    }, [] as IClue[])

    // Заполняем дыры если есть
    if (clues.length < this._MAX_LENGTH) {
      quiz.clues.forEach((clue) => {
        if (clue.value && !clues.includes(clue) && clues.length < this._MAX_LENGTH) {
          clues.push(clue)
        }
      })
    }

    // Сортируем от простого к сложному
    clues.sort((c1, c2) => c1.value - c2.value)

    this._quiz = { ...quiz, clues }
  }
}

export default new QuizStore(quizApiService)