import { id } from './config';

export function getNodes() {
    return {
        canvas: document.getElementById(id.canvas) as HTMLCanvasElement,
        controls: document.getElementById(id.controls) as HTMLElement,
        wrapper: document.getElementById(id.wrapper)
    };
}
