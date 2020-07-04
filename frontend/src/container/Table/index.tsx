import React from 'react';
import { Table } from 'antd';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import { IBillTableProps, IBill } from '../../declare';

const columns = [
    {
        title: '收/支',
        dataIndex: 'type',
        render: (type: number) => {
            return type === 0 ? '支出' : '收入';
        },
    },
    {
        title: '时间',
        dataIndex: 'time',
        render: (time: Date) => {
            return moment(time).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    {
        title: '类型',
        dataIndex: 'title',
    },
    {
        title: '金额（￥）',
        dataIndex: 'amount',
        sorter: (prev: IBill, next: IBill) => prev.amount - next.amount,
    },
];

export default class BillTable extends React.Component<IBillTableProps, {}>{

    shouldComponentUpdate(nextProps: Readonly<IBillTableProps>, nextState: Readonly<{}>, nextContext: {}): boolean {
        return !isEqual(this.props.data, nextProps.data);
    }

    render() {
        const { loading, data } = this.props;
        return (
            <div className="mt20">
                <div className="mb10 title">
                    账单：
                </div>
                <Table loading={loading} columns={columns} dataSource={data} />
            </div>
        )
    }
}
