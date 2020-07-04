import React from "react";
import {Tooltip} from "antd";
import isEqual from "lodash/isEqual";

import {IChartProps, IPathItem} from "../../declare";
import {fixedFloat, floorFloat} from "../../utils/math";


const FULL_CIRCLE_RADIUS = 360;

const HALF_CIRCLE_RADIUS = FULL_CIRCLE_RADIUS / 2;

export default class Pie extends React.Component<IChartProps, {}>{

    private width: number;

    private height: number;

    constructor(props: IChartProps) {
        super(props);
        this.width = 200;
        this.height = 200;
    }

    shouldComponentUpdate(nextProps: Readonly<IChartProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        const { data } = this.props;
        return !isEqual(nextProps.data, data);
    }

    renderPath = () => {
        const { data } = this.props;
        const paths: JSX.Element[] = [];

        const radius = this.width / 2;

        const cx = this.width / 2;
        const cy = this.height / 2;

        let sx = this.width;
        let sy = this.height / 2;

        let prevPercent = 0;

        data.forEach((item: IPathItem) => {

            const currentPercent = (item.percent / 100) + prevPercent;

            const currentRadius = currentPercent * FULL_CIRCLE_RADIUS;

            const ex = floorFloat(cx + radius * Math.cos( currentRadius * Math.PI / HALF_CIRCLE_RADIUS));
            const ey = floorFloat(cy + radius * Math.sin( currentRadius * Math.PI / HALF_CIRCLE_RADIUS));

            const largeArcFlag = (item.percent / 100) * FULL_CIRCLE_RADIUS > HALF_CIRCLE_RADIUS ? '1' : '0';

            const displayPercent = `${floorFloat(item.percent)}%`;
            const displayAmount = fixedFloat(item.amount);

            paths.push(
                <Tooltip key={item._id} title={(<div className="nowrap">{`类型：${item.title} 金额: ${displayAmount} 占比：${displayPercent}`}</div>)}>
                    <path d={`M${sx} ${sy} A ${radius} ${radius}, 0, ${largeArcFlag}, 1, ${ex} ${ey} L ${cx} ${cy} Z`} fill={item.color}/>
                </Tooltip>
            )

            sx = ex;
            sy = ey;
            prevPercent = currentPercent;
        })

        return paths;
    }


    render() {
        return (
            <div>
                <svg width={`${this.width}px`} height={`${this.height}px`} version="1.1" xmlns="http://www.w3.org/2000/svg">
                    { this.renderPath() }
                </svg>
            </div>
        )
    }
}
