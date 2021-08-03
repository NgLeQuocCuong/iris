import React, { PureComponent } from 'react'
import { Pagination } from 'antd'

export default class IrisPagination extends PureComponent {
    render() {
        const { totalRows, pageSize, pageNo, handlePagination } = this.props;
        return (
            <Pagination
                showSizeChanger={false}
                total={totalRows}
                showTotal={(total, range) => {
                    return `${range[0]}-${range[1]} của ${total}`
                }}
                defaultPageSize={pageSize}
                current={pageNo}
                onChange={handlePagination}
                className="iris-pagination"
            />
        )
    }
}
