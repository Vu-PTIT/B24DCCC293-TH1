import React from 'react';
import { Input, Tag, Typography, Space } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Tag as TagType } from '@/services/blog/typings';

const { Search } = Input;
const { Text } = Typography;

interface FilterSectionProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tags: TagType[];
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onSearch, tags, selectedTag, onTagClick }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Search 
          placeholder="Tìm kiếm bài viết..." 
          onChange={onSearch}
          style={{ width: 400 }} 
          allowClear
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Text strong><TagOutlined /> Thẻ:</Text>
          {tags.map((tag) => (
            <Tag.CheckableTag
              key={tag.id}
              checked={selectedTag === tag.name}
              onChange={() => onTagClick(tag.name)}
            >
              {tag.name} ({tag.postCount})
            </Tag.CheckableTag>
          ))}
        </div>
      </Space>
    </div>
  );
};

export default FilterSection;
