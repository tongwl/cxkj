import React, { Component } from 'react';
import { Layout } from 'antd';
import ContentMain from '../../component/ContentMain/';
import SideMenu from '../../component/SiderMenu';
import Copyright from '../../utils/Copyright';

import '../../scss/common.scss';
import './scss/index.scss';


const { Header, Content, Footer, Sider } = Layout;

interface IAppState {
  collapsed: boolean;
}

class Index extends Component<any, IAppState> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <SideMenu />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, height: '50px' }} />
          <Content className="cxkj-layout-content">
            <ContentMain />
          </Content>
          <Footer style={{ textAlign: 'center', height: '40px', lineHeight: '40px', padding: 0 }} dangerouslySetInnerHTML={{__html: Copyright()}}></Footer>
        </Layout>
      </Layout>
    );
  }
}
export default Index;
