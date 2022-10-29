import { ArrayToSort } from 'helpers/ArrayToSort';

export const wrapper = {
    height: 500,
    indent: 20
};
export const arrayToSort = new ArrayToSort();
export const id = {
    arraySizeForm: 'array-size',
    canvas: 'canvas',
    controls: 'controls',
    wrapper: 'wrapper'
};

export const colors = {
    default: '#ff0000',
    info: '#0000ff',
    success: '#00ff00'
};

export const isDebug = new URLSearchParams(window.location.search).get('debug') === 'true';
