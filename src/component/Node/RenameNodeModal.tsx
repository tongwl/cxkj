import React, { Fragment } from 'react';
import { Form, Input, Modal } from "antd";
import _ from 'lodash';
import {FormInstance} from "antd/lib/form";
interface Values {
  title: string;
  description: string;
  modifier: string;
}

export interface INode {
  name: string;
  id: string | number;
}

interface IRenameModalProps {
  visible: boolean;
  addSuccess: (values: Values) => void;
  onCancel: () => void;
  nodeNames: INode[];

}

const ORIGIN = '_origin';
export const NOW = '_now';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class RenameModal extends React.Component<IRenameModalProps, any> {
  formRef = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.getFormItems = this.getFormItems.bind(this);
  }

  getFormItems() {
    return _.map(this.props.nodeNames, (node:INode, index: number) => {
      return (
        <Fragment key={node.id}>
          <Form.Item
            label="现节点名称"
            name={node.id + ORIGIN}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label="新节点名称"
            name={node.id + NOW}
            rules={[
              {
                required: true,
                message: '请输入节点名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {index !== this.props.nodeNames.length - 1 && <div style={{height: '1px', background: '#404040', marginBottom: '24px'}}></div>}
        </Fragment>
      );
    });
  }

  render() {
    const { visible, onCancel, addSuccess } = this.props;
    const { getFormItems } = this;
    return (
      <Form
        {...layout}
        ref={this.formRef}
        form={this.formRef.current}
        name="add_node_modal"
      >
        <Modal
          className="node-container-add-node-modal"
          visible={visible}
          centered={true}
          width="600px"
          title="增加存储节点"
          okText="确认"
          cancelText="取消"
          onCancel={onCancel}
          onOk={() => {
            this.formRef.current
              .validateFields()
              .then((values:any) => {
                this.formRef.current.resetFields();
                addSuccess(values);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          {getFormItems()}
        </Modal>
      </Form>
    );
  }

  componentDidUpdate() {
    const initValueObject = {};
    _.each(this.props.nodeNames, (node:INode) => {
      initValueObject[node.id + ORIGIN] = node.name;
    });
    this.formRef.current.setFieldsValue(initValueObject);
  }
}

export default RenameModal;