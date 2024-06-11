import React from 'react';
import queryString from "query-string";

export default function About(props) {
    //console.log(props.location.search); // ?name=Kang 위치

    // const params = new URLSearchParams(props.location.search);
    // console.log(params.get("name")); // 익스플로러에서는 지원하지 않는다. (브라우저 내장객체)

    const { name } = queryString.parse(props.location.search);
    console.log(name);
    
    if (name === undefined) {
        return <h1>About: no name</h1>
    }
    return <h1>About: {name}</h1>;
}