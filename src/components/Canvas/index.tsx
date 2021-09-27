import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { IProps } from './types'
import './styles.css'

const CanvasComponent: React.FC<IProps> = ({
    canvasRef,
    secondCanvasRef,
    secondContextRef,
    contextRef,
    selectedTool,
    lineWidth,
    color,
}) => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)

    const canvasRefInner = useRef<HTMLCanvasElement | null>(null)
    const contextRefInner = useRef<CanvasRenderingContext2D | null>(null)
    const secondContextRefInner = useRef<CanvasRenderingContext2D | null>(null)
    const secondCanvasRefInner = useRef<HTMLCanvasElement | null>(null)

    const viewportRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const canvas = canvasRefInner.current
        if (canvas) {
            canvas.width = viewportRef.current?.clientWidth || 0
            canvas.height = viewportRef.current?.clientHeight || 0
            const context = canvas.getContext('2d')
            contextRefInner.current = context
            context ? (context.lineCap = 'round') : null
        }

        canvasRef ? (canvasRef.current = canvasRefInner.current) : null
        contextRef ? (contextRef.current = contextRefInner.current) : null

        const secondCanvas = secondCanvasRefInner.current
        if (secondCanvas) {
            secondCanvas.width = viewportRef.current?.clientWidth || 0
            secondCanvas.height = viewportRef.current?.clientHeight || 0
            const secondContext = secondCanvas?.getContext('2d')
            secondContextRefInner.current = secondContext
        }

        secondCanvasRef
            ? (secondCanvasRef.current = secondCanvasRefInner.current)
            : null
        secondContextRef
            ? (secondContextRef.current = secondContextRefInner.current)
            : null
    }, [canvasRef, contextRef, secondCanvasRef, secondContextRef])

    const deltaX = (): number => {
        const canvasWidth = canvasRefInner.current
            ? canvasRefInner.current.width
            : 0
        return (window.innerWidth - canvasWidth) / 2
    }

    const deltaY = (): number => {
        const sliderPadding = 12
        const toolsHeight = document.getElementById('tools')
            ? document.getElementById('tools')?.clientHeight
            : 0
        const pageHeaderHeight = document.getElementById('page-header')
            ? document.getElementById('page-header')?.clientHeight
            : 0

        return (toolsHeight || 0) + (pageHeaderHeight || 0) + sliderPadding
    }

    const updateImg = (): void => {
        secondContextRefInner.current?.drawImage(
            canvasRefInner.current ? canvasRefInner.current : canvasRef.current,
            0,
            0
        )
        contextRefInner.current?.clearRect(
            0,
            0,
            canvasRefInner.current ? canvasRefInner.current.width : 0,
            canvasRefInner.current ? canvasRefInner.current.height : 0
        )
    }

    const startDraw = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement>): void => {
        const { x, y } = nativeEvent
        contextRefInner.current?.beginPath()
        contextRefInner.current?.moveTo(x - deltaX(), y - deltaY())

        setIsDrawing(true)
        setStartX(x)
        setStartY(y)
    }

    const finishDraw = (): void => {
        contextRefInner.current?.closePath()
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

        contextRefInner.current
            ? (contextRefInner.current.lineWidth = lineWidth)
            : 5
        contextRefInner.current
            ? (contextRefInner.current.strokeStyle = color)
            : 'Black'

        contextRefInner.current?.clearRect(
            0,
            0,
            canvasRefInner.current ? canvasRefInner.current.width : 0,
            canvasRefInner.current ? canvasRefInner.current.height : 0
        )
        switch (selectedTool) {
            case 'Line':
                contextRefInner.current?.beginPath()
                contextRefInner.current?.moveTo(
                    startX - deltaX(),
                    startY - deltaY()
                )
                contextRefInner.current?.lineTo(x - deltaX(), y - deltaY())
                break
            case 'Circle':
                const getRaduis = (): number => {
                    return Math.sqrt(
                        Math.pow(y - startY, 2) + Math.pow(x - startX, 2)
                    )
                }

                contextRefInner.current?.beginPath()
                contextRefInner.current?.arc(
                    startX - deltaX(),
                    startY - deltaY(),
                    getRaduis(),
                    0,
                    Math.PI * 2,
                    true
                )
                break
            case 'Pencil':
                contextRefInner.current?.lineTo(x - deltaX(), y - deltaY())
                break
            case 'Rectangle':
                const x0 = Math.min(x, startX) - deltaX(),
                    y0 = Math.min(y, startY) - deltaY(),
                    w = Math.abs(x - startX),
                    h = Math.abs(y - startY)

                contextRefInner.current?.strokeRect(x0, y0, w, h)
                break
            default:
                break
        }

        contextRefInner.current?.stroke()
    }

    return (
        <div id="viewport" ref={viewportRef}>
            <canvas
                id="canvas"
                onMouseUp={finishDraw}
                onMouseDown={startDraw}
                onMouseMove={draw}
                ref={canvasRefInner}
            />
            <canvas id="temp_canvas" ref={secondCanvasRefInner} />
        </div>
    )
}

export const Canvas = React.memo(CanvasComponent)
