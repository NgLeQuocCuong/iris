import React, { PureComponent } from 'react'
import AdminNavType from '../../utils/constants/enums/AdminNavType'
import IconAndTextButton from '../../utils/IconAndTextButton'

export default class AdminNavigator extends PureComponent {
    render() {
        const navList = [
            {
                type: AdminNavType.BOOK,
                icon: 'book-icon',
                text: 'Sách',
            },
            {
                type: AdminNavType.USER,
                icon: 'person-icon',
                text: 'Người dùng',
            },
            {
                type: AdminNavType.CATEGORY,
                icon: 'category-icon',
                text: 'Thể loại',
            },
            {
                type: AdminNavType.AUTHOR,
                icon: 'person-icon',
                text: 'Tác giả',
            },
        ]
        return (
            <div class='admin-navigator'>
                {navList.map(item =>
                    <IconAndTextButton
                        key={item.type}
                        texts={[{ text: item.text }]}
                        icons={[{ icon: `icon24 ${item.icon}` }]}
                        click={() => this.props.setActive(item.type)}
                        className={this.props.active === item.type ? 'active' : ''}
                    />)
                }
            </div>
        )
    }
}
