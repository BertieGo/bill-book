import React from 'react';
import {Select} from 'antd';
import isFunction from 'lodash/isFunction';
import {ICategorySelectorProps} from '../../declare';
import {MSG_FORM} from '../../constants';
import isEqual from "lodash/isEqual";

const {Option} = Select;

export default class CategorySelector extends React.Component<ICategorySelectorProps, {}> {

    shouldComponentUpdate(nextProps: Readonly<ICategorySelectorProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        const {categories, isFisFetchingBillCategories} = this.props;
        return !isEqual(nextProps.categories, categories) || !isEqual(nextProps.isFisFetchingBillCategories, isFisFetchingBillCategories);
    }

    onChange = (value: string) => {
        const {onChange} = this.props;
        if (isFunction(onChange)) {
            onChange(value);
        }
    }

    render() {
        const {categories, isFisFetchingBillCategories} = this.props;

        return (
            <Select
                style={{width: 120}}
                onChange={this.onChange}
                loading={isFisFetchingBillCategories}
                allowClear
                placeholder={MSG_FORM.CATEGORY_REQUIRED}
            >
                {
                    categories.map((category) => (
                        <Option key={category.id} value={category.id}>{category.name}</Option>
                    ))
                }
            </Select>
        )
    }
}
