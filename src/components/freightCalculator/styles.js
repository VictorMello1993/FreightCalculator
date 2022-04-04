import styled from 'styled-components';
import { Form } from 'formik';
import { Button, InputGroup } from 'reactstrap';

export const FormElement = styled(Form)`
  padding: 20px;
  font-weight: 600;  
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CalculateButton = styled(Button)`
  background-color: #335185;
  width: 200px;

  &:hover{
    background-color: #87B2F2;
  }
`

export const Title = styled.div`
  font-size: 25px;  
  font-weight: 600;
  text-align: center;    
  color: #335185;    
  padding: 15px;
`

export const Container = styled.div`
  background-color: #fafafa;    
  border-radius: 4px 4px 0 0;
  box-shadow: 0 0 .2em #000;
`

export const FieldGroup = styled(InputGroup)`    
  gap: 20px;
  margin: 10px 0;
  padding: 10px 0;
  
  .ctnServicos{
    max-width: 30%;
  }
`

export const FieldSet = styled.fieldset`
  color: #335185;
  padding: 15px;  
`

export const ErrorFeedback = styled.div`
  padding: 5px;
  color: #dc3545;
  font-size: 12px;  
`

export const Field = styled.div`
  flex: 1;
`