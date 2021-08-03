import React, { PureComponent } from 'react'
import { Skeleton } from 'antd'

export default class ProductSkeletonUI extends PureComponent {
    render() {
        return (
            <div className='skeleton-matrix' >
                <Skeleton.Input style={{ height: 200, width: 200, borderRadius: 12 }} active={true} />
                <div className="mt-3"></div>
                <Skeleton paragraph={{ rows: 3 }} active={true} />
            </div >
        )
    }
}
