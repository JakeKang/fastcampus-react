import React from 'react';

export default function Profile(props) {
    const id = Number(props.match.params.id); //params
    if (isNaN(id)) {
        return <h1>Profile List</h1>
    }
    return <h1>Profile : {id}</h1>;
}