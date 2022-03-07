import React, { RefObject } from 'react';
import styled from 'styled-components';

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
    values?: string[];
    setSelected?: (newSelection: string) => void,
    selectRef?: RefObject<HTMLSelectElement>;
    onClick?: React.MouseEventHandler;
}

export const Select: React.FC<SelectProps> = ({
    values = [],
    setSelected,
    selectRef,
    onClick = () => null,
    ...props
}): React.ReactElement => {
    const mapValues = (values: string[]): React.ReactNode[] => 
        values.map((val, index) => <option key={index}>{val}</option>)
        
    const handleChange = (event: { target: { value: string; }; }) => {
        setSelected && setSelected(event.target.value);
    }
    
    return (
        <StyledSelect ref={selectRef} onChange={handleChange} onClick={onClick}>
            {mapValues(values)}
        </StyledSelect>
)};

const StyledSelect = styled.select`
    min-width: 75px;
    border: 1.5px solid rgba(0,0,0,0.1);
`

export default Select;