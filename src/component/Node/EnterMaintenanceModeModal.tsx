import React, {Component} from 'react';
import {
  InfoCircleOutlined
} from '@ant-design/icons';
import {
  Checkbox,
  message,
  Modal
} from "antd";
import ServiceHost from "../../utils/Host";
import _ from 'lodash';
import axios from "axios";

import './scss/EnterMaintenanceModeModal.scss';

export interface INode {
  name: string;
  id: string | number;
}

interface IEnterMaintenanceModeModalPorps {
  visible: boolean;
  hideEnterMaintenanceModeModal: () => void;
  nodes: INode[];
}

interface IEnterMaintenanceModeModalState {
  forceInsufficientSpace: boolean;
}

class EnterMaintenanceModeModal extends Component<IEnterMaintenanceModeModalPorps, IEnterMaintenanceModeModalState> {

  constructor(props) {
    super(props);
    this.state = {
      forceInsufficientSpace: false
    }
    this.onChange = this.onChange.bind(this);
    this.onEnterMaintenanceMode = this.onEnterMaintenanceMode.bind(this);
  }

  onChange(e) {
    const forceInsufficientSpace = e.target.checked;
    this.setState(() => ({
      forceInsufficientSpace
    }));
  }

  onEnterMaintenanceMode() {
    const promises = [];
    _.each(this.props.nodes, (node:INode) => {
      promises.push(
        axios({
          method: 'POST',
          url: `${ServiceHost}/sds/enterMaintenanceMode`,
          data: {
            sdsId: node.id,
            forceInsufficientSpace: this.state.forceInsufficientSpace ? "TRUE" : "FALSE",
          }
        })
      );
    });
    axios.all(promises).then((res) => {
      message.success('进入维护模式成功！');
    }).catch(err => {
      message.error(<span>进入维护模式失败：<br/>{err.message}</span>);
    }).finally(() => {
      this.props.hideEnterMaintenanceModeModal();
    });
  }

  shouldComponentUpdate(nextProps: Readonly<IEnterMaintenanceModeModalPorps>, nextState: Readonly<any>, nextContext: any): boolean {
    return (!_.isEqual(this.props.nodes, nextProps.nodes) || this.props.visible !== nextProps.visible);
  }

  getNodeNames(nodeList: INode[]) {
    return _.map(nodeList, node => {
      return node.name;
    });
  }

  render() {
    const { visible, hideEnterMaintenanceModeModal, nodes } = this.props;
    return (
      <Modal
        className="node-container-enter-maintenance-mode-modal"
        visible={visible}
        centered={true}
        width="600px"
        title="进入维护模式"
        okText="确认"
        cancelText="取消"
        onCancel={hideEnterMaintenanceModeModal}
        onOk={this.onEnterMaintenanceMode}
      >
        <p>请确认是否进入节点 <b>{this.getNodeNames(nodes).toString()}</b> 的维护模式?</p>
        <div>
          <InfoCircleOutlined /> 节点进入维护模式后，该节点不再写入新的数据，同时当集群感知到该节点离线也不会将该节点上存在的数据自动重建。请在维护动作完成后，尽快退出维护模式，防止数据的丢失或损坏的情况出现。
        </div>
        <Checkbox onChange={this.onChange}>强制进入</Checkbox>
      </Modal>
    );
  }
}

export default EnterMaintenanceModeModal;