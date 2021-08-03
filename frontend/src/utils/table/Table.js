import React, { Fragment, PureComponent } from 'react';
import RowTable from './RowTable';
import Pagination from '../Pagination';
import TableSkeleton from './TableSkeleton';
import PaginationSkeleton from './PaginationSkeleton';

class Table extends PureComponent {
    render() {
        const { data, className, rowKey, columns, isLoading, pagination } = this.props;
        if (!isLoading) {
            return (
                <div>
                    <div className={'table-container ' + (className ? className : '')}>
                        <table className='df-table-container fade-in'>
                            <thead>
                                <tr className="row-table">
                                    {columns.map((col, index) => <th key={col.name + index} className={col.headerClasses ? col.headerClasses : ''}>{col.header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data &&
                                    data.length !== 0 &&
                                    data.map((row, index) => {
                                        return (
                                            <RowTable
                                                key={row[rowKey]}
                                                rowKey={row[rowKey]}
                                                rowIndex={index}
                                                columns={columns}
                                                row={row}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                            {/* {
                                (!data || data.length === 0) &&
                                <tbody>
                                    <tr>
                                        <td className="super-table-row super-row-no-data last-row" colSpan={columns ? columns.length : null}><div>{'Không có dữ liệu'}</div></td>
                                    </tr>
                                </tbody>
                            } */}
                        </table>
                    </div>
                    {
                        pagination &&
                        <Pagination {...pagination} />
                        // <Pagination
                        //     currentPage={this.props.pagination.currentPage}
                        //     pageSize={this.props.pagination.pageSize}
                        //     totalRows={this.props.pagination.totalRows}
                        //     apiPagination={this.props.apiPagination}
                        //     classNamePagination={this.props.classNamePagination}
                        //     leftLabel={this.props.pagination.leftLabel}
                        // />
                    }
                </div>
            )
        }
        else {
            return (
                <Fragment>
                    <TableSkeleton />
                    <PaginationSkeleton />
                </Fragment>
            )
        }
    }
}
export default Table;
