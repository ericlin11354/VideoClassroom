import { MainTheme } from '../styles/MainTheme';
import React, { ForwardedRef, ForwardRefExoticComponent, RefAttributes, RefObject } from 'react';
import styled from 'styled-components';
import SmallText from './Text/SmallText';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    icon?: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
    inputRef?: RefObject<HTMLInputElement>;
    label?: string;
}

export const Input: React.FC<InputProps> = ({
    placeholder,
    icon,
    inputRef,
    label,
    ...props
}): React.ReactElement => (
    <StyledDiv {...props} >
        {label && <SmallText>{label}</SmallText>}
        <InputContainer>
            <StyledInput ref={inputRef} type="text" placeholder={placeholder} />
            {icon && <Icon as={icon} />}
        </InputContainer>
    </StyledDiv>
);

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledInput = styled.input`
    border: none;
    width: 100%;
`;

const Icon = styled.svg<{ as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> }>`
    background-color: ${MainTheme.colors.input};
    padding: 5px;
    height: 30px;
    width: 30px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid ${MainTheme.colors.stroke};
`;

export default Input;