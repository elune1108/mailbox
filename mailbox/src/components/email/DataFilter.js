import {Form, Select} from 'antd';
import React, {useEffect, useState} from "react";

export default function DataFilter(props) {
    const {Option} = Select;

    const [value, setValue] = useState(null);
    const [modelOptionData, setModelOptionData] = useState([]);

    function onChange(value) {
        setValue(value);
    }

    function onSearch(val) {
        console.log('search:', val);
    }


    useEffect(() => {

        const url =
            'http://192.168.86.48:5000/v1/queries';

        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                setModelOptionData(result);
                onChange(result[0].statement);
            })


    }, []);

    const options = modelOptionData.map(d => <Option value={d.statement} key={d.name}>{d.name} - {d.statement}</Option>);

    return (
        <Form>
            <Form.Item
                label="Select Query">
                <Select
                    showSearch
                    style={{width: 600}}
                    placeholder="Select a query"
                    optionFilterProp="children"
                    value={value}
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {options}
                </Select>
            </Form.Item>
        </Form>
    );
}
