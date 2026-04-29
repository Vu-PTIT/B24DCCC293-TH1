import React from 'react';
import { Card, Row, Col, Typography, Input, Tag } from 'antd';
import { Post, DeveloperRole } from '@/services/blog/typings';
import { MOCK_POSTS, MOCK_TAGS } from '@/services/blog/mock';
import { history } from 'umi';

const { Title } = Typography;
const { Search } = Input;

const BlogFeed: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Blog Cá Nhân</Title>

      <div style={{ marginBottom: '24px' }}>
        <Search placeholder="Tìm kiếm bài viết..." style={{ width: 300 }} />
      </div>

      <Row gutter={[16, 16]}>
        {MOCK_POSTS.map((post) => (
          <Col xs={24} sm={12} md={8} key={post.id}>
            <Card
              hoverable
              cover={<div style={{ height: 150, background: '#eee' }}>Cover Image</div>}
              onClick={() => history.push(`/blog/${post.slug}`)}
            >
              <Card.Meta title={post.title} description={post.summary} />
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: '48px', color: '#ccc', textAlign: 'right' }}>
        Assigned to: {DeveloperRole.P1_UI_FEED}
      </div>
    </div>
  );
};

export default BlogFeed;


