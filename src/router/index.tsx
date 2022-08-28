import React from 'react'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Quiz from '../pages/Quiz'
import Results from '../pages/Results'
import NotFound from '../pages/NotFound'

export interface IRoute {
  path: string
  component: React.ReactNode
}

// Пути
export enum RoutePaths {
  HOME = '/',
  LOGIN = '/login',
  QUIZ = '/quiz/:id',
  RESULTS = '/results',
  NOT_FOUND = '/404'
}

// Публичные роуты
export const publicRoutes: IRoute[] = [
  {
    path: RoutePaths.LOGIN,
    component: <Login />
  }
]

// Защищенные роуты
export const privateRoutes: IRoute[] = [
  {
    path: RoutePaths.LOGIN,
    component: <Login />
  },
  {
    path: RoutePaths.HOME,
    component: <Home />
  },
  {
    path: RoutePaths.QUIZ,
    component: <Quiz />
  },
  {
    path: RoutePaths.RESULTS,
    component: <Results />
  },
  {
    path: RoutePaths.NOT_FOUND,
    component: <NotFound />
  }
]