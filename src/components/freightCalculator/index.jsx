import axios from "axios";
import { useEffect, useState } from "react";
import { Input, InputGroup } from 'reactstrap';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import {Formik } from "formik";

const FreightCalculator = () => {

  const initialValues = { cepRemetente: '', cepDestinatario: '' }
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const [estados, setEstado] = useState([])
  const [cidades, setCidade] = useState([])
  const [servicos, setServico] = useState([])  

  const fazerChamadaAPI = async () => {
    const estados = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const servicos = await axios.get('http://localhost:3001/servicos');

    setEstado(estados.data);
    setServico(servicos.data);    
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
  
  const blockInvalidChar = event => ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();
  
  const validate = (values) => {    
    let errors = {};    

    if (!values.cepRemetente) {
      errors.cepRemetente = "Cep do remetente é obrigatório";
    } else if (values.cepRemetente.length < 8) {
      errors.cepRemetente = "Cep do remetente inválido";
    }

    if (!values.cepDestinatario) {
      errors.cepDestinatario = "Cep do destinatário é obrigatório";
    } else if (values.cepDestinatario.length < 8) {
      errors.cepDestinatario = "Cep do destinatário inválido";
    }
    return errors;

  };

  // const handleOnBlur = (event) => { 
  //   console.log(event.target.value)
  //   validate(event.target.value);    
  // }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      validateOnMount
    >
      {(formik) => {
        const { values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik
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
                    onChange={handleChangeEstado}
                    className="rounded">
                    <option value="">--Estado (UF)--</option>
                    {estados.map((est, i) => (
                      <option key={i} value={est.id}>
                        {est.nome} ({est.sigla})
                      </option>
                    ))}
                  </Input>
                  <Input placeholder="Cidade"
                    type="select"
                    name="cidades"
                    id="selectCidades"
                    className="rounded">
                    <option value="">--Cidade--</option>
                    {cidades.map((cid, i) => (
                      <option key={i} value={cid.id}>
                        {cid.nome}
                      </option>
                    ))}
                  </Input>
                  <Input type="tel"
                    placeholder="CEP"
                    mask="99999-999"
                    maskChar=""
                    tag={InputMask}
                    className="rounded"
                    name="cepRemetente" 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cepRemetente}
                    id="cepRemetente"
                    />
                    {errors.cepRemetente && <span>{errors.cepRemetente}</span>}
                </FormGroup>
              </FieldSet>
              <FieldSet>
                --Destinatário--
                <FormGroup>
                  <Input placeholder="Estado (UF)"
                    type="select"
                    name="estados"
                    id="selectEstados"
                    onChange={handleChangeEstado}
                    className="rounded">
                    <option>--Estado (UF)--</option>
                    {estados.map((est, i) => (
                      <option key={i} value={est.id}>
                        {est.nome} ({est.sigla})
                      </option>
                    ))}
                  </Input>
                  <Input placeholder="Cidade" type="select" name="cidades" id="selectCidades" className="rounded">
                    <option>--Cidade--</option>
                    {cidades.map((cid, i) => (
                      <option key={i} value={cid.id}>
                        {cid.nome}
                      </option>
                    ))}
                  </Input>
                  <Input type="tel" 
                        placeholder="CEP"
                        mask="99999-999"
                        maskChar=""
                        tag={InputMask}
                        className="rounded"
                        name="cepDestinatario"
                        id="cepDestinatario"
                        onBlur={handleBlur} 
                        value={values.cepDestinatario}
                        onChange={handleChange}/>
                        {errors.cepDestinatario && <span>{errors.cepDestinatario}</span>}
                </FormGroup>
              </FieldSet>
              <FieldSet>
                --Informações da encomenda--
                <FormGroup>
                  <Input type="number"
                    placeholder="Peso (kg)"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    className="rounded" />
                  <Input type="select" placeholder="Formato" id="selectFormatos" className="rounded">
                    <option>--Formato--</option>
                    <option value="1">Caixa/Pacote</option>
                    <option value="2">Rolo/Prisma</option>
                    <option value="3">Envelope</option>
                  </Input>
                  <Input type="number"
                    placeholder="Comprimento (cm)"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    className="rounded" />

                  <Input type="number"
                    placeholder="Altura (cm)"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    className="rounded" />
                  <Input type="number"
                    placeholder="Largura (cm)"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    className="rounded" />
                  <Input type="number"
                    placeholder="Diâmetro (cm)"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    className="rounded" />
                </FormGroup>
              </FieldSet>
              <hr />
              <FormGroup>
                <Input type="select"
                  min="0"
                  name="servicos"
                  id="selectServicos">
                  <option>--Tipo de serviço--</option>
                  {servicos.map((svc, i) => (
                    <option key={i} value={svc.id}>
                      {svc.descricao}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
          </FormContainer>
        )
      }}
    </Formik>
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
  
  #selectServicos{
    max-width: 30%;
  }
`

const FieldSet = styled.fieldset`
  color: #335185;
  font-weight: 600;  
  padding: 15px;
`

export default FreightCalculator