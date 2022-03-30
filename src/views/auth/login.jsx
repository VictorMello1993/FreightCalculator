import { FormGroup, Label, Input, Button, Container, Col, Alert } from 'reactstrap';
import {navigate} from "@reach/router"
import styled from 'styled-components';
import { useFormik } from 'formik'
import { authenticatedUser } from './../../services/auth/auth.service';
import { saveToken } from '../../config/storage';
import { useState } from 'react';
import http from './../../config/http';

const Login = () => {
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: {
      email: 'user1@gmail.com',
      password: '12345',
    },
    onSubmit: async (values) => {
      try {
        setError('')
        const { data: { token } } = await authenticatedUser(values)
        http.defaults.headers["authorization"] = `${token.type} ${token.token}`;
        saveToken(token)
        navigate('/admin')
      } catch (error) {
        setError('Erro ao tentar fazer o login, verifique seu e-mail e/ou senha')
      }
    }
  })

  //Função customizada para tratamento de erros do Formik
  const getFieldProps = (fieldName) => ({
    ...formik.getFieldProps(fieldName),
    // isValid: formik.touched[fieldName] && !formik.errors[fieldName],
    // isInvalid: formik.touched[fieldName] && !!formik.errors[fieldName],
    error: formik.errors[fieldName]
  })

  return (
    <LoginContainer>
      {/*Utilizando grid (Col) para responsividade  */}
      <Col sm={12} md={6} lg={3}>
        <Form inline onSubmit={formik.handleSubmit}>
          <FormGroup className='mb-2 me-sm-2 mb-sm-0'>
            <Label
              className="me-sm-2"
              for="exampleEmail"
            >
              Email:
            </Label>
            <Input
              {...getFieldProps('email')}
              id="exampleEmail"
              name="email"
              placeholder="Informe o seu e-mail"
              type="email"
            />
          </FormGroup>
          <FormGroup className='my-3'>
            <Label
              className="me-sm-2"
              for="examplePassword"
            >
              Senha:
            </Label>
            <Input
              {...getFieldProps('password')}
              id="examplePassword"
              name="password"
              placeholder="Informe sua senha"
              type="password"
            />
          </FormGroup>
          <Button block type='submit'>
            Submit
          </Button>
        </Form>
        {error.length > 0 && <Alert color="danger">{error}</Alert>}
      </Col>
    </LoginContainer>
  )
}

export default Login

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
`;

const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  
`