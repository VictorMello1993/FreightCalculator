import { FormGroup, Label, Input, Button, Container, Col } from 'reactstrap';
import {navigate} from "@reach/router"
import styled from 'styled-components';
import {useFormik} from 'formik'
import { authenticatedUser } from './../../services/auth/auth.service';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await authenticatedUser(values)      
        navigate('/admin')
      } catch (error) {
        
      }
    }
  })


  return (
    <LoginContainer>
      {/*Utilizando grid para responsividade  */}
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
              {...formik.getFieldProps('email')}
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
              {...formik.getFieldProps('password')}
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