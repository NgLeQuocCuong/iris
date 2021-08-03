import React, { PureComponent } from 'react'

export default class ImagesViewer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
    }
    handleClick = index => {
        this.setState({
            index: index,
        })
    }
    render() {
        return (
            <div className='info-image'>
                <div className='main-image-wrapper'>
                    <img className='main-image' src={typeof this.props.image === 'string' ? this.props.image.replace('cache/w64', 'cache/w424') : ''} alt='Hình ảnh sản phẩm' />
                </div>
                {/* <div className='list-image'>
                    {this.props.images && this.props.images.map && this.props.images.map((item, index) =>
                        <div key={index} className={`small-image-wrapper ${this.state.index === index ? 'actived' : ''}`} onClick={() => this.handleClick(index)}>
                            <img className='small-image' src={item} alt='Hình ảnh sản phẩm' />
                        </div>)}
                </div> */}
            </div>
        )
    }
}
