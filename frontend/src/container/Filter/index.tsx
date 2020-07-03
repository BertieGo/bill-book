import React from 'react';
import isFunction from 'lodash/isFunction';
import { DatePicker, Row, Col } from 'antd';
import CategorySelector from '../../components/CategorySelector';
import { TMoment, IFilterProps } from '../../declare';

export default class Filter extends React.Component<IFilterProps, {}> {

    onMonthChange = (month: TMoment) => {
        const { onMonthChange } = this.props;
        if (isFunction(onMonthChange)) {
            onMonthChange(month ? month.format('YYYY-MM') : '')
        }
    }

    render() {
        const {
            onCategoryChange,
            categories,
            isFisFetchingBillCategories,
        } = this.props;

        return (
            <Row className="mb20">
                <Col span={2} className="title">
                    筛选：
                </Col>
                <Col span={4}>
                    <span>月份：</span>
                    <DatePicker placeholder="请选择月份" onChange={this.onMonthChange} picker="month" />
                </Col>
                <Col span={4}>
                    <span>类型：</span>
                    <CategorySelector
                        onChange={onCategoryChange}
                        categories={categories}
                        isFisFetchingBillCategories={isFisFetchingBillCategories}
                    />
                </Col>
            </Row>
        )
    }
}
