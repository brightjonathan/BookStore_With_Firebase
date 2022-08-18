import React from 'react'
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddBook from '../Component/AddBook';

const Create = ({ id, setBookId, isAuth }) => {
  return (
    <Container style={{ width: "400px", marginTop: '30px'}} >
        <Row>
            <Col> <AddBook id={id} setBookId={setBookId} isAuth={isAuth} /> </Col>
        </Row>
    </Container>
  )
}

export default Create
