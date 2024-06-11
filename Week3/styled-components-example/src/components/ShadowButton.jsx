import React from 'react';
import root from 'react-shadow';

// 문자열 영역
const style = `
button {
    color : red;
}
`;

export default function ShadowButton() {
    return (
        <root.div>
            <button>버튼</button>
            <style>{style}</style>
        </root.div>
    )
}

// <style>{style}</style> // 문자열이 그대로 들어온다.
// button 스타일은 많지만 다른 영역이므로 여기서 작성된 스타일만 지정됨