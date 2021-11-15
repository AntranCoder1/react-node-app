import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
    return (
        <Row className="mt-5" style={{ marginRight: 0 }}>
            <Col className="text-center">
                <Button variant="primary" href="https://github.com/AntranCoder1/full-stack" size="lg">
                    Visit my github 
                </Button>
            </Col>
        </Row>
    )
}

export default About
