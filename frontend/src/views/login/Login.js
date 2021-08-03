import { Button } from 'antd'
import React, { PureComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Background from '../../utils/Background'
import FieldType from '../../utils/constants/enums/FieldType'
import { routeConstants } from '../../utils/constants/RouteConstant'
import Field from '../../utils/field/Field'
import { Helmet } from 'react-helmet';
import { ProfileServices } from '../../services/ProfileServices'
import ProfileContext from '../../context/ProfileContext'

export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            isSubmitting: false,
        }
    }
    validateEmail = value => {
        if (value === void 0) {
            value = this.state.email
        }
        if (value === '') {
            this.setState({
                emailError: 'Nhập email của bạn.',
            });
            return false;
        } else if ((/\S+@\S+\.\S+/.test(value)) === false) {
            this.setState({
                emailError: 'Email của bạn không hợp lệ',
            });
            return false;
        } else {
            this.setState({
                emailError: null,
            });
            return true
        }
    }

    validatePassword = (value) => {
        if (value === void 0) {
            value = this.state.password
        }
        if (value === '') {
            this.setState({
                passwordError: 'Nhập mật khẩu của bạn',
            });
            return false;
        } else {
            this.setState({
                passwordError: null,
            });
            return true
        }
    }

    validateInput = (name, value) => {
        if (name === 'email') {
            return this.validateEmail(value)
        }
        else if (name === 'password') {
            return this.validatePassword(value)
        }
        else {
            const emailFlag = this.validateEmail()
            const passwordFlag = this.validatePassword()
            return emailFlag && passwordFlag
        }
    }
    handleSubmit = async (reloadUserData) => {
        this.setState({
            isSubmitting: true
        })
        let data = new FormData()
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        let [success, body] = await ProfileServices.login(data)
        this.setState({
            isSubmitting: false,
        })
        if (success) {
            localStorage.setItem('access', body.data && body.data.token && body.data.token.access)
            localStorage.setItem('refresh', body.data && body.data.token && body.data.token.refresh)
            reloadUserData()
            this.setState({
                redirect: routeConstants.ROUTE_ROOT,
            })
        }
    }
    handleChange = ({ name, value }) => {
        this.validateInput(name, value)
        this.setState({
            [name]: value,
        })
    }
    render() {
        const { redirect, emailError, passwordError, isSubmitting } = this.state
        return (
            <Background>
                {redirect ? <Redirect push to={redirect} /> : null}
                <Helmet>
                    <title>Đăng nhập</title>
                </Helmet>
                <div className='main-content'>
                    <Link to={routeConstants.ROUTE_ROOT}>
                        <div className='big-logo' />
                    </Link>
                    <div className='account-form'>
                        <span className='align-left title'>Đăng nhập</span>
                        <Field
                            name='email'
                            type={FieldType.TEXT}
                            label='Email'
                            id='email'
                            onChange={this.handleChange}
                            errorMessage={emailError}
                            size='large'
                        />
                        <Field
                            type={FieldType.PASSWORD}
                            label='Mật khẩu'
                            id='password'
                            name='password'
                            onChange={this.handleChange}
                            errorMessage={passwordError}
                            size='large'
                        />
                        <Link className='align-left text-link' to=''>Quên mật khẩu?</Link>
                        <ProfileContext.Consumer>
                            {
                                profile => <Button loading={isSubmitting} onClick={() => this.handleSubmit(profile.reloadUserData)} disabled={emailError || passwordError}>Đăng nhập</Button>
                            }
                        </ProfileContext.Consumer>
                        <span>Bạn chưa có tài khoản? <Link className='text-link' to={routeConstants.ROUTE_SIGNIN}>Đăng kí ngay.</Link></span>
                    </div>
                </div>
            </Background >
        )
    }
}
