import { Col, Container, Row } from "react-bootstrap";
import "./slidercard.css";

const SlideCard = ({ title, desc, cover }) => {
  return (
    <Container className='box' >
      <Row>
        <Col md={6}>
          <h1>{title}</h1>
          <p>Welcome to Multimart – Your One-Stop Shop! <br />
            Discover unbeatable deals on electronics, fashion, home essentials, and more.
            Shop smart, live better – only at Unimart.</p>
          <button className='btn-primary'>Visit Collections</button>
        </Col>
        <Col md={6}>
          <img src={cover} alt="#" />
        </Col>
      </Row>

    </Container>
  )
}

export default SlideCard
