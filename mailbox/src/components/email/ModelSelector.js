import {Form, Select} from 'antd';
import React, {useEffect, useState} from "react";
import config from "../../Config";

export default function ModelSelector(props) {
    const {Option} = Select;

    const [value, setValue] = useState(null);
    const [modelOptionData, setModelOptionData] = useState([]);

    function onChange(value) {
        setValue(value);
        props.onModelChange(value)
    }

    function onSearch(val) {
        console.log('search:', val);
    }


    useEffect(() => {

        const url =
            config.apiEndpoint + '/v1/models';

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
                label="Select Model">
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a model"
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
