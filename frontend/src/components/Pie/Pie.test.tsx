import React from 'react';
import Pie from './index';
import renderer from 'react-test-renderer';
import createReactAppJestPolyfill from '../../utils/test/polyfill';

createReactAppJestPolyfill();

test('COMPONENT-TEST: Pie', () => {
    const data = [{
        amount: 2672740,
        category: '8s0p77c323',
        color: "#72a935",
        percent: 55.4886,
        time: "2019-06-30T16:00:00.000Z",
        title: '支出',
        type: 0,
        _id: '5efdc622c42bdc4067a47c5c'
    }];

    const tree = renderer
        .create(<Pie data={data as any[]}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});


