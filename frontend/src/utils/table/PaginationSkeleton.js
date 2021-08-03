import React from 'react';

const PaginationSkeleton = () => {
    return (
        <div className="pagination-container">
            <div className="skeleton-box item-pagination-container" />
            <div className="container-pre-next-item">
                <div className="skeleton-box pre-item" />
                <div className="skeleton-box center-item" />
                <div className="skeleton-box next-item" />
            </div>
            <div className="skeleton-box item-pagination-container" />
        </div>
    )
}

export default PaginationSkeleton;