import React from 'react';

const ProfileContext = React.createContext({
    name: null,
    isAdmin: false,
    uid: null,
    reloadUserData: () => { },
});

export default ProfileContext;