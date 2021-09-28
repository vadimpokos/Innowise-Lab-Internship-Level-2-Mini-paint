import styled from "styled-components";
import { ICanvas } from "./types";

export const ViewPort = styled.div`
    width: 80vw;
    height: 80vh;
    border: solid;
    margin: 0 auto;
`


export const Canvas = styled.canvas`
    position: absolute;
    background-color: transparent;
    z-index: ${(props: ICanvas) => props.zIndex}
`