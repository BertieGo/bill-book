import React from 'react';
import { DatePicker, Form, Button, Input, Row, Col } from 'antd';
import isFunction from 'lodash/isFunction';

import CategorySelector from '../../components/CategorySelector';
import { IAddBillFormProps, IParamsObject } from '../../declare';
import { MSG_FORM } from '../../constants';


export default class AddBillForm extends React.Component<IAddBillFormProps, {}> {

    onFinish = (values: IParamsObject) => {
        const { onAddBillItem } = this.props;

        const param = {
            time: values.time.format('x'),
            amount: +values.amount,
            category: values.category
        }

        if (isFunction(onAddBillItem)) {
            onAddBillItem(param)
        }
    }

    render() {
        const {
            categories,
            isFisFetchingBillCategories,
        } = this.props;

        return (
            <Form onFinish={this.onFinish}>
                <Row>
                    <Col className="title" span={2}>录入：</Col>
                    <Col span={4}>
                        <Form.Item name="time" label="时间" rules={[{ type: 'object', required: true, message: MSG_FORM.TIME_REQUIRED }]}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={MSG_FORM.TIME_REQUIRED}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="category" label="类型" rules={[{ type: 'string', required: true, message: MSG_FORM.CATEGORY_REQUIRED }]}>
                            <CategorySelector
                                categories={categories}
                                isFisFetchingBillCategories={isFisFetchingBillCategories}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item name="amount" label="金额" rules={[{ type: 'string', required: true, message: MSG_FORM.AMOUNT_REQUIRED }]}>
                            <Input placeholder={MSG_FORM.AMOUNT_REQUIRED} type="number"/>
                        </Form.Item>
                    </Col>
                    <Col span={2} className="ml30">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">添加</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}
