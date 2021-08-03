import { Button } from 'antd'
import React, { PureComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Background from '../../utils/Background'
import FieldType from '../../utils/constants/enums/FieldType'
import { routeConstants } from '../../utils/constants/RouteConstant'
import Field from '../../utils/field/Field'
import { Helmet } from 'react-helmet';
import { ProfileServices } from '../../services/ProfileServices'

export default class Signin extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            email: '',
            password: '',
            repassword: '',
            emailError: null,
            passwordError: null,
            repasswordError: null,
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
    validateRepassword = (value) => {
        if (value === void 0) {
            value = this.state.repassword
        }
        if (value === '') {
            this.setState({
                repasswordError: 'Nhập lại mật khẩu của bạn',
            });
            return false;
        } else if (value !== this.state.password) {
            this.setState({
                repasswordError: 'Mật khẩu của bạn không khớp'
            })
        } else {
            this.setState({
                repasswordError: null,
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
        else if (name === 'repassword') {
            return this.validateRepassword(value)
        }
        else {
            const emailFlag = this.validateEmail()
            const passwordFlag = this.validatePassword()
            const repasswordFlag = this.validateRepassword()
            return emailFlag && passwordFlag && repasswordFlag
        }
    }
    handleSubmit = async () => {
        this.setState({
            isSubmitting: true
        })
        let data = new FormData()
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        let [success, body] = await ProfileServices.register(data)
        this.setState({
            isSubmitting: false,
        })
        if (success) {
            this.setState({
                redirect: routeConstants.ROUTE_LOGIN,
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
        const { redirect, emailError, passwordError, repasswordError, isSubmitting } = this.state
        return (
            <Background>
                {redirect ? <Redirect push to={redirect} /> : null}
                <Helmet>
                    <title>Đăng kí</title>
                </Helmet>
                <div className='main-content'>
                    <Link to={routeConstants.ROUTE_ROOT}>
                        <div className='big-logo' />
                    </Link>
                    <div className='account-form'>
                        <span className='align-left title'>Đăng kí</span>
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
                        <Field
                            type={FieldType.PASSWORD}
                            label='Nhập lại mật khẩu'
                            id='repassword'
                            name='repassword'
                            onChange={this.handleChange}
                            errorMessage={repasswordError}
                            size='large'
                        />
                        <Button loading={isSubmitting} onClick={this.handleSubmit} disabled={emailError || passwordError || repasswordError}>Đăng kí</Button>
                        <span>Bạn đã có tài khoản? <Link className='text-link' to={routeConstants.ROUTE_LOGIN}>Đăng nhập ngay.</Link></span>
                    </div>
                </div>
            </Background >
        )
    }
}
