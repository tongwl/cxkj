import React, { Component } from 'react';
import {Progress, Table} from 'antd';
import { withRouter } from 'react-router-dom';
import Color from "../../utils/Colors";
import {convertByte, convertKByte, convertMilliSeconds} from "../../utils";
import Circle from "../Shape/Circle";

interface INodeList {
    key: string;
    name: string;
    ip: string;
    protectionDomainName: string;
    numOfNormalDevices: number;
    numOfDevices: number;
    memRatio: number;
    cpuRatio: number;
    finalStatus: string;
    (key: string): string | number | boolean;
}

interface INodeListTableProps {
    history: any;
    nodeList: Array<INodeList>;
    triggerSelectedRowKeysChange: (rowKeys: React.ReactText[]) => void;
}

interface INodeListTableState {
    selectedRowKeys: React.ReactText[];
    columns: any[];
}

function setMemRatioProgressColor(memRatio: number): string {
    if (memRatio < 30) {
        return Color.Green;
    }

    if (memRatio < 80) {
        return Color.Orange;
    }

    if (memRatio < 100) {
        return Color.Red;
    }
}

function setCpuRatioProgressColor(cpuRatio: number): string {
    if (cpuRatio < 30) {
        return Color.Green;
    }

    if (cpuRatio < 80) {
        return Color.Orange;
    }

    if (cpuRatio < 100) {
        return Color.Red;
    }
}

function setFinalStatusIconColor(finalStatus: string) {
    switch (finalStatus) {
        case '异常':
            return Color.Red;
        case '告警':
            return Color.Orange;
        case '正常':
            return Color.Green;
        default:
            return Color.Red;
    }
}

class NodeListTable extends Component<INodeListTableProps, INodeListTableState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            columns: [
                {
                    title: '节点名称',
                    dataIndex: 'name',
                    key: 'name',
                    render: name => (
                      <a className="td-node-name" onClick={this.gotoDiskPanel}>{name}</a>
                    )
                },
                {
                    title: 'IP地址',
                    dataIndex: 'ip',
                    key: 'ip',
                },
                {
                    title: '所属保护域/故障域',
                    render: (text, node) => (
                      <>
                          {
                              node.faultSetName == null ? <span>{node.protectionDomainName} / -</span> :
                                <span>{node.protectionDomainName} / {node.faultSetName}</span>
                          }
                      </>
                    ),
                    key: 'protectionDomainAndFaultSetName',
                },
                {
                    title: '硬盘状态',
                    render: (text, node) => (
                      <span style={{color: node.numOfNormalDevices < node.numOfDevices ? Color.Red : 'inherit'}}>
          {node.numOfNormalDevices} / {node.numOfDevices}
        </span>
                    ),
                    key: 'deviceStatus',
                },
                {
                    title: '内存使用率',
                    render: (text, node) => (
                      <Progress
                        percent={Number(node.memRatio.toFixed(2))}
                        size="small"
                        strokeWidth={16}
                        strokeColor={setMemRatioProgressColor(Number(node.memRatio.toFixed(2)))}
                        format={(percent, successPercent) => {
                            return node.memTotal > 0 ? percent + "% of " + convertByte(node.memTotal) : percent + '%';
                        }}
                      />
                    ),
                    key: 'memRatio',
                    className: 'column-mem-ratio',
                },
                {
                    title: 'CPU使用率',
                    dataIndex: 'cpuRatio',
                    render: cpuRatio => (
                      <Progress
                        percent={Number(cpuRatio.toFixed(2))}
                        size="small"
                        strokeWidth={16}
                        strokeColor={setCpuRatioProgressColor(Number(cpuRatio.toFixed(2)))}
                      />
                    ),
                    key: 'cpuRatio',
                },
                {
                    title: '内存加速',
                    render: (text, node) => (
                      <>
                          {
                              node.rmcacheEnabled ? <span>已启用/{convertKByte(node.rmcacheSizeInKb)}</span> : '未启用'
                          }
                      </>
                    ),
                    key: 'rmcacheEnabledAndRmcacheSizeInKb',
                },
                {
                    title: '状态',
                    dataIndex: 'finalStatus',
                    render: finalStatus => (
                      <>
                          <Circle color={setFinalStatusIconColor(finalStatus)} style={{marginRight: '4px', position: 'relative', top: '1px'}}/>
                          <span>{finalStatus}</span>
                      </>
                    ),
                    key: 'finalStatus',
                },
                {
                    title: '运行时间',
                    dataIndex: 'upTmInSeconds',
                    render: seconds => (
                      <span>
          {
              convertMilliSeconds(seconds)
          }
        </span>
                    ),
                    key: 'upTmInSeconds',
                },
            ]
        }
        this.gotoDiskPanel = this.gotoDiskPanel.bind(this);
    };

    gotoDiskPanel() {
        this.props.history.push('/disk');
    }

    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.changeSelectedRowKeys(selectedRowKeys);
    }

    selectRow = (event, record) => {
        if (event.target.className !== 'td-node-name') {
            const selectedRowKeys = [...this.state.selectedRowKeys];
            if (selectedRowKeys.indexOf(record.key) >= 0) {
                selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
            } else {
                selectedRowKeys.push(record.key);
            }
            this.changeSelectedRowKeys(selectedRowKeys);
        }
    }

    changeSelectedRowKeys(selectedRowKeys) {
        const { triggerSelectedRowKeysChange } = this.props;
        triggerSelectedRowKeysChange(selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    render() {
        const { nodeList } = this.props;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };
        return (
            <Table
                rowSelection={rowSelection}
                columns={this.state.columns}
                dataSource={nodeList}
                onRow={(record) => ({
                    onClick: (event) => {
                        this.selectRow(event, record);
                    },
                })}
            />
        );
    }
}

export default withRouter(NodeListTable);