import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom';
import ProfileContext from '../../context/ProfileContext';
import { ProductServices } from '../../services/ProductServices';
import { commonFunction } from '../../utils/constants/commonFunction';
import AdminNavType from '../../utils/constants/enums/AdminNavType';
import { routeConstants } from '../../utils/constants/RouteConstant';
import PageHeader from '../../utils/PageHeader';
import AdminNavigator from './AdminNavigator';
import AuthorTable from './AuthorTable';
import BookTable from './BookTable';
import CategoryTable from './CategoryTable';
import UserTable from './UserTable';

export default class Admin extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            active: AdminNavType.BOOK,
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

    setActive = id => {
        this.setState({
            active: id,
        })
    }
    render() {
        return (
            <ProfileContext.Consumer>
                {
                    profile => profile.isAdmin ?
                        <div id='main-page'>
                            <Helmet>
                                <title>Quản lý</title>
                            </Helmet>
                            <PageHeader categories={this.state.categories} />
                            <div className='admin-page'>
                                <AdminNavigator active={this.state.active} setActive={this.setActive} />
                                <div className='admin-table'>
                                    <BookTable display={this.state.active === AdminNavType.BOOK} />
                                    <UserTable display={this.state.active === AdminNavType.USER} />
                                    <CategoryTable data={this.state.categories} display={this.state.active === AdminNavType.CATEGORY} />
                                    <AuthorTable display={this.state.active === AdminNavType.AUTHOR} />
                                </div>
                            </div>
                        </div> :
                        <div>
                            <Redirect to={routeConstants.ROUTE_ROOT} />
                        </div>
                }
            </ProfileContext.Consumer>

        )
    }
}
