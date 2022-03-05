import {Container} from 'reactstrap';
import FreightCalculator from './../freightCalculator/index';
import Banner from './../banner/banner';


const MainContent = () => {
  return (
    <Container>
      <Banner />
      <FreightCalculator/>
    </Container>
  )
}

export default MainContent