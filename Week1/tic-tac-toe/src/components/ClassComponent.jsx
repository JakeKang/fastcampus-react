import React from 'react';


/*
export class ClassComponent extends React.Component {

}
*/
// import {ClassComponent} from './ClassComponent';


export default class ClassComponent extends React.Component { // ClassCompinet가 React.Componet를 상속받는다.
    render() {
        return <p>ClassComponent</p>;
    }
}
//import ClassComponent from './ClassComponent'; 방식으로 ClassComponent 사용가능