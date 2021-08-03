import React, { PureComponent } from 'react'
import FieldType from './constants/enums/FieldType'
import { routeConstants } from './constants/RouteConstant'
import Field from './field/Field'
import IconAndTextButton from './IconAndTextButton'

export default class PageFooter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            content: '',
        }
    }
    handleChange = ({ name, value }) => {
        this.setState({
            [name]: value,
        })
    }
    render() {
        return (
            <div className='main-footer'>
                <div className='content-wrapper'>
                    <div className='contact-info'>
                        <a href={routeConstants.ROUTE_ROOT}>
                            <div className='logo' />
                        </a>
                        <IconAndTextButton
                            texts={[
                                {
                                    text: 'Liên hệ'
                                }
                            ]}
                            icons={[
                                {
                                    icon: 'facebook-icon icon24'
                                }
                            ]}
                            revert={true}
                        />
                        <div>Địa chỉ: 609H6 Đại học Bách Khoa - Đại học Quốc Gia TPHCM</div>
                    </div>
                    <div className='contact-form'>
                        <div className='title'>Gửi tin nhắn cho IRIS</div>
                        <div>Nhập email của bạn</div>
                        <Field
                            id='email'
                            type={FieldType.TEXT}
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeHolder='Nhận hồi đáp qua email..'
                        />
                        <div>Nhập nội dung tin nhắn</div>
                        <Field
                            id='content'
                            type={FieldType.TEXTAREA}
                            name='content'
                            value={this.state.content}
                            onChange={this.handleChange}
                            placeHolder='Nội dung tin nhắn..'
                        />
                    </div>
                </div>
            </div >
        )
    }
}
