import { arrayToSort, colors, isDebug, wrapper } from './config';
import { getNodes } from './helpers';

const { getArray } = arrayToSort;

function getArrayData() {
    const array = getArray();

    return {
        array,
        size: array.length
    };
}

function getCommonDrawParams() {
    const { canvas: canvasNode } = getNodes();
    const { size: arraySize } = getArrayData();
    const context = canvasNode.getContext('2d')!;
    const columnWidth = canvasNode.width / arraySize / 2;

    return {
        columnWidth,
        context,
        heightMultiplier: wrapper.height / arraySize
    };
}

function getItemParameters(index: number) {
    const { columnWidth, heightMultiplier } = getCommonDrawParams();
    const { array, size: arraySize } = getArrayData();

    const item = array[index];
    const currentIndent = index * columnWidth + index * columnWidth + (index * columnWidth) / (arraySize - 1);
    const currentHeight = item * heightMultiplier;

    return {
        currentHeight,
        currentIndent,
        item
    };
}

function drawItem(index: number, isSuccess: boolean) {
    const { columnWidth, context, heightMultiplier } = getCommonDrawParams();
    const { currentHeight, currentIndent, item } = getItemParameters(index);
    const color = isSuccess ? colors.success : colors.default;
    const { array } = getArrayData();

    context.fillStyle = color;
    context.fillRect(currentIndent, wrapper.height - currentHeight, columnWidth, item * heightMultiplier);

    if (isDebug) {
        if (index === 0 || index === array.length - 1) {
            context.fillStyle = colors.info;
            context.fillText(`${item}`, currentIndent, 20);
        }
    }
}

export function drawGraphInstantly(isSuccess = false) {
    const { array } = getArrayData();

    array.forEach((_, index) => drawItem(index, isSuccess));
}

function isLesser(a: number, b: number) {
    return a < b;
}

function clearCurrentPair(indexList: [number, number]) {
    const { columnWidth, context } = getCommonDrawParams();

    function clearItem({ currentIndent }: ReturnType<typeof getItemParameters>) {
        const correctionValue = columnWidth / 2;

        context.clearRect(-correctionValue + currentIndent, 0, columnWidth + correctionValue * 2, wrapper.height);
    }

    indexList.forEach(itemIndex => {
        clearItem(getItemParameters(itemIndex));
    });
}

function drawCurrentPair(indexList: [number, number]) {
    indexList.forEach(item => drawItem(item, false));
}

export let drawTimer: ReturnType<typeof window.setTimeout>;

function drawByStep() {
    window.clearTimeout(drawTimer);
    const { array } = getArrayData();

    (async () => {
        for (let index = 0; index < array.length; index++) {
            const bIndex = index + 1;
            const b = array[bIndex];

            const lastElementIsChecked = b === undefined;

            if (lastElementIsChecked) {
                drawGraphInstantly(true);
                break;
            }

            const aIndex = index;
            const a = array[aIndex];

            if (!isLesser(a, b)) {
                array[bIndex] = a;
                array[aIndex] = b;
                await new Promise<void>(res => {
                    drawTimer = setTimeout(() => {
                        const indexPair: [number, number] = [bIndex, aIndex];

                        clearCurrentPair(indexPair);
                        drawCurrentPair(indexPair);
                        res();
                    });
                });
                drawByStep();
                break;
            }
        }
    })();
}

export function sort() {
    drawByStep();
}
