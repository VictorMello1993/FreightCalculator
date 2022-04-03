import { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Formik } from "formik";
import schema from '../../config/schemaValidation.js'
import { calcularPrecoFrete, obterCidades, obterEstados, obterTiposServico } from '../../services/api/freight.service'
import { FieldSet, Title, Container, FormElement, FieldGroup, ButtonContainer, CalculateButton } from './styles';
import Result from '../resultFreight'
import { validate } from '../../services/validations/validateCEP';
import { FormField } from "../formField/freightCalculator/index.jsx";

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
    } else if (event.target.id === 'estadoDestinatario') {
      values.cidadesDestinatario = cidadesPorEstado ? values.cidadeDestinatario : ''
      setCidadeDestinatario(cidadesPorEstado ?? []);
    }

    clearCEP(event, values)
  }

  const blockInvalidChar = event => ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault();

  const submit = (values) => {
    (async () => {
      const args = {
        sCepOrigem: values.cepRemetente,
        sCepDestino: values.cepDestinatario,
        nVlPeso: values.peso,
        nCdFormato: values.formato,
        nVlComprimento: values.comprimento,
        nVlAltura: values.altura,
        nVlLargura: values.largura,
        nCdServico: [values.servico],
        nVlDiametro: values.diametro
      }

      const result = await calcularPrecoFrete(args)

      const { Valor, PrazoEntrega } = result.data[0]

      values.valorFrete = Valor
      values.diasUteis = PrazoEntrega

      setResult(result)
    })()
  }

  const clearCEP = ({ target }, values) => {
    if ((target.id === 'cidadeRemetente' || target.id === 'estadoRemetente') && !target.value) {
      values.cepRemetente = ''
    }

    if ((target.id === 'cidadeDestinatario' || target.id === 'estadoDestinatario') && !target.value) {
      values.cepDestinatario = ''
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validate={(values) => validate(values)}
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
              submit(values)
              handleSubmit(event)
            }}
              method="POST">
              <FieldSet>
                --Remetente--
                <FieldGroup>
                  <FormField
                    placeholder="Estado (UF)"
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
                    }}
                    error={errors.estadoRemetente}
                    touched={touched.estadoRemetente}>
                    <option value="">--Estado (UF)--</option>
                    {estadosRemetente.map((est, i) => (
                      <option key={i} value={est.sigla}>
                        {est.nome} ({est.sigla})
                      </option>
                    ))}
                  </FormField>
                  <FormField
                    placeholder="Cidade"
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
                  </FormField>
                  <FormField
                    type="tel"
                    placeholder="CEP"
                    mask="99999-999"
                    maskChar=""
                    tag={InputMask}
                    name="cepRemetente"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cepRemetente}
                    id="cepRemetente"
                    disabled={!values.estadoRemetente || !values.cidadeRemetente}
                    error={errors.cepRemetente}
                    touched={touched.cepRemetente} />
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                --Destinatário--
                <FieldGroup>
                  <FormField
                    placeholder="Estado (UF)"
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
                    }}
                    error={errors.estadoDestinatario}
                    touched={touched.estadoDestinatario}>
                    <option value="">--Estado (UF)--</option>
                    {estadosDestinatario.map((est, i) => (
                      <option key={i} value={est.sigla}>
                        {est.nome} ({est.sigla})
                      </option>
                    ))}
                  </FormField>

                  <FormField
                    placeholder="Cidade"
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
                  </FormField>
                  <FormField type="tel"
                    placeholder="CEP"
                    mask="99999-999"
                    maskChar=""
                    tag={InputMask}
                    name="cepDestinatario"
                    id="cepDestinatario"
                    onBlur={handleBlur}
                    value={values.cepDestinatario}
                    onChange={handleChange}
                    error={errors.cepDestinatario}
                    touched={touched.cepDestinatario}
                    disabled={!values.estadoDestinatario || !values.cidadeDestinatario} >
                  </FormField>
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                --Informações da encomenda--
                <FieldGroup>
                  <FormField type="number"
                    placeholder="Peso (kg)"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    id="peso"
                    name="peso"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.peso}
                    touched={touched.peso}>
                  </FormField>
                  <FormField type="select"
                    placeholder="Formato"
                    id="formato"
                    name="formato"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.formato}
                    touched={touched.formato}>
                    <option value="">--Formato--</option>
                    <option value="1">Caixa/Pacote</option>
                    <option value="2">Rolo/Prisma</option>
                    <option value="3">Envelope</option>
                  </FormField>
                  <FormField type="number"
                    placeholder="Comprimento (cm)"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    id="comprimento"
                    name="comprimento"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.comprimento}
                    touched={touched.comprimento}>
                  </FormField>
                </FieldGroup>
                <FieldGroup>
                  <FormField type="number"
                    placeholder="Altura (cm)"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    id="altura"
                    name="altura"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.altura}
                    touched={touched.altura}>
                  </FormField>
                  <FormField type="number"
                    placeholder="Largura (cm)"
                    min="0"
                    id="largura"
                    name="largura"
                    onKeyDown={blockInvalidChar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.largura}
                    touched={touched.largura}>
                  </FormField>
                  <FormField type="number"
                    placeholder="Diâmetro (cm)"
                    min="0"
                    id="diametro"
                    name="diametro"
                    onKeyDown={blockInvalidChar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.diametro}
                    touched={touched.diametro}>
                  </FormField>
                </FieldGroup>
              </FieldSet>
              <hr />
              <FieldGroup>
                <FormField className="ctnServicos" 
                  type="select"
                  min="0"
                  name="servico"
                  id="servico"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.servico}
                  touched={touched.servico}>
                  <option value="">--Tipo de serviço--</option>
                  {servicos.map((svc, i) => (
                    <option key={i} value={svc.codigo}>
                      {svc.descricao}
                    </option>
                  ))}
                </FormField>                
              </FieldGroup>
              <ButtonContainer>
                <CalculateButton type="submit" disabled={!isValid}>
                  Calcular
                </CalculateButton>
              </ButtonContainer>
              {result && <Result data={values} />}
            </FormElement>
          </Container>
        )
      }}
    </Formik >
  )
}

export default FreightCalculator