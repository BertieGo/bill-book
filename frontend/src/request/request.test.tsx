import React from 'react';
import {
    getBillList,
    getBillCategories,
    addBillItem,
} from './index';

test('API-TEST: getBillList', (done) => {
    const query = {
        time: '2019-07'
    }
    getBillList(query).then((res) => {
        expect(res.code).toEqual(0);
        expect(Array.isArray(res.data)).toBe(true);
        done();
    });
});

test('API-TEST: getBillCategories', (done) => {

    getBillCategories().then((res) => {
        expect(res.code).toEqual(0);
        expect(Array.isArray(res.data)).toBe(true);
        expect(res.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    type: expect.any(Number),
                    name: expect.any(String),
                    time: expect.any(String),
                })
            ]))
        done();
    });
});

test('API-TEST: addBillItem', (done) => {

    const param = {
        time: '1593792004410',
        category: '8s0p77c323',
        amount: 1024.24
    }

    addBillItem(param).then((res) => {
        expect(res.code).toEqual(0);
        expect(res.data).toBe('添加成功');
        done();
    });
});


