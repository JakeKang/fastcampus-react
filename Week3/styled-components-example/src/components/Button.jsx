import React from 'react';
import styled, {css} from 'styled-components';

const StyledButton = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;

    ${props =>
        props.primary &&
        css`
          background: palevioletred;
          color: white;
    `};
`;

// 컴포넌트 전체를 스타일 해서 넘기는 법
const StyledBUtton2 = styled(StyledButton)` 

`;

export default function Button(props) {
    return <StyledButton {...props} />

}