import React, { PureComponent } from 'react'
import FieldType from './constants/enums/FieldType';
import { typeChecker } from './constants/typeChecker';
import Field from './field/Field';
import IconAndTextButton from './IconAndTextButton';

export default class PriceFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            min: this.props.minValue ? this.props.minValue.toString() : '',
            max: this.props.maxValue ? this.props.maxValue.toString() : '',
            isChanged: false,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        this.setState({
            isChanged: (this.props.minValue !== this.state.min) || (this.props.maxValue !== this.state.max),
        })
    }

    formater = value => value.replace('.', '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    handleChange = ({ name, value }) => {
        this.setState({
            [name]: this.formater(value),
        })
    }

    onClickLeft = value => {
        return ''
    }

    onClickRight = value => {
        return ''
    }
    apply = () => {
        this.props.handleChange({ name: 'minPrice', value: this.state.min })
        this.props.handleChange({ name: 'maxPrice', value: this.state.max })
    }
    validate = value => typeChecker.number(value)
    render() {
        return (
            <div className='common-content-wrapper price-filter filter'>
                <div>KHOẢNG GIÁ</div>
                <div className='flexbox'>
                    <Field
                        name='min'
                        placeHolder='0'
                        type={FieldType.TEXT_WITH_BTN}
                        value={this.state.min}
                        onChange={this.handleChange}
                        onClickLeft={this.onClickLeft}
                        validate={this.validate}
                    />
                    <div>-</div>
                    <Field
                        name='max'
                        placeHolder='MAX'
                        type={FieldType.TEXT_WITH_BTN}
                        value={this.state.max}
                        onChange={this.handleChange}
                        onClickRight={this.onClickRight}
                        validate={this.validate}
                    />
                </div>
                {this.state.isChanged ?
                    <IconAndTextButton
                        className='apply-button'
                        texts={[
                            {
                                text: 'Áp dụng'
                            }
                        ]}
                        click={this.apply}
                    /> : null}
            </div>
        )
    }
}
