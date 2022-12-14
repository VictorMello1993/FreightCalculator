import { Container, Col } from 'reactstrap';
import { navigate } from "@reach/router"
import styled from 'styled-components';
import { useFormik } from 'formik'
import { authenticatedUser } from './../../services/auth/auth.service';
import { saveAuth } from '../../config/storage';
import { useState } from 'react';
import http from './../../config/http';
import * as yup from 'yup'
import { FormField } from '../../components/formField/login';
import { Button } from '../../components/button';
import { LoginAction } from '../../store/user/action';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Preencha o e-email').email('Preencha um e-mail válido.'),
      password: yup.string().required('Preencha uma senha válida')
        .min(5, 'Preencha senha com no mínimo 5 caracteres')
    }),

    //Autenticação com Redux
    // onSubmit: (values) => dispatch(LoginAction(values)),

    // Autenticação sem Redux (direto no componente)
    onSubmit: async (values) => {
      try {
        setError('')
        const { data: { token } } = await authenticatedUser(values)
        http.defaults.headers["authorization"] = `${token.type} ${token.token}`;
        saveAuth(token)
        navigate('/admin')
      } catch (error) {
        setError('Erro ao tentar fazer o login, verifique seu e-mail e/ou senha')
      }
    }    
  })

  //Função customizada para tratamento de erros do Formik
  const getFieldProps = (fieldName) => ({
    ...formik.getFieldProps(fieldName),
    isValid: formik.touched[fieldName] && !formik.errors[fieldName],
    isInvalid: formik.touched[fieldName] && !!formik.errors[fieldName],
    error: formik.errors[fieldName]
  })

  return (
    <LoginContainer>
      {/*Utilizando grid (Col) para responsividade  */}
      <Col sm={12} md={6} lg={3}>
        <Form inline onSubmit={formik.handleSubmit}>
          <FormField
            {...getFieldProps('email')}
            label="E-mail"
            type="email"
            placeholder="Informe seu e-mail de acesso"
          />
          <FormField
            {...getFieldProps('password')}
            label="Senha"
            type="password"
            placeholder="Informe sua senha de acesso"
          />
          <Button
            block
            outline
            type="submit"
            className='mb-4'
            loading={formik.isValid || formik.isSubmitting}
            disabled={!formik.isValid || formik.isSubmitting}>
            Entrar
          </Button>
        </Form>
      </Col>
    </LoginContainer>
  )
}

export default Login

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 .2em #000;
`;

const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  
`