import moment from "moment";

export const getBidList = () => {
    const bidListAsString = localStorage.getItem('bidList');
    if (bidListAsString == null) return [];
    return JSON.parse(bidListAsString);
}

export const getTopBidder = (auction, bidList) => {
    const filteredBidList = bidList.filter(bid => bid.auctionId === auction.auctionId);
    
    if (filteredBidList.length === 0) return {
        bidderName: 'No bids yet',
        amount: auction.minimumBid
    };
    let maxBid = filteredBidList[0];
   
    filteredBidList.forEach(bid => {
        if (+bid.amount > +maxBid.amount){ 
            maxBid = bid
        };
    });
    return {
        bidderName: maxBid.bidderName,
        amount: maxBid.amount,
        bidderId: maxBid.bidderId
    };
}

export const getStatus = date => {
    const endDate = moment(date);
    if (moment().isAfter(endDate)) return 'SOLD';
    return endDate.format("L");
}
