import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import { ProductServices } from '../../services/ProductServices';
import PageHeader from '../../utils/PageHeader';
import PageFooter from '../../utils/PageFooter';
import ProductsPage from '../../utils/ProductsPage';
import { commonFunction } from '../../utils/constants/commonFunction';

export default class bookList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: 'IRIS',
            navData: [],
            categories: [],
            category: '',
        }
    }

    async componentDidMount() {
        let [success, body] = await ProductServices.getCategories()
        let categories = []
        if (success) {
            categories = body.data.root.children[0]['Sách Tiếng Việt'].children.map(item => commonFunction.reformatCategory(item))
        }
        const category = this.getCategory(this.props.match.params.categoryID, categories)
        this.setState({
            navData: category.children,
            category: category.uid,
            pageTitle: category.label,
            categories: categories,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.categoryID !== prevProps.match.params.categoryID) {
            const category = this.getCategory(this.props.match.params.categoryID, this.state.categories)
            this.setState({
                navData: category.children,
                category: category.uid,
                pageTitle: category.label,
            })
        }
    }


    getCategory = (id, categories) => {
        if (categories.map) {
            let result = null
            categories.forEach(element => {
                const tempResult = this.getCategory(id, element)
                if (tempResult) result = tempResult
            });
            if (result) return result
        } else {
            if (id === categories.uid) {
                return categories
            } else if (categories.children) {
                return this.getCategory(id, categories.children)
            }
        }
        return false
    }

    render() {
        console.log(this.state.category)
        return (
            <div id='main-page'>
                <Helmet>
                    <title>{this.state.pageTitle}</title>
                </Helmet>
                <PageHeader categories={this.state.categories} toggle={this.state.category} />
                <ProductsPage
                    navData={this.state.navData}
                    category={this.props.match.params.categoryID}
                />
                <PageFooter />
            </div>
        )
    }
}
