import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { addImage, getImages } from './redux/actions'

const TOOLS = ['Pencil', 'Rectangle', 'Circle', 'Line']

export const Paint = (): JSX.Element => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const secondCanvasRef = useRef(null)
    const secondContextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
    const [selectedTool, setSelectedTool] = useState(TOOLS[0])

    const dispatch = useDispatch()

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 0.8
        canvas.height = window.innerHeight * 0.8
        const context = canvas.getContext('2d')
        contextRef.current = context
        context.lineCap = 'round'
        context.lineWidth = 3
        context.strokeStyle = '#999'

        const secondCanvas = secondCanvasRef.current
        secondCanvas.width = window.innerWidth * 0.8
        secondCanvas.height = window.innerHeight * 0.8
        const secondContext = secondCanvas.getContext('2d')
        secondContextRef.current = secondContext
    }, [])

    const updateImg = (): void => {
        secondContextRef.current.drawImage(canvasRef.current, 0, 0)
        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
    }

    const startDraw = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement>): void => {
        const { x, y } = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(x, y)

        setIsDrawing(true)
        setStartX(x)
        setStartY(y)
    }

    const finishDraw = (): void => {
        contextRef.current.closePath()
        updateImg()
        setIsDrawing(false)
    }

    const draw = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement>): void => {
        if (!isDrawing) {
            return
        }
        const { x, y } = nativeEvent

        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
        switch (selectedTool) {
            case 'Line':
                contextRef.current.beginPath()
                contextRef.current.moveTo(startX, startY)
                contextRef.current.lineTo(x, y)
                break
            case 'Circle':
                const getRaduis = (): number => {
                    return Math.sqrt(
                        Math.pow(y - startY, 2) + Math.pow(x - startX, 2)
                    )
                }

                contextRef.current.beginPath()
                contextRef.current.arc(
                    startX,
                    startY,
                    getRaduis(),
                    0,
                    Math.PI * 2,
                    true
                )
                break
            case 'Pencil':
                contextRef.current.lineTo(x, y)
                break
            case 'Rectangle':
                const x0 = Math.min(x, startX),
                    y0 = Math.min(y, startY),
                    w = Math.abs(x - startX),
                    h = Math.abs(y - startY)

                contextRef.current.strokeRect(x0, y0, w, h)
                break
            default:
                break
        }

        contextRef.current.stroke()
    }

    const save = (): void => {
        dispatch(addImage(secondCanvasRef.current.toDataURL()))
        dispatch(getImages())
    }

    const clear = (): void => {
        secondContextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
    }

    return (
        <>
            <button onClick={clear}>clear</button>
            <button onClick={save}>save</button>
            <select
                name="Tools"
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
            >
                {TOOLS.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <div className="paint-container">
                <div id="viewport">
                    <canvas
                        id="canvas"
                        onMouseUp={finishDraw}
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        ref={canvasRef}
                    />
                    <canvas id="temp_canvas" ref={secondCanvasRef} />
                </div>
            </div>
        </>
    )
}
