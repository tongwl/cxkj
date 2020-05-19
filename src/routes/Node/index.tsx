import React, { Component } from 'react';
import { Button, Input, Layout, Progress, Select, Table } from 'antd';
import axios from 'axios';
import './scss/index.scss';

const { Search } = Input;
const { Header, Content } = Layout;
const { Option } = Select;

class Node extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '节点名称',
        dataIndex: 'name',
      },
      {
        title: 'IP地址',
        dataIndex: 'ip',
      },
      {
        title: '所属保护域/故障域',
        dataIndex: 'protectionDomain',
      },
      {
        title: '硬盘状态',
        dataIndex: 'diskStatus',
      },
      {
        title: '内存使用率',
        dataIndex: 'memoryUsage',
      },
      {
        title: 'CPU使用率',
        dataIndex: 'CPUUsage',
        render: CPUUsage => (
          <Progress percent={CPUUsage * 100} size="small" />
        ),
      },
      {
        title: '内存加速',
        dataIndex: 'memorySpeedUp',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '运行时间',
        dataIndex: 'runTime',
      },
    ];

    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name:`Test ${i}`,
        ip: `10.29.42.${i}`,
        protectionDomain: 'domain1/rack1',
        diskStatus: '4/5',
        memoryUsage: '80% of 4GB',
        CPUUsage: '0.5',
        memorySpeedUp: '未启用',
        status: '告警',
        runTime: '未连接'
      });
    }

    const rowSelection = {
      selectedRowKeys: [],
    };

    return (
      <Layout className="node-manage-container">
        <Header className="node-manage-header">
          <div className="operation-list">
            <Button type="primary">增加节点</Button>
            <Button type="primary" danger>删除节点</Button>
            <Button type="primary">维护模式</Button>
            <Button type="primary">内存加速</Button>
            <Button type="primary">重命名</Button>
          </div>

          <div className="research-list">
            <div className="research-item select-list">
              <span>选择保护域：</span>
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="research-item input-search-text">
              <Search
                placeholder="搜索"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
            </div>
          </div>

        </Header>
        <Content>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Content>
      </Layout>
    );
  }

  componentDidMount() {
    this.getNodeList();
  }

  getNodeList() {
    axios({
      method: 'get',
      url: 'https://172.16.110.100/api/types/System/instances',
      auth: {
        username: '',
        password: 'YWRtaW46MTU4ODUxNzQ5NzEyOTo0OWUwOTFlMzZhYjllYzk3MTZmODRkMmZhODBiMGQyMg'
      }
    }).then(result=>{
      console.log("11111");
      console.log(result);
    });
  }
}

export default Node;