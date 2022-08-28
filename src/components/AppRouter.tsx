import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes, RoutePaths } from '../router'
import { observer } from 'mobx-react-lite'
import user from '../store/user.store'

const AppRouter = observer(() => {
  const availableRoutes = user.name ? privateRoutes : publicRoutes
  
  return (
    <Routes>
      {
        availableRoutes.map((route) => 
          <Route
            key={route.path}
            path={route.path}
            element={route.component}
          />
        )
      }
      <Route
        path="*"
        element={<Navigate to={user.name ? RoutePaths.NOT_FOUND : RoutePaths.LOGIN} replace />}
      />
    </Routes>
  )
})

export default AppRouter
