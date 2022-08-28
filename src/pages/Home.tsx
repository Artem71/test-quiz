import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import quizStore from '../store/quiz.store'
import { Link } from 'react-router-dom'
import { RoutePaths } from '../router'
import { Spin, List, Typography } from 'antd'

const Home = observer(() => {
  useEffect(() => {
    quizStore.fetchCategories()
  }, [])

  if (!quizStore.categories.length) {
    return (
      <main className="flex-center h-full">
        <Spin size="large" />
      </main>
    )
  }

  return (
    <main className="flex-center-column h-full">
      <Typography.Title>Select a category</Typography.Title>
      <List
        bordered
        dataSource={quizStore.categories}
        renderItem={cat => (
          <List.Item>
            <Link to={RoutePaths.QUIZ.replace(/:id/, cat.id.toString())}>{cat.title}</Link>
          </List.Item>
        )}
      />
    </main>
  )
})

export default Home