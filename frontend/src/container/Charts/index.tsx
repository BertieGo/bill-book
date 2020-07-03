import React from 'react';
import { Row, Col, Empty} from 'antd';
import Pie from '../../components/Pie';
import Bar from '../../components/Bar';

import { IChartsProps, IBill} from '../../declare';

export default class Charts extends React.Component<IChartsProps, {}> {

    renderChart = (data: IBill[]) => {
        return (
            <Row>
                <Col span={14}><Bar data={data}/></Col>
                <Col className="vm" span={10}><Pie data={data} /></Col>
            </Row>
        )
    }

    render() {
        const { categoryBillData, typeBillData } = this.props;

        return (
            <Row>
                <Col span={12} className="mt20">
                    <div className="mb10 title">
                        收入/支出统计：
                    </div>
                    {
                        typeBillData.length > 0 ? this.renderChart(typeBillData) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        )
                    }
                </Col>
                <Col span={12} className="mt20">
                    <div className="mb10 title">
                        支出类型统计：
                    </div>
                    {
                        categoryBillData.length > 0 ? this.renderChart(categoryBillData) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        )
                    }
                </Col>
            </Row>
        )
    }
}
