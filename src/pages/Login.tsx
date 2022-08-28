import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Form, Button, Typography } from 'antd';
import userStore from '../store/user.store'
import { RoutePaths } from '../router';
import { USERNAME_MIN_LENGTH } from '../lib/consts'

function Login() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  let login = ''

  const validateName = () => {
    if (!login) {
      setErrorMessage('Please input your username!')
      return false
    }

    if (login.length < USERNAME_MIN_LENGTH) {
      setErrorMessage(`Minimum name length is ${USERNAME_MIN_LENGTH}`)
      return false
    }

    return true
  }

  const onSubmit = () => {
    const isValidName = validateName()

    if (isValidName) {
      userStore.setName(login)
      navigate(RoutePaths.HOME)
    }
  }

  return (
    <main className="flex-center-column h-full">
      <Typography.Title level={3}>Enter your name</Typography.Title >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        onSubmitCapture={() => onSubmit()}
      >
        <Form.Item
          className="w-12"
          name="username"
          rules={[{ required: true, message: errorMessage, min: USERNAME_MIN_LENGTH }]}
        >
          <Input onChange={(e) => login = e.target.value} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Enter
          </Button>
        </Form.Item>
      </Form>
    </main>
  )
} 

export default Login