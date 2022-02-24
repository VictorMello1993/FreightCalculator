import Banner from './banner/banner';
import {Container} from 'reactstrap';
import FreightCalculator from '../components/freightCalculator'

const MainContent = () => {
  return (
    <Container>
      <Banner />
      <FreightCalculator/>
    </Container>
  )
}

export default MainContent