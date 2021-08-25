import { Button, Select, Slider } from 'antd'
import { SelectValue } from 'antd/lib/select'
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
    const [lineWidth, setlineWidth] = useState(5)
    const [color, setColor] = useState('#776e6e')

    const [deltaY, setDeltaY] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = parent.innerWidth * 0.8
        canvas.height = parent.innerHeight * 0.8
        const context = canvas.getContext('2d')
        contextRef.current = context
        context.lineCap = 'round'

        const secondCanvas = secondCanvasRef.current
        secondCanvas.width = parent.innerWidth * 0.8
        secondCanvas.height = parent.innerHeight * 0.8
        const secondContext = secondCanvas.getContext('2d')
        secondContextRef.current = secondContext

        setDeltaY(document.getElementById('tools').clientHeight + 10)
    }, [])

    const deltaX = (): number => {
        return (window.innerWidth - canvasRef.current.width) / 2 - 10
    }

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
        contextRef.current.moveTo(x - deltaX(), y - deltaY)

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

        contextRef.current.lineWidth = lineWidth
        contextRef.current.strokeStyle = color

        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
        switch (selectedTool) {
            case 'Line':
                contextRef.current.beginPath()
                contextRef.current.moveTo(startX - deltaX(), startY - deltaY)
                contextRef.current.lineTo(x - deltaX(), y - deltaY)
                break
            case 'Circle':
                const getRaduis = (): number => {
                    return Math.sqrt(
                        Math.pow(y - startY, 2) + Math.pow(x - startX, 2)
                    )
                }

                contextRef.current.beginPath()
                contextRef.current.arc(
                    startX - deltaX(),
                    startY - deltaY,
                    getRaduis(),
                    0,
                    Math.PI * 2,
                    true
                )
                break
            case 'Pencil':
                contextRef.current.lineTo(x - deltaX(), y - deltaY)
                break
            case 'Rectangle':
                const x0 = Math.min(x, startX) - deltaX(),
                    y0 = Math.min(y, startY) - deltaY,
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
            <div id="tools">
                <Button onClick={clear}>clear</Button>
                <Button onClick={save}>save</Button>
                <Select
                    value={selectedTool}
                    onChange={(e: SelectValue) => setSelectedTool(`${e}`)}
                >
                    {TOOLS.map((item, index) => (
                        <Select.Option key={`${index}`} value={item}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>

                <input
                    type="color"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <Slider
                    value={lineWidth}
                    onChange={(value: string | number) => setlineWidth(+value)}
                />
            </div>

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
        </>
    )
}
