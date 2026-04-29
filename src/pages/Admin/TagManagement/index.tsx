import React, { useMemo, useState } from 'react';
import { Button, Card, Input, message, Modal, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MOCK_TAGS } from '@/services/blog/mock';
import { DeveloperRole, Tag } from '@/services/blog/typings';
import TagForm from './components/TagForm';
import TagTable from './components/TagTable';

const { Title } = Typography;

const TagManagement: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>(MOCK_TAGS);
  const [visible, setVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [searchText, setSearchText] = useState('');

  const filteredTags = useMemo(
    () => tags.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())),
    [searchText, tags],
  );

  const handleAddNew = () => {
    setEditingTag(null);
    setVisible(true);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setVisible(true);
  };

  const handleDelete = (tag: Tag) => {
    Modal.confirm({
      title: `Xóa thẻ "${tag.name}"?`,
      content: 'Hành động này sẽ xóa thẻ khỏi danh sách.',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: () => {
        setTags(prev => prev.filter(item => item.id !== tag.id));
        message.success('Đã xóa thẻ thành công.');
      },
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = (values: { name: string }) => {
    if (editingTag) {
      setTags(prev => prev.map(item => (item.id === editingTag.id ? { ...item, name: values.name } : item)));
      message.success('Cập nhật thẻ thành công.');
    } else {
      const newTag: Tag = {
        id: Date.now().toString(),
        name: values.name,
        postCount: 0,
      };
      setTags(prev => [newTag, ...prev]);
      message.success('Thêm thẻ mới thành công.');
    }
    setVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Quản lý thẻ
            </Title>
            <div style={{ color: '#666', marginTop: 6 }}>Danh sách thẻ với tên và số bài viết đang sử dụng.</div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <Input.Search
              placeholder="Tìm kiếm thẻ"
              allowClear
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 260 }}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
              Thêm thẻ mới
            </Button>
          </div>
        </div>

        <TagTable data={filteredTags} onEdit={handleEdit} onDelete={handleDelete} />

        <div style={{ marginTop: 24, textAlign: 'right', color: '#999' }}>
          Assigned to: {DeveloperRole.P4_ADMIN_TAG}
        </div>
      </Card>

      <TagForm visible={visible} initialValues={editingTag} onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
};

export default TagManagement;


