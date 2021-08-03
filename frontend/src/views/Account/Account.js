import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { ProductServices } from '../../services/ProductServices';
import { commonFunction } from '../../utils/constants/commonFunction';
import PageHeader from '../../utils/PageHeader';

export default class Account extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }
    }

    async componentDidMount() {
        let [success, body] = await ProductServices.getCategories()
        if (success) {
            const categories = body.data.root.children[0]['Sách Tiếng Việt'].children.map(item => commonFunction.reformatCategory(item))
            this.setState({
                categories: categories,
            })
        }
    }

    render() {
        return (
            <div id='main-page'>
                <Helmet>
                    <title>Quản lý tài khoản</title>
                </Helmet>
                <PageHeader categories={this.state.categories} />
                <div className='account-page'>

                </div>
            </div>
        )
    }
}
