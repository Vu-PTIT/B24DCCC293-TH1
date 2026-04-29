import React, { useState } from 'react';
import { Button, Card, Input, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MOCK_TAGS } from '@/services/blog/mock';
import { Tag } from '@/services/blog/typings';
import TagForm from './components/TagForm';
import TagTable from './components/TagTable';

const { Title } = Typography;

const TagManagement: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>(MOCK_TAGS);
  const [visible, setVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [searchText, setSearchText] = useState('');

  const filteredTags = tags.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

  const totalUsedTags = tags.filter(tag => tag.postCount > 0).length;

  const handleAddNew = () => {
    setEditingTag(null);
    setVisible(true);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setVisible(true);
  };

  const handleDelete = (tag: Tag) => {
    setTags(prev => prev.filter(item => item.id !== tag.id));
    message.success(`Đã xóa thẻ "${tag.name}" thành công.`);
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
    <div style={{ padding: 24, minHeight: '100%', background: '#f5f7fb' }}>
      <Card bodyStyle={{ padding: 24, borderRadius: 16 }} style={{ borderRadius: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, marginBottom: 24, alignItems: 'center' }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>
              Quản lý thẻ
            </Title>
            <div style={{ color: '#6c7a93', marginTop: 8, maxWidth: 520 }}>
              Quản lý danh sách thẻ, cập nhật tên thẻ và kiểm tra số lượng bài viết đang sử dụng mỗi thẻ.
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <Input.Search
              placeholder="Tìm kiếm thẻ"
              allowClear
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 320, minWidth: 240, borderRadius: 10 }}
            />
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAddNew}>
              Thêm thẻ mới
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ flex: '1 1 240px', padding: 18, background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#8a97b0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Tổng thẻ
            </div>
            <div style={{ marginTop: 8, fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{tags.length}</div>
          </div>
          <div style={{ flex: '1 1 240px', padding: 18, background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#8a97b0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Thẻ đang dùng
            </div>
            <div style={{ marginTop: 8, fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{totalUsedTags}</div>
          </div>
        </div>

        <TagTable data={filteredTags} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>

      <TagForm visible={visible} initialValues={editingTag} onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
};

export default TagManagement;


