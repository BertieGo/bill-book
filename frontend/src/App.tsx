import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

import { Spin, message } from 'antd';

import BillTable from "./container/Table";
import Filter from './container/Filter';
import AddBillForm from './container/AddBillForm';
import Charts  from "./container/Charts";
import { BILL_TYPE } from './constants';
import { IBill, IAppState, IFilter, IAddBillParam, IPathItem } from './declare';

import { getBillList, getBillCategories, addBillItem } from './request';
import {getRandomColor} from "./utils/color";

import './App.css';
import { getPercent} from "./utils/math";

class App extends React.Component<{}, IAppState> {

    private filter: IFilter;

    constructor(props: {}) {
        super(props);
        this.state = {
            billList: [],
            isFetchingBill: true,

            billCategories: [],
            isFetchingBillCategories: true,

            billAmountList: []
        }

        this.filter = {
            time: '',
            category: ''
        }
    }

    componentDidMount() {
        this.setBillData();
        this.setBillCategories();
    }

    setBillData = () => {
        const { time, category } = this.filter;

        this.setState({
            isFetchingBill: true,
        }, () => {
            getBillList({
                time,
                category,
            }).then((res) => {
                this.setState({
                    billList: res.data,
                    isFetchingBill: false
                })
            })
        })
    }

    setBillCategories = () => {
        this. setState({
            isFetchingBillCategories: true
        }, () => {
            getBillCategories().then((res) => {
                this.setState({
                    billCategories: res.data,
                    isFetchingBillCategories: false,
                });
            })
        })
    }

    onMonthChange = (time: string) => {
        this.filter.time = time || '';
        this.setBillData();
    }

    onCategoryChange = (category: string) => {
        this.filter.category = category || '';
        this.setBillData()
    }

    onAddBillItem = (item: IAddBillParam) => {
        addBillItem(item).then(() => {
            this.setBillData()
        })
    }

    combineBillItem = (bill: IBill[], field: keyof IBill) => {
        const result: IBill[] = [];
        bill.forEach((item: IBill) => {
            const target = result.find((i: IBill) => i[field] === item[field]);
            if (target) {
                target.amount += item.amount;
            } else {
                result.push(item);
            }
        });
        return result;
    }

    getSum = (bill: IBill[]) => {
        return bill.reduce((prev: number, next: IBill) => {
            return prev + next.amount
        }, 0);
    }

    getTypeBillData = () => {
        const { billList } = this.state;
        let copy = cloneDeep(billList);
        let result = this.combineBillItem(copy, 'type');

        const sum = this.getSum(result);

        result.forEach((item: IBill) => {
            item.percent = getPercent(item.amount, sum);
            item.title = BILL_TYPE[item.type];
            item.color = getRandomColor();
        })

        if (result.length === 1) {
            result.push({
                title: BILL_TYPE[Number(!result[0].type)],
                percent: 0,
                amount: 0,
            } as IBill)
        }

        return result;
    }

    getCategoryBillData = () => {
        const { billList } = this.state;
        let copy = cloneDeep(billList);

        copy = copy.filter(item => item.type === 0).sort((perv, next) => perv.amount - next.amount);

        const result = this.combineBillItem(copy, 'category');

        const sum = this.getSum(result);

        result.forEach((item: IBill) => {
            item.percent = getPercent(item.amount, sum);
            item.color = getRandomColor()
        })

        return result;
    }

    render() {
        const { isFetchingBill, isFetchingBillCategories, billList, billCategories } = this.state;
        return (
            <div className="container">
                <Filter
                    onMonthChange={this.onMonthChange}
                    categories={billCategories}
                    onCategoryChange={this.onCategoryChange}
                    isFisFetchingBillCategories={isFetchingBillCategories}
                />
                <AddBillForm
                    isFisFetchingBillCategories={isFetchingBillCategories}
                    categories={billCategories}
                    onAddBillItem={this.onAddBillItem}
                />
                {
                    isFetchingBill ? <Spin/> : (
                        <React.Fragment>
                            <Charts
                                categoryBillData={this.getCategoryBillData()}
                                typeBillData={this.getTypeBillData()}
                            />
                            <BillTable loading={isFetchingBill} data={billList} />
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default App;
