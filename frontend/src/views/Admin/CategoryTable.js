import { Tooltip } from 'antd';
import React, { Fragment, PureComponent } from 'react'
import TreeTable from '../../utils/table/TreeTable';

export default class CategoryTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: this.columns,
            data: [],
            currentPage: 1,
            pageSize: 25,
            totalRows: 0,
            isLoadingTable: true,
        }
    }

    actionBaches = (cell, row) => {
        return (
            <Fragment>
                <Tooltip title={'Chỉnh sửa'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="edit-btn" onClick={() => this.handleOpenUpdate(cell, row)}></div>
                </Tooltip>
                <Tooltip title={'Xoá'} placement="bottom" destroyTooltipOnHide={true}>
                    <div className="del-btn" onClick={(e) => this.handleDelBtn(cell, row)}></div>
                </Tooltip>
            </Fragment>
        )
    }

    columns = [
        {
            header: 'Thể loại',
            name: 'label',
            cell: 'label',
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
        // let data = {
        //     pageNo: pageNo ? pageNo : this.state.currentPage,
        //     pageSize: pageSize ? pageSize : this.state.pageSize,
        //     name: this.state.name,
        // }
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
                <TreeTable
                    rowKey='uid'
                    isLoading={this.state.isLoadingTable}
                    data={this.props.data}
                    className='df-table-container category-table'
                    classNamePagination='km-pagination'
                    columns={this.state.columns}
                // pagination={{
                //     currentPage: this.state.currentPage,
                //     pageSize: this.state.pageSize,
                //     totalRows: this.state.totalRows,
                //     leftLabel: 'Người dùng:',
                // }}
                // apiPagination={this.handlePagination}
                /> : null
        )
    }
}
