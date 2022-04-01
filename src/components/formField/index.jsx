import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

export const FormField = ({ label, error, ...inputProps }) => {
  return (
    <FormGroup>
      <Label for="exampleEmail" className="mb-1">
        {label}
      </Label>
      <Input invalid={error} {...inputProps} />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  )
}