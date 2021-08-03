import React, { PureComponent } from 'react'
import { ProductServices } from '../../services/ProductServices';
import CollapableWrapper from '../../utils/CollapableWrapper';

export default class BookDescription extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            isCollapsed: true,
        }
    }
    componentDidMount() {
        const description = ProductServices.getBookDescription()
        this.setState({
            description: description,
        })
    }
    toggle = () => {
        const isCollapsed = !this.state.isCollapsed
        this.setState({
            isCollapsed: isCollapsed,
        })
    }
    render() {
        console.log(this.state.desciption)
        return (
            <div className='common-content-wrapper'>
                <div className='title'>MÔ TẢ</div>
                <CollapableWrapper>
                    <div className='description' dangerouslySetInnerHTML={{ '__html': this.props.description }} />
                </CollapableWrapper>
            </div>
        )
    }
}
