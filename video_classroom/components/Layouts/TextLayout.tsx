import React from 'react';
import styled from 'styled-components';
import {
    MainTheme
} from '../../styles/MainTheme';

export interface TextLayoutProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: string;
    lineHeight?: number | string;
    bold?: boolean;
    italic?: boolean;
    size?: string;
    // ranges from h1 to h6
    type?: string;
    textAlign?: string;
}

export const TextLayout: React.FC<TextLayoutProps> = ({
    children,
    color = 'text',
    size = 'default',
    type,
    ...props
}): React.ReactElement => (
    <Text as={type as 'span'} size={size} color={color} {...props}>
        {children}
    </Text>
);

// avoid index signature warning by getting object key type
type themeKey = keyof typeof MainTheme.colors;
type sizeKey = keyof typeof MainTheme.font.size;

const Text = styled.p<TextLayoutProps>`

    ${({
        theme,
        bold,
        italic,
        lineHeight,
        color = 'text',
        size = 'default',
        textAlign = 'left',
    }): string => `
        color: ${MainTheme.colors[color as themeKey] || color};
        font-size: ${MainTheme.font.size[size as sizeKey] || size};
        line-height: ${MainTheme.font.lineHeight || lineHeight};
        font-weight: ${bold ? 'bold' : 'normal'};
        font-style: ${italic ? 'italic' : 'normal'};
        text-align:${textAlign};
    `}
`;

export default TextLayout;