import React from 'react';
import { Typography, Button, Divider, Space, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, history } from 'umi';
import { DeveloperRole } from '@/services/blog/typings';
import { MOCK_POSTS } from '@/services/blog/mock';

const { Title, Paragraph, Text } = Typography;

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_POSTS.find((p) => p.slug === slug);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', background: '#fff' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()} style={{ marginBottom: '16px' }}>
        Quay lại
      </Button>

      {post ? (
        <>
          <Title>{post.title}</Title>
          <Space style={{ marginBottom: '24px' }}>
            <Text type="secondary">{new Date(post.createdAt).toLocaleDateString()}</Text>
            <Divider type="vertical" />
            <Text type="secondary">Tác giả: {post.author}</Text>
          </Space>

          <div style={{ marginBottom: '24px' }}>
            {post.tags.map(tag => <Tag key={tag} color="blue">{tag}</Tag>)}
          </div>

          <Divider />
          
          <Paragraph>
            {/* Person 2: Render Markdown content here */}
            {post.content}
          </Paragraph>
        </>
      ) : (
        <p>Không tìm thấy bài viết</p>
      )}

      <div style={{ marginTop: '48px', color: '#ccc', textAlign: 'right' }}>
        Assigned to: {DeveloperRole.P2_UI_DETAIL}
      </div>
    </div>
  );
};

export default PostDetail;


