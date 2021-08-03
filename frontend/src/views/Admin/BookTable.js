import { Tooltip } from 'antd';
import React, { PureComponent } from 'react'
import { ProductServices } from '../../services/ProductServices';
import Table from '../../utils/table/Table';

export default class BookTable extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                header: 'Tên sách',
                name: 'name',
                cell: 'name',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
            },
            {
                header: 'Tác giả',
                name: 'authors',
                cell: 'authors',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
                formatter: this.formatAuthor,
            },
            {
                header: 'Số trang',
                name: 'number_pages',
                cell: 'number_pages',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
            },
            {
                header: 'Nhà xuất bản',
                name: 'publisher',
                cell: 'publisher',
                headerClasses: 'table-header',
                cellClasses: 'table-cell',
            },
            {
                header: 'Hành động',
                name: 'actions',
                cell: 'actions',
                headerClasses: 'table-header align-right',
                cellClasses: 'table-cell actions align-right',
                formatter: this.actionBaches,
            }
        ]
        this.state = {
            columns: [],
            data: [],
            currentPage: 1,
            pageSize: 24,
            totalRows: 0,
            isLoadingTable: true,
        }
    }

    prepareData = async (pageNo, pageSize) => {
        await this.setState({
            isLoadingTable: true,
        })
        const page = pageNo ?? this.state.currentPage;
        let [success, body] = await ProductServices.getCommonProducts(`?page=${page}`)
        if (success && body.data) {
            this.setState({
                data: body.data.results,
                totalRows: body.data.count,
                currentPage: page,
            })
        }
        await this.setState({
            isLoadingTable: false,
        })
    }

    componentDidMount() {
        this.prepareData();
    }

    actionBaches = (cell, row) => {
        return (
            <div>
                <Tooltip title={'Chỉnh sửa'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="edit-btn" onClick={() => { }}></div>
                </Tooltip>
                <Tooltip title={'Xoá'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="del-btn" onClick={(e) => { }}></div>
                </Tooltip>
            </div>
        )
    }

    formatAuthor = cell => {
        return cell?.length ? cell.map(item => item.name).join(', ') : ''
    }

    handlePagination = (currentPage, pageSize) => {
        this.prepareData(currentPage, pageSize);
    }

    render() {
        return (
            this.props.display ?
                <Table
                    rowKey='uid'
                    isLoading={this.state.isLoadingTable}
                    data={this.state.data}
                    className='df-table-container'
                    classNamePagination='km-pagination'
                    columns={this.columns}
                    pagination={{
                        pageNo: this.state.currentPage,
                        pageSize: this.state.pageSize,
                        totalRows: this.state.totalRows,
                        handlePagination: this.handlePagination
                    }}
                />
                : null
        )
    }
}
