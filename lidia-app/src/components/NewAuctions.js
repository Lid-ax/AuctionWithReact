import React, { useState } from "react";
import { uuid } from 'uuidv4';
import Button from 'react-bootstrap/Button';
import { Col, Row, Form, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import "C:/xampp/htdocs/react-1/lidia-app/src/components/new-auction-sytle.css";

const NewAuctions = () => {

    const [pdt, setPdt] = useState('');
    const [bid, setBid] = useState('');
    const [dcp, setDcp] = useState('');
    const [date, setDate] = useState('');
    const [image,setImage] = useState('');
    

    const history = useHistory();

    const handleNewAct = () => {
        const act = getActFromState();
        const actString = localStorage.getItem('auctionList');
        const newAct = actString == null ? [] : JSON.parse(actString);
        newAct.push(act);
        try {
            localStorage.setItem('auctionList', JSON.stringify(newAct));
            history.push('/');
        }
        catch (e){
            alert ('Local Storage is full');
        }
       
    }
   
    const changeImage = (event) => {
        console.log(event)
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (e) => {
                setImage(reader.result);
            }
        }
    }

    const getActFromState = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return {
            auctionId: uuid(),
            pdt: pdt,
            minimumBid: bid,
            dcp: dcp,
            date: date,
            userId: user.id,
            name: user.firstName + ' ' + user.lastName,
            status:"Open",
            image:image
        }
    }

    // const clearNewAct = () => {
    //     setPdt('');
    //     setBid('');
    //     setDcp('');
    //     setDate('');
    // }

    return (
        <>
            <div className="act-header">
                <h5>New Auction</h5>
            </div>
            <Form className="new-auction-form">
                <Container className="container-center-style">
                    <Row className="row-center-style">
                        <Col xs={6}>
                            <Form.Group className="mb-3" as={Col} controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Product Name" required
                                    value={pdt}
                                    onChange={e => setPdt(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="row-center-style">
                        <Col xs={6}>
                            <Form.Group className="mb-3" as={Col} controlId="starting bid" >
                                <Form.Label>Starting Bid</Form.Label>
                                <Form.Control type="number" placeholder="Starting Bid" required
                                    value={bid}
                                    onChange={e => setBid(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="row-center-style">
                        <Col xs={6}>
                            <Form.Group className="mb-3" as={Col} controlId="end date">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" placeholder="End Date" required
                                    value={date}
                                    onChange={e => setDate(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="row-center-style">
                        <Col xs={6}>
                            <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" maxLength={50} style={{ height: '100px', resize: 'none' }}
                                    value={dcp}
                                    onChange={e => setDcp(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="row-center-style">
                        <Col xs={6}>
                            <Form.Group className="mb-3" as={Col} controlId="formFile43f3S">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control type="file" id="file-selector" accept=".jpg, .jpeg, .png"
                                  onChange={e => changeImage(e)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="row-center-style">
                        <Col xs={6}><img  className="new-auction-photo"src={image} alt="photo"></img></Col>
                    </Row>
                    <Row className="row-center-style">
                        <Col xs={6} className="btn-style" >
                            <Button style={{backgroundColor: '#f66f59', color:'#262626', fontWeight:'500', borderColor:'#f66f59'}} variant="primary" type="button" onClick={handleNewAct}>
                                Create Auction
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
    );
}

export default NewAuctions;