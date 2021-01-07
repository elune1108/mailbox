import {Form, Select} from 'antd';
import React, {useEffect, useState} from "react";

export default function DatasetSelector(props) {
    const {Option} = Select;

    const [value, setValue] = useState(null);
    const [modelOptionData, setModelOptionData] = useState([]);

    function onChange(value) {
        setValue(value);
        //props.onModelChange(value)
    }

    function onSearch(val) {
        console.log('search:', val);
    }


    useEffect(() => {

        const url =
            'http://192.168.86.48:5000/v1/datasets';

        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                setModelOptionData(result);
                onChange(result[0].name);
            })


    }, []);

    const options = modelOptionData.map(d => <Option value={d.name} key={d.name}>{d.name}</Option>);

    return (
        <Form>
            <Form.Item
                label="Select Dataset">
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a dataset"
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
