import React  from 'react';
import { Modal, Form, Input, Checkbox, Select, Tooltip } from 'antd';
import { FormInstance } from 'antd/lib/form';
import _ from 'lodash';
import './scss/AddNodeModal.scss';

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface IAddNodeFormProps {
    visible: boolean;
    addSuccess: (values: Values) => void;
    onCancel: () => void;
    protectionDomainOptions: Array<JSX.Element>;
    faultSetOptions: Array<JSX.Element>;
}

const forceCleanTooltip = '强制添加存储节点会清除节点原有的配置。\n' +
    '强制添加磁盘操作会强制清除所选磁盘下原有的数据，请谨慎操作！';
// const cctbwIPTooltip = '若有多个ip，请用英文逗号分隔(10.29.42.160,10.29.42.161)';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class AddNodeForm extends React.Component<IAddNodeFormProps, any> {
    formRef = React.createRef<FormInstance>();

    shouldComponentUpdate(nextProps) {
        if(nextProps.visible === this.props.visible &&
            this.isSame(nextProps.protectionDomainOptions, this.props.protectionDomainOptions) &&
            this.isSame(nextProps.faultSetOptions, this.props.faultSetOptions)) {
            return false;
        }
        return true;
    }

    isSame(prev, next) {
        if (prev == null && next == null) {
            return true;
        }

        if (prev.props == null && next.props == null) {
            return true;
        }

        return _.every(prev, (item,index) => {
            if (item == null || next[index] == null) {
                return false;
            }
            return _.isEqual(item.props, next[index].props);
        })
    }

    render() {
        let {
            visible,
            onCancel,
            addSuccess,
            protectionDomainOptions,
            faultSetOptions
        } = this.props;

        return (
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
                <Form
                    {...layout}
                    ref={this.formRef}
                    form={this.formRef.current}
                    name="add_node_modal"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        label="节点名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入节点名称!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="所属保护域"
                        name="protectionDomainId"
                        rules={[
                            {
                                required: true,
                                message: '请输入所属保护域!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择保护域"
                            //onChange={onGenderChange}
                            allowClear
                        >
                            { protectionDomainOptions }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属故障域"
                        name="faultSetId"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择故障域"
                            //onChange={onGenderChange}
                            allowClear
                        >
                            { faultSetOptions }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="存储管理网IP"
                        name="ccglwIP"
                        rules={[
                            {
                                required: true,
                                message: '请输入存储管理网IP!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div>
                        <Form.Item
                            label="存储后端同步网IP"
                            name="serviceIP"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入存储后端同步网IP!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="存储前端同步网IP"
                        name="frontIP"
                        rules={[
                            {
                                required: true,
                                message: '请输入存储前端同步网IP!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="节点root密码"
                        name="rootPwd"
                        rules={[
                            {
                                required: true,
                                message: '请输入节点root密码'
                            },
                        ]}
                        style={{
                            marginBottom: '12px'
                        }}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        {...tailLayout}
                        name="addDevice"
                        valuePropName="checked"
                        style={{
                            marginBottom: '0'
                        }}
                    >
                        <Checkbox>立即添加硬盘</Checkbox>
                    </Form.Item>
                    <Form.Item
                        {...tailLayout}
                        name="forceClean"
                        valuePropName="checked"
                    >
                        <Checkbox>强制添加</Checkbox>
                        {/*<Tooltip placement="right" title={forceCleanTooltip}>
                        <InfoCircleOutlined style={{position: 'relative', top: '1px'}} />
                    </Tooltip>*/}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

// const AddNodeForm2: React.FC<IAddNodeFormProps> = ({
//                                                                        visible,
//                                                                        addSuccess,
//                                                                        onCancel,
//                                                       protectionDomainOptions,
//                                                       faultSetOptions
//                                                                    }) => {
//     const [form] = Form.useForm();
//     const layout = {
//         labelCol: {
//             span: 8,
//         },
//         wrapperCol: {
//             span: 16,
//         },
//     };
//
//     const tailLayout = {
//         wrapperCol: {
//             offset: 8,
//             span: 16,
//         },
//     };
//     return (
//         <Modal
//             className="node-container-add-node-modal"
//             visible={visible}
//             centered={true}
//             width="600px"
//             title="增加存储节点"
//             okText="确认"
//             cancelText="取消"
//             onCancel={onCancel}
//             onOk={() => {
//                 form
//                     .validateFields()
//                     .then((values:any) => {
//                         form.resetFields();
//                         addSuccess(values);
//                     })
//                     .catch(info => {
//                         console.log('Validate Failed:', info);
//                     });
//             }}
//         >
//             <Form
//                 {...layout}
//                 form={form}
//                 name="add_node_modal"
//                 initialValues={{ modifier: 'public' }}
//             >
//                 <Form.Item
//                     label="节点名称"
//                     name="name"
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入节点名称!',
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     label="所属保护域"
//                     name="protectionDomainId"
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入所属保护域!',
//                         },
//                     ]}
//                 >
//                     <Select
//                         placeholder="请选择保护域"
//                         //onChange={onGenderChange}
//                         allowClear
//                     >
//                         { protectionDomainOptions }
//                     </Select>
//                 </Form.Item>
//                 <Form.Item
//                     label="所属故障域"
//                     name="faultSetId"
//                     rules={[
//                         {
//                             required: false,
//                         },
//                     ]}
//                 >
//                     <Select
//                         placeholder="请选择故障域"
//                         //onChange={onGenderChange}
//                         allowClear
//                     >
//                         { faultSetOptions }
//                     </Select>
//                 </Form.Item>
//                 <Form.Item
//                     label="存储管理网IP"
//                     name="ccglwIP"
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入存储管理网IP!',
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <div>
//                     <Form.Item
//                         label="存储后端同步网IP"
//                         name="serviceIP"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: '请输入存储后端同步网IP!',
//                             },
//                         ]}
//                     >
//                         <Input />
//                     </Form.Item>
//                 </div>
//                 <Form.Item
//                     label="存储前端同步网IP"
//                     name="frontIP"
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入存储前端同步网IP!',
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     label="节点root密码"
//                     name="rootPwd"
//                     rules={[
//                         {
//                             required: true,
//                             message: '请输入节点root密码'
//                        },
//                     ]}
//                     style={{
//                         marginBottom: '12px'
//                     }}
//                 >
//                     <Input.Password />
//                 </Form.Item>
//                 <Form.Item
//                     {...tailLayout}
//                     name="addDevice"
//                     valuePropName="checked"
//                     style={{
//                         marginBottom: '0'
//                     }}
//                 >
//                     <Checkbox>立即添加硬盘</Checkbox>
//                 </Form.Item>
//                 <Form.Item
//                     {...tailLayout}
//                     name="forceClean"
//                     valuePropName="checked"
//                 >
//                     <Checkbox>强制添加</Checkbox>
//                     {/*<Tooltip placement="right" title={forceCleanTooltip}>
//                         <InfoCircleOutlined style={{position: 'relative', top: '1px'}} />
//                     </Tooltip>*/}
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// };

export default AddNodeForm;