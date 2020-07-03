import { Moment } from 'moment';

export type TMoment = Moment | null;

export interface IPathItem {
    title: string,
    amount: number,
    percent: number,
    barPercent: number,
    color: string,
}

export interface IChartProps {
    data: IBill[]
}

export interface IBill {
    categories_cn_name: string,
    amount: number,
    type: number,
    time: Date,
    category: string,
    percent: number,
    title: string,
    color: string,
    barPercent: number,
}

export interface IBillTableProps {
    loading: boolean,
    data: IBill[]
}

export interface ICategory {
    id: string,
    name: string,
    type: number,
}

export interface ICategorySelectorProps {
    onChange?: (value: string) => void,
    categories: ICategory[],
    isFisFetchingBillCategories: boolean,
}

export interface IFilterProps extends Pick<ICategorySelectorProps, Exclude<keyof ICategorySelectorProps, 'onChange'>> {
    onMonthChange: (mouth: string) => void,
    onCategoryChange: (value: string) => void,
}

export interface IBillQuery {
    time?: string,
    category?: string,
    type?: number,
}

export interface IBillAmountListItem {
    balance: number,
    percent: number,
    title: string,
    type: number
}

export interface IAppState {
    isFetchingBill: boolean,
    billList: IBill[],
    billCategories: ICategory[],
    isFetchingBillCategories: boolean,
    billAmountList: IBillAmountListItem[],
}

export interface IFilter {
    time: string,
    category: string
}

export interface IAddBillParam {
    amount: number,
    time: Moment,
    category: string
}

export interface IAddBillFormProps {
    categories: ICategory[],
    isFisFetchingBillCategories: boolean,
    onAddBillItem: (param: IAddBillParam) => void
}

export interface IParamsObject {
    [key: string]: any
}

export interface IChartsProps {
    categoryBillData: IBill[],
    typeBillData: IBill[]
}
