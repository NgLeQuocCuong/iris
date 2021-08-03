import React, { PureComponent } from 'react';
import Loadable from 'react-loadable';
import LoadingPage from './utils/LoadingPage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import { routeConstants } from './utils/constants/RouteConstant';
import ProfileContext from './context/ProfileContext';
import { ProfileServices } from './services/ProfileServices';

const HomePage = Loadable({
  loader: () => import('./views/homepage/HomePage'),
  loading: LoadingPage,
})
const Login = Loadable({
  loader: () => import('./views/login/Login'),
  loading: LoadingPage,
})

const Signin = Loadable({
  loader: () => import('./views/Signin/Signin'),
  loading: LoadingPage,
})

const ResetPassWord = Loadable({
  loader: () => import('./views/ResetPassword/ResetPassword'),
  loading: LoadingPage,
})

const ChangePassWord = Loadable({
  loader: () => import('./views/ChangePassword/ChangePassword'),
  loading: LoadingPage,
})
const BookCategory = Loadable({
  loader: () => import('./views/bookList/bookList'),
  loading: LoadingPage,
})

const BookDetails = Loadable({
  loader: () => import('./views/bookDetails/bookDetails'),
  loading: LoadingPage,
})

const Account = Loadable({
  loader: () => import('./views/Account/Account'),
  loading: LoadingPage,
})

const Admin = Loadable({
  loader: () => import('./views/Admin/Admin'),
  loading: LoadingPage,
})
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isAdmin: false,
      uid: null,
    }
  }
  componentDidMount() {
    this.getUserData()
  }

  getUserData = async () => {
    let [success, body] = await ProfileServices.getUserData()
    if (success) {
      this.setState({
        name: (body.data && body.data.name) || null,
        isAdmin: (body.data && body.data.is_admin) || false,
        uid: (body.data && body.data.uid) || null,
      })
    }
  }
  render() {
    console.log(this.state)
    return (
      <HashRouter>
        <ScrollToTop>
          <ProfileContext.Provider
            value={{
              name: this.state.name,
              isAdmin: this.state.isAdmin,
              uid: this.state.uid,
              reloadUserData: this.getUserData,
            }}
          >
            <Switch>
              <Route path={routeConstants.ROUTE_LOGIN} exact name='Login' component={Login} />
              <Route path={routeConstants.ROUTE_SIGNIN} exact name='Sign in' component={Signin} />
              <Route path={routeConstants.ROUTE_RESETPASSWORD} exact name='Reset Password' component={ResetPassWord} />
              <Route path={routeConstants.ROUTE_CHANGEPASSWORD} exact name='Change Password' component={ChangePassWord} />
              <Route path={routeConstants.ROUTE_BOOK_DETAIL} exact name='Book Detail' component={BookDetails} />
              <Route path={routeConstants.ROUTE_BOOK_CATEGORY} exact name='Book Category' component={BookCategory} />
              <Route path={routeConstants.ROUTE_ACCOUNT} exact name='Account' component={Account} />
              <Route path={routeConstants.ROUTE_ADMIN} exact name='Admin' component={Admin} />
              <Route path={routeConstants.ROUTE_ROOT} default name='Home' component={HomePage} />
            </Switch>
          </ProfileContext.Provider>
        </ScrollToTop>
      </HashRouter >
    );
  }
}

export default App;
