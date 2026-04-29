import React, { useEffect, useMemo } from 'react';
import { Button, Divider, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, history } from 'umi';
import { DeveloperRole } from '@/services/blog/typings';
import { MOCK_POSTS } from '@/services/blog/mock';
import ReactMarkdown from 'react-markdown';
import PostHeader from './components/PostHeader';
import RelatedPosts from './components/RelatedPosts';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_POSTS.find((p) => p.slug === slug);

  // Auto-increment view count
  useEffect(() => {
    if (post) {
      post.viewCount += 1;
    }
  }, [post]);

  // Related posts: same tags, excluding current post
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return MOCK_POSTS.filter(p => 
      p.id !== post.id && 
      p.tags.some(tag => post.tags.includes(tag))
    ).slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <Empty description="Không tìm thấy bài viết" />
        <Button onClick={() => history.push('/blog/feed')}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
      <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => history.push('/blog/feed')} 
          style={{ marginBottom: '24px' }}
          type="text"
        >
          Quay lại danh sách
        </Button>

        <PostHeader post={post} />

        <Divider />
        
        <div className="markdown-content" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <Divider />

        <RelatedPosts posts={relatedPosts} />
      </div>

      <div style={{ marginTop: '48px', color: '#ccc', textAlign: 'right', fontSize: '12px' }}>
        Assigned to: {DeveloperRole.P2_UI_DETAIL}
      </div>
    </div>
  );
};

export default PostDetail;


