import axios from "axios";
import { useEffect, useState } from "react";
import { Input, InputGroup, Button } from 'reactstrap';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import { Formik, Form } from "formik";
import schema from '../../config/schemaValidation.js'
import validarCepPorEstado from '../../services/validateCEP/validateCEP'
import calcularPrecoFrete from '../../services/api/freight'

const FreightCalculator = () => {

  const initialValues = {
    cepRemetente: '', cepDestinatario: '', peso: '', comprimento: '', altura: '',
    largura: '', diametro: '', estadoRemetente: '', cidadeRemetente: '', estadoDestinatario: '',
    cidadeDestinatario: '', servico: '', formato: ''
  }

  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const [estados, setEstado] = useState([])
  const [cidadesRemetente, setCidadeRemetente] = useState([])
  const [cidadesDestinatario, setCidadeDestinatario] = useState([])
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
    console.log(event.target)
    const idEstado = event.target.value

    const cidadesPorEstado = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`);

    if(event.target.id === 'estadoRemetente'){
      setCidadeRemetente(cidadesPorEstado.data);
    } else{
      setCidadeDestinatario(cidadesPorEstado.data);
    }
  }

  const blockInvalidChar = event => ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();

  const validate = ({ cepRemetente, cepDestinatario, estadoRemetente, estadoDestinatario }) => {
    const errors = {}

    if (cepRemetente && !validarCepPorEstado(cepRemetente, estadoRemetente, estados)) {
      errors.cepRemetente = 'CEP inválido'
    }

    if (cepDestinatario && !validarCepPorEstado(cepDestinatario, estadoDestinatario, estados)) {
      errors.cepDestinatario = 'CEP inválido'
    }

    return errors
  }

  const submit = (event, values) => {
    event.preventDefault()

    const codigoServico = servicos.find(svc => svc.id === Number(values.servico))?.codigo        

    values.servico = codigoServico    

    calcularPrecoFrete(values)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
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
              <FormElement onSubmit={(event) => {
                submit(event, values)
                handleSubmit(event)                
              }}
              method="POST">
                <FieldSet>
                  --Remetente--
                  <FormGroup>
                    <Input placeholder="Estado (UF)"
                      type="select"
                      name="estadoRemetente"
                      id="estadoRemetente"
                      onChange={(event) => {
                        handleChangeEstado(event)
                        handleChange(event)
                      }}
                      onBlur={handleBlur}
                      className="rounded">
                      <option value="">--Estado (UF)--</option>
                      {estados.map((est, i) => (
                        <option key={i} value={est.id}>
                          {est.nome} ({est.sigla})
                        </option>
                      ))}
                    </Input>
                    {errors.estadoRemetente && touched.estadoRemetente &&
                      <ErrorFeedback>
                        {errors.estadoRemetente}
                      </ErrorFeedback>}
                    <Input placeholder="Cidade"
                      type="select"
                      name="cidadeRemetente"
                      id="cidadeRemetente"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="rounded">
                      <option value="">--Cidade--</option>
                      {cidadesRemetente.map((cid, i) => (
                        <option key={i} value={cid.id}>
                          {cid.nome}
                        </option>
                      ))}
                    </Input>
                    {errors.cidadeRemetente && touched.cidadeRemetente &&
                      <ErrorFeedback>
                        {errors.cidadeRemetente}
                      </ErrorFeedback>}
                    <div>
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
                        invalid={errors.cepRemetente && touched.cepRemetente}
                        disabled={!values.estadoRemetente || !values.cidadeRemetente}
                      />
                      {errors.cepRemetente && touched.cepRemetente && <ErrorFeedback>
                        {errors.cepRemetente}
                      </ErrorFeedback>}
                    </div>
                  </FormGroup>
                </FieldSet>
                <FieldSet>
                  --Destinatário--
                  <FormGroup>
                    <Input placeholder="Estado (UF)"
                      type="select"
                      name="estadoDestinatario"
                      id="estadoDestinatario"
                      onChange={(event) => {
                        handleChangeEstado(event)
                        handleChange(event)
                      }}
                      onBlur={handleBlur}
                      className="rounded">
                      <option value="">--Estado (UF)--</option>
                      {estados.map((est, i) => (
                        <option key={i} value={est.id}>
                          {est.nome} ({est.sigla})
                        </option>
                      ))}
                    </Input>
                    {errors.estadoDestinatario && touched.estadoDestinatario && <ErrorFeedback>
                      {errors.estadoDestinatario}
                    </ErrorFeedback>}
                    <Input placeholder="Cidade"
                      type="select"
                      name="cidadeDestinatario"
                      id="cidadeDestinatario"
                      className="rounded"
                      onBlur={handleBlur}
                      onChange={handleChange}>
                      <option value="">--Cidade--</option>
                      {cidadesDestinatario.map((cid, i) => (
                        <option key={i} value={cid.id}>
                          {cid.nome}
                        </option>
                      ))}
                    </Input>
                    {errors.cidadeDestinatario && touched.cidadeDestinatario && <ErrorFeedback>
                      {errors.cidadeDestinatario}
                    </ErrorFeedback>}
                    <div>
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
                        onChange={handleChange}
                        invalid={errors.cepDestinatario && touched.cepDestinatario}
                        disabled={!values.estadoDestinatario || !values.cidadeDestinatario} />
                      {errors.cepDestinatario && touched.cepDestinatario &&
                        <ErrorFeedback>
                          {errors.cepDestinatario}
                        </ErrorFeedback>}
                    </div>
                  </FormGroup>
                </FieldSet>
                <FieldSet>
                  --Informações da encomenda--
                  <FormGroup>
                    <Input type="number"
                      placeholder="Peso (kg)"
                      min="0"
                      onKeyDown={blockInvalidChar}
                      className="rounded"
                      id="peso"
                      name="peso"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      invalid={errors.peso && touched.peso} />
                    {errors.peso && touched.peso &&
                      <ErrorFeedback>
                        {errors.peso}
                      </ErrorFeedback>}
                    <Input type="select"
                      placeholder="Formato"
                      id="formato"
                      name="formato"
                      className="rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}>
                      <option value="">--Formato--</option>
                      <option value="1">Caixa/Pacote</option>
                      <option value="2">Rolo/Prisma</option>
                      <option value="3">Envelope</option>
                    </Input>
                    {errors.formato && touched.formato &&
                      <ErrorFeedback>
                        {errors.formato}
                      </ErrorFeedback>}
                    <Input type="number"
                      placeholder="Comprimento (cm)"
                      min="0"
                      onKeyDown={blockInvalidChar}
                      className="rounded"
                      id="comprimento"
                      name="comprimento"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.comprimento}
                      invalid={errors.comprimento && touched.comprimento} />
                    {errors.comprimento && touched.comprimento &&
                      <ErrorFeedback>
                        {errors.comprimento}
                      </ErrorFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Input type="number"
                      placeholder="Altura (cm)"
                      min="0"
                      onKeyDown={blockInvalidChar}
                      className="rounded"
                      id="altura"
                      name="altura"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.altura}
                      invalid={errors.altura && touched.altura} />
                    {errors.altura && touched.altura &&
                      <ErrorFeedback>
                        {errors.altura}
                      </ErrorFeedback>}
                    <Input type="number"
                      placeholder="Largura (cm)"
                      min="0"
                      id="largura"
                      name="largura"
                      onKeyDown={blockInvalidChar}
                      className="rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.largura}
                      invalid={errors.largura && touched.largura} />
                    {errors.largura && touched.largura &&
                      <ErrorFeedback>
                        {errors.largura}
                      </ErrorFeedback>}
                    <Input type="number"
                      placeholder="Diâmetro (cm)"
                      min="0"
                      id="diametro"
                      name="diametro"
                      onKeyDown={blockInvalidChar}
                      className="rounded"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.diametro}
                      invalid={errors.diametro && touched.diametro} />
                    {errors.diametro && touched.diametro &&
                      <ErrorFeedback>
                        {errors.diametro}
                      </ErrorFeedback>}
                  </FormGroup>
                </FieldSet>
                <hr />
                <FormGroup>
                  <div className="ctnServicos">
                    <Input type="select"
                      min="0"
                      name="servico"
                      id="servico"
                      onChange={handleChange}
                      onBlur={handleBlur}                  >
                      <option value="">--Tipo de serviço--</option>
                      {servicos.map((svc, i) => (
                        <option key={i} value={svc.id}>
                          {svc.descricao}
                        </option>
                      ))}
                    </Input>
                    {errors.servico && touched.servico &&
                      <ErrorFeedback>{errors.servico}</ErrorFeedback>}
                  </div>
                </FormGroup>
                <div className="btnCalcular">
                  <Button type="submit" disabled={!isValid}>
                    Calcular
                  </Button>
                </div>
              </FormElement>
            </FormContainer>
          )
        }}
      </Formik>
      <FreightResult>
        TESTE
      </FreightResult>
    </>
  )
}

const FormElement = styled(Form)`
  padding: 20px;
  font-weight: 600;

  .btnCalcular{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btnCalcular > button{
    background-color: #335185;    
    width: 200px;
  }

  .btnCalcular > button:hover{
    background-color: #87B2F2;
  }
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
  gap: 20px;
  margin: 10px 0;
  padding: 10px 0;
  
  .ctnServicos{
    max-width: 30%;
  }
`

const FieldSet = styled.fieldset`
  color: #335185;
  padding: 15px;
`

const ErrorFeedback = styled.div`
  padding: 5px;
  color: #dc3545;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`

const FreightResult = styled.div`
  background-color: red;
  padding: 30px;
  margin-top: 50px;
`

export default FreightCalculator