import React, { PureComponent, Fragment } from 'react';

class DragAndDrop extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            dragging: false
        }
        this.dropRef = React.createRef()
        this.dragCounter = 0;
    }

    componentDidMount() {
        if (!this.props.viewOnly) {
            let div = this.dropRef.current
            div.addEventListener('dragenter', this.handleDragIn)
            div.addEventListener('dragleave', this.handleDragOut)
            div.addEventListener('dragover', this.handleDrag)
            div.addEventListener('drop', this.handleDrop)
        }
    }

    componentWillUnmount() {
        if (!this.props.viewOnly) {
            let div = this.dropRef.current
            div.removeEventListener('dragenter', this.handleDragIn)
            div.removeEventListener('dragleave', this.handleDragOut)
            div.removeEventListener('dragover', this.handleDrag)
            div.removeEventListener('drop', this.handleDrop)
        }
    }

    handleDrag = (e) => {
        console.log('Drag')
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragIn = (e) => {
        console.log('Drag In')
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter = this.dragCounter + 1;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ dragging: true })
        }
    }

    handleDragOut = (e) => {
        console.log('Drag Out')
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter = this.dragCounter - 1;
        if (this.dragCounter === 0) {
            this.setState({ dragging: false })
        }
    }

    handleDrop = (e) => {
        console.log('Drop')
        e.preventDefault()
        e.stopPropagation()
        this.setState({ dragging: false })
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.handleDrop(e.dataTransfer.files)
            e.dataTransfer.clearData()
            this.dragCounter = 0
        }
    }

    handleChangeInput = (e) => {
        this.props.handleDrop(e.target.files)
    }

    render() {
        return (
            <div className="container-drag-and-drop" ref={this.dropRef}>
                {
                    this.props.children.props.children.length === 0 &&
                    <div className={`placeholder-drag-drop ${!this.state.dragging ? '' : 'd-none'}`}>
                        <div className="title-drag-drop">{`Drag & Drop`}</div>
                        <div className="subtitle-drag-drop">{`Png, jpg, svg • max 5 Mb`}</div>
                    </div>
                }
                {
                    this.props.children.props.children.length !== 0 &&
                    <Fragment>
                        {this.props.children}
                    </Fragment>
                }
                {
                    this.state.dragging &&
                    <div className={`dragging-content`}>
                        <i className={`add-file-icon`} />
                    </div>
                }
                <input
                    type="file"
                    name="photo"
                    id="upload-photo"
                    accept="image/*"
                    className="d-none"
                    onChange={this.handleChangeInput}
                    multiple />
            </div>
        )
    }
}

export default DragAndDrop;
