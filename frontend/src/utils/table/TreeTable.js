import React, { PureComponent, Fragment } from 'react'
import TableSkeleton from './TableSkeleton';


class RowTreeTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    toggleChildren = () => {
        const isOpen = !this.state.isOpen
        this.setState({
            isOpen: isOpen
        })
    }
    render() {
        const { row, rowKey, rowIndex, width, columns, tabWidth, className } = this.props;
        const { children } = row
        const { isOpen } = this.state
        console.log(columns)
        return (
            <Fragment>
                <tr className={`row-table ${className || ''}`} key={rowKey ? rowKey : rowIndex} >
                    {columns.map((col, index) =>
                        <td >
                            <div className={col.cellClasses ? col.cellClasses : ''} key={`${col.header}_${index}_${rowIndex}`}>
                                <div className='flexbox'>
                                    {index === 0 ? <div style={{ width: width ? `${width}px` : '' }} /> : null}
                                    {index === 0 ? <div className={`${children && children.length ? 'ic-dropdown' : ''} icon-16 ${isOpen ? 'transform-90' : ''}`} onClick={this.toggleChildren} /> : null}
                                    {(col.formatter !== void 0) ? (col.formatter(row[col.cell], row)) : (row[col.name])}
                                </div>
                            </div>
                        </td>
                    )}
                </tr>
                {
                    children &&
                    children.length !== 0 &&
                    children.map((row, index) => {
                        return (
                            < RowTreeTable
                                key={row[rowKey]}
                                rowKey={row[rowKey]}
                                rowIndex={index}
                                columns={columns}
                                row={row}
                                tabWidth={tabWidth || 24}
                                width={width + tabWidth}
                                className={isOpen ? '' : 'collap'}
                            />
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default class TreeTable extends PureComponent {
    render() {
        let { data, className, rowKey, columns, isLoading, tabWidth } = this.props;
        if (!isLoading) {
            return (
                <div>
                    <div className={'table-container ' + (className ? className : '')}>
                        <table className='df-table-container'>
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
                                            < RowTreeTable
                                                key={row[rowKey]}
                                                rowKey={row[rowKey]}
                                                rowIndex={index}
                                                columns={columns}
                                                row={row}
                                                tabWidth={tabWidth || 24}
                                                width={0}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                            {
                                (!data || data.length === 0) &&
                                <tbody>
                                    <tr>
                                        <td className="super-table-row super-row-no-data last-row" colSpan={columns ? columns.length : null}><div>{'Không có dữ liệu'}</div></td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            )
        }
        else {
            return (
                <TableSkeleton />
            )
        }
    }
}
