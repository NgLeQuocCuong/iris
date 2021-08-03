import React, { Fragment, PureComponent } from 'react'
import { Link } from 'react-router-dom'
import ProductListType from './constants/enums/ProductListType'
import { routeConstants } from './constants/RouteConstant'
import ProductItem from './ProductItem'
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons'
import ProductSkeletonUI from './Skeleton/ProductSkeleton'
import { Row, Col } from 'antd'
import Pagination from './Pagination'

export default class ProductGrid extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef()
        this.state = {
            index: 0,
            childRefs: [],
        }
    }
    prepareRefs = () => {

    }
    hScroll = (offset) => {
        this.ref.current.scroll({
            top: 0,
            left: this.ref.current.scrollLeft + offset * (this.ref.current.offsetWidth - 250),
            behavior: 'smooth',
        })
    }
    renderGridProduct = (data, loading, pagination) =>
        <Fragment>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                {loading ?
                    [1, 2, 3, 4].map(item => <Col span={6}><ProductSkeletonUI key={item} /></Col>) :
                    data.map(item =>
                        <Col span={6}>
                            <Link to={item.uid ? (routeConstants.SHORT_BOOK_DETAIL + '/' + item.uid) : ''} key={item.uid}>
                                < ProductItem
                                    image={item.image}
                                    name={item.name}
                                    uid={item.uid}
                                    rate_average={item.rating}
                                    rate_count={item.rating_count}
                                    price={item.price}
                                    discount={item.discount}
                                />
                            </Link>
                        </Col>
                    )
                }
            </Row>
            {
                !loading && pagination?.hasPagination &&
                <Pagination {...pagination} />
                // <Pagination
                //     showSizeChanger={false}
                //     total={pagination.totalRows}
                //     showTotal={(total, range) => {
                //         return `${range[0]}-${range[1]} của ${total}`
                //     }}
                //     defaultPageSize={pagination.pageSize}
                //     current={pagination.pageNo}
                //     onChange={pagination.handlePagination}
                //     className="iris-pagination"
                // />
            }
        </Fragment>
    renderListProduct = (data, loading) => <div className={`product`}>
        <LeftOutlined className='scroll-btn' onClick={() => this.hScroll(-1)} />
        <div className='product-overflow hide-scrollbar' ref={this.ref}>
            {
                loading ?
                    [1, 2, 3, 4].map(item =>
                        <div className='list-item-wrapper'>
                            <ProductSkeletonUI key={item} />
                        </div>
                    ) :
                    data.map(item =>
                        <div className='list-item-wrapper'>
                            <Link to={item.uid ? (routeConstants.SHORT_BOOK_DETAIL + '/' + item.uid) : ''} key={item.uid}>
                                < ProductItem
                                    image={item.image}
                                    name={item.name}
                                    uid={item.uid}
                                    rate_average={item.rating}
                                    rate_count={item.rating_count}
                                    price={item.price}
                                    discount={item.discount}
                                />
                            </Link>
                        </div>
                    )}
        </div>
        <RightOutlined className='scroll-btn right' onClick={() => this.hScroll(1)} />
    </div>
    render() {
        const type = this.props.type ?? ProductListType.GRID;
        const hasData = this.props.datas?.length;
        const { loading, pagination } = this.props;
        return (
            <div className={`common-content-wrapper product-grid-wrapper`} >
                <div className='title'>{this.props.title}</div>
                {
                    loading || hasData ?
                        <Fragment>
                            {
                                type === ProductListType.GRID && this.renderGridProduct(this.props.datas, loading, pagination)
                            }
                            {
                                type === ProductListType.OVERFLOW && this.renderListProduct(this.props.datas, loading)
                            }
                        </Fragment> :
                        <div>Không có sản phẩm nào</div>
                }
            </div >
        )
    }
}
