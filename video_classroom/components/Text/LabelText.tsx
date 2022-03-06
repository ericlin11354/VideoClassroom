import { Heading } from './Heading';
import { MainTheme } from '../../styles/MainTheme';
import React from 'react';
import styled from 'styled-components';

export interface LabelTextProps extends React.HTMLAttributes<HTMLDivElement> {
    //left side bolded text
    label?: string;
    clickable?: boolean;
    onClick?: React.MouseEventHandler;
}

// Component has bolded text on left and normal text on right
export const LabelText: React.FC<LabelTextProps> = ({
    label,
    children,
    clickable = false,
    ...props
}): React.ReactElement => (
    <StyledDiv>
        <Heading bold={true} size="small">{label}:</Heading>
        <Text size="small" clickable={clickable}>{children}</Text>
    </StyledDiv>
);

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 5px;
`;

const Text = styled(Heading)<{ clickable: boolean}>`
    ${({ clickable })=> 
        clickable ? `
            color: ${MainTheme.colors.hyperlink};
            cursor: pointer;

        ` : ``
    };
`;

export default LabelText;