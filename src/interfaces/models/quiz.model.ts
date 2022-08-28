export interface IClue {
  airdate: string
  answer: string
  category_id: number
  game_id: number
  id: number
  invalid_count: null | boolean
  question: string
  value: number
}

export interface IQuiz {
  clues: IClue[]
  clues_count: number
  id: number
  title: string
}