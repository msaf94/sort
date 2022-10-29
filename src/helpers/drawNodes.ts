import { arrayToSort, id, wrapper as wrapperConfig } from 'config';
import { sort } from 'draw';
import { init } from 'index';

import { getNodes } from 'helpers';

function drawWrapperNode() {
    const node = document.createElement('main');

    node.id = id.wrapper;
    node.style.padding = `${wrapperConfig.indent}px`;
    node.style.height = `${wrapperConfig.height + wrapperConfig.indent * 2}px`;

    document.body.appendChild(node);
}

function drawCanvasNode() {
    const node = document.createElement('canvas');
    const { wrapper: wrapperNode } = getNodes();

    node.id = id.canvas;

    node.width = window.innerWidth - wrapperConfig.indent * 2;
    node.height = wrapperConfig.height;
    if (wrapperNode) {
        wrapperNode.appendChild(node);
    }
}

function drawControlsNode() {
    const { wrapper: wrapperNode } = getNodes();

    const controlsNode = document.createElement('div');

    controlsNode.id = id.controls;

    const sortControl = document.createElement('button');

    sortControl.textContent = 'Sort';
    sortControl.onclick = sort;

    controlsNode.appendChild(sortControl);
    if (wrapperNode) {
        wrapperNode.appendChild(controlsNode);
    }
}

function drawArraySizeFormNode() {
    const formNode = document.createElement('form');
    const formInputNode = document.createElement('input');
    const formButtonNode = document.createElement('button');

    formNode.id = id.arraySizeForm;
    formInputNode.type = 'number';
    formInputNode.placeholder = 'Array size';
    formButtonNode.textContent = 'Set array size';
    formNode.appendChild(formInputNode);
    formNode.appendChild(formButtonNode);
    formNode.onsubmit = e => {
        e.preventDefault();
        const newSize = Number(formInputNode.value);

        if (newSize) {
            arrayToSort.setArray(newSize);
            init();
        }
    };
    const { wrapper: wrapperNode } = getNodes();

    if (wrapperNode) {
        wrapperNode.appendChild(formNode);
    }
}

export function drawNodes() {
    drawWrapperNode();
    drawCanvasNode();
    drawArraySizeFormNode();
    drawControlsNode();
}
