import React from 'react';
import { MetaMaskAvatar } from 'react-metamask-avatar';

export const Avatar = ({ address }) => {
    return (
        <MetaMaskAvatar address={address} size={24} />
    )
}