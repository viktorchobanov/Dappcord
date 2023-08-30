import React from 'react';
import blockies from 'blockies';

const MetamaskAvatar = ({ address }) => {
    const options = {
        seed: address.toLowerCase(), // Use the Ethereum address as the seed
        size: 10, // Set the size of the avatar
        scale: 3, // Scale factor
    };

    const avatarDataURL = blockies(options).toDataURL();

    return (
        <img
            src={avatarDataURL}
            alt={`Metamask Avatar for ${address}`}
            width={options.size * options.scale}
            height={options.size * options.scale}
        />
    );
};

export const Avatar = ({ address }) => {
    return (
        <MetamaskAvatar address={address} size={24} />
    )
}