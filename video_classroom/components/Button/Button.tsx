import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    color?: string;
    contentColor?: string;
    iconSize?: string;
    onClick?: React.MouseEventHandler;
}

interface IconProps {
    hasChildren?: boolean;
    iconSize?: string;
    as?: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
}

export const Button: React.FC<ButtonProps> = ({
    icon,
    color = 'white',
    contentColor = 'black',
    iconSize = '14px',
    children,
    ...props
}): React.ReactElement => (
    <StyledButton 
        color={color} 
        contentColor={contentColor} 
        {...props} >
            {icon && (
                <Icon
                    iconSize={iconSize}
                    as={icon}
                    hasChildren={!!children}
                />
            )}
            {children}
    </StyledButton>
);

const StyledButton = styled.button<ButtonProps>`
    ${({ color, contentColor }) => `
        background-color: ${color};
        color: ${contentColor};
    `}
    justify-content: center;
    align-items: center;
    font-weight: bold;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    position: relative;
    border: 1.5px solid rgba(0,0,0,0.1);
    border-radius: 999px;
    font-size: 0.95rem;
    padding: 10.5px 18.5px;
`;

const Icon = styled.svg<IconProps>`
    ${({ iconSize }) => `
        height: ${iconSize};
        width: ${iconSize};
    `}
    margin-right: ${({ hasChildren }): number => (hasChildren ? 8 : 0)}px;
`;