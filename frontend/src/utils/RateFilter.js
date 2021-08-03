import React, { PureComponent } from 'react'
import FieldType from './constants/enums/FieldType'
import Field from './field/Field'
import IconAndTextButton from './IconAndTextButton';

export default class RateFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value ? this.props.value : 0,
            isChanged: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.setState({
            isChanged: this.props.value !== this.state.value,
        })
    }

    handleChange = ({ name, value }) => {
        this.setState({
            value: value,
        })
    }
    onClickLeft = value => {
        if (value > 1) {
            return value - 1
        }
        else {
            return 0
        }
    }
    onClickRight = value => {
        if (value < 5) {
            return value + 1
        }
        else {
            return 5
        }
    }
    apply = () => {
        this.props.handleChange({ name: 'rate', value: this.state.value })
    }
    render() {
        return (
            <div className='common-content-wrapper rate-filter filter'>
                <div>ĐÁNH GIÁ</div>
                <div className='flexbox'>
                    <div>Từ</div>
                    <Field
                        type={FieldType.TEXT_WITH_BTN}
                        value={this.state.value}
                        onChange={this.handleChange}
                        onClickLeft={this.onClickLeft}
                        onClickRight={this.onClickRight}
                        viewOnly={true}
                    // isDisabled={true}
                    />
                    <div>sao</div>
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
