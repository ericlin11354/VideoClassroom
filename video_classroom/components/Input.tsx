import { MainTheme} from '../styles/MainTheme';
import React, { ForwardedRef, ForwardRefExoticComponent, RefAttributes, RefObject } from 'react';
import styled from 'styled-components';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    icon?: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
    inputRef?: RefObject<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({
    placeholder,
    icon,
    inputRef,
    ...props
}): React.ReactElement => (
    <StyledDiv>
        <input ref={inputRef} type="text" placeholder={placeholder} />
        {icon && <Icon as={icon} />}
    </StyledDiv>
);

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
`

const Icon = styled.svg<{ as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> }>`
    background-color: ${MainTheme.colors.background};
    padding: 5px;
`
export default Input;