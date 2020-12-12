import React from 'react'
import Hero from './../Hero/Hero'
import './Map.css'

export default class Map extends React.Component 
{
    buildMap(height, width)
    {
        let map = {}

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (map[x] === undefined) {
                    map[x] = {}
                }

                map[x][y] = null
            }
        }
        
        return map
    }

    getComputedStyle(cssVariable)
    {
        return parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(cssVariable)
        )
    }

    getInitHeroPosX()
    {
        return this.getComputedStyle('--camera-width') / 2
    }

    getInitHeroPosY()
    {
        return this.getComputedStyle('--camera-height') / 2
    }

    updateMapPosition(x, y)
    {
        let pixelSize = this.getComputedStyle('--pixel-size')
        let posX = -x * pixelSize + this.getInitHeroPosX() * pixelSize
        let posY = -y * pixelSize + this.getInitHeroPosY() * pixelSize

        let map = document.querySelector('.map')
        map.style.transform = `translate3d( ${ posX }px, ${ posY }px, 0 )`
    }

    render() 
    {
        let posX = this.getInitHeroPosX()
        let posY = this.getInitHeroPosY()

        return (
            <div className="map pixel-art">
                <Hero onPositionChange={ this.updateMapPosition.bind(this) } x={ posX } y={ posY }></Hero>
            </div>
        )
    }
}