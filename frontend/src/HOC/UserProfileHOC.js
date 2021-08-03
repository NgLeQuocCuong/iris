import React, { PureComponent } from 'react'
import ProfileContext from '../context/ProfileContext'

const withUserProfile = WrappedComponent =>
    class UserProfileHOC extends PureComponent {
        render() {
            return <ProfileContext.Consumer>
                {
                    context => <WrappedComponent
                        userProfile={context}
                        {...this.props}
                    />
                }
            </ProfileContext.Consumer>
        }
    }
export default withUserProfile;
