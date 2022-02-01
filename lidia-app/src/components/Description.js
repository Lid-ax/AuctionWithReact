import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Row, Col, Container } from 'react-bootstrap';
import { uuid } from "uuidv4";
import "./descpriton-style.css";
import { getBidList } from "../utils/helper";
import Modal from 'react-bootstrap/Modal';
import { useHistory } from "react-router";
import moment from 'moment';

const Description = (props) => {

    const { auction, topBid } = props.location.state;
    const [bid, setBid] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const userLogged = JSON.parse(localStorage.getItem('user'));
    let timeout;

    const [show, setShow] = useState(false);

    const calculateTimeLeft = () => {

        const endDate = moment(auction.date);
        const today = moment();
        if (endDate > today) {
            const formattedDays = moment(endDate.diff(today, 'seconds') * 1000).format('D');
            const formattedHours = moment(endDate.diff(today, 'seconds') * 1000).format('H');
            const formattedMinutes = moment(endDate.diff(today, 'seconds') * 1000).format('m');
            const formattedSeconds = moment(endDate.diff(today, 'seconds') * 1000).format('s');

            const formattedTime = moment(endDate.diff(today, 'seconds') * 1000).format('HH:mm:ss');
            return formattedDays + " Days " + formattedHours + " Hours " + formattedMinutes + " : " + formattedSeconds;
        } else {
            console.log("expired")
            clearTimeout(timeout)
            return "expired"
        }

    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        timeout = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory();

    const addBid = () => {
        if ((+bid) <= (topBid.amount)) {
            handleShow();
            return;
        }

        const bidList = getBidList(auction.auctionId);
        bidList.push({
            auctionId: auction.auctionId,
            bidderId: user.id,
            amount: bid,
            id: uuid(),
            bidderName: user.user
        })
        localStorage.setItem('bidList', JSON.stringify(bidList));
        history.push({ pathname: '/' });
    }

    return (
        <div className="container-dcp mt-5 main-container-dcp">
            <Container>
                <Row>
                    <Col xs={6} className="photo-col" ><img className="auction-photo" src={auction.image} alt="photo-dcp" /></Col>
                    <Col xs={6} className="col-2-dcp">
                        <Col className="col-dcp-data" xs={6}><h3 style={{ fontWeight: "bold" }}> {auction.pdt} </h3></Col>
                        <Col className="col-dcp-data timeLeft" xs={6}>{timeLeft}</Col>
                        <Col className="col-dcp-data" xs={6}> Creator: {auction.name} </Col>
                        <Col className="col-dcp-data" xs={6}>End Date: {auction.date}</Col>
                        <Col className="col-dcp-data" xs={6}> Description : {auction.dcp}</Col>
                        <Col className="col-dcp-data" xs={6}>Current highest bid : {topBid.amount} $</Col>
                        <Col className="col-dcp-data" xs={6}>Top Bidder: {topBid.bidderName} </Col>
                        {userLogged.id !== auction.userId &&
                            <>
                                <Col className="col-dcp-data" id="input-bid-value">
                                    <input
                                        id="input-dcp"
                                        type='number'
                                        min="0"
                                        name='bid'
                                        placeholder='Your bid goes here ...'
                                        value={bid}
                                        onChange={e => setBid(e.target.value)}
                                    />
                                <Button id="btn-dcp-bid" variant="warning" onClick={addBid}>
                                    Bid
                                </Button>
                                </Col>
                               
                            </>
                        }
                        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog modal-content" >
                            <Modal.Header closeButton dialogClassName="modal-header">
                                <Modal.Title>Error message</Modal.Title>
                            </Modal.Header>
                            <Modal.Body dialogClassName="modal-body">Input is less than minimum bid!</Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Description;