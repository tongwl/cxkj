import React, { Component } from 'react';
import {Button, Dropdown, Input, Layout, Select} from "antd";
import {
  CameraOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  ToolOutlined,
  RocketOutlined,
  EditOutlined,
  SwapOutlined,
  DownOutlined,
  LoginOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import ProtectionDomainList from "../../component/Node/ProtectionDomainList";
import Table from "../../component/Snapshot/Table";
import AddNodeModal from "../../component/Node/AddNodeModal";
import DeleteNodeForm from "../../component/Node/DeleteNodeModal";
import RenameNodeModal from "../../component/Node/RenameNodeModal";
import EnterMaintenanceModeModal from "../../component/Node/EnterMaintenanceModeModal";
import ExitMaintenanceModeModal from "../../component/Node/ExitMaintenanceModeModal";
import {IFaultSet, IProtectionDomain} from "../Node";
import axios from "axios";
import ServiceHost from "../../utils/Host";
import _ from "lodash";
import {ProtectionDomainOptionAll} from "../Node/Utils";

const { Search } = Input;
const { Header, Content } = Layout;
const { Option } = Select;

interface IState {
  list: Array<any>;
  shownList: Array<any>;
  storageOptions: Array<any>;
  selectedRowKeys: React.ReactText[];
  addStorageVolumeModalVisible: boolean;
  deleteStorageVolumeModalVisible: boolean;
  storageVolumeMappingModalVisible: boolean;
  storageVolumeSnapshotModalVisible: boolean;
  migrateStorageVolumeModalVisible: boolean;
  renameStorageVolumeModalVisible: boolean;
}

class Disk extends Component<any, IState> {
  private listInterval: any;
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      shownList: [],
      storageOptions: [],
      selectedRowKeys: [],
      addStorageVolumeModalVisible: false,
      deleteStorageVolumeModalVisible: false,
      storageVolumeMappingModalVisible: false,
      storageVolumeSnapshotModalVisible: false,
      migrateStorageVolumeModalVisible: false,
      renameStorageVolumeModalVisible: false,
    };
    this.showAddStorageVolumeModal = this.showAddStorageVolumeModal.bind(this);
    this.showDeleteStorageVolumeModal = this.showDeleteStorageVolumeModal.bind(this);
    this.showStorageVolumeMappingModal = this.showStorageVolumeMappingModal.bind(this);
    this.showStorageVolumeSnapshotModal = this.showStorageVolumeSnapshotModal.bind(this);
    this.showMigrateStorageVolumeModal = this.showMigrateStorageVolumeModal.bind(this);
    this.showRenameStorageVolumeModal = this.showRenameStorageVolumeModal.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSelectedRowKeysChange = this.onSelectedRowKeysChange.bind(this);
  }

  showAddStorageVolumeModal() {
    //
  }

  showDeleteStorageVolumeModal() {
    //
  }

  showStorageVolumeMappingModal() {
    //
  }

  showStorageVolumeSnapshotModal() {
    //
  }

  showMigrateStorageVolumeModal() {
    //
  }

  showRenameStorageVolumeModal() {
    //
  }

  onSearch(value) {
    //
  }


  changeStorage(name) {
    //
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  //filter by searchBox or select list
  filterList() {
    this.setState((prevState) => {
      return {
        shownList: prevState.list
      };
    });
  }

  //need change
  getList() {
    //mock data
    setTimeout(() => {
      this.setState(() => ({
        list: [
          {
            id: "1",
            key: "1",
            name: "MySQL-Lun-Snap",
            numOfStorageVolumes: 3,
            numOfSnapshot: 8,
            lastSnapshotTime: '2020/3/2 9:24:45',
            nextSnapshotTime: '2020/3/3 9:24:45',
            status: 'Open',
          },
          {
            id: "2",
            key: "2",
            name: "MySQL-Lun-Snap",
            numOfStorageVolumes: 3,
            numOfSnapshot: 8,
            lastSnapshotTime: '2020/3/2 9:24:45',
            nextSnapshotTime: '2020/3/3 9:24:45',
            status: 'Open',
          },
          {
            id: "3",
            key: "3",
            name: "MySQL-Lun-Snap",
            numOfStorageVolumes: 3,
            numOfSnapshot: 8,
            lastSnapshotTime: '2020/3/2 9:24:45',
            nextSnapshotTime: '2020/3/3 9:24:45',
            status: 'Open',
          }
        ]
      }), () => {
        this.filterList();
      });
    }, 50);
  }

  getStorageList() {
    setTimeout(() => {
      const storageList = [
        {
          id: 1,
          name: 'HDD-Lun1-2T',
        },
        {
          id: 2,
          name: 'HDD-Lun2-5T',
        },
        {
          id: 3,
          name: 'HDD-Lun3-3T',
        }];

      const storageOptions =  _.map(storageList, item => {
        return <Option key={item.id} value={item.name}>{item.name}</Option>;
      });

      this.setState(() => ({
        storageOptions,
      }));
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    return (
      <Layout className="cxkj-node-manage-container">
        <Header className="node-manage-header cxkj-container-header">
          <div className="operation-list">
            <Button
              type="primary"
              onClick={this.showAddStorageVolumeModal}
              icon={<PlusCircleOutlined />}
            >增加快照策略</Button>
            <Button
              type="primary"
              onClick={this.showAddStorageVolumeModal}
              icon={<FormOutlined />}
            >编辑快照策略</Button>
            <Button
              type="primary"
              className="button-disabled"
              disabled={selectedRowKeys == null || selectedRowKeys.length === 0}
              onClick={this.showDeleteStorageVolumeModal}
              icon={<DeleteOutlined />}
              danger
            >删除快照策略</Button>
            <Button
              type="primary"
              onClick={this.showMigrateStorageVolumeModal}
              icon={<SwapOutlined />}
            >策略关联存储卷</Button>
            <Button
              type="primary"
              className="button-disabled"
              disabled={selectedRowKeys == null || selectedRowKeys.length === 0}
              onClick={this.showRenameStorageVolumeModal}
              icon={<EditOutlined />}
            >重命名</Button>
          </div>

          <div className="research-list">
            <div className="research-item input-search-text">
              <Search
                placeholder="搜索"
                onSearch={this.onSearch}
                style={{ width: 200 }}
              />
            </div>
          </div>

        </Header>

        <Content className="node-manage-content">
          <Table
            list={this.state.shownList}
            triggerSelectedRowKeysChange = {this.onSelectedRowKeysChange}
          />
        </Content>
      </Layout>
    );
  }

  componentDidMount() {
    this.getStorageList();
    this.getList();
    this.listInterval = setInterval(() => {
      this.getList();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.listInterval)
  }
}

export default Disk;