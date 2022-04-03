import styled from 'styled-components';
import { Button as ButtonBootstrap, Spinner } from 'reactstrap';

export const Button = ({ children, loading = false, ...otheProps } = {}) => {
  return (
    <ButtonStyled {...otheProps}>
        {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled(ButtonBootstrap)`
  border-radius: 20px;
  font-weight: 500;
  padding-left: 50px;
  padding-right: 50px;

  ${(props) =>
    props.size === "lg" && `font-size: 1.125rem;
  `}
  ${(props) =>
    (props.variant === "primary" || !props.variant) &&
    `
    background-color:  ${props.$transparent ? "transparent" : "#335185"} ;
    border-color: ${props.$transparent ? "transparent" : "#335185"};
    color: ${props.$transparent ? "#333" : "#fff"};
    &:hover {
      background-color: ${props.$transparent ? "transparent" : "#335185"};
      border-color: ${props.$transparent ? "transparent" : "#335185"};
      color: ${props.$transparent ? "#333" : "#fff"};
    }
    `}

    ${(props) =>
    props.variant === "outline" &&
    `
    color: #335185;
    border-color: #335185;
    &:hover {
      background-color: #2329BF;
      border-color: #2329BF;
    }
    `}
`