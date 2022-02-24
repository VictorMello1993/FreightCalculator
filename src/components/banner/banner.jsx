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
  color: #335185;
`
const Title = styled.div`
  font-weight: 800;  
  font-size: 40px;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 55px;    
`

const ImageBanner = styled.img `
 height: 330px;  
`

export default Banner;