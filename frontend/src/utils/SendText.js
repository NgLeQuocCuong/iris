import React, { PureComponent } from 'react'
import { SendOutlined } from '@ant-design/icons'

export default class SendText extends PureComponent {
    render() {
        return (
            <div className={`input-addon ${this.props.size || 'middle'}`}>
                <SendOutlined
                    style={{
                        color: '#797979',
                    }}
                    {...this.props}
                />
            </div>
        )
    }
}
