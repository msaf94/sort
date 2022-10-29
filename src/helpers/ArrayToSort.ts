export interface ArrayToSort {
    array: number[];
    size: number;
}

const defaultArraySize = 100;

export class ArrayToSort {
    constructor(size?: number) {
        this.setArray(size ?? defaultArraySize);
    }

    private getRandomNumber(from = 0, to: number) {
        return Math.round(Math.random() * (from + (to - from)));
    }

    private getShuffledArray = (size: number) => {
        const orderedArray = Array(size)
            .fill(undefined)
            .map((_, index) => index + 1);

        const usedIndexList: number[] = [];
        const result: number[] = [];

        for (let index = 0; index < this.size; index++) {
            let randomIndex: null | number = null;

            while (randomIndex === null || usedIndexList.includes(randomIndex)) {
                randomIndex = this.getRandomNumber(0, this.size - 1);
            }

            usedIndexList.push(randomIndex);

            result[index] = orderedArray[randomIndex];
        }

        return result;
    };

    setArray = (size: number) => {
        this.size = size ?? defaultArraySize;
        this.array = this.getShuffledArray(this.size);
    };

    getArray = () => {
        return this.array;
    };
}
