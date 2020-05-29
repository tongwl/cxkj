import React, { Component } from 'react';
import {Button, Input, Layout, message, Select} from 'antd';
import NodeListTable from "../../component/Node/Table";
import ProtectionDomainList from "../../component/Node/ProtectionDomainList";
import AddNodeModal from "../../component/Node/AddNodeModal";
import DeleteNodeForm from "../../component/Node/DeleteNodeModal";
import ServiceHost from '../../utils/Host';
import { ProtectionDomainOptionAll } from './Utils';
import axios from 'axios';
import _ from 'lodash';
import './scss/index.scss';

const { Search } = Input;
const { Header, Content } = Layout;
const { Option } = Select;

interface INodeList {
  id: string;
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

export interface IProtectionDomain {
  id: string;
  name: string;
  [key: string]: any;
}

export interface IFaultSet {
  id: string;
  name: string;
  [key: string]: any;
}

interface INodeState {
  nodeList: Array<INodeList>;
  shownNodeList: Array<INodeList>;
  selectedRowKeys: React.ReactText[];
  protectionDomainList: Array<IProtectionDomain>;
  faultSetList: Array<IFaultSet>;
  searchText: string;
  addNodeModalVisible: boolean;
  deleteNodeModalVisible: boolean;
  selectedProtectionDomainName: string;
}

class Node extends Component<any, INodeState> {
  nodeListInterval: any;

  constructor(props) {
    super(props);
    this.state = {
      nodeList: [],
      shownNodeList: [],
      selectedRowKeys: [],
      protectionDomainList: [],
      faultSetList: [],
      searchText: null,
      addNodeModalVisible: false,
      deleteNodeModalVisible: false,
      selectedProtectionDomainName: ProtectionDomainOptionAll
    }

    this.showAddNodeModal = this.showAddNodeModal.bind(this);
    this.showDeleteNodeModal = this.showDeleteNodeModal.bind(this);
    this.onSelectedRowKeysChange = this.onSelectedRowKeysChange.bind(this);
    this.triggerProtectionDomainChange = this.triggerProtectionDomainChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.getProtectionDomainOptions = this.getProtectionDomainOptions.bind(this);
  };

  onSearch(value) {
    this.setState(() => ({
              searchText: value
      }),
        () => {
          this.filterNodeList();
        }
    )
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  showAddNodeModal = () => {
    this.setState(() => ({
      addNodeModalVisible: true,
    }));
  };

  hideAddNodeModal = () => {
    this.setState(() => ({
      addNodeModalVisible: false,
    }));
  };

  onAddNode = params => {
    console.log('Received values of form: ', params);
    this.addNodeInstance(this.getAddNodeAPIParams(params)).then((bl) => {
      if(bl) {
        this.addNodeCap(params.ccglwIP, params.rootPwd);
      } else {
        this.setState({
          addNodeModalVisible: false,
        });
      }
    });
  };

  getAddNodeAPIParams(params) {
    const {name, protectionDomainId, faultSetId, forceClean, frontIP, serviceIP} = params;
    const result: any = {
      name: name,
      protectionDomainId: protectionDomainId,
    };
    result.forceClean = Boolean(forceClean);
    if(faultSetId) {
      result.faultSetId = faultSetId;
    }
    result.sdsIpList = [];
    const frontIPs = _.uniq(frontIP.split(',').sort());
    const serviceIPs = _.uniq(serviceIP.split(',').sort());
    if(_.isEqual(frontIPs, serviceIPs)) {
        _.each(frontIPs, ip => {
          result.sdsIpList.push({
            SdsIp: {
              ip,
              role: 'all'
            }
          });
        });
    } else {
      _.each(frontIPs, frontIP => {
        let idx = 0;
        const bl = _.some(serviceIPs, (serviceIP, index: number) => {
          if (frontIP === serviceIP) {
            idx = index;
            return true;
          }
        });
        if (bl) {
          serviceIPs.splice( idx, 1);
          result.sdsIpList.push({
            SdsIp: {
              ip: frontIP,
              role: 'all'
            }
          });
        } else {
          result.sdsIpList.push({
            SdsIp: {
              ip: frontIP,
              role: 'sdcOnly'
            }
          });
        }
      });

      _.each(serviceIPs, ip => {
        result.sdsIpList.push({
          SdsIp: {
            ip,
            role: 'sdsOnly'
          }
        });
      });
    }
    return result;
  }

  addNodeCap(ip, rootpass) {
    console.log(ip, rootpass);
    axios.post(`${ServiceHost}/sds/node`, {ip, rootpass}).then(res => {
      if(res.status === 200) {
        this.getNodeList();
        message.success('增加节点成功！');
      } else {
        message.error('删除节点失败!');
      }
    }).catch(() => {
      message.error('删除节点失败!');
    }).finally(() => {
      this.setState({
        addNodeModalVisible: false,
      });
    });
  }

  addNodeInstance(params) {
    console.log(params);
    return axios.post(`${ServiceHost}/sds/instance`, params).then(res => {
      if(res.status === 200) {
        return true;
      } else {
        message.error('删除节点失败!');
        return false;
      }
    }).catch(err => {
      message.error(<span>删除节点失败：<br/>{err.message}</span>);
      return false;
    });
  }
  
  showDeleteNodeModal = () => {
    console.log(this.state.selectedRowKeys);
    this.setState(() => ({
      deleteNodeModalVisible: true,
    }));
  }

  hideDeleteNodeModal = () => {
    this.setState(() => ({
      deleteNodeModalVisible: false,
    }));
  }

  getNodeList() {
    axios({
      method: 'get',
      url: `${ServiceHost}/sds/instance`
    }).then(res => {
      if (res.status === 200) {
        _.each(res.data, node => {
          node.key = node.name;
        });
        this.setState(() => ({
          nodeList: res.data
        }), () => {
          this.filterNodeList();
        });
      }
    });
  }

  getNodeListByNames() {
    return _.filter(this.state.nodeList, (node) => {
      return _.some(this.state.selectedRowKeys, key => {
        return key === node.name;
      });
    });
  }

  getProtectionDomainList() {
    axios({
      method: 'get',
      url: `${ServiceHost}/protectedDomain/list`
    }).then(res => {
      if (res.status === 200) {
        const protectionDomainList = _.map(res.data, domain => {
          return {
            key: domain.id,
            id: domain.id,
            name: domain.name
          };
        });
        this.setState(() => ({
          protectionDomainList
        }));
      }
    });
  }

  getFaultSetList() {
    axios({
      method: 'get',
      url: `${ServiceHost}/faultSet/list`
    }).then(res => {
      if (res.status === 200) {
        const faultSetList = _.map(res.data, faultset => {
          return {
            key: faultset.id,
            id: faultset.id,
            name: faultset.name
          };
        });
        this.setState(() => ({
          faultSetList
        }));
      }
    });
  }

  //by name or id
  getProtectionDomainOptions(type) {
    return _.map(this.state.protectionDomainList, domain => {
      return <Option key={domain.id} value={domain[type]}>{domain.name}</Option>;
    });
  }

  getFaultSetOptions(type) {
    return _.map(this.state.faultSetList, faultSet => {
      return <Option key={faultSet.id} value={faultSet[type]}>{faultSet.name}</Option>;
    });
  }

  triggerProtectionDomainChange(selectedProtectionDomainName: string) {
    this.setState(() => ({
      selectedProtectionDomainName
    }), () => {
      this.filterNodeList();
    });
  }

  //when select protection domain or input search box
  filterNodeList() {
    const { nodeList, selectedProtectionDomainName } = this.state;
    // filter by protection domain name
    let shownNodeList = selectedProtectionDomainName === ProtectionDomainOptionAll ? nodeList :
        _.filter(nodeList, {protectionDomainName: selectedProtectionDomainName});

    //filter by search box
    shownNodeList = this.filterNodeListBySearchText(shownNodeList);

    this.setState(() => ({
      shownNodeList
    }));
  }

  filterNodeListBySearchText(nodeList) {
    if (this.state.searchText == null || this.state.searchText === '') {
      return nodeList;
    } else {
      return _.filter(nodeList, node => {
        if (node != null) {
          for(let key in node) {
            if (node[key] != null) {
              if(String(node[key]).toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1) {
                return true;
              }
            }
          }
        }
      });
    }
  }

  render() {
    const { selectedRowKeys } = this.state;

    return (
      <Layout className="node-manage-container">
        <Header className="node-manage-header">
          <div className="operation-list">
            <Button type="primary" onClick={this.showAddNodeModal}>增加节点</Button>
            <Button type="primary"
                    className="delete-node-btn"
                    disabled={selectedRowKeys == null || selectedRowKeys.length === 0}
                    onClick={this.showDeleteNodeModal} danger
            >删除节点</Button>
            <Button type="primary">维护模式</Button>
            <Button type="primary">内存加速</Button>
            <Button type="primary">重命名</Button>
          </div>

          <div className="research-list">
            <div className="research-item select-list">
              <span>选择保护域：</span>
              <ProtectionDomainList protectionDomainOptions={this.getProtectionDomainOptions("name")} triggerChange={this.triggerProtectionDomainChange}/>
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
          <NodeListTable
              nodeList={this.state.shownNodeList}
              triggerSelectedRowKeysChange = {this.onSelectedRowKeysChange}
          />
        </Content>

        <AddNodeModal
            protectionDomainOptions={this.getProtectionDomainOptions("id")}
            faultSetOptions={this.getFaultSetOptions("id")}
            visible={this.state.addNodeModalVisible}
            addSuccess={this.onAddNode}
            onCancel={this.hideAddNodeModal}
        />

        <DeleteNodeForm
            visible={this.state.deleteNodeModalVisible}
            onCancel={this.hideDeleteNodeModal}
            onOK={this.hideDeleteNodeModal}
            nodeList={this.getNodeListByNames()}
        />
      </Layout>
    );
  }

  componentDidMount() {
    this.getProtectionDomainList();
    this.getFaultSetList();
    this.nodeListInterval = setInterval(() => {
      this.getNodeList();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.nodeListInterval)
  }
}

export default Node;