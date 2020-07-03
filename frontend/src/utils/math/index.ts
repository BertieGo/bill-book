export const fixedFloat = (float: number) => {
    return Number(float.toFixed(4));
}

export const floorFloat = (float: number) => {
    return Math.floor(float * 100) / 100;
}

export const getPercent = (denominator: number, decimal: number) => {
    return fixedFloat((denominator / decimal) * 100);
}
