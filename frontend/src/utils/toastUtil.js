import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';
import ToastType from './constants/enums/ToastType';

class Toast extends Component {

    actionMethod = (msg, type, duration) => {
        if (type === ToastType.TOAST_TYPE_DEFAULT) {
            return this.showInfoMsg(msg);
        } else if (type === ToastType.TOAST_TYPE_ERROR) {
            return this.showErrorMsg(msg, duration);
        } else if (type === ToastType.TOAST_TYPE_SUCCESS) {
            return this.showSuccessMsg(msg);
        } else if (type === ToastType.TOAST_TYPE_WARNING) {
            return this.showWarningMsg(msg);
        } else {
            return this.showInfoMsg(msg);
        }
    }

    showDefaultMsg = (msg) => {
        toast(msg, {
            position: toast.POSITION.BOTTOM_LEFT,
            type: toast.TYPE.DEFAULT,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true
        });
    }

    showErrorMsg = (msg, duration) => {
        toast(
            <div className="toast-content">
                <i className="ic-toast-error icon-16"></i>
                <label className="toast-content-msg">{msg}</label>
            </div>
            , {
                position: toast.POSITION.BOTTOM_LEFT,
                type: toast.TYPE.ERROR,
                autoClose: duration || 10000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-common',
            });
    }

    showWarningMsg = (msg) => {
        toast(
            <div className="toast-content">
                <i className="ic-toast-warning icon-16"></i>
                <label className="toast-content-msg">{msg}</label>
            </div>
            , {
                position: toast.POSITION.BOTTOM_LEFT,
                type: toast.TYPE.WARNING,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-common',
            });
    }

    showInfoMsg = (msg) => {
        toast(
            <div className="toast-content">
                <i className="ic-toast-success icon-16"></i>
                <label className="toast-content-msg">{msg}</label>
            </div>
            , {
                position: toast.POSITION.BOTTOM_LEFT,
                type: toast.TYPE.SUCCESS,
                autoClose: 7000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-common',
            });
    }

    showSuccessMsg = (msg) => {
        toast(
            <div className="toast-content">
                <i className="ic-toast-success icon-default icon-16"></i>
                <label className="toast-content-msg">{msg}</label>
            </div>
            , {
                position: toast.POSITION.BOTTOM_LEFT,
                type: toast.TYPE.SUCCESS,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: 'toast-common',
            });
    }

    render() {
        const { message, type, duration } = this.props;
        return (
            <div>
                {this.actionMethod(message, type, duration)}
                <ToastContainer
                    className="toast-container"
                    closeButton={false}
                    transition={Slide}
                    newestOnTop={true}
                />
            </div>
        )
    }
}

const showToastMssg = (msg) => {
    if (!msg) {
        msg = 'Success.';
    }
    ReactDOM.render(<Toast message={msg} />
        , document.getElementById('toastDivElm'));

}
const showDefaultMsg = (msg) => {
    if (msg === void 0) {
        msg = 'Notification.';
    }
    ReactDOM.render(<Toast message={msg} type={ToastType.TOAST_TYPE_DEFAULT} />
        , document.getElementById('toastDivElm'));

}
const showErrorMsg = (msg, duration) => {
    if (msg === void 0) {
        msg = 'Error.';
    }
    console.log('render toasttt');
    ReactDOM.render(<Toast message={msg} type={ToastType.TOAST_TYPE_ERROR} duration={duration} />
        , document.getElementById('toastDivElm'));

}
const showSuccessMsg = (msg) => {
    if (msg === void 0) {
        msg = 'Success.';
    }
    ReactDOM.render(<Toast message={msg} type={ToastType.TOAST_TYPE_SUCCESS} />
        , document.getElementById('toastDivElm'));

}

const showWarningMsg = (msg) => {
    if (!msg) {
        msg = 'Warning.';
    }
    ReactDOM.render(<Toast message={msg} type={ToastType.TOAST_TYPE_WARNING} />
        , document.getElementById('toastDivElm'));
}

export const toastUtil = {
    showDefaultMsg,
    showToastMssg,
    showErrorMsg,
    showSuccessMsg,
    showWarningMsg,
}