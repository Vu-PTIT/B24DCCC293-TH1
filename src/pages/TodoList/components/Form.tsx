
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import moment from 'moment';

// Định nghĩa props cho component TodoForm
interface TodoFormProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (values: any) => void;
    initialValues?: any;
}

const TodoForm: React.FC<TodoFormProps> = ({ visible, onCancel, onSave, initialValues }) => {
    const [form] = Form.useForm();

    // Reset form hoặc set giá trị edit khi modal mở
    useEffect(() => {
        if (visible) {
            if (initialValues) {
                form.setFieldsValue({
                    ...initialValues,
                    deadline: initialValues.deadline ? moment(initialValues.deadline) : null,
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, initialValues, form]);

    // Xử lý khi ấn nút OK
    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onSave({
                    ...values,
                    deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : null,
                });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title={initialValues ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                name="todo_form"
            >
                <Form.Item
                    name="title"
                    label="Tiêu đề công việc"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder="Nhập tên công việc cần làm..." />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả chi tiết"
                >
                    <Input.TextArea rows={3} placeholder="Mô tả thêm về công việc..." />
                </Form.Item>

                <Form.Item
                    name="priority"
                    label="Mức độ ưu tiên"
                    initialValue="medium"
                >
                    <Select>
                        <Select.Option value="high">Cao</Select.Option>
                        <Select.Option value="medium">Trung bình</Select.Option>
                        <Select.Option value="low">Thấp</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TodoForm;
