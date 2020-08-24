import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Table} from "antd";

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

class SnapshotTable extends Component<ITableProps, ITableState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      columns: [
        {
          title: '策略名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '关联存储卷数量',
          dataIndex: 'numOfStorageVolumes',
          key: 'numOfStorageVolumes',
        },
        {
          title: '已生成快照数量',
          dataIndex: 'numOfSnapshot',
          key: 'capacity',
        },
        {
          title: '上次快照时间',
          dataIndex: 'lastSnapshotTime',
          key: 'lastSnapshotTime',
        },
        {
          title: '下次快照时间',
          dataIndex: 'nextSnapshotTime',
          key: 'nextSnapshotTime',
        },
        {
          title: '策略状态',
          dataIndex: 'status',
          key: 'status',
        }
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

export default withRouter(SnapshotTable);