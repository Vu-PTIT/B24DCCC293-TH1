import React, { useState, useMemo } from 'react';
import { Row, Col, Typography, Pagination, Empty } from 'antd';
import { PostStatus, DeveloperRole } from '@/services/blog/typings';
import { MOCK_POSTS, MOCK_TAGS } from '@/services/blog/mock';
import debounce from 'lodash/debounce';
import FilterSection from './components/FilterSection';
import PostCard from './components/PostCard';

const { Title } = Typography;

const PAGE_SIZE = 9;

const BlogFeed: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      setSearchText(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    setCurrentPage(1);
  };

  // Filter logic
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchesStatus = post.status === PostStatus.PUBLISHED;
      const matchesSearch = post.title.toLowerCase().includes(searchText.toLowerCase()) || 
                           post.summary.toLowerCase().includes(searchText.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesStatus && matchesSearch && matchesTag;
    });
  }, [searchText, selectedTag]);

  // Pagination logic
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredPosts, currentPage]);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>Blog Cá Nhân</Title>

      <FilterSection 
        onSearch={onSearchChange}
        tags={MOCK_TAGS}
        selectedTag={selectedTag}
        onTagClick={handleTagClick}
      />

      {paginatedPosts.length > 0 ? (
        <>
          <Row gutter={[24, 24]}>
            {paginatedPosts.map((post) => (
              <Col xs={24} sm={12} md={8} key={post.id}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={filteredPosts.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <Empty description="Không tìm thấy bài viết nào" />
      )}

      <div style={{ marginTop: '48px', color: '#ccc', textAlign: 'right', fontSize: '12px' }}>
        Assigned to: {DeveloperRole.P1_UI_FEED}
      </div>
    </div>
  );
};

export default BlogFeed;


