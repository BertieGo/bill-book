import React from 'react';
import CategorySelector from './index';
import renderer from 'react-test-renderer';
import createReactAppJestPolyfill from '../../utils/test/polyfill';

createReactAppJestPolyfill();

test('COMPONENT-TEST: CategorySelector', () => {
    const data = [{
        id: '8s0p77c323',
        time: "2019-06-30T16:00:00.000Z",
        name: '支出',
        type: 0,
        _id: '5efdc622c42bdc4067a47c5c'
    }];

    const tree = renderer
        .create(<CategorySelector categories={data as any[]} isFisFetchingBillCategories={false} onChange={() => {}}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});


