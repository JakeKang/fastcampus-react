import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

/*
export default function LoginButton({history}) {
    return <button onClick={click}>로그인하기</button>

    function click() { 
        setTimeout(()=> {
            history.push("/"); // history는 부모에게 있으므로 전달해줘야 한다.
        }, 1000)
    }
}
*/

function LoginButton( {history} ) {
    return <button onClick={click}>로그인하기</button>

    function click() { 
        setTimeout(()=> {
            history.push("/"); // withRouter 를 이용하면 부모에게서 전달이 없어도 된다.
        }, 1000)
    }
}

export default withRouter(LoginButton);

// withRouter(Component) => NewComponent


// connect() => function => function(Component) => NewComponent
// connect(설정) (Component) => NewComponent
// export default connect()(Component);

// createFragmentContainer(Component, 설정) => NewComponent


// Component;

// class NewComponent extends React.Component {
//     render() {
//         return <div>
//             <Component />
//         </div>
//     }
// }

