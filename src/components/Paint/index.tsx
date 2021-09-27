import { Button, Select, Slider } from 'antd'
import { SelectValue } from 'antd/lib/select'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImage, getImages } from '../../redux/imagesReducer/actions'
import { RootState } from '../../redux/rootReducer'
import { TOOLS } from '../../constants/tools'
import { Canvas } from '../Canvas'
import { openNotification } from '../../utils/notification'

const PaintComponent = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const secondCanvasRef = useRef<HTMLCanvasElement | null>(null)
    const secondContextRef = useRef<CanvasRenderingContext2D | null>(null)

    const [selectedTool, setSelectedTool] = useState(TOOLS[0])
    const [lineWidth, setlineWidth] = useState(5)
    const [color, setColor] = useState('#776e6e')

    const user = useSelector((state: RootState) => state.user.user)

    const dispatch = useDispatch()

    const save = (): void => {
        if (secondCanvasRef.current) {
            dispatch(
                addImage(
                    secondCanvasRef.current.toDataURL(),
                    user.uid,
                    user.displayName,
                    user.photoURL
                )
            )
            dispatch(getImages())
        } else {
            openNotification({
                message: 'Something go wrong',
                description: 'Cannot get canvas',
            })
        }
    }

    const clear = (): void => {
        secondContextRef.current?.clearRect(
            0,
            0,
            canvasRef.current ? canvasRef.current.width : 0,
            canvasRef.current ? canvasRef.current.height : 0
        )
        contextRef.current?.clearRect(
            0,
            0,
            canvasRef.current ? canvasRef.current.width : 0,
            canvasRef.current ? canvasRef.current.height : 0
        )
    }

    const handleToolSelect = (e: SelectValue): void => {
        setSelectedTool(`${e}`)
    }

    const handleColorSelect = (e: {
        target: { value: React.SetStateAction<string> }
    }): void => {
        setColor(e.target.value)
    }

    const handleLineWidthSlider = (value: string | number): void => {
        setlineWidth(+value)
    }

    return (
        <>
            <div id="tools">
                <Button onClick={clear}>clear</Button>
                <Button onClick={save}>save</Button>
                <Select value={selectedTool} onChange={handleToolSelect}>
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
                    onChange={handleColorSelect}
                />
                <Slider value={lineWidth} onChange={handleLineWidthSlider} />
            </div>

            <Canvas
                canvasRef={canvasRef}
                contextRef={contextRef}
                secondCanvasRef={secondCanvasRef}
                secondContextRef={secondContextRef}
                selectedTool={selectedTool}
                lineWidth={lineWidth}
                color={color}
            />
        </>
    )
}

export const Paint = React.memo(PaintComponent)
