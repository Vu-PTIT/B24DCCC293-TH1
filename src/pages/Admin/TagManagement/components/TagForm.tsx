import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Tag } from '@/services/blog/typings';

interface TagFormProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: { name: string }) => void;
  initialValues?: Tag | null;
}

const TagForm: React.FC<TagFormProps> = ({ visible, onCancel, onSave, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          name: initialValues.name,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onSave(values as { name: string });
        form.resetFields();
      })
      .catch(() => {
        // ignore validation errors
      });
  };

  return (
    <Modal
      title={initialValues ? 'Chỉnh sửa thẻ' : 'Thêm thẻ mới'}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="tag_form">
        <Form.Item
          label="Tên thẻ"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên thẻ!' }]}
        >
          <Input placeholder="Nhập tên thẻ..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TagForm;
