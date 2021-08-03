import React from 'react';

const TableSkeleton = () => {
    return (
        <div className="table-skeleton">
            <div className="container-skeleton-header">
                <div className="header-skeleton-circle">
                    <span className="skeleton-box skeleton-header" />
                    <span className="skeleton-box skeleton-circle" />
                </div>
                <div className="header-skeleton-circle">
                    <span className="skeleton-box skeleton-header" />
                    <span className="skeleton-box skeleton-circle" />
                </div>
                <div className="header-skeleton-circle">
                    <span className="skeleton-box skeleton-header" />
                    <span className="skeleton-box skeleton-circle" />
                </div>
                <div className="header-skeleton-circle">
                    <span className="skeleton-box skeleton-header" />
                    <span className="skeleton-box skeleton-circle" />
                </div>
                <span className="skeleton-box skeleton-header" />
            </div>
            <div>
                <span className="skeleton-box skeleton-row-first" />
                <span className="skeleton-box skeleton-row" />
                <span className="skeleton-box skeleton-row" />
                <span className="skeleton-box skeleton-row" />
            </div>
        </div>
    )
}

export default TableSkeleton;