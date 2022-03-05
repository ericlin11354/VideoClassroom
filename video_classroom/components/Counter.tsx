import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';
import { MainTheme } from '../styles/MainTheme';
import { Heading, HeadingProps } from './Text';

export interface CounterProps extends HeadingProps{
    icon?: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
}

export const Counter: React.FC<CounterProps> = ({
    icon,
    type = 'span',
    size = 'small',
    children,
    ...props
}): React.ReactElement => (
    <StyledDiv >
        <Heading type={type} size={size} {...props} >{children}</Heading>
        {icon && <Icon as={icon} />}
    </StyledDiv>
);

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 5px;
`;

const Icon = styled.svg<{ as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> }>`
    width: 20px;
    height: 20px;
`

export default Counter;