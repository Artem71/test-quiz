import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import userStore from '../store/user.store'
import quizStore from '../store/quiz.store'
import gameStore from '../store/game.store'
import { RoutePaths } from '../router'
import { Spin, Typography, Input, Button } from 'antd'

const Quiz = observer(() => {
  // Получение квиза
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      quizStore.fetchQuizByCategory(+id)
    }
  }, [])

  // Старт игры
  useEffect(() => {
    if (quizStore.quiz) {
      gameStore.startGame(quizStore.quiz, userStore.name)
    }  
  }, [quizStore.quiz])

  // Ответ игрока
  const [answer, setAnswer] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)

  const onAnswer = () => {
    setIsAnswered(true)
    gameStore.answerHandler(answer)
  }

  // Смена вопроса
  useEffect(() => {
    setIsAnswered(false)

    if (gameStore.clue) {
      setAnswer(gameStore.clue.answer)
    }
  }, [gameStore.clue])

  // Завершение игры
  const navigate = useNavigate()

  useEffect(() => {
    if (gameStore.isCompleted) {
      navigate(RoutePaths.RESULTS, { replace: true })
    }
  }, [gameStore.isCompleted])

  if (!gameStore.clue) {
    return (
      <main className="flex-center h-full">
        <Spin size="large" />
      </main>
    )
  }

  return (
    <main className="flex-center-column h-full">
      <div className="d-flex w-10 justify-between">
        <Typography.Text className="color-info">
          Score {gameStore.score}
        </Typography.Text>
        <Typography.Text className="color-info">
          Clue {gameStore.clueNumber}/{quizStore.quiz?.clues.length}
        </Typography.Text>
      </div>
      
      <Typography.Title className="w-8 text-center m-m color-primary">
        {gameStore.clue.question}
      </Typography.Title>

      <Typography.Text className="d-block mb-s">
        Clue value is {gameStore.clue.value}
      </Typography.Text>

      <Input
        className="w-5"
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button
        className="mt-s"
        type="primary"
        onClick={onAnswer}
        disabled={isAnswered}
      >
        Answer
      </Button>

      {isAnswered &&
        <Typography.Title
          level={3}
          className={`p-fixed mt-xxl color-${gameStore.isRightAnswer ? 'success' : 'danger'}`}
          style={{top: 0}}
        >
          {gameStore.isRightAnswer ? 'Right!' : 'Wrong :('}
        </Typography.Title>
      }
    </main>
  )
})

export default Quiz