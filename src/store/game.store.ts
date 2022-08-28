import { makeAutoObservable, runInAction } from 'mobx'
import { IClue, IQuiz } from '../interfaces/models/quiz.model'
import StorageService from '../sevices/StorageService'
import { IStorageService } from '../interfaces/services/storageService.interface'
import { IResultTable } from '../interfaces/models/result.model'
import { RESULTS_KEY } from '../lib/consts'

class GameStore {
  private _quiz: IQuiz | null = null
  private _score = 0
  private _currentClueIdx = 0
  private _user = ''

  private _isRightAnswer = true
  private _isCompleted = false
  private _isNewRecord = false
  
  private _storage: IStorageService

  get score(): number {
    return this._score
  }

  get isRightAnswer(): boolean {
    return this._isRightAnswer
  }

  get clue(): IClue | undefined {
    return this._quiz?.clues[this._currentClueIdx]
  }

  get clueNumber(): number {
    return this._currentClueIdx + 1
  }

  get isCompleted(): boolean {
    return this._isCompleted
  }

  get isNewRecord(): boolean {
    return this._isNewRecord
  }

  constructor(storage: IStorageService) {
    makeAutoObservable(this)
    this._storage = storage
  }

  public startGame(quiz: IQuiz, user: string) {
    this._resetState()
    this._quiz = quiz
    this._user = user
  }

  public answerHandler(answer: string) {
    if (!this._quiz || !this.clue) {
      return
    }

    this._isRightAnswer = this.clue.answer === answer

    if (this._isRightAnswer) {
      this._score += this.clue.value
    }

    runInAction(() => {
      setTimeout(() => {
        if (!this._quiz ) {
          return
        }

        if (this._currentClueIdx + 1 >= this._quiz.clues.length) {
          this._completeGame()
        } else {
          this._updateClueIndex()
        }
      }, 2000)
    })
  }

  private _completeGame() {
    this._saveResult()
    this._isCompleted = true
  }

  private _saveResult() {
    let newResults: IResultTable = {
      [this._user]: this._score
    }

    let maxScore = 0
    const rawSavedResults = this._storage.get(RESULTS_KEY)

    if (rawSavedResults) {
      const savedResults = JSON.parse(rawSavedResults)
      maxScore = Object.keys(savedResults).reduce((acc, name) => Math.max(acc, savedResults[name]), 0)

      const prevUserBestRes = savedResults[this._user] || 0

      newResults = {
        ...savedResults,
        [this._user]: Math.max(prevUserBestRes, this._score)
      }
    }

    this._isNewRecord = this._score > maxScore
    this._storage.set(RESULTS_KEY, newResults)
  }

  private _updateClueIndex() {
    this._currentClueIdx++
  }

  private _resetState() {
    this._score = 0
    this._currentClueIdx = 0
    this._isCompleted = false
    this._isNewRecord = false
    this._user = ''
  }
}

export default new GameStore(StorageService)
