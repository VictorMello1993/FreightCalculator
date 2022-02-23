import styled from 'styled-components';
import BannerImg from '../../assets/img/8309.png'

const Banner = () => {
  return (
    <BannerContainer>
      <Title>
        <p>ESTÁ CANSADO DE NÃO SABER QUANDO CHEGA A SUA ENCOMENDA? CALCULE AQUI JÁ!</p>
      </Title>
      <ImageBanner src={BannerImg}/>
    </BannerContainer>
  )
}

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: #335185;
`
const Title = styled.p`
  font-weight: 800;
  flex: 1;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ImageBanner = styled.img `
 height: 350px; 
 flex: 1;
`

export default Banner;