import React, { PureComponent } from 'react';
import DragAndDrop from './DragAndDrop';
import _cloneDeep from 'lodash/cloneDeep';
import ItemFile from './ItemFile';
import { fileServices } from '../../../services/FileServices';

class FileList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }
    }

    prepareData = () => {
        if (this.props.value && this.props.value.length !== 0) {
            let data = [];
            for (const iterator of this.props.value) {
                data.push({
                    uid: iterator.uid,
                    url: iterator.url,
                })
            }
            this.setState({
                files: data,
            })
        }
    }

    componentDidMount() {
        this.prepareData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.prepareData();
        }
    }

    handleChange = async (fileList) => {
        let newFileList = _cloneDeep(fileList);
        if (this.props.onChange) {
            if (fileList.length !== 0) {
                const data = [];
                for (const iterator of fileList) {
                    data.push(iterator.uid);
                }
                newFileList = data;
            }
            console.log(newFileList)
            this.props.onChange({ name: this.props.name, value: newFileList.toString() });
        }
    }

    handleDrop = async (files) => {
        let fileList = _cloneDeep(this.state.files);
        for (var i = 0; i < files.length; i++) {
            let [success, data] = await fileServices.uploadFile(files[i]);
            if (success) {
                let content = data.data;
                if (!content) return
                fileList.push({
                    name: content.description,
                    uid: content.uid,
                    url: content.path,
                })
            }
        }
        this.handleChange(fileList);
        this.setState({ files: fileList })
    }

    handleRemove = (uid) => {
        const filtered = _cloneDeep(this.state.files);
        if (filtered.length !== 0) {
            const newFiles = filtered.filter(file => file.uid !== uid);
            console.log(newFiles)
            this.handleChange(newFiles);
            this.setState({
                files: newFiles,
            });
        }
    }

    render() {
        return (
            <div className="container-file">
                <div className="header-file">
                    <label className="label-file">
                        {this.props.label}
                    </label>
                    {
                        !this.props.viewOnly &&
                        <label htmlFor="upload-photo" className="container-add-file">
                            <i className="ic-add-blue icon-default icon-24" />
                            <span className="add-file-name">Thêm ảnh</span>
                        </label>
                    }
                </div>
                <DragAndDrop handleDrop={this.handleDrop} viewOnly={this.props.viewOnly}>
                    <div className="container-file-list">
                        {this.state.files.map(file =>
                            <ItemFile
                                key={file.uid}
                                uid={file.uid}
                                url={file.url}
                                handleRemove={this.handleRemove}
                                viewOnly={this.props.viewOnly}
                            />
                        )}
                    </div>
                </DragAndDrop>
            </div>
        )
    }
}

export default FileList;
