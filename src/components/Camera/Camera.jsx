import React from 'react'
import './Camera.css'

export default class Camera extends React.Component {
    render() 
    {
        return (
            <div className="camera">
                { this.props.children }
            </div>
        )
    }
}