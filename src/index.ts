import { drawGraphInstantly, drawTimer } from 'draw';

import { getNodes } from 'helpers';
import { drawNodes } from 'helpers/drawNodes';

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
