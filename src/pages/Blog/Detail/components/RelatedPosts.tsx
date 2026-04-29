import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { Post } from '@/services/blog/typings';
import { history } from 'umi';

const { Title, Text } = Typography;

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <div style={{ marginTop: '48px' }}>
      <Title level={4}>Bài viết liên quan</Title>
      <Row gutter={[16, 16]}>
        {posts.length > 0 ? posts.map(related => (
          <Col xs={24} sm={8} key={related.id}>
            <Card
              hoverable
              size="small"
              cover={<img alt={related.title} src={related.coverUrl} style={{ height: 120, objectFit: 'cover' }} />}
              onClick={() => history.push(`/blog/${related.slug}`)}
            >
              <Card.Meta 
                title={<span style={{ fontSize: '14px' }}>{related.title}</span>} 
              />
            </Card>
          </Col>
        )) : (
          <Col span={24}>
            <Text type="secondary">Không có bài viết liên quan</Text>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default RelatedPosts;
