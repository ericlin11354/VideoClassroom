import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { MainTheme } from '../styles/MainTheme';
import { Heading, HeadingProps } from './Text';

export interface CounterProps extends HeadingProps {
    icon?: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
}

export const Counter: React.FC<CounterProps> = ({
    icon,
    type = 'span',
    size = 'small',
    children,
    color = MainTheme.colors.text,
    ...props
}): React.ReactElement => (
    <StyledDiv {...props} >
        <Heading color={color} type={type} size={size} >{children}</Heading>
        {icon && <Icon color={color} as={icon} />}
    </StyledDiv>
);

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 5px;
`;

const Icon = styled.svg<{ color: string, as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> }>`
    width: 20px;
    height: 20px;
    ${({ color }) => `
        color: ${color};
    `}
`

export default Counter;