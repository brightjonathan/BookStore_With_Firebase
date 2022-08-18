import React from 'react'
import { Container, Navbar, Row, Col } from "react-bootstrap";
import BookList from '../Component/BookList';


const Home = ( { getBookId, isAuth } ) => {

  return (
    <Container style={{ marginTop: '30px' }} >
    <Row>
      <Col>
        <BookList getBookId={getBookId} isAuth={isAuth} />
      </Col>
    </Row>
  </Container>
  )
}

export default Home


