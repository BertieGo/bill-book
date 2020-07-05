import { IHSLColor } from '../../declare';
import { getRandomNumberByRang } from '../math';

export const getRandomColor = () => {

    const hueRang = [0, 360]; // 色相
    const saturationRang = [20, 80]; // 饱和度
    const luminanceRang = [20, 80]; // 亮度

    const hueDiff = 70; // 下一个色相值超过 70
    const saturationDiff = 10; // 下一个饱和度值超过 10
    const luminanceDiff = 10; // 下一个亮度超过 10


    let pervColor = {};

    // 在规定范围内生成下一个颜色
    const getRandomColorByRang = () => {
        const hue = getRandomNumberByRang(hueRang[0], hueRang[1]);
        const saturation = getRandomNumberByRang(saturationRang[0], saturationRang[1]);
        const luminance = getRandomNumberByRang(luminanceRang[0], luminanceRang[1]);
        return {
            hue,
            saturation,
            luminance,
        }
    }

    // 是否足够不同
    const isDissimilarity = (pervColor: IHSLColor, nextColor: IHSLColor) => {
        return Math.abs(nextColor.hue - pervColor.hue) >= hueDiff &&
            Math.abs(nextColor.saturation - pervColor.saturation) >= saturationDiff &&
            Math.abs(nextColor.luminance - pervColor.luminance) >= luminanceDiff
    }

    // 生成对应的 HSL 颜色
    const getHSLColor = (color: IHSLColor) => {
        return `hsl(${color.hue}, ${color.saturation}%, ${color.luminance}%)`;
    }

    // 递归生成满足条件的色值
    return function generate() :string {
        const nextColor = getRandomColorByRang();
        if (Object.keys(pervColor).length === 0 || isDissimilarity(pervColor as IHSLColor, nextColor)) {
            pervColor = nextColor;
            return (getHSLColor(nextColor));
        }
        return generate();
    }
}


