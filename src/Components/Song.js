import React from 'react'
import { useParams } from 'react-router'

function Song() {
    const { id } = useParams()
    console.log('User ID: ', id)
    return (
        <div>Song ID: {id}</div>
    )
}

export default Song