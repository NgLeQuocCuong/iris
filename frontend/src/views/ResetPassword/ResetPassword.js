import { Button } from 'antd'
import React, { PureComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Background from '../../utils/Background'
import FieldType from '../../utils/constants/enums/FieldType'
import { routeConstants } from '../../utils/constants/RouteConstant'
import Field from '../../utils/field/Field'
import { Helmet } from 'react-helmet';

export default class ResetPassWord extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            password: '',
            passwordError: null,
            repassword: '',
            repasswordError: null,
            isSubmitting: false,
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
        } else if (value !== this.state.repassword) {
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
        if (name === 'password') {
            return this.validatePassword(value)
        }
        else if (name === 'repassword') {
            return this.validateRepassword(value)
        }
        else {
            const passwordFlag = this.validatePassword()
            const repasswordFlag = this.validateRepassword()
            return repasswordFlag && passwordFlag
        }
    }
    handleSubmit = async () => {
        this.setState({
            isSubmitting: true
        })
        this.setState({
            isSubmitting: false,
        })
        if (true) {
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
        const { redirect, passwordError, repasswordError, isSubmitting } = this.state
        return (
            <Background>
                {redirect ? <Redirect push to={redirect} /> : null}
                <Helmet>
                    <title>Đặt lại mật khẩu</title>
                </Helmet>
                <div className='main-content'>
                    <Link to={routeConstants.ROUTE_ROOT}>
                        <div className='big-logo' />
                    </Link>
                    <div className='account-form'>
                        <span className='align-left title'>Đặt lại mật khẩu</span>
                        <Field
                            type={FieldType.PASSWORD}
                            label='Mật khẩu mới'
                            id='password'
                            name='password'
                            onChange={this.handleChange}
                            errorMessage={passwordError}
                        />
                        <Field
                            type={FieldType.PASSWORD}
                            label='Nhập lại mật khẩu mới'
                            id='repassword'
                            name='repassword'
                            onChange={this.handleChange}
                            errorMessage={repasswordError}
                        />
                        <Button loading={isSubmitting} onClick={this.handleSubmit} disabled={passwordError || repasswordError}>Đặt lại mật khẩu</Button>
                    </div>
                </div>
            </Background >
        )
    }
}
