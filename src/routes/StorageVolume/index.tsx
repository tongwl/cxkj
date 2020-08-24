import React, { Component } from 'react';
import {Button, Input, Layout, Select} from "antd";
import {
  CameraOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  ToolOutlined,
  EditOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import Table from "../../component/StorageVolume/Table";
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
    console.log(name);
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
            name: "HDD-Lun1-2T",
            storageName: "HDD-SP1",
            protectionDomainName: "domain1",
            capacity: "2TB",
            usedSpace: "230GB",
            type: "精简制备",
            mappingClientNum: 3,
            migrateClientNum: "未迁移",
            createTime: "2020/03/01 14:38:01"
          },
          {
            id: "2",
            key: "2",
            name: "HDD-Lun2-5T",
            protectionDomainName: "HDD-SP1",
            faultSetName: "domain1",
            capacity: "5TB",
            usedSpace: "500GB",
            type: "精简制备",
            mappingClientNum: 4,
            migrateClientNum: "正在迁移",
            createTime: "2020/03/01 14:48:01"
          },
          {
            id: "3",
            key: "3",
            name: "HDD-Lun3-3T",
            protectionDomainName: "HDD-SP1",
            faultSetName: "domain1",
            capacity: "3TB",
            usedSpace: "3TB",
            type: "厚置备",
            mappingClientNum: 6,
            migrateClientNum: "暂停",
            createTime: "2020/03/01 14:48:01"
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
            >增加存储卷</Button>
            <Button
              type="primary"
              className="button-disabled"
              disabled={selectedRowKeys == null || selectedRowKeys.length === 0}
              onClick={this.showDeleteStorageVolumeModal}
              icon={<DeleteOutlined />}
              danger
            >删除存储卷</Button>
            <Button
              type="primary"
              onClick={this.showStorageVolumeMappingModal}
              icon={<ToolOutlined />}
            >存储卷映射</Button>
            <Button
              type="primary"
              onClick={this.showStorageVolumeSnapshotModal}
              icon={<CameraOutlined />}
            >存储卷快照</Button>
            <Button
              type="primary"
              onClick={this.showMigrateStorageVolumeModal}
              icon={<SwapOutlined />}
            >存储卷迁移</Button>
            <Button
              type="primary"
              className="button-disabled"
              disabled={selectedRowKeys == null || selectedRowKeys.length === 0}
              onClick={this.showRenameStorageVolumeModal}
              icon={<EditOutlined />}
            >重命名</Button>
          </div>

          <div className="research-list">
            <div className="research-item select-list">
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={value => {this.changeStorage(value);}}
              >
                <Option key="all" value={ProtectionDomainOptionAll}>查看所有</Option>
                {this.state.storageOptions}
              </Select>
            </div>
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
    clearInterval(this.listInterval);
  }
}

export default Disk;