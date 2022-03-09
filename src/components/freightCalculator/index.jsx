import { useEffect, useState } from "react";
import { Input } from 'reactstrap';
import InputMask from 'react-input-mask';
import { Formik } from "formik";
import schema from '../../config/schemaValidation.js'
import validarCepPorEstado from '../../services/validateCEP/validateCEP'
import {calcularPrecoFrete, obterCidades, obterEstados, obterTiposServico } from '../../services/api/freight.service'
import { FieldSet, Title, Container, FormElement, FieldGroup, Field, ErrorFeedback, ButtonContainer, CalculateButton} from './styles';
import Result from '../resultFreight'

const FreightCalculator = () => {

  const initialValues = {
    cepRemetente: '', cepDestinatario: '', peso: '', comprimento: '', altura: '',
    largura: '', diametro: '', estadoRemetente: '', cidadeRemetente: '', estadoDestinatario: '',
    cidadeDestinatario: '', servico: '', formato: '', valorFrete: '', diasUteis: ''
  }

  const [result, setResult] = useState(false)
  const [estadosRemetente, setEstadoRemetente] = useState([])
  const [estadosDestinatario, setEstadoDestinatario] = useState([])
  const [cidadesRemetente, setCidadeRemetente] = useState([])
  const [cidadesDestinatario, setCidadeDestinatario] = useState([])
  const [servicos, setServico] = useState([])

  const setupStates = async () => {

    const estados = obterEstados();
    const servicos = obterTiposServico()

    setEstadoRemetente(estados);
    setEstadoDestinatario(estados);
    setServico(servicos);
  }

  useEffect(() => {
    setupStates();
  }, []);

  const handleChangeEstado = (event, values) => {    
    const sigla = event.target.value

    const cidadesPorEstado = obterCidades(sigla)

    if (event.target.id === 'estadoRemetente') {
      values.cidadeRemetente = cidadesPorEstado ? values.cidadeRemetente : ''
      setCidadeRemetente(cidadesPorEstado ?? []);
    } else if(event.target.id === 'estadoDestinatario') {
      values.cidadesDestinatario = cidadesPorEstado ? values.cidadeDestinatario : ''      
      setCidadeDestinatario(cidadesPorEstado ?? []);
    }

    clearCEP(event, values)
  }

  const blockInvalidChar = event => ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();

  const validate = ({ cepRemetente, cepDestinatario, estadoRemetente, estadoDestinatario }) => {
    const errors = {}    

    if (cepRemetente && !validarCepPorEstado(cepRemetente, estadoRemetente)) {
      errors.cepRemetente = 'CEP inválido'
    }    

    if (cepDestinatario && !validarCepPorEstado(cepDestinatario, estadoDestinatario)) {
      errors.cepDestinatario = 'CEP inválido'
    }

    return errors
  }

  const submit = (values) => {
    (async () => {
      const {Servicos} = await calcularPrecoFrete(values)      
      const {cServico} = Servicos

      const [result] = cServico

      values.valorFrete = result.Valor[0]
      values.diasUteis = result.PrazoEntrega[0]      

      setResult(result)
    })()
  } 
  
  const clearCEP= ({target}, values) => {
    if((target.id === 'cidadeRemetente' || target.id === 'estadoRemetente') && !target.value){
      values.cepRemetente = ''
    }

    if((target.id === 'cidadeDestinatario' || target.id === 'estadoDestinatario') && !target.value){
      values.cepDestinatario = ''  
    }    
  }

  return (    
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        validate={validate}
        validateOnMount        
      >
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            setFieldValue,
            isValid            
          } = formik
          return (
            <Container>
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
                  <FieldGroup>
                    <Field>
                      <Input placeholder="Estado (UF)"
                        type="select"
                        name="estadoRemetente"
                        id="estadoRemetente"
                        onChange={(event) => {
                          setFieldValue('cidadeRemetente', '')
                          handleChangeEstado(event, values)
                          handleChange(event)                          
                        }}
                        onBlur={(event) => {
                          clearCEP(event, values)
                          handleBlur(event)
                        }}>
                        <option value="">--Estado (UF)--</option>
                        {estadosRemetente.map((est, i) => (
                          <option key={i} value={est.sigla}>
                            {est.nome} ({est.sigla})
                          </option>
                        ))}
                      </Input>
                      {errors.estadoRemetente && touched.estadoRemetente &&
                        <ErrorFeedback>
                          {errors.estadoRemetente}
                        </ErrorFeedback>}
                    </Field>
                    <Field>
                      <Input placeholder="Cidade"
                        type="select"
                        name="cidadeRemetente"
                        id="cidadeRemetente"
                        onBlur={(event) => {
                          clearCEP(event, values)
                          handleBlur(event)
                        }}
                        onChange={(event) => {                          
                          clearCEP(event, values)
                          handleChange(event)
                        }}
                        disabled={cidadesRemetente.length === 0}>
                        <option value="">--Cidade--</option>
                        {cidadesRemetente.map((cid) => (
                          <option key={cid} value={cid}>
                            {cid}
                          </option>
                        ))}
                      </Input>
                      {errors.cidadeRemetente && touched.cidadeRemetente &&
                        <ErrorFeedback>
                          {errors.cidadeRemetente}
                        </ErrorFeedback>}
                    </Field>
                    <Field>
                      <Input type="tel"
                        placeholder="CEP"
                        mask="99999-999"
                        maskChar=""
                        tag={InputMask}
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
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSet>
                  --Destinatário--
                  <FieldGroup>
                    <Field>
                      <Input placeholder="Estado (UF)"
                        type="select"
                        name="estadoDestinatario"
                        id="estadoDestinatario"
                        onChange={(event) => {
                          setFieldValue('cidadeDestinatario', '')
                          handleChangeEstado(event, values) 
                          handleChange(event)                                                                  
                        }}
                        onBlur={(event) => {
                          clearCEP(event, values)
                          handleBlur(event)
                        }}>
                        <option value="">--Estado (UF)--</option>
                        {estadosDestinatario.map((est, i) => (
                          <option key={i} value={est.sigla}>
                            {est.nome} ({est.sigla})
                          </option>
                        ))}
                      </Input>
                      {errors.estadoDestinatario && touched.estadoDestinatario && <ErrorFeedback>
                        {errors.estadoDestinatario}
                      </ErrorFeedback>}
                    </Field>
                    <Field>
                      <Input placeholder="Cidade"
                        type="select"
                        name="cidadeDestinatario"
                        id="cidadeDestinatario"
                        onBlur={(event) => {
                          clearCEP(event, values)
                          handleBlur(event)
                        }}
                        onChange={(event) => {
                          clearCEP(event, values)
                          handleChange(event)
                        }}
                        disabled={cidadesDestinatario.length === 0}>
                        <option value="">--Cidade--</option>
                        {cidadesDestinatario.map((cid) => (
                          <option key={cid} value={cid}>
                            {cid}
                          </option>
                        ))}
                      </Input>
                      {errors.cidadeDestinatario && touched.cidadeDestinatario && <ErrorFeedback>
                        {errors.cidadeDestinatario}
                      </ErrorFeedback>}
                    </Field>
                    <Field>
                      <Input type="tel"
                        placeholder="CEP"
                        mask="99999-999"
                        maskChar=""
                        tag={InputMask}                        
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
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSet>
                  --Informações da encomenda--
                  <FieldGroup>
                    <Field>
                      <Input type="number"
                        placeholder="Peso (kg)"
                        min="0"
                        onKeyDown={blockInvalidChar}
                        id="peso"
                        name="peso"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        invalid={errors.peso && touched.peso} />
                      {errors.peso && touched.peso &&
                        <ErrorFeedback>
                          {errors.peso}
                        </ErrorFeedback>}
                    </Field>
                    <Field>
                      <Input type="select"
                        placeholder="Formato"
                        id="formato"
                        name="formato"
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
                    </Field>
                    <Field>
                      <Input type="number"
                        placeholder="Comprimento (cm)"
                        min="0"
                        onKeyDown={blockInvalidChar}
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
                    </Field>
                  </FieldGroup>
                  <FieldGroup>
                    <Field>
                      <Input type="number"
                        placeholder="Altura (cm)"
                        min="0"
                        onKeyDown={blockInvalidChar}
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
                    </Field>
                    <Field>
                      <Input type="number"
                        placeholder="Largura (cm)"
                        min="0"
                        id="largura"
                        name="largura"
                        onKeyDown={blockInvalidChar}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.largura}
                        invalid={errors.largura && touched.largura} />
                      {errors.largura && touched.largura &&
                        <ErrorFeedback>
                          {errors.largura}
                        </ErrorFeedback>}
                    </Field>
                    <Field>
                      <Input type="number"
                        placeholder="Diâmetro (cm)"
                        min="0"
                        id="diametro"
                        name="diametro"
                        onKeyDown={blockInvalidChar}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.diametro}
                        invalid={errors.diametro && touched.diametro} />
                      {errors.diametro && touched.diametro &&
                        <ErrorFeedback>
                          {errors.diametro}
                        </ErrorFeedback>}
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <hr />
                <FieldGroup>
                  <div className="ctnServicos">
                    <Input type="select"
                      min="0"
                      name="servico"
                      id="servico"
                      onChange={handleChange}
                      onBlur={handleBlur}                  >
                      <option value="">--Tipo de serviço--</option>
                      {servicos.map((svc, i) => (
                        <option key={i} value={svc.codigo}>
                          {svc.descricao}
                        </option>
                      ))}
                    </Input>
                    {errors.servico && touched.servico &&
                      <ErrorFeedback>{errors.servico}</ErrorFeedback>}
                  </div>
                </FieldGroup>
                <ButtonContainer>
                  <CalculateButton type="submit" disabled={!isValid}>
                    Calcular
                  </CalculateButton>
                </ButtonContainer>
                {result && <Result data={values}/>}
              </FormElement>
            </Container>
          )
        }}
      </Formik>
  )
}

export default FreightCalculator