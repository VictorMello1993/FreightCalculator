import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../components/freightCalculator/styles';
import CompA from '../../components/home/compA';
import CompB from '../../components/home/compB';
import http from '../../config/http'
import { getToken } from '../../config/storage';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const Home = () => {
  //Obtendo todos os estados que estão armazenados em um reducer
  // const store = useSelector(state => state)
  // console.log(store)

  //Apenas estados de students
  // const students = useSelector(state => state.students.data)
  // console.log(students)

  // useEffect(() => {
  //   (async () => {
  //     const getUsers = await http.get('/users')
  //     console.log('getUsers', getUsers.data)
  //   }
  //   )()
  // }, [])

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  useDispatch => hook executada da view para as actions chamarem os reducers
  /*  useSelector => hook executada na hora de obter e enviar os dados atualizados pelos reducers da store
                     para a view*/
    /*Despachar os dados para actions (neste exemplo, está fazendo dispatch da view diretamente para os reducers, 
   pois as actions ainda não estão implementadas). Seguindo a arquitetura flux, uma view despacha os dados
   para as actions que, por sua vez, chama o reducer para atualizar o estado com os dados despachados e
   os armazena na store para que ele envie de volta para a view*/   
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch()

  const incluirUsuario = () => {
    dispatch({
      type: "UPDATE_USER"
    })
  }

  return (
    <Container>
      {/* <h2>Está é a página privada</h2> */}
      <h2>Lista de alunos</h2>
      <Box>
        <CompA/>
        <CompB/>
      </Box>

      {/* <ul>
      {students.map(student => (
        <li>{student.nome}</li>
      ))}
      </ul> */}

      <Button color="primary" onClick={incluirUsuario}>
        Incluir
      </Button>
    </Container>
  )
}

const Box = styled.div `
  display: flex;
  div{
    background: #eee;
    flex: 1;
    margin: 10px;
  }
`

export default Home;

