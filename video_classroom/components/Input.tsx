import { MainTheme} from '../styles/MainTheme';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    icon?: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
}

export const Input: React.FC<InputProps> = ({
    placeholder,
    icon,
    ...props
}): React.ReactElement => (
    <StyledForm>
        <input type="text" placeholder={placeholder} />
        {icon && <Icon as={icon} />}
    </StyledForm>
);

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    height: 30px;
`

const Icon = styled.svg<{ as: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> }>`
    background-color: ${MainTheme.colors.background};
    padding: 5px;
`
export default Input;