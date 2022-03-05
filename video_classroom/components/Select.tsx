import React from 'react';
import styled from 'styled-components';

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
    values?: string[];
}

export const Select: React.FC<SelectProps> = ({
    values = [],
    ...props
}): React.ReactElement => {
    const mapValues = (values: string[]): React.ReactNode[] => 
        values.map((val, index) => <option key={index}>{val}</option>)
    
    return (
        <StyledSelect>
            {mapValues(values)}
        </StyledSelect>
)};

const StyledSelect = styled.select`
    border: 1.5px solid rgba(0,0,0,0.1);
`

export default Select;