import React, { PureComponent } from 'react'

export default class HoverWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isChildShowed: false,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.toggle !== this.props.toggle) {
            this.setState({
                isChildShowed: false,
            })
        }
    }

    showChild = () => {
        if (!this.state.isChildShowed) {
            this.setState({
                isChildShowed: true,
            })
        }
    }
    hideChild = () => {
        if (this.state.isChildShowed) {
            this.setState({
                isChildShowed: false,
            })
        }
    }
    render() {
        return (
            <div className={`default-hover-wrapper ${this.props.className || ''}`} onMouseOver={this.showChild} onMouseLeave={this.hideChild}>
                <div className='root'>
                    {this.props.rootComponent}
                </div>
                {
                    this.state.isChildShowed ?
                        <div className={`child ${this.props.position || ''}`}>
                            {this.props.childComponent || null}
                        </div> :
                        null
                }
            </div>
        )
    }
}
