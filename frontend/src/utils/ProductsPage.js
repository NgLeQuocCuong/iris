import React, { PureComponent } from 'react'
import Navigator from './Navigator'
import RateFilter from './RateFilter'
import PriceFilter from './PriceFilter'
import PublisherFilter from './PublisherFilter';
import { PublisherServices } from '../services/PublisherServices'
import AuthorFilter from './AuthorFilter';
import { AuthorServices } from '../services/AuthorServices';
import ProductGrid from './ProductGrid';
import { ProductServices } from '../services/ProductServices';
import ProductListType from './constants/enums/ProductListType';
import withUserProfile from '../HOC/UserProfileHOC';
class ProductsPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            minPrice: '',
            maxPrice: '',
            publisher: null,
            publisherOptions: [],
            author: null,
            authorOptions: [],
            recomendedProducts: [],
            recomendedLoading: true,
            commonProducts: [],
            commonLoading: true,
            page: 0,
            count: 0,
        }
    }
    shouldPrepareData = (prevProps, prevState) => {
        let key
        for (key of ['category']) {
            if (prevProps[key] !== this.props[key]) return true
        }
        for (key of ['rate', 'minPrice', 'maxPrice', 'publisher', 'author']) {
            if (prevState[key] !== this.state[key]) return true
        }
        return false
    }
    prepareFilter = (page) => {
        const { rate, minPrice, maxPrice, publisher, author } = this.state
        const { userID, category } = this.props
        const filter = {
            userID: userID,
            rate: rate,
            min_price: minPrice.replace('.', ''),
            max_price: maxPrice.replace('.', ''),
            publisher: publisher,
            author_id: author,
            category_id: category || '',
            page: page,
        }
        let filter_string = ''
        for (let key in filter) {
            if (filter[key]) {
                filter_string = filter_string + `&${key}=${filter[key]}`
            }
        }
        return filter_string.length ? ('?' + filter_string.slice(1)) : ''
    }
    getCommonProduct = async (page) => {
        this.setState({
            commonLoading: true,
        });
        let [success, body] = await ProductServices.getCommonProducts(this.prepareFilter(page))
        if (success) {
            this.setState({
                commonProducts: body.data?.results ?? [],
                page,
                count: body.data?.count || 0,
            })
        }
        this.setState({
            commonLoading: false,
        })
    }
    getRecommendProduct = async (userId) => {
        this.setState({
            recomendedLoading: true,
        });
        let [success, body] = await ProductServices.getRecomendedProducts(userId ?? this.props.userId)
        if (success) {
            this.setState({
                recomendedProducts: body.data?.recommended_books ?? [],
            })
        }
        this.setState({
            recomendedLoading: false,
        })
    }
    prepareData = async (page) => {
        this.getCommonProduct(page)
        this.getRecommendProduct()
    }
    prepareAuthorOptions = async () => {
        const params = {
            category: this.props.category ?? '',
        }
        let [success, body] = await AuthorServices.getAuthors(params)
        if (success) {
            this.setState({
                authorOptions: body.data && body.data.results && body.data.results.map(item => { return { label: item.name, value: item.uid } }),
            })
        }
    }
    preparePublisherOptions = async () => {
        let [success, body] = await PublisherServices.getPubliser()
        if (success) {
            this.setState({
                publisherOptions: body.data && body.data.results && body.data.results.map(item => { return { label: item.publisher, value: item.publisher } }),
            })
        }
    }
    componentDidMount() {
        this.prepareData(1)
        this.preparePublisherOptions()
        this.prepareAuthorOptions()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.shouldPrepareData(prevProps, prevState)) {
            this.getCommonProduct()
        }

        if (this.props.category !== prevProps.category) {
            this.prepareAuthorOptions()
        }
        if (this.props.userId !== prevProps.userId) {
            this.getRecommendProduct(this.props.userProfile.userId)
        }
    }


    handleChange = ({ name, value }) => {
        console.log(name, value)
        this.setState({
            [name]: value,
        })
    }

    handlePagination = page => {
        this.getCommonProduct(page);
    }

    render() {
        const { commonLoading, recomendedLoading, page, count } = this.state;
        return (
            <div className='content-wrapper page-content product-page'>
                <div className='left-content'>
                    <Navigator data={this.props.navData} />
                    <RateFilter value={this.state.rate} handleChange={this.handleChange} />
                    <PriceFilter minValue={this.state.minPrice} maxValue={this.state.maxPrice} handleChange={this.handleChange} />
                    <AuthorFilter value={this.state.author} options={this.state.authorOptions} handleChange={this.handleChange} />
                    <PublisherFilter value={this.state.publisher} options={this.state.publisherOptions} handleChange={this.handleChange} />
                </div>
                <div className='right-content'>
                    {this.props.userId ?
                        <ProductGrid
                            type={ProductListType.OVERFLOW}
                            title='SẢN PHẨM GỢI Ý'
                            numColumn={4}
                            datas={this.state.recomendedProducts}
                            loading={recomendedLoading}
                        /> : null
                    }
                    <ProductGrid
                        title='SẢN PHẨM PHỔ BIẾN'
                        numColumn={4}
                        datas={this.state.commonProducts}
                        loading={commonLoading}
                        pagination={{
                            pageNo: page,
                            totalRows: count,
                            pageSize: 24,
                            hasPagination: count > 24,
                            handlePagination: this.handlePagination
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default withUserProfile(ProductsPage);