import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import { ProductServices } from '../../services/ProductServices';
import BookDescription from './BookDescription';
import ImagesViewer from '../../utils/ImagesViewer';
import PageHeader from '../../utils/PageHeader';
import ProductGrid from '../../utils/ProductGrid';
import RateBar from '../../utils/RateBar';
import BookRate from './BookRate';
import PageFooter from '../../utils/PageFooter';
import { commonFunction } from '../../utils/constants/commonFunction';
import ProductListType from '../../utils/constants/enums/ProductListType';

const fields = [
    {
        tag: 'authors',
        text: 'Tác giả',
        formatter: data => data.map(item => item.name).join(', ')
    },
    {
        tag: 'number_pages',
        text: 'Số trang',
    },
    {
        tag: 'publisher',
        text: 'Nhà xuất bản',
    },
    {
        tag: 'issuing_company',
        text: 'Công ty phát hành',
    },
]
export default class bookDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: 'IRIS',
            categories: [],
            uid: 0,
            name: '',
            discount: '',
            rating: 0,
            rating_count: 0,
            price: 0,
            authors: [],
            number_pages: 0,
            publisher: '',
            issuing_company: '',
            image: [],
            relatedProducts: [],
            relatedLoading: true,
            description: ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookID !== this.props.match.params.bookID) {
            this.prepareData()
        }
    }

    componentDidMount() {
        this.prepareData()
    }
    prepareCategory = async () => {
        const [success, body] = await ProductServices.getCategories()
        if (success) {
            const categories = body?.data?.root?.children?.length ? body.data.root.children[0]['Sách Tiếng Việt'].children.map(item => commonFunction.reformatCategory(item)) : []
            this.setState({
                categories: categories
            })
        }
    }
    prepareRelated = async (uid) => {
        // this.setState({
        //     relatedLoading: true,
        // })
        // const [success, body] = await ProductServices.getRelatedProducts(uid)
        // if (success) {
        //     this.setState({
        //         relatedProducts: body.data?.results || [],
        //     })
        // }
        // this.setState({
        //     relatedLoading: false,
        // })
    }

    prepareDetail = async uid => {
        let [success, body] = await ProductServices.getBookDetails(uid)
        if (success) {
            this.setState({
                ...body.data,
                pageTitle: body.data.name ? body.data.name : 'IRIS',
            })
        }
    }
    prepareData = async () => {
        const uid = this.props.match.params.bookID;
        this.prepareDetail(uid)
        this.prepareRelated(uid)
        this.prepareCategory()
    }

    render() {
        console.log(this.state)
        return (
            <div id='main-page'>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                </Helmet>
                <PageHeader categories={this.state.categories} />
                <div className='content-wrapper page-content detail-page'>
                    <div className='common-content-wrapper '>
                        <div className='info-title'>
                            <div className='book-title'>{this.state.name}</div>
                            <div className='rate-detail'>
                                <RateBar rate={this.state.rating} />
                                <div className='rate-count textTwo'>{this.state.rating_count + ' đánh giá'}</div>
                            </div>
                        </div>
                        <div className='info-detail'>
                            <ImagesViewer image={this.state.image} />
                            <div className='info-table'>
                                <div className='info-row'>
                                    <div>THÔNG TIN CHI TIẾT</div>
                                    <div>
                                        <span className='price'><b>{this.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}</b></span>
                                        <span className='discount'>{`-${this.state.discount}%`}</span>
                                    </div>
                                </div>
                                {fields.map(field =>
                                    <div className='info-row' key={field.tag}>
                                        <div className='textTwo'>{field.text}</div>
                                        <div>{field.formatter ? field.formatter(this.state[field.tag]) : this.state[field.tag]}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <ProductGrid
                        type={ProductListType.OVERFLOW}
                        title='SẢN PHẨM TƯƠNG TỰ'
                        numColumn={5}
                        datas={this.state.relatedProducts}
                        loading={this.state.relatedLoading}
                    /> */}
                    <div className='wrapper'>
                        <BookDescription uid={this.props.match.params.bookID} description={this.state.description} />
                        <BookRate uid={this.props.match.params.bookID} />
                    </div>
                </div>
                <PageFooter />
            </div>
        )
    }
}
