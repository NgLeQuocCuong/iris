import React, { PureComponent } from 'react';

class Pagination extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.currentPage,
            inputPage: this.props.totalRows ? this.props.currentPage : 0,
            pTotal: Math.ceil((this.props.totalRows) / (this.props.pageSize)),
        };
    }
    testnumber = /^[0-9\b]+$/;
    pSite = () => {
        if (this.props.totalRows) {
            return ((this.state.currentPage - 1) * this.props.pageSize + 1) + '-' + Math.min(this.state.currentPage * this.props.pageSize, this.props.totalRows) + ' của ' + (this.props.totalRows)
        } else {
            return '0-0 của 0'
        }
    }
    pPrint = () => {
        if (this.props.totalRows) {
            return (this.state.currentPage) + '/' + (Math.ceil((this.props.totalRows) / (this.props.pageSize)))
        } else {
            return '0/0'
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentPage !== this.props.currentPage || prevProps.totalRows !== this.props.totalRows) {
            this.setState({
                currentPage: this.props.currentPage,
                inputPage: this.props.totalRows ? this.props.currentPage : 0,
                pTotal: Math.ceil((this.props.totalRows) / (this.props.pageSize)),
            })
        }
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value === '' || !this.testnumber.test(e.target.value) || (e.target.value === '0')) {
                e.target.value = this.state.currentPage
            }
            else {
                if (e.target.value > this.state.pTotal) {
                    e.target.value = this.state.pTotal
                }
                this.props.apiPagination(parseInt(e.target.value), this.props.pageSize)
                this.setState({
                    inputPage:parseInt(e.target.value)
                })
            }
        }
    }
    handleBlur = (e) => {
        this.setState({
            inputPage: this.state.currentPage,
        })
    }
    handleClickLeft = (e) => {
        this.props.apiPagination(parseInt(this.state.currentPage) - 1, this.props.pageSize);
    }

    handleClickRight = (e) => {
        this.props.apiPagination(parseInt(this.state.currentPage) + 1, this.props.pageSize);
    }

    onPageChange(value) {
        if (this.testnumber.test(value) || value === '') {
            this.setState({
                inputPage: value
            });
        }
    }

    render() {
        return (
            <div className="flex-container">
                <div className="pFlex pLeft">
                    <p className="page-p"><span className='textTwo'>{this.props.leftLabel ? this.props.leftLabel : 'Sites:'}</span>{this.pSite()}</p>
                </div>
                <div>
                    <div className="pagination margin-auto">
                        <div className={'page-item' + (this.props.currentPage === 1 ? ' disabled' : '')}>
                            <button className="page-link shadow-none page-button btn-left" onClick={this.handleClickLeft}>
                            </button>
                        </div>
                        <div className="page-item" aria-current="page">
                            <input
                                className="page-link shadow-none page-input"
                                type="text"
                                value={this.state.inputPage}
                                onKeyDown={this.handleKeyDown}
                                onBlur={this.handleBlur}
                                onChange={e => this.onPageChange(e.target.value)}
                            />
                        </div>
                        <div className={'page-item' + (this.props.currentPage === this.state.pTotal ? ' disabled' : '')}>
                            <button className="page-link shadow-none page-button btn-right" onClick={this.handleClickRight} >
                            </button>
                        </div>
                    </div>
                </div>
                <div className="pFlex pRight">
                    <p className="page-pRight">{this.pPrint()}</p>
                </div>
            </div>
        )
    }
}
export default Pagination; 
