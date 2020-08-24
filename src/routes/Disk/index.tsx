import React, { Component } from 'react';
import {Breadcrumb, Button, Layout} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import './scss/index.scss';
import ProtectionDomainList from "../../component/Node/ProtectionDomainList";

const { Header, Content } = Layout;

class Disk extends Component<any, any> {
  render() {
    return (
      <div className="cxkj-disk-container">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/node'>
              <span>节点管理</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>硬盘管理</Breadcrumb.Item>
        </Breadcrumb>
        <Layout>
          <Header className="disk-header cxkj-container-header">
            <div className="operation-list">
              <Button type="primary" icon={<PlusCircleOutlined />}>增加硬盘</Button>
              <Button type="primary">增加缓存盘</Button>
              <Button type="primary">删除硬盘</Button>
              <Button type="primary">重命名</Button>
            </div>

            <div className="research-list">
              aaa
            </div>

          </Header>
          <Content>Content</Content>
        </Layout>
      </div>
    );
  }
}

export default Disk;