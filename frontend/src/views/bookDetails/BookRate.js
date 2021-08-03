import React, { Fragment, memo, PureComponent } from 'react'
import { ProductServices } from '../../services/ProductServices';
import CollapableWrapper from '../../utils/CollapableWrapper';
import { commonFunction } from '../../utils/constants/commonFunction';
import RateBar from '../../utils/RateBar';
import IconAndTextButton from '../../utils/IconAndTextButton';
import withUserProfile from '../../HOC/UserProfileHOC';
import RateField from './RateField';
import IrisPagination from '../../utils/Pagination';

export const RateItem = memo(props => {
    const { content, rating, name, updated_at, header } = props;
    return <div className='rate-wrapper'>
        <div className='rate-item'>
            <div className='header-row'>
                <RateBar rate={rating} />
                <div className='header'>{header}</div>
            </div>
            <div className='content-row'>{content}</div>
            <div className='user-row'>Được nhận xét bởi <span className='name'>{name}</span> vào {commonFunction.convertTimestamp(updated_at)}</div>
        </div>
    </div>
})
class BookRate extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            rated: false,
            page: 1,
            pageSize: 5,
            totalRates: 0,
        }
    }

    componentDidMount() {
        this.getRates()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.uid !== prevProps.uid) {
            this.getRates(1)
        }
    }


    getRates = async (page, pageSize) => {
        const params = {
            uid: this.props.uid,
            page: page ?? this.state.page,
            page_size: pageSize ?? this.state.pageSize,
        }
        let [success, body] = await ProductServices.getRate(commonFunction.prepareParam(params))
        if (success) {
            this.setState({
                datas: body?.data?.content || [],
                totalRates: body?.data?.totalRows,
                page: body?.data?.currentPage,
                pageSize: body?.data?.pageSize,
            })
        }
    }

    handlePagination = (pageNo, pageSize) => {
        this.getRates(pageNo, pageSize)
    }

    render() {
        const { datas, totalRates, pageSize, page } = this.state;
        const { userProfile } = this.props;
        return (
            datas?.length || userProfile?.uid ?
                <div className='common-content-wrapper'>
                    {
                        userProfile?.uid ?
                            <Fragment>
                                <div className='title'>ĐÁNH GIÁ CỦA BẠN</div>
                                <RateField
                                    bookId={this.props.uid}
                                    userProfile={userProfile}
                                    updateCallback={this.getRates}
                                />
                            </Fragment>
                            : null
                    }
                    {
                        datas?.length && userProfile?.uid ? <div className='margin'></div> : null
                    }
                    {
                        datas?.length ?
                            <Fragment>
                                <div className='title'>ĐÁNH GIÁ CỦA NGƯỜI DÙNG KHÁC</div>
                                <div className='reviews'>
                                    {datas.map(data =>
                                        <RateItem {...data} key={data.uid} />
                                    )}
                                </div>
                                {
                                    totalRates > pageSize ?
                                        <IrisPagination
                                            totalRows={totalRates}
                                            pageSize={pageSize}
                                            pageNo={page}
                                            handlePagination={this.handlePagination}
                                        /> :
                                        null
                                }
                            </Fragment> :
                            null
                    }
                </div> : null
        )
    }
}

export default withUserProfile(BookRate);