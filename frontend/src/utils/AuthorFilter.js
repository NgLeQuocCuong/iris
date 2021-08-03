import React, { PureComponent } from 'react'
import FieldType from './constants/enums/FieldType';
import Field from './field/Field';
import IconAndTextButton from './IconAndTextButton';

export default class AuthorFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value ? this.props.value : null,
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
    apply = () => {
        this.props.handleChange({ name: 'author', value: this.state.value })
    }
    render() {
        return (
            <div className='common-content-wrapper publisher-filter filter'>
                <div>TÁC GIẢ</div>
                <Field
                    name='author'
                    type={FieldType.SINGLE_SELECT}
                    placeHolder='Nhập tác giả'
                    options={this.props.options ? this.props.options : []}
                    onChange={this.handleChange}
                />
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
