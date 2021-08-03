import { Tooltip, Modal, Button } from 'antd';
import React, { Fragment, PureComponent } from 'react'
import { ProfileServices } from '../../services/ProfileServices';
import Table from '../../utils/table/Table';
import { commonFunction } from '../../utils/constants/commonFunction';

export default class UserTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: this.columns,
            data: [],
            currentPage: 1,
            pageSize: 25,
            totalRows: 0,
            isLoadingTable: true,
            userUid: null,
            userName: '',
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

    openUserModal = (uid, name) => {
        console.log(uid)
        this.setState({
            userUid: uid,
            userName: name,
        })
    }

    closeModal = () => {
        this.setState({
            userUid: null,
        })
    }

    formatUser = (cell, row) => {
        return (
            <div className='user-container' onClick={() => this.openUserModal(row.uid, row.name)}>
                {cell}
            </div>
        )
    }

    columns = [
        {
            header: 'Tên người dùng',
            name: 'name',
            cell: 'name',
            headerClasses: 'table-header',
            cellClasses: 'table-cell',
            formatter: this.formatUser,
        },
        {
            header: 'Email',
            name: 'email',
            cell: 'email',
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
        const params = {
            page: pageNo ?? this.state.currentPage,
            page_size: pageSize ?? this.state.pageSize,
        }
        let [success, body] = await ProfileServices.getUserList(commonFunction.prepareParam(params));
        if (success && body.data) {
            this.setState({
                data: body.data?.content,
                totalRows: body.data?.totalRows,
                currentPage: body.data?.currentPage,
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
        this.prepareData(currentPage, pageSize);
    }

    footerBtns = [<Button onClick={this.closeModal}>Xác nhận</Button>]

    render() {
        return (
            this.props.display ?
                <Fragment>
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
                        apiPagination={this.handlePagination}
                    />
                    <Modal
                        visible={this.state.userUid !== null}
                        footer={this.footerBtns}
                        title={this.state.userName}
                        onCancel={this.closeModal}
                        className='user-view-modal'
                    >
                    </Modal>
                </Fragment> : null
        )
    }
}
