import React from 'react'
import './Hero.css'

export default class Hero extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            facing: ['DOWN', 'UP', 'LEFT', 'RIGHT'],
            facingIndex: 0,
            walking: false,
            x: props.x,
            y: props.y,
            speed: 1
        }
    }

    keyboardDownHandler()
    {
        document.addEventListener("keydown", (e)=> {
            switch (e.code) {
                case 'ArrowDown':
                    this.setFacingIndex(0)
                    this.setWalking(true)
                    break
                case 'ArrowUp':
                    this.setFacingIndex(1)
                    this.setWalking(true)
                    break
                case 'ArrowLeft':
                    this.setFacingIndex(2)
                    this.setWalking(true)
                    break
                case 'ArrowRight':
                    this.setFacingIndex(3)
                    this.setWalking(true)
                    break
                default:
            }
        })
    }

    keyboardUpHandler()
    {
        document.addEventListener("keyup", (e)=> {
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                this.setFacingIndex(0)
                this.setWalking(false)
            }
        })
    }

    setFacingIndex(index)
    {
        this.setState({
            ...this.state,
            facingIndex: index
        })
    }

    getDirection()
    {
        return this.state.facing[this.state.facingIndex].toLowerCase()
    }

    getWalking()
    {
        return this.state.walking ? "true" : "false"
    }

    setWalking(value)
    {
        this.setState({
            ...this.state,
            walking: value
        })
    }

    placeHero()
    {
        if (this.state.walking === false) {
            return
        }

        let x = this.state.x
        let y = this.state.y

        switch (this.state.facingIndex) {
            case 0: 
                y += this.state.speed
                break
            case 1: 
                y -= this.state.speed
                break
            case 2: 
                x -= this.state.speed
                break
            case 3: 
                x += this.state.speed
                break
            
        }
        this.props.onPositionChange(x, y)

        this.setPlayerPosition(x, y)

        this.setState({
            ...this.state,
            y: y,
            x: x
        })
    }

    step() 
    {
        this.placeHero()
        window.requestAnimationFrame(()=> {
            this.step()
        })
    }

    setPlayerPosition(x, y)
    {
        let pixelSize = this.getComputedStyle('--pixel-size')
        let hero = document.querySelector('.hero')
        hero.style.transform = `translate3d( ${ x * pixelSize }px, ${ y * pixelSize }px, 0 )`
    }

    getComputedStyle(cssVariable)
    {
        return parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(cssVariable)
        )
    }

    componentDidMount()
    {
        this.setPlayerPosition(this.state.x, this.state.y)
        this.keyboardDownHandler()
        this.keyboardUpHandler()
        this.step()
    }

    render() 
    {
        return (
            <div className="hero" facing={ this.getDirection() } walking={ this.getWalking() }>
                <div className="hero-spritesheet pixel-art"></div>
                <div className="shadow pixel-art"></div>
            </div>
        )
    }
}