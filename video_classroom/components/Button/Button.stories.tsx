import React from 'react';
import { Search } from '@mui/icons-material/';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '.';

export default {
    title: 'Button',
    component: Button,
    argTypes: { onClick: { action: 'Button Click Occurred' } },
    args: {
        icon: Search,
        color: 'white',
        contentColor: 'black',
        iconSize: '14px',
        children: 'Hello World!',
    },
} as Meta;

export const Basic: Story<ButtonProps> = (args) => (
    <Button {...args} />
);