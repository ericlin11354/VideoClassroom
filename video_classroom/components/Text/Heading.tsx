// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { TextLayout, TextLayoutProps } from '../Layouts/TextLayout';

export type HeadingProps = TextLayoutProps

enum elements {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6',
}

export const Heading: React.FC<HeadingProps> = ({
    children,
    type = 'h1',
    size = elements[type in elements] || elements.h1,
    ...props
}): React.ReactElement => (
    <TextLayout type={type} size={size} {...props}>
        {children}
    </TextLayout>
);

export default Heading;
