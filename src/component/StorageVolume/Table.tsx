import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Color from "../../utils/Colors";
import {Progress, Table} from "antd";
import {convertByte, convertKByte, convertMilliSeconds} from "../../utils";
import Circle from "../Shape/Circle";

interface IList {
  key: string;
  [key: string]: any;
}

interface ITableProps {
  history: any;
  list: Array<IList>;
  triggerSelectedRowKeysChange: (rowKeys: React.ReactText[]) => void;
}

interface ITableState {
  selectedRowKeys: React.ReactText[];
  columns: any[];
}

class StorageVolumeTable extends Component<ITableProps, ITableState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      columns: [
        {
          title: '存储卷名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '所属存储域/保护域',
          render: (text, obj) => (
            <>
              {
                obj.protectionDomainName == null ? <span>{obj.storageName} / -</span> :
                  <span>{obj.storageName} / {obj.protectionDomainName}</span>
              }
            </>
          ),
          key: 'protectionDomainAndFaultSetName',
        },
        {
          title: '存储卷容量',
          dataIndex: 'capacity',
          key: 'capacity',
        },
        {
          title: '已使用空间',
          dataIndex: 'usedSpace',
          key: 'usedSpace',
        },
        {
          title: '存储卷类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '映射客户端数量',
          dataIndex: 'mappingClientNum',
          key: 'mappingClientNum',
        },
        {
          title: '迁移客户端数量',
          dataIndex: 'migrateClientNum',
          key: 'migrateClientNum',
        },
        {
          title: '迁移状态',
          dataIndex: 'migrateStatus',
          key: 'migrateStatus',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
      ]
    }
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.changeSelectedRowKeys(selectedRowKeys);
  }

  changeSelectedRowKeys(selectedRowKeys) {
    const { triggerSelectedRowKeysChange } = this.props;
    triggerSelectedRowKeysChange(selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  selectRow = (event, record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.changeSelectedRowKeys(selectedRowKeys);
  }

  render() {
    const { list } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    return (
      <Table
        rowSelection={rowSelection}
        columns={this.state.columns}
        dataSource={list}
        onRow={(record) => ({
          onClick: (event) => {
            this.selectRow(event, record);
          },
        })}
      />
    );
  }
}

export default withRouter(StorageVolumeTable);