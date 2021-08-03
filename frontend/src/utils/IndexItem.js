import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

export default class IndexItem extends PureComponent {
    render() {
        return (
            <div className={`default-index-item ${this.props.className || ''}`} onMouseOver={this.props.onMouseOver} onClick={this.props.onClick}>
                {
                    this.props.url ?
                        <NavLink to={this.props.url}>
                            <div>
                                {this.props.label}
                            </div>
                            {this.props.children && this.props.children.length ? <div className='arrow-right-icon icon24' /> : null}
                        </NavLink> :
                        <div>
                            <div>
                                {this.props.label}
                            </div>
                            {this.props.children && this.props.children.length ? <div className='arrow-right-icon icon24' /> : null}
                        </div>
                }
            </div>
        )
    }
}
