import React from 'react';
import { TextLayout, TextLayoutProps } from '../Layouts/TextLayout';

export type SmallTextProps = TextLayoutProps

// inline text without a big margin like in Heading
export const SmallText: React.FC<SmallTextProps> = ({
    children,
    type = 'span',
    size = 'small',
    color = 'text',
    ...props
}): React.ReactElement => (
    <TextLayout type={type} size={size} color={color} {...props}>
        {children}
    </TextLayout>
);

export default SmallText;
