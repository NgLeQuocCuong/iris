import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Label } from 'reactstrap';
import FieldType from '../constants/enums/FieldType';
import { Input, Select, Radio, DatePicker, Space, TimePicker, Checkbox } from 'antd';
import moment from "moment";
import { typeChecker } from '../constants/typeChecker';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import TextEditor from '../TextEditor';
const { Option } = Select;
const MSG_ERROR_REQUIRED = 'Trường này bắt buộc nhập';
const CODE_REQUIRED = 'CODE_REQUIRED';
class Field extends PureComponent {

    constructor(props) {
        super(props)
        let value = '';
        if (this.props.type === FieldType.MULTIPLE_SELECT ||
            this.props.type === FieldType.SINGLE_SELECT ||
            this.props.type === FieldType.MULTIPLE_SELECT_MODE_TAGS) {
            value = []
        }
        this.state = {
            errMessages: [],
            value: value,
        }
    }

    prepareData = () => {
        if (this.props.value === void 0 ||
            this.props.value === null ||
            this.props.value === '') {
            if (this.props.type === FieldType.MULTIPLE_SELECT ||
                this.props.type === FieldType.SINGLE_SELECT ||
                this.props.type === FieldType.MULTIPLE_SELECT_MODE_TAGS) {
                this.setState({
                    value: [],
                });
            }
        } else {
            this.setState({
                value: this.props.value,
            });
        }
    }

    componentDidMount() {
        this.prepareData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
            this.prepareData();
        }
        if (prevProps.toggle !== this.props.toggle) {
            this.validate();
        }
    }

    handleChange = (event) => {
        let value = '';
        if (this.props.type === FieldType.TEXT ||
            this.props.type === FieldType.NUMBER ||
            this.props.type === FieldType.RADIO ||
            this.props.type === FieldType.TEXTAREA ||
            this.props.type === FieldType.TEXT_WITH_BTN ||
            this.props.type === FieldType.PASSWORD) {
            value = event.target.value;
        }
        else if (this.props.type === FieldType.SINGLE_SELECT ||
            this.props.type === FieldType.MULTIPLE_SELECT ||
            this.props.type === FieldType.MULTIPLE_SELECT_MODE_TAGS ||
            this.props.type === FieldType.TEXT_EDITOR) {
            value = event;
        }
        else if (this.props.type === FieldType.CHECKBOX) {
            value = event.target.checked
        }
        else if (this.props.type === FieldType.DATE || this.props.type === FieldType.TIME) {
            value = event ? event.unix() : '';
        }
        let valid = true
        if (typeChecker.func(this.props.validate)) {
            valid = this.props.validate(value)
        }
        if (valid) {
            this.setValue(value)
        }
    }
    setValue = value => {
        this.setState({
            value: value,
        });
        this.validate(value);
        if (this.props.onChange) {
            this.props.onChange({ name: this.props.name, value: value });
        }
    }

    handleBlur = () => {
        this.validate();
    }

    renderLabelField = () => {
        const { label, required, leftCol, horizontal } = this.props;
        if (horizontal) {
            return (
                <Label className={`label-horizontal-field-group ${this.props.customLabelStyle ? this.props.customLabelStyle : ''}`}>{label}{required && <span className="required-field-icon"> *</span>}</Label>
            )
        }
        else {
            return (
                <Fragment>
                    {
                        label &&
                        <Col className={leftCol ? leftCol : ''} xs={12} md={12} lg={12}>
                            <Label className={`label-field-group ${this.props.customLabelStyle ? this.props.customLabelStyle : ''}`}>{label}{required && <span className="required-field-icon"> *</span>}</Label>
                        </Col>
                    }
                </Fragment>
            )
        }
    }

    setErrMessage = (err, errMessages) => {
        if (!errMessages.find(e => e.code === err.code)) {
            errMessages = [...errMessages, err];
        } else {
            errMessages = this.removeErrMessage(err.code, errMessages);
            errMessages = this.setErrMessage(err, errMessages);
        }
        return errMessages;
    }

    removeErrMessage = (errCode, errMessages) => {
        errMessages = errMessages.filter(e => e.code !== errCode);
        return errMessages;
    }

    validate = (value) => {
        let valueToCheck = this.state.value;
        let errMessages = this.state.errMessages;
        if (value !== void 0) {
            valueToCheck = value;
        }
        if (typeof valueToCheck === 'string') {
            valueToCheck = valueToCheck.trim();
        }
        const { required } = this.props;
        // check required
        if (required) {
            const { customMsg } = this.props;
            let err = {
                msg: MSG_ERROR_REQUIRED,
                code: CODE_REQUIRED,
            }
            if (customMsg && customMsg[err.code]) {
                err.msg = customMsg[err.code];
            }
            if (valueToCheck === '' || valueToCheck.toString() === '') {
                errMessages = this.setErrMessage(err, errMessages);
            } else {
                errMessages = this.removeErrMessage(err.code, errMessages);
            }
        }

        this.setState({
            errMessages: errMessages,
        });
    }

    contentItemFieldGroup = () => {
        let content = null;
        const { value } = this.state;
        const { type, name, id, isDisabled, placeHolder, className, options, viewOnly, size, ...rest } = this.props;
        const commonProps = {
            size,
            ...rest,
        }
        if (type === FieldType.TEXT) {
            content = (
                <Input
                    {...commonProps}
                    name={name ? name : ''}
                    id={id ? id : ''}
                    value={value}
                    className={`field-common ${className ? className : ''} ${viewOnly ? 'view-only-input' : ''}`}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={isDisabled}
                    readOnly={viewOnly}
                    placeholder={placeHolder ? placeHolder : ''}
                />
            )
        }
        else if (type === FieldType.TEXTAREA) {
            content = (
                <Input.TextArea
                    {...commonProps}
                    name={name ? name : ''}
                    id={id ? id : ''}
                    value={value}
                    className={`field-common field-textarea-common ${className ? className : ''} ${viewOnly ? 'view-only-input' : ''}`}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={isDisabled}
                    readOnly={viewOnly}
                    placeholder={placeHolder ? placeHolder : ''}
                />
            )
        }
        else if (type === FieldType.SINGLE_SELECT) {
            content = (
                <Select
                    {...commonProps}
                    name={name ? name : ''}
                    id={id ? id : ''}
                    value={value}
                    className={`field-select-common ${className ? className : ''} ${viewOnly ? 'view-only-input' : ''}`}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={(isDisabled || viewOnly) ? true : false}
                    placeholder={placeHolder ? placeHolder : ''}
                    // suffixIcon={<div className="arrow-down-icon icon-24" />}
                    getPopupContainer={node => node.parentNode}
                    allowClear={this.props.disableClear ? false : true}
                    showSearch={this.props.disableSearch ? false : true}
                >
                    {
                        options &&
                        options.map(option => {
                            return (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            )
                        })
                    }
                </Select>
            )
        }
        else if (type === FieldType.MULTIPLE_SELECT) {
            content = (
                <Select
                    {...commonProps}
                    mode="multiple"
                    name={name ? name : ''}
                    id={id ? id : ''}
                    value={value}
                    options={options}
                    className={`field-select-common ${className ? className : ''} ${viewOnly ? 'view-only-input' : ''}`}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={(isDisabled || viewOnly) ? true : false}
                    placeholder={placeHolder ? placeHolder : ''}
                    getPopupContainer={node => node.parentNode}
                >
                </Select>
            )
        }
        else if (type === FieldType.MULTIPLE_SELECT_MODE_TAGS) {
            content = (
                <Select
                    {...commonProps}
                    mode="tags"
                    name={name ? name : ''}
                    id={id ? id : ''}
                    value={value}
                    options={options}
                    className={`field-select-common ${className ? className : ''} ${viewOnly ? 'view-only-input' : ''}`}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={(isDisabled || viewOnly) ? true : false}
                    placeholder={placeHolder ? placeHolder : ''}
                >
                </Select>
            )
        }
        else if (type === FieldType.RADIO) {
            content = (
                <Radio.Group
                    {...commonProps}
                    className={`${viewOnly ? 'view-only-radio' : ''}`}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={value}
                    disabled={(isDisabled || viewOnly) ? true : false}
                >
                    {
                        options &&
                        options.map(option => {
                            return (
                                <Radio key={option.value} value={option.value}>{option.label}</Radio>
                            )
                        })
                    }
                </Radio.Group>
            )
        }
        else if (type === FieldType.DATE) {
            const newValue = value ? moment(value * 1000) : '';
            content = (
                <Space direction="vertical">
                    <DatePicker
                        {...commonProps}
                        value={newValue}
                        format={['DD/MM/YYYY', 'DD/MM/YY']}
                        placeholder={placeHolder ? placeHolder : ''}
                        className={`field-date-common ${viewOnly ? 'view-only-input' : ''}`}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        suffixIcon={<i className="ic-date icon-default icon-24" />}
                        disabled={(isDisabled || viewOnly) ? true : false}
                    />
                </Space>
            )
        }
        else if (type === FieldType.TIME) {
            const newValue = value ? moment(value * 1000) : '';
            content = (
                <TimePicker
                    {...commonProps}
                    value={newValue}
                    className={`field-time-common ${viewOnly ? 'view-only-input' : ''}`}
                    placeholder={placeHolder ? placeHolder : ''}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    suffixIcon={<i className="ic-time icon-default icon-24" />}
                    format="HH:mm"
                    disabled={(isDisabled || viewOnly) ? true : false}
                />
            )
        }
        else if (type === FieldType.CHECKBOX) {
            content = (
                <Checkbox
                    {...commonProps}
                    checked={value}
                    className={`field-checkbox-common ${viewOnly ? 'view-only-input' : ''}`}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={(isDisabled || viewOnly) ? true : false}
                >{this.props.children}</Checkbox>
            )
        }
        else if (type === FieldType.TEXT_WITH_BTN) {
            content = (
                < Input
                    {...commonProps}
                    addonBefore={this.props.onClickLeft ? <div className='icon24 arrow-left-icon' onClick={() => { this.setValue(this.props.onClickLeft(value)) }} /> : null}
                    addonAfter={this.props.onClickRight ? <div className='icon24 arrow-right-icon' onClick={() => { this.setValue(this.props.onClickRight(value)) }} /> : null}
                    name={name ? name : ''}
                    id={id ? id : ''}
                    value={value}
                    className={`field-common ${className ? className : ''} ${viewOnly ? 'view-only-input' : ''}`}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={isDisabled}
                    readOnly={viewOnly}
                    placeholder={placeHolder ? placeHolder : ''}
                />
            )
        } else if (type === FieldType.PASSWORD) {
            content = (
                <Input.Password
                    {...commonProps}
                    placeholder="input password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={this.handleChange}
                />
            )
        }
        // else if (type === FieldType.TEXT_EDITOR) {
        //     content = (
        //         <div className={`field-editor-common`}>
        //             <TextEditor
        //                 value={value}
        //                 onChange={this.handleChange}
        //                 onBlur={this.handleBlur}
        //                 disabled={(isDisabled || viewOnly) ? true : false}
        //             />
        //         </div>
        //     )
        // }
        return content;
    }

    render() {
        return (
            <Row className={`mb-4 item-input container-class ${this.props.containerClass ? this.props.containerClass : ''}`}>
                {this.renderLabelField()}
                {
                    this.props.horizontal &&
                    <Col className={`default-horizontal-col`}>
                        {this.contentItemFieldGroup()}
                        {
                            this.state.errMessages.map((err, index) => (
                                <span className="error-message" key={err.code}>{err.msg}</span>
                            ))
                        }
                        {this.props.errorMessage ? <span className="error-message" key='prop'>{this.props.errorMessage}</span> : null}
                    </Col>
                }
                {
                    !this.props.horizontal &&
                    <Col xs={12} md={12} lg={12}>
                        {this.contentItemFieldGroup()}
                        {
                            this.state.errMessages.map((err, index) => (
                                <span className="error-message" key={err.code}>{err.msg}</span>
                            ))
                        }
                        {this.props.errorMessage ? <span className="error-message" key='prop'>{this.props.errorMessage}</span> : null}
                    </Col>
                }
            </Row>
        )
    }
}

export default Field;
