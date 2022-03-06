import { SmallText } from './SmallText';
import React from 'react'
import styled from 'styled-components';

export interface HistoryTextProps extends React.HTMLAttributes<HTMLDivElement>{
    title?: string;
};

export const HistoryText: React.FC<HistoryTextProps> = ({
    title,
    children,
    ...props
}): React.ReactElement => (
    <StyledDiv>
        <SmallText bold={true} size="small" {...props} >{children}</SmallText>
        <SmallText bold={true} italic={true} size="small" {...props} >{title}</SmallText>
    </StyledDiv>
);

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 5px;
`;


export default HistoryText;