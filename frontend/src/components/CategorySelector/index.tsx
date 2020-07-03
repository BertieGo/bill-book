import React from 'react';
import { Select } from 'antd';
import isFunction from 'lodash/isFunction';
import { ICategorySelectorProps } from '../../declare';
import { MSG_FORM } from '../../constants';

const { Option } = Select;

export default class CategorySelector extends React.Component<ICategorySelectorProps, {}> {

    constructor(props: ICategorySelectorProps) {
        super(props);
    }

    onChange = (value: string) => {
        const { onChange } = this.props;
        if (isFunction(onChange)) {
            onChange(value);
        }
    }

    render() {
        const { categories, isFisFetchingBillCategories } = this.props;

        return (
            <Select
                style={{ width: 120 }}
                onChange={this.onChange}
                loading={isFisFetchingBillCategories}
                allowClear
                placeholder={MSG_FORM.CATEGORY_REQUIRED}
            >
                {
                    categories.map((category) => (
                        <Option value={category.id}>{ category.name }</Option>
                    ))
                }
            </Select>
        )
    }
}
