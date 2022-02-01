import React, { useEffect, useState, useRef } from "react";
import { Table, Header, HeaderRow, HeaderCell, Body, Row, Cell } from '@table-library/react-table-library/table';
import { useSort, HeaderCellSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import "C:/xampp/htdocs/react-1/lidia-app/src/components/new-auction-sytle.css";
import { getBidList, getTopBidder, getStatus } from "../utils/helper";
import PaginationButton from "./PaginationButton";


const WinnedBids = () =>{
    //const [userId, setUserId] = useState('');
    const [products, setProducts] = useState([]);
    const bidList = useRef();

    useEffect(() => {

        bidList.current = getBidList();

        let userId = JSON.parse(localStorage.getItem('user')).id;

        setProducts(JSON.parse(localStorage.getItem('auctionList')).filter(item => getTopBidder(item, bidList.current).bidderId === userId) ?? []);

    }, []);

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

    // let status = JSON.parse(localStorage.getItem('auctionList')).status;

    return (
        <div id="table-current-act-style">
            <h1 id="heading-table-act">Winned Auctions</h1>
            <Table className="table-hover" data={data} sort={sort} pagination={pagination}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>Product</HeaderCell>
                                <HeaderCell>Top Bidder</HeaderCell>
                                <HeaderCell>Bid</HeaderCell>
                                <HeaderCellSort sortKey="DATE">End Date</HeaderCellSort>
                                <HeaderCell>Status</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.map(item => (
                                <Row key={item.auctionId} item={item}>
                                    <Cell>{item.pdt} </Cell>
                                    <Cell>{getTopBidder(item, bidList.current).bidderName}</Cell>
                                    <Cell>{getTopBidder(item, bidList.current).amount} $</Cell>
                                    <Cell>{getStatus(item.date)}</Cell>
                                   { item.status === 'Closed' ? <Cell>Won</Cell> : <Cell>Max bider</Cell> }
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
export default WinnedBids;