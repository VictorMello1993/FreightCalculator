import axios from "axios";
import { useEffect, useState } from "react";
import { Input, InputGroup } from 'reactstrap';
import styled from 'styled-components';

const FreightCalculator = () => {

  const [categorias, setCategoria] = useState([])
  const [produtos, setProduto] = useState([])

  const fazerChamadaAPI = async () => {    
    const categorias = await axios.get('http://localhost:3001/Categorias');    
    setCategoria(categorias.data);
  }

  useEffect(() => {
    fazerChamadaAPI();
  }, []);

  const handleChangeCategorias = async (event) => {
    const idCategoria = event.target.value
    console.log(idCategoria)
    const produtosPorCategoria = await axios.get(
      `http://localhost:3001/Produtos?categoriaId=${idCategoria}`
    );

    setProduto(produtosPorCategoria.data);
  }

  return (
    <FormContainer>
      <Title>
        Preencha os dados aqui
      </Title>
      <Form>
        <FormGroup>
          <Input placeholder="username" />
          <Input placeholder="username" />
          <Input placeholder="username" />
        </FormGroup>
        <FormGroup>          
          <Input
            id="exampleSelect"
            name="categorias"
            type="select"
            onChange={handleChangeCategorias}
          >
            <option value="">--categorias---</option>
            {categorias.map((cat, i) => (
              <option key={i} value={cat.id}>
                {cat.body}
              </option>
            ))} 
          </Input>
          <Input
            id="exampleSelect"
            name="produtos"
            type="select"
          >
            <option value="">-- produtos --</option>
            {produtos.map((prod, i) => (
              <option key={i} value={prod.id}>
                {prod.body}
              </option>
            ))}            
          </Input>
        </FormGroup>
      </Form>
    </FormContainer>
  )
}

const Form = styled.div`
  padding: 20px;
`

const Title = styled.p`
  font-size: 25px;
  font-weight: 600;
  text-align: center;    
  color: #335185;    
`

const FormContainer = styled.div`
  background-color: #fafafa;    
  border-radius: 4px 4px 0 0;
`

const FormGroup = styled(InputGroup)`    
  gap: 10px;
  margin-bottom: 20px;
`

export default FreightCalculator