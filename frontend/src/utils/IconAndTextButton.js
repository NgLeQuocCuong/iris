import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class IconAndTextButton extends PureComponent {
    render() {
        return (
            <div
                className={`default-iatbutton ${(this.props.className || '') + (this.props.revert ? ' revert-flex' : '')}`}
                onMouseOver={this.props.over || (() => { })}
                onMouseLeave={this.props.leave || (() => { })}
                onClick={this.props.click || (() => { })}
            >
                { this.props.icons && this.props.icons.map && this.props.icons.map((icon, index) => <div key={index} className={icon.icon} />)}
                {
                    this.props.texts && this.props.texts.map && this.props.texts.map((text, index) =>
                        [
                            (this.props.textSeperator && index !== 0) ? <div key={index + 'sep'} className='text-iatbutton'>{this.props.textSeperator}</div> : null,
                            text.href ?
                                <Link key={index} to={text.href} className='text-iatbutton'><div className='text-iatbutton'>{text.text || null}</div></Link> :
                                <div key={index} className='text-iatbutton'>{text.text}</div>,
                        ]
                    )
                }
            </div >
        );
    }
}

IconAndTextButton.propTypes = {

};

export default IconAndTextButton;