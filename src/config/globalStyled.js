import {createGlobalStyle} from 'styled-components'

const GlobalStyled = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
  }
  body,
  html{
    height: 100vh;
    flex: 1;
    background-color: #fac12f;
    font-family: 'Open Sans', sans-serif;    
  }
`

export default GlobalStyled