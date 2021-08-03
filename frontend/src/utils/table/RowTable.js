import React, { PureComponent } from 'react';

class RowTable extends PureComponent {
    render() {
        const { row, rowKey, rowIndex } = this.props;
        return (
            <tr className='row-table' key={rowKey ? rowKey : rowIndex}>
                {this.props.columns.map((col, index) =>
                    <td className={col.cellClasses ? col.cellClasses : ''} key={`${col.header}_${index}_${rowIndex}`}>
                        {(col.formatter !== void 0) ? (col.formatter(row[col.cell], row)) : (row[col.name])}
                    </td>
                )}
            </tr>
        )
    }
}

export default RowTable;