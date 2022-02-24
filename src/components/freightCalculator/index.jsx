import axios from "axios";
import { useEffect, useState } from "react";
import { Input, InputGroup } from 'reactstrap';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const FreightCalculator = () => {

  const [estados, setEstado] = useState([])
  const [cidades, setCidade] = useState([])

  const fazerChamadaAPI = async () => {
    const estados = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    setEstado(estados.data);
  }

  useEffect(() => {
    fazerChamadaAPI();
  }, []);

  const handleChangeEstado = async (event) => {
    const idEstado = event.target.value    

    const cidadesPorEstado = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`
    );
        
    setCidade(cidadesPorEstado.data);
  }

  return (
    <FormContainer>
      <Title>
        Preencha os dados aqui
      </Title>
      <Form>
        <FieldSet>
          --Remetente--
          <FormGroup>
            <Input placeholder="Estado (UF)" 
                  type="select" 
                  name="estados" 
                  id="selectEstados"
                  className="input" 
                  onChange={handleChangeEstado}>
              <option value="">--Estado (UF)--</option>
              {estados.map((est, i) => (
              <option key={i} value={est.id}>
                {est.nome} ({est.sigla})
              </option>
            ))}
            </Input>
            <Input placeholder="Cidade" type="select" name="cidades" id="selectCidades" className="input">
              <option value="">--Cidade--</option>
              {cidades.map((cid, i) => (
              <option key={i} value={cid.id}>
                {cid.nome}
              </option>
            ))}
            </Input>     
            <Input type="tel" placeholder="CEP" mask="99999-999" maskChar="" tag={InputMask}/>
          </FormGroup>
        </FieldSet>
        <FieldSet>
          --Destinatário--
          <FormGroup>
            <Input placeholder="Estado (UF)" 
                  type="select" 
                  name="estados" 
                  id="selectEstados"
                  className="input" 
                  onChange={handleChangeEstado}>
              <option value="">--Estado (UF)--</option>
              {estados.map((est, i) => (
              <option key={i} value={est.id}>
                {est.nome} ({est.sigla})
              </option>
            ))}
            </Input>
            <Input placeholder="Cidade" type="select" name="cidades" id="selectCidades" className="input">
              <option value="">--Cidade--</option>
              {cidades.map((cid, i) => (
              <option key={i} value={cid.id}>
                {cid.nome}
              </option>
            ))}
            </Input>     
            <Input type="tel" placeholder="CEP" mask="99999-999" maskChar="" tag={InputMask}/>
          </FormGroup>
        </FieldSet>        
        <FieldSet>
          --Informações da encomenda--
          <FormGroup>
          <Input type="number" placeholder="peso (KG)" min="0">
          </Input>
          </FormGroup>
        </FieldSet>      
      </Form>
    </FormContainer>
  )
}

const Form = styled.div`
  padding: 20px;  
`

const Title = styled.div`
  font-size: 25px;  
  font-weight: 600;
  text-align: center;    
  color: #335185;    
  padding: 15px;
`

const FormContainer = styled.div`
  background-color: #fafafa;    
  border-radius: 4px 4px 0 0;
`

const FormGroup = styled(InputGroup)`    
  gap: 10px;
  margin: 10px 0;  
`

const FieldSet = styled.fieldset`
  color: #335185;
  font-weight: 600;  
  padding: 15px;
`

export default FreightCalculator