import React, { PureComponent } from 'react'
import IconAndTextButton from './IconAndTextButton';

export default class CollapableWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true,
        }
    }
    toggle = () => {
        const isCollapsed = !this.state.isCollapsed
        this.setState({
            isCollapsed: isCollapsed,
        })
    }
    render() {
        return (
            <div className={`default-collapable-wrapper ${this.state.isCollapsed ? 'collapsed' : 'expand'}`}>
                <div className='child'>
                    {this.props.children}
                </div>
                <IconAndTextButton
                    texts={[{
                        text: this.state.isCollapsed ? 'Xem thêm' : 'Thu gọn',
                    }]}
                    icons={[
                        {
                            icon: (this.state.isCollapsed ? 'arrow-down-icon' : 'arrow-up-icon') + ' icon24'
                        }
                    ]}
                    revert={true}
                    click={this.toggle}
                    className='center-button'
                />
            </div>
        )
    }
}
