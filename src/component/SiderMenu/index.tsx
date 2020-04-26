import React, { Fragment } from 'react';
import {
  HomeOutlined,
  ClusterOutlined,
  GroupOutlined,
  DatabaseOutlined,
  MonitorOutlined,
  FileTextOutlined,
  SettingOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import CustomMenu from './CustomMenu';

const menus = [
  {
    title: '概览',
    icon: <HomeOutlined />,
    key: '/home'
  },
  {
    title: '节点管理',
    icon: <ClusterOutlined />,
    key: '',
    subs: [
      {key: '/node', title: '节点管理', icon: '',},
      {key: '/home/general/icon', title: '硬盘管理', icon: '',},
    ]
  },
  {
    title: '存储卷管理',
    icon: <GroupOutlined />,
    key: '/home/navigation',
    subs: [
      {key: '/home/navigation/dropdown', title: '卷管理', icon: ''},
      {key: '/home/navigation/menu', title: '快照策略管理', icon: ''},
      {key: '/home/navigation/steps', title: '客户端管理', icon: ''},
    ]
  },
  {
    title: '存储资源管理',
    icon: <DatabaseOutlined />,
    key: '/home/ccgl',
    subs: [
      {key: '/home/entry/form/basic-form', title: '保护域管理', icon: ''},
      {key: '/home/entry/form/step-form', title: '存储池管理', icon: ''},
    ]
  },
  {
    title: '运维监控',
    icon: <MonitorOutlined />,
    key: '/home/display',
    subs: [
      {key: '/home/display/carousel', title: '集群', icon: ''},
      {key: '/home/display/collapse', title: '存储池', icon: ''},
      {key: '/home/display/list', title: '存储节点', icon: ''},
      {key: '/home/display/table', title: '存储卷', icon: ''},
      {key: '/home/display/tabs', title: '客户端', icon: '',},
    ]
  },
  {
    title: '日志管理',
    icon: <FileTextOutlined />,
    key: '/home/feedback',
    subs: [
      {key: '/home/feedback/modal', title: '系统日志', icon: '',},
      {key: '/home/feedback/notification', title: '操作日志', icon: ''},
      {key: '/home/feedback/spin', title: '告警信息', icon: '',}
    ]
  },
  {
    title: '系统管理',
    icon: <SettingOutlined />,
    key: '/home/other',
    subs:[
      {key: '/home/other/animation', title: '用户管理', icon: '',},
      {key: '/home/other/gallery', title: '系统设置', icon: '',},
    ]
  },
  {
    title: '授权管理',
    icon: <KeyOutlined />,
    key: '/home/about'
  }
]

export default () => {
  return (
    <Fragment>
      <div className="logo-container">
        <img src={require("../../assets/img/cx_logo2.svg")} className="logo" />
      </div>
      <CustomMenu menus={menus}/>
    </Fragment>
  );
}