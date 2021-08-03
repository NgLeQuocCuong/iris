import React, { PureComponent } from 'react';

class Search extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
    }
    handleChange = value => {
        this.setState({
            data: value,
        })
    }
    handleSearch = () => {
        if (this.state.data !== '') {
            if (this.props.handleSearch && {}.toString.call(this.props.handleSearch) === '[object Function]') {
                this.props.handleSearch(this.state.data)
            } else {
                alert('This function is not implement')
            }
        }
    }
    render() {
        return (
            <div className={`default-search ${this.props.className || ''}`}>
                <input
                    className='input-search'
                    placeholder={this.props.placeHolder ? this.props.placeHolder : '...'}
                    onChange={e => this.handleChange(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') this.handleSearch()
                    }}
                />
                <div className='search-icon icon24' onClick={this.handleSearch} />
            </div>
        );
    }
}

export default Search;