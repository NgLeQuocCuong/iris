import React, { PureComponent } from 'react';
import Search from './Search';
import IconAndTextButton from './IconAndTextButton';
import { routeConstants } from './constants/RouteConstant'
import IndexItem from './IndexItem';
import ProfileContext from '../context/ProfileContext';
import HoverWrapper from './HoverWrapper';
import { ProfileServices } from '../services/ProfileServices';

class PageHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            indexIsShowed: false,
            focus: null,
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    focus = uid => {
        this.setState({
            focus: uid,
        })
    }
    handleLogout = async (reloadUserData) => {
        await ProfileServices.logout()
        localStorage['access'] = ''
        localStorage['refresh'] = ''
        reloadUserData()

    }
    resetFocus = () => {
        this.setState({
            focus: null,
        })
    }
    render() {
        return (
            <div className='main-header'>
                <div className='content-wrapper'>
                    <div className='flex-align-left'>
                        <a href={routeConstants.ROUTE_ROOT}>
                            <div className='logo' />
                        </a>
                        <IconAndTextButton
                            texts={[{
                                text: 'TRANG CHỦ',
                                href: routeConstants.ROUTE_ROOT,
                            }]}
                        />
                        <div onMouseLeave={this.resetFocus} className='flexbox'>
                            <HoverWrapper
                                toggle={this.props.toggle}
                                rootComponent={<IconAndTextButton
                                    className='pointer'
                                    icons={[
                                        { icon: 'arrow-down-icon icon24' },
                                    ]}
                                    texts={[{
                                        text: 'DANH MỤC SÁCH',
                                    }]}
                                    revert={true}
                                    click={this.showIndex}
                                />}
                                childComponent={
                                    this.props.categories?.length ?
                                        <div className='hover-table'>
                                            {this.props.categories.map(item =>
                                                <HoverWrapper
                                                    position='left'
                                                    rootComponent={<IndexItem
                                                        key={item.uid}
                                                        label={item.label}
                                                        children={item.children || null}
                                                        url={'/the-loai/' + item.uid}
                                                        onMouseOver={() => this.focus(item.uid)}
                                                        className={this.state.focus === item.uid ? 'focus' : ''}
                                                    />}
                                                    childComponent={
                                                        (item.children && item.children.length) ? <div className='hover-table'>
                                                            {item.children.map(child =>
                                                                <IndexItem
                                                                    key={child.uid}
                                                                    label={child.label}
                                                                    children={child.children || null}
                                                                    url={'/the-loai/' + child.uid}
                                                                />
                                                            )}
                                                        </div> : null}
                                                >
                                                </HoverWrapper>
                                            )}
                                        </div> :
                                        <div className='hover-table'>
                                            <IndexItem
                                                label='Không có danh mục nào'
                                                className='disable'
                                            />
                                        </div>
                                }
                            />
                        </div>
                        <Search
                            placeHolder='Bạn cần tìm gì ...'
                        />
                    </div>
                    <div className='flex-align-right'>
                        <ProfileContext.Consumer>
                            {
                                profile => profile.uid === null ?
                                    <IconAndTextButton
                                        className='custom-text-seperator'
                                        icons={[
                                            { icon: 'account-icon icon24' },
                                        ]}
                                        texts={[{
                                            text: 'Đăng nhập',
                                            href: routeConstants.ROUTE_LOGIN,
                                        },
                                        {
                                            text: 'Đăng kí',
                                            href: routeConstants.ROUTE_SIGNIN,
                                        }]}
                                        textSeperator='/'
                                    /> :
                                    <HoverWrapper
                                        position='align-right'
                                        rootComponent={<IconAndTextButton
                                            icons={[
                                                { icon: 'account-icon icon24' },
                                            ]}
                                            texts={[{
                                                text: profile.name,
                                            }]}
                                        />}
                                        childComponent={
                                            <div className='hover-table'>

                                                {profile.isAdmin ?
                                                    <IndexItem
                                                        key='1'
                                                        label='Quản lý hệ thống'
                                                        className='account-menu'
                                                        url={routeConstants.ROUTE_ADMIN}
                                                    /> :
                                                    <IndexItem
                                                        key='1'
                                                        label='Quản lý tài khoản'
                                                        className='account-menu'
                                                        url={routeConstants.ROUTE_ACCOUNT}
                                                    />}
                                                <IndexItem
                                                    key='2'
                                                    label='Đăng xuất'
                                                    className='account-menu'
                                                    onClick={() => this.handleLogout(profile.reloadUserData)}
                                                />
                                            </div>
                                        }
                                    />
                            }
                        </ProfileContext.Consumer>
                    </div>
                </div>
            </div >
        );
    }
}

export default PageHeader;