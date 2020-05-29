import React, { Component } from 'react';
import {Checkbox, Modal, Table, Popconfirm, message} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import ServiceHost from '../../utils/Host';

import './scss/DeleteNodeModal.scss';

interface INode {
    readonly id: string;
    readonly key: string;
    readonly name: string;
    readonly protectionDomainName?: string;
    readonly nodeStorage?: number;
    readonly usedStorage?: number;
    readonly numOfDevices?: number;
    readonly finalStatus?: string;
}

interface IDeleteNodeFormProps {
    visible: boolean;
    onCancel: () => void;
    onOK: () => void;
    nodeList: INode[];
}

interface IStorage {
    name: string;
    totalStorage: number;
    leftStorage: number;
    deleteLeftStorage: number;
    deleteLeftUsefulStorage: number;
}

interface IStoragePoolState {
    storagePool: IStorage[];
    forceChecked: boolean;
}

const nodeColumns = [
    {
        title: '节点名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '所属保护域/故障域',
        render: (text, node) => (
            <span>{node.protectionDomainName} / {node.protectionDomainName}</span>
        ),
        key: 'protectionDomainName',
    },
    {
        title: '节点存储空间',
        dataIndex: 'nodeStorage',
    },
    {
        title: '已使用空间',
        dataIndex: 'usedStorage',
    },
    {
        title: '硬盘数量',
        dataIndex: 'numOfDevices',
    },
    {
        title: '节点状态',
        dataIndex: 'finalStatus',
    },
];

class DeleteNodeForm extends Component<IDeleteNodeFormProps, IStoragePoolState> {
    constructor(props) {
        super(props);
        this.state = {
            storagePool: [],
            forceChecked: false
        };
        this.onForceCheckBoxChange = this.onForceCheckBoxChange.bind(this);
        this.onDeleteNodes = this.onDeleteNodes.bind(this);
    }

    onForceCheckBoxChange(e) {
        const target = e.target;
        this.setState(() => ({
            forceChecked: target.checked
        }));
    }

    onDeleteNodes() {
        const promises = _.map(this.props.nodeList, node => {
            return this.deleteNodeAction(node.id);
        });
        message.config({
            duration: 300,
            maxCount: 1,
        });
        axios.all(promises).then((res) => {
            message.success('删除节点成功！');
        }).catch(err => {
            message.error(<span>删除节点失败：<br/>{err.message}</span>);
        }).finally(() => {
            this.props.onOK();
        });
    }

    deleteNodeAction(nodeId: string) {
        return axios({
            method: 'delete',
            url: `${ServiceHost}/sds/instance`,
            data: {
                id: nodeId,
                force: this.state.forceChecked,
                _method:"DELETE"
            }
        });
    }

    render() {
        const { visible, onCancel } = this.props;
        return (
            <Modal
                className="node-container-delete-node-modal"
                width="800px"
                visible={visible}
                centered={true}
                title="删除存储节点"
                okText="确认"
                cancelText="取消"
                onCancel={onCancel}
                onOk={this.onDeleteNodes}
            >
                <p>请确认是否删除该存储节点？</p>
                <Table columns={nodeColumns} dataSource={this.props.nodeList} pagination={false} size="small" />
                <Table columns={nodeColumns} dataSource={this.props.nodeList} pagination={false} style={{marginTop: '10px'}} size="small" />
                <p
                    className="force-checkbox-container"
                    style={{marginTop: '20px', textAlign: 'right'}}
                >
                    <Checkbox onChange={this.onForceCheckBoxChange}>强制删除</Checkbox>
                </p>
            </Modal>
        );
    }
}

export default DeleteNodeForm;