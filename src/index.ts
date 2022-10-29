import { drawGraphInstantly, drawTimer } from 'draw';

import { drawNodes } from 'helpers/drawNodes';
import { getNodes } from 'helpers/getNodes';

let resizeTimer: ReturnType<typeof window.setTimeout>;

export function init() {
    const { wrapper } = getNodes();

    window.clearTimeout(drawTimer);
    if (wrapper) {
        wrapper.replaceChildren();
    }

    drawNodes();
    drawGraphInstantly();
}

window.addEventListener('DOMContentLoaded', () => {
    init();

    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = setTimeout(init, 300);
    });
});
