import React from 'react'
import AppRouter from './components/AppRouter'
import { PageHeader, Button } from 'antd'
import { observer } from 'mobx-react-lite'
import userStore from './store/user.store'

const App = observer(() => {
  return (
    <div className="App h-full">
      {userStore.name &&
        <PageHeader
          ghost={false}
          title={'Name: ' + userStore.name}
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => userStore.setName('')}
            >
              Change name
            </Button>
          ]}
        />}
      <AppRouter />
    </div>
  )
})

export default App;
