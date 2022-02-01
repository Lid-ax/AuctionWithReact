import React, { useEffect, useState, useRef} from "react";
import { Table, Header, HeaderRow, HeaderCell, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router";
import "C:/xampp/htdocs/react-1/lidia-app/src/components/new-auction-sytle.css";
import { getBidList, getTopBidder,getStatus} from "../utils/helper";
import PaginationButton from "./PaginationButton";
import {  useLocation } from "react-router-dom";

const Home = (props) => {

    const [products, setProducts] = useState([]);
    const bidList = useRef();
    const history = useHistory();
    const location = useLocation();
    const [userLog, setUserLog] = useState('');

    useEffect(() => {
        setUserLog(JSON.parse(localStorage.getItem('user')))
    }, [location]);

    useEffect(() => {
        let storedProducts = JSON.parse(localStorage.getItem('auctionList'));
        bidList.current = getBidList();
        setProducts(storedProducts ?? []);
    }, []);

    const deleteRow = id => {
        const newPropdts = products.filter(item => item.auctionId !== id);
        setProducts(newPropdts);
        localStorage.setItem('auctionList', JSON.stringify(newPropdts));
    }

    const bidAuction = id => {
        const auction = products.find(item => item.auctionId === id);
        const topBid = getTopBidder(auction, bidList.current);

        props.history.push({
            pathname: '/Description',
            state: {
                auction: auction,
                topBid: topBid,
            }
        });
    }
    const newAuction = () => { history.push({ pathname: '/NewAuctions' }); }

    const data = { nodes: products }; //nodes are the items in the list
    const sort = useSort(data, null, {
        sortFns: {
            DATE: (array) =>
                array.sort((a, b) => a.date - b.date)
        }
    });

    const onPaginationChange = (action,state) => {}

    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 4,
        },
        onChange: onPaginationChange,
    });

    return (
        <div id="table-current-act-style">
            <h1 id="heading-table-act">Current Auctions</h1>
            <Table className="table-hover" data={data} sort={sort} pagination={pagination}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>Product</HeaderCell>
                                <HeaderCell>Seller</HeaderCell>
                                <HeaderCell>Top Bid</HeaderCell>
                                <HeaderCellSort sortKey="DATE">End Date</HeaderCellSort>
                                <HeaderCell>Delete/Bid</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.map(item => (
                                <Row key={item.auctionId} item={item} onClick={() => bidAuction(item.auctionId)}>
                                    <Cell>{item.pdt} </Cell>
                                    <Cell>{item.name}</Cell>
                                    <Cell>{getTopBidder(item, bidList.current).amount} $</Cell>
                                    <Cell>{getStatus(item.date)}</Cell>
                                    <Cell>{
                                    (item.status === 'Closed') ?
                                    <Button disabled>
                                        Auction Ended
                                    </Button>
                                    :
                                    
                                    (item.userId === userLog.id) ?
                                        <Button variant="danger" onClick={() => deleteRow(item.auctionId)}>
                                            Delete
                                        </Button>
                                        :
                                        <Button className="btn-home-bid" variant="warning" onClick={() => bidAuction(item.auctionId)}>
                                            Bid
                                        </Button>
                                    }
                                    </Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>

            <PaginationButton pagination={pagination} data={data}></PaginationButton>

            <div  style={{ display: 'flex', justifyContent: 'space-between' ,width :"80rem", padding:"3.5rem", fontWeight:"bold"}}>
                 <Button variant="warning" style={{backgroundColor: '#f66f59'}} onClick={() => newAuction()}>New Auction</Button>
                 <span>Your current wallet: {+userLog.credits} $</span>
            </div>
        </div>
    );
}

export default Home;
