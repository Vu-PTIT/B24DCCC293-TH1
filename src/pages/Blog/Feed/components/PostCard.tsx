import React from 'react';
import { Card, Tag, Space } from 'antd';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Post } from '@/services/blog/typings';
import { history } from 'umi';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card
      hoverable
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      cover={
        <img 
          alt={post.title} 
          src={post.coverUrl} 
          style={{ height: 180, objectFit: 'cover' }} 
        />
      }
      onClick={() => history.push(`/blog/${post.slug}`)}
    >
      <Card.Meta 
        title={post.title} 
        description={
          <div style={{ height: 60, overflow: 'hidden' }}>
            {post.summary}
          </div>
        } 
      />
      <div style={{ marginTop: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#8c8c8c' }}>
            <span><UserOutlined /> {post.author}</span>
            <span><CalendarOutlined /> {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            {post.tags.map(tag => (
              <Tag key={tag} color="blue" style={{ fontSize: '10px' }}>{tag}</Tag>
            ))}
          </div>
        </Space>
      </div>
    </Card>
  );
};

export default PostCard;
