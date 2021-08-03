import { Tooltip } from 'antd';
import React, { PureComponent } from 'react'
import { AuthorServices } from '../../services/AuthorServices';
import Table from '../../utils/table/Table';

export default class AuthorTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: this.columns,
            data: [],
            currentPage: 1,
            pageSize: 24,
            totalRows: 0,
            isLoadingTable: true,
        }
    }

    actionBaches = (cell, row) => {
        return (
            <div>
                <Tooltip title={'Chỉnh sửa'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="edit-btn" onClick={() => this.handleOpenUpdate(cell, row)}></div>
                </Tooltip>
                <Tooltip title={'Xoá'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="del-btn" onClick={(e) => this.handleDelBtn(cell, row)}></div>
                </Tooltip>
            </div>
        )
    }

    columns = [
        {
            header: 'Tác giả',
            name: 'name',
            cell: 'name',
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

    prepareData = async (pageNo, pageSize) => {
        await this.setState({
            isLoadingTable: true,
        })
        const page = pageNo ?? this.state.currentPage;
        let [success, body] = await AuthorServices.getAuthors({
            page,
            page_size: 24,
        })
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



    handlePagination = (currentPage, pageSize) => {
        this.setState({
            currentPage: currentPage,
            pageSize: pageSize,
        });
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
                    columns={this.state.columns}
                    pagination={{
                        pageNo: this.state.currentPage,
                        pageSize: this.state.pageSize,
                        totalRows: this.state.totalRows,
                        handlePagination: this.handlePagination
                    }}
                /> : null
        )
    }
}
