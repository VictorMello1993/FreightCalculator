import { Input } from 'reactstrap'
import { ErrorFeedback, Field } from '../../freightCalculator/styles'

export const FormField = ({error, touched, ...inputProps }) => {
  return (
    <Field>
      <Input {...inputProps} invalid={error && touched}/>
      {error && touched &&
        <ErrorFeedback>
          {error}
        </ErrorFeedback>}
    </Field>
  )
}