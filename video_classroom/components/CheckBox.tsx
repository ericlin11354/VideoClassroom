import React, { RefObject } from 'react';
import styled from 'styled-components';
import SmallText from './Text/SmallText';

export interface CheckBoxProps extends React.HTMLAttributes<HTMLInputElement> {
    label?: string;
    inputRef?: RefObject<HTMLInputElement>;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
    label,
    inputRef,
}): React.ReactElement => (
    <StyledDiv>
        <input ref={inputRef} type="checkbox"/>
        <SmallText>{label}</SmallText>
    </StyledDiv>
);

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export default CheckBox;