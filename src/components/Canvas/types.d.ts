export interface IProps {
    canvasRef?: MutableRefObject<HTMLCanvasElement | null>
    secondCanvasRef?: MutableRefObject<HTMLCanvasElement | null>
    contextRef?: MutableRefObject<CanvasRenderingContext2D | null>
    secondContextRef?: MutableRefObject<CanvasRenderingContext2D | null>
    selectedTool: string
    lineWidth: number
    color: string
}
