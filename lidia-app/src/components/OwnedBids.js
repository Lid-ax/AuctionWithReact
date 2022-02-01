import React, { useEffect, useState, useRef } from "react";
import { Table, Header, HeaderRow, HeaderCell, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import Button from 'react-bootstrap/Button';
import "C:/xampp/htdocs/react-1/lidia-app/src/components/new-auction-sytle.css";
import { getBidList, getTopBidder, getStatus } from "../utils/helper";
import PaginationButton from "./PaginationButton";


const OwnedBids = () =>{

    //const [userId, setUserId] = useState('');
    const [products, setProducts] = useState([]);
    const [endedAuction, setEndedAuction] = useState();
    const bidList = useRef();
    let userId = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        bidList.current = getBidList();
        setProducts(JSON.parse(localStorage.getItem('auctionList')).filter(item => item.userId === userId) ?? []);
    }, []);

    useEffect(() => {
        pickWinner(endedAuction?.auctionId);
    }, [endedAuction]);

    const data = { nodes : products }

    const onPaginationChange = (action, state) => { }
    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 4,
        },
        onChange: onPaginationChange,
    });

    const sort = useSort(data, null, {
        sortFns: {
            DATE: (array) =>
                array.sort((a, b) => a.date - b.date)
        }
    });

    const endAuction = (id) => {
        const allAuctionList = localStorage.getItem('auctionList');
        const newAuctionList = allAuctionList.map(element => {
            const newStatus = element.auctionId === id ? "Closed" : element.status;
            return {
                ...element,
                status: newStatus,
            };
        });

        localStorage.setItem('auctionList', JSON.stringify(newAuctionList));
        const userAuctionList = newAuctionList.filter(item => item.userId === userId);
        setProducts(userAuctionList);
        const auction = newAuctionList.find(element => element.auctionId === id);
        setEndedAuction(auction);
    }

    const pickWinner = (id) => {
        if (id == undefined) return;
        //let auctionArr = JSON.parse(localStorage.getItem('auctionList'));
        let bidderId;
        let amount;

        products.forEach(element => {
            if(element.auctionId === id)
                bidderId = getTopBidder(element, bidList.current).bidderId;
                amount = getTopBidder(element, bidList.current).amount;
        });

        let userArr = JSON.parse(localStorage.getItem('userList'));
        

        userArr.forEach(element => {

            if(bidderId !== userId && bidderId ===element.id){
                element.credits = +element.credits - +amount;

                userArr.forEach(element => {
                    if(element.id === userId){
                        element.credits = +element.credits + +amount;
                    }
                })
            } 
        });
        localStorage.setItem('userList', JSON.stringify(userArr));

    }

    return (
        <div id="table-current-act-style">
            <h1 id="heading-table-act">Owned Auctions</h1>
            <Table className="table-hover" data={data} sort={sort} pagination={pagination}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>Product</HeaderCell>
                                <HeaderCell>Top Bidder</HeaderCell>
                                <HeaderCell>Bid</HeaderCell>
                                <HeaderCellSort sortKey="DATE">End Date</HeaderCellSort>
                                <HeaderCell>End bid</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.map(item => (
                                <Row key={item.auctionId} item={item}>
                                    <Cell>{item.pdt} </Cell>
                                    <Cell>{getTopBidder(item, bidList.current).bidderName}</Cell>
                                    <Cell>{getTopBidder(item, bidList.current).amount} $</Cell>
                                    <Cell>{getStatus(item.date)}</Cell>
                                    {/* Shto butonin per end Bid qe ndryshon statusin e auction open => closed */}
                                    <Cell>
                                        {
                                        item.status === "Open" ? <Button onClick={() => endAuction(item.auctionId)}>End Auction</Button>
                                        :
                                        <Button disabled >Auction Ended</Button>
                                        
                                        }
                                        
                                    </Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>
            <PaginationButton pagination={pagination} data={data}></PaginationButton>
            
        </div>
    );
}
export default OwnedBids;