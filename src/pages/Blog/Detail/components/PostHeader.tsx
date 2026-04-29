import React from 'react';
import { Typography, Space, Divider, Tag } from 'antd';
import { EyeOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Post } from '@/services/blog/typings';

const { Title, Text } = Typography;

interface PostHeaderProps {
  post: Post;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  return (
    <>
      <img 
        src={post.coverUrl} 
        alt={post.title} 
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '24px' }} 
      />

      <Title>{post.title}</Title>
      
      <Space split={<Divider type="vertical" />} style={{ marginBottom: '16px', flexWrap: 'wrap' }}>
        <Text type="secondary"><UserOutlined /> {post.author}</Text>
        <Text type="secondary"><CalendarOutlined /> {new Date(post.createdAt).toLocaleDateString()}</Text>
        <Text type="secondary"><EyeOutlined /> {post.viewCount} lượt xem</Text>
      </Space>

      <div style={{ marginBottom: '24px' }}>
        {post.tags.map(tag => <Tag key={tag} color="blue">{tag}</Tag>)}
      </div>
    </>
  );
};

export default PostHeader;
