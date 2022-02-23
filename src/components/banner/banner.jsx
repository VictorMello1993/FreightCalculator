import styled from 'styled-components';
import BannerImg from '../../assets/img/8309.png'

const Banner = () => {
  return (
    <BannerContainer>
      <Title>
        Está cansado de esperar a sua encomenda? Calcule aqui já!
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
  font-size: 45px;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 55px;    
`

const ImageBanner = styled.img `
 height: 390px; 
 flex: 1;
`

export default Banner;