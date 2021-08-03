import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import IconAndTextButton from './IconAndTextButton';

const numRowColap = 5
export default class Navigator extends PureComponent {
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
            this.props.data && this.props.data.length ?
                <div className='common-content-wrapper filter'>
                    <div>DANH MỤC SÁCH</div>
                    {this.props.data && this.props.data.map && this.props.data.map(
                        (item, index) => { return !this.state.isCollapsed || (index < numRowColap) ? <Link key={index} to={item.uid ? '/the-loai/' + item.uid : ''}>{item.label || ''}</Link> : null }
                    )}
                    {this.props.data && (this.props.data.length > numRowColap) ?
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
                        /> :
                        null
                    }
                </div> :
                null
        )
    }
}
