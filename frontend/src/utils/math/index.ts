export const fixedFloat = (float: number) => {
    return Number(float.toFixed(4));
}

export const floorFloat = (float: number) => {
    return Math.floor(float * 10000) / 10000;
}

export const getPercent = (denominator: number, decimal: number) => {
    return fixedFloat((denominator / decimal) * 100);
}

export const getRandomNumberByRang = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
