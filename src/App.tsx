import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import './App.css'

function App(): JSX.Element {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const context = canvas.getContext('2d')
        contextRef.current = context
    }, [])

    const startDraw = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement>): void => {
        const { x, y } = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(x, y)
        setIsDrawing(true)
    }

    const finishDraw = (): void => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const draw = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement>): void => {
        if (!isDrawing) {
            return
        }
        const { x, y } = nativeEvent
        contextRef.current.lineTo(x, y)
        contextRef.current.stroke()
    }

    const clear = (): void => {
        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
    }

    const save = (): void => {
        setImages((prev) => [...prev, canvasRef.current.toDataURL()])
    }

    return (
        <>
            <button onClick={clear}>clear</button>
            <button onClick={save}>save</button>
            <canvas
                id="canvas"
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseUp={finishDraw}
                onMouseDown={startDraw}
                onMouseMove={draw}
                ref={canvasRef}
            />
            {images.length
                ? images.map((item, index) => (
                      <img key={index} src={`${item}`} alt="img" />
                  ))
                : null}
        </>
    )
}

export default App
