import React, { Fragment, PureComponent } from 'react';
import defaultImage from '../../../assets/images/image-default.png'
class ItemFile extends PureComponent {
    render() {
        return (
            <div className="container-item-file">
                <img src={this.props.url ? this.props.url : defaultImage} className="img-item-file" alt='' />
                {
                    !this.props.viewOnly &&
                    <Fragment>
                        <div className="force-background" />
                        {/* <div className="btn-view">Xem</div> */}
                        <div className="btn-remove" onClick={() => this.props.handleRemove(this.props.uid)}>Xoá</div>
                    </Fragment>
                }
            </div>
        )
    }
}

export default ItemFile;
