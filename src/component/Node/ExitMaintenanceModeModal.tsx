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
import axios from "axios";
import _ from 'lodash';

import './scss/ExitMaintenanceModeModal.scss';

export interface INode {
  name: string;
  id: string | number;
}

interface IExitMaintenanceModeModalPorps {
  visible: boolean;
  hideExitMaintenanceModeModal: () => void;
  nodes: INode[];
}

interface IExitMaintenanceModeModalState {
  forceFailedSds: boolean;
}

class ExitMaintenanceModeModal extends Component<IExitMaintenanceModeModalPorps, IExitMaintenanceModeModalState> {

  constructor(props) {
    super(props);
    this.state = {
      forceFailedSds: false
    }
    this.onChange = this.onChange.bind(this);
    this.onExitMaintenanceMode = this.onExitMaintenanceMode.bind(this);
  }

  onChange(e) {
    const forceFailedSds = e.target.checked;
    this.setState(() => ({
      forceFailedSds
    }));
  }

  onExitMaintenanceMode() {
    const promises = [];
    _.each(this.props.nodes, (node:INode) => {
      promises.push(
        axios({
          method: 'POST',
          url: `${ServiceHost}/sds/exitMaintenanceMode`,
          data: {
            sdsId: node.id,
            forceFailedSds: this.state.forceFailedSds ? "TRUE" : "FALSE",
          }
        })
      );
    });
    axios.all(promises).then((res) => {
      message.success('退出维护模式成功！');
    }).catch(err => {
      message.error(<span>进入维护模式失败：<br/>{err.message}</span>);
    }).finally(() => {
      this.props.hideExitMaintenanceModeModal();
    });
  }

  getNodeNames(nodeList: INode[]) {
    return _.map(nodeList, node => {
      return node.name;
    });
  }

  shouldComponentUpdate(nextProps: Readonly<IExitMaintenanceModeModalPorps>, nextState: Readonly<any>, nextContext: any): boolean {
    return (!_.isEqual(this.props.nodes, nextProps.nodes) || this.props.visible !== nextProps.visible);
  }

  render() {
    const { visible, hideExitMaintenanceModeModal, nodes } = this.props;
    return (
      <Modal
        className="node-container-exit-maintenance-mode-modal"
        visible={visible}
        centered={true}
        width="600px"
        title="退出维护模式"
        okText="确认"
        cancelText="取消"
        onCancel={hideExitMaintenanceModeModal}
        onOk={this.onExitMaintenanceMode}
      >
        <p>请确认是否退出节点 <b>{this.getNodeNames(nodes).toString()}</b> 的维护模式?</p>
        <div>
          <InfoCircleOutlined /> 操作将节点从维护模式退出，回到正常运行的状态。请确认该节点已经正常启动并已连接至集群。
        </div>
        <Checkbox onChange={this.onChange}>强制退出</Checkbox>
      </Modal>
    );
  }
}

export default ExitMaintenanceModeModal;