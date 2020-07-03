import { get, post } from '../utils/request';
import { IBillQuery, IAddBillParam } from '../declare';

export function getBillList(query: IBillQuery) {
    return get('/api/bill', query)
}

export function getBillCategories() {
    return get('/api/bill/categories')
}

export function addBillItem(item: IAddBillParam) {
    return post('/api/bill', item, '添加成功')
}
