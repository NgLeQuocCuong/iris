import { Button } from 'antd'
import React, { PureComponent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Background from '../../utils/Background'
import FieldType from '../../utils/constants/enums/FieldType'
import { routeConstants } from '../../utils/constants/RouteConstant'
import Field from '../../utils/field/Field'
import { Helmet } from 'react-helmet';

export default class ChangePassWord extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            password: '',
            newPassword: '',
            reNewPassword: '',
            passwordError: null,
            newPasswordError: null,
            reNewPasswordError: null,
            isSubmitting: false,
        }
    }

    validatePassword = (value) => {
        if (value === void 0) {
            value = this.state.password
        }
        if (value === '') {
            this.setState({
                passwordError: 'Nhập mật khẩu hiện tại của bạn',
            });
            return false;
        } else {
            this.setState({
                passwordError: null,
            });
            return true
        }
    }
    validateNewPassword = (value) => {
        if (value === void 0) {
            value = this.state.newPassword
        }
        if (value === '') {
            this.setState({
                newPasswordError: 'Nhập mật khẩu mới của bạn',
            });
            return false;
        } else {
            this.setState({
                newPasswordError: null,
            });
            return true
        }
    }
    validateRenewPassword = (value) => {
        if (value === void 0) {
            value = this.state.reNewPassword
        }
        if (value === '') {
            this.setState({
                reNewPasswordError: 'Nhập lại mật khẩu mới của bạn',
            });
            return false;
        } else if (value !== this.state.repassword) {
            this.setState({
                reNewPasswordError: 'Mật khẩu mới của bạn không khớp'
            })
        } else {
            this.setState({
                reNewPasswordError: null,
            });
            return true
        }
    }

    validateInput = (name, value) => {
        if (name === 'password') {
            return this.validatePassword(value)
        }
        else if (name === 'newPassword') {
            return this.validateNewPassword(value)
        }
        else if (name === 'reNewPassword') {
            return this.validateReNewPassword(value)
        }
        else {
            const passwordFlag = this.validatePassword()
            const newPasswordFlag = this.validateNewPassword()
            const reNewPasswordFlag = this.validateReNewPassword()
            return passwordFlag && newPasswordFlag && reNewPasswordFlag
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
        const { redirect, passwordError, newPasswordError, reNewPasswordError, isSubmitting } = this.state
        return (
            <Background>
                {redirect ? <Redirect push to={redirect} /> : null}
                <Helmet>
                    <title>Đổi mật khẩu</title>
                </Helmet>
                <div className='main-content'>
                    <Link to={routeConstants.ROUTE_ROOT}>
                        <div className='big-logo' />
                    </Link>
                    <div className='account-form'>
                        <span className='align-left title'>Đổi mật khẩu</span>
                        <Field
                            name='password'
                            type={FieldType.PASSWORD}
                            label='Mật khẩu hiện tại'
                            id='password'
                            onChange={this.handleChange}
                            errorMessage={passwordError}
                        />
                        <Field
                            type={FieldType.PASSWORD}
                            label='Mật khẩu mới'
                            id='newPassword'
                            name='newPassword'
                            onChange={this.handleChange}
                            errorMessage={newPasswordError}
                        />
                        <Field
                            type={FieldType.PASSWORD}
                            label='Nhập lại mật khẩu mới'
                            id='reNewPassword'
                            name='reNewPassword'
                            onChange={this.handleChange}
                            errorMessage={reNewPasswordError}
                        />
                        <Button loading={isSubmitting} onClick={this.handleSubmit} disabled={passwordError || newPasswordError || reNewPasswordError}>Đổi mật khẩu</Button>
                    </div>
                </div>
            </Background >
        )
    }
}
