import React from "react";
import {Col, Row, Tooltip} from "antd";
import cloneDeep from "lodash/cloneDeep";
import isEqual from 'lodash/isEqual';

import {IChartProps, IPathItem} from "../../declare";
import {fixedFloat, floorFloat, getPercent} from "../../utils/math";

export default class Bar extends React.Component<IChartProps, {}>{

    shouldComponentUpdate(nextProps: Readonly<IChartProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return !isEqual(nextProps.data, this.props.data);
    }

    makeRowData = () => {
        const { data } = this.props;
        let dataCopy = cloneDeep(data);
        if (data.length > 0) {
            dataCopy = dataCopy.sort((prev, next) => next.amount - prev.amount);
            const maxPercent = dataCopy[0].percent;
            dataCopy.forEach(item => {
                item.barPercent = getPercent(item.percent, maxPercent)
            })
        }
        return dataCopy;
    }

    renderRow = (item: IPathItem) => {

        const displayPercent = `${floorFloat(item.percent)}%`;
        const displayAmount = fixedFloat(item.amount);

        return (
            <Row>
                <Tooltip title={`金额: ${displayAmount} 占比：${displayPercent}`}>
                    <Col span={20}>
                        <div className="row-bar" style={{ width: `${item.barPercent}%`, backgroundColor: item.color }}/>
                    </Col>
                </Tooltip>
                <Col span={4}>
                    <span className="ml20">{ displayAmount }</span>
                </Col>
            </Row>
        )
    }

    renderRowChart = (item: IPathItem) => {
        return (
            <Row className="mb10" key={item._id}>
                <Col span={4}>{ item.title }：</Col>
                <Col span={8}>{ this.renderRow(item) }</Col>
            </Row>
        )
    }

    render() {
        const data = this.makeRowData();
        return (
            <div>
                {
                    data.map(this.renderRowChart)
                }
            </div>
        )
    }
}
