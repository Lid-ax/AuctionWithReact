import React from "react";

const PaginationButton = (props) =>{

    return (
    <div
    style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '13px',paddingTop:'10px', alignItems:'flex-end' }}
    >
    <span> Total Pages: {props.pagination.state.getTotalPages(props.data.nodes)}</span>
    
    <span>
        Page:{' '}
        {props.pagination.state.getPages(props.data.nodes).map((_, index) => (
            <button
                key={index}
                type="button"
                style={{
                    backgroundColor: props.pagination.state.page === index ? 'white' : "#f66f59",
                    borderRadius: "6px",
                }}
                onClick={() => props.pagination.fns.onSetPage(index)}
            >
                {index + 1}
            </button>
        ))}
    </span>
    </div>)
}
export default PaginationButton;
