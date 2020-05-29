import React, { Component } from 'react';
import {Select} from "antd";
import { ProtectionDomainOptionAll } from '../../routes/Node/Utils';

const { Option } = Select;

interface IProtectionDomainListProps {
    protectionDomainOptions: Array<JSX.Element>;
    triggerChange: (name: string) => void;
}

const ProtectionDomainList: React.FC<IProtectionDomainListProps> = ({
                                                                        protectionDomainOptions,
                                                                        triggerChange,
                                                  }) => {
    return (
        <Select defaultValue="all" style={{ width: 120 }} onChange={value => {triggerChange(value);}}>
            <Option key="all" value={ProtectionDomainOptionAll}>查看所有</Option>
            {protectionDomainOptions}
        </Select>
    );
};

export default ProtectionDomainList;
