import { Button } from 'antd';
import React, { Fragment, PureComponent } from 'react'
import { ProductServices } from '../../services/ProductServices';
import FieldType from '../../utils/constants/enums/FieldType';
import Field from '../../utils/field/Field';
import RateBar from '../../utils/RateBar';
import { commonFunction } from '../../utils/constants/commonFunction';

export default class RateField extends PureComponent {
    state = {
        rated: false,
        header: '',
        content: '',
        number: 5,
        showInput: false,
        placeholder: '',
        time: 0,
    }
    componentDidMount() {
        const getRandomInt = max => Math.floor(Math.random() * max);
        const placeholders = [
            'Tuyệt vời ông mặt trời',
            'Số jáck',
            'Toẹt vời',
            'Đã đọc 1000 lần',
        ]
        this.setState({
            placeholder: placeholders[getRandomInt(placeholders.length)]
        })
        this.getRate()
    }

    getRate = async () => {
        if (this.props.userProfile?.uid) {
            let [success, body] = await ProductServices.getRateOfUser(this.props.bookId)
            if (success) {
                if (body?.data) {
                    this.setState({
                        rated: true,
                        header: body.data.header,
                        content: body.data.content,
                        number: body.data.rating,
                        time: body.data.updated_at,
                    })
                } else {
                    this.setState({
                        rated: false,
                        header: '',
                        content: '',
                        number: 5,
                    })
                }
            }
        }
    }

    handleChange = ({ name, value }) => {
        this.setState({
            [name]: value
        })
    }

    showInput = () => {
        this.setState({
            showInput: true
        })
    }

    createRated = async () => {
        const { content, header, number } = this.state;
        const { bookId } = this.props
        let data = new FormData();
        data.append('uid', bookId)
        data.append('rate', number)
        data.append('content', content)
        data.append('header', header)
        let [success, body] = await ProductServices.rate(data)
        if (success) {
            this.setState({
                showInput: false,
            })
            this.props.updateCallback()
        }
    }

    render() {
        const { rated, content, header, number, showInput, placeholder, time } = this.state;
        return rated ?
            <div className='add-rate'>
                {
                    showInput ?
                        <div className='input-row'>
                            <div className='rate-selector'>
                                <RateBar
                                    onClick={rate => this.handleChange({
                                        name: 'number',
                                        value: rate,
                                    })}
                                    rate={number}
                                />
                            </div>
                            <Field
                                type={FieldType.TEXT}
                                name='header'
                                onChange={this.handleChange}
                                value={header}
                                label='Tiêu đề'
                                placeHolder={placeholder}
                            />
                            <Field
                                type={FieldType.TEXTAREA}
                                name='content'
                                onChange={this.handleChange}
                                value={content}
                                label='Nội dung'
                                placeHolder='Nội dung đánh giá'
                            />
                            <Button onClick={this.createRated}>Cập nhật đánh giá</Button>
                        </div> :
                        <div className='reviews'>
                            <div className='rate-wrapper'>
                                <div className='rate-item'>
                                    <div className='header-row'>
                                        <RateBar rate={number} />
                                        <div className='header'>{header}</div>
                                    </div>
                                    <div className='content-row'>{content}</div>
                                    <div className='user-row'>Bạn đã đánh giá vào {commonFunction.convertTimestamp(time)}</div>
                                </div>
                                <Button onClick={this.showInput}>Cập nhật đánh giá</Button>
                            </div>
                        </div>
                }
            </div> :
            <div className='add-rate'>
                {
                    showInput ?
                        <div className='input-row'>
                            <div className='rate-selector'>
                                <RateBar
                                    onClick={rate => this.handleChange({
                                        name: 'number',
                                        value: rate,
                                    })}
                                    rate={number}
                                />
                            </div>
                            <Field
                                type={FieldType.TEXT}
                                name='header'
                                onChange={this.handleChange}
                                value={header}
                                label='Tiêu đề'
                                placeHolder={placeholder}
                            />
                            <Field
                                type={FieldType.TEXTAREA}
                                name='content'
                                onChange={this.handleChange}
                                value={content}
                                label='Nội dung'
                                placeHolder='Nội dung đánh giá'
                            />
                            <Button onClick={this.createRated}>Thêm đánh giá</Button>
                        </div> :
                        <Fragment>
                            <div>
                                Bạn chưa đánh giá sản phẩm này
                            </div>
                            <Button onClick={this.showInput}>Thêm đánh giá</Button>
                        </Fragment>
                }
            </div>
    }
}
