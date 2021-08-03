import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import ProfileContext from '../../context/ProfileContext';
import PageFooter from '../../utils/PageFooter';
import PageHeader from '../../utils/PageHeader';
import ProductsPage from '../../utils/ProductsPage';
import { ProductServices } from '../../services/ProductServices';
import { commonFunction } from '../../utils/constants/commonFunction';


export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
        }
    }

    async componentDidMount() {
        let [success, body] = await ProductServices.getCategories()
        if (success) {
            const categories = body?.data?.root?.children?.length ? body.data.root.children[0]['Sách Tiếng Việt'].children.map(item => commonFunction.reformatCategory(item)) : []
            this.setState({
                categories: categories,
            })
        }
    }
    render() {
        return (
            <div id='main-page'>
                <Helmet>
                    <title>Trang chủ</title>
                </Helmet>
                <PageHeader categories={this.state.categories} />
                <ProfileContext.Consumer>
                    {
                        profile => <ProductsPage
                            navData={this.state.categories}
                            userId={profile.uid}
                        />
                    }
                </ProfileContext.Consumer>
                <PageFooter />
            </div>
        )
    }
}
