import { Post, PostStatus, Tag, Author } from './typings';

export const MOCK_TAGS: Tag[] = [
  { id: '1', name: 'React', postCount: 5 },
  { id: '2', name: 'TypeScript', postCount: 3 },
  { id: '3', name: 'UmiJS', postCount: 2 },
  { id: '4', name: 'Ant Design', postCount: 4 },
];

export const MOCK_AUTHOR: Author = {
  name: 'Antigravity AI',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blog',
  bio: 'A powerful agentic AI coding assistant designed by the Google Deepmind team.',
  skills: ['React', 'TypeScript', 'Node.js', 'AI', 'Fullstack Development'],
  socialLinks: [
    { platform: 'Github', url: 'https://github.com', icon: 'GithubOutlined' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: 'TwitterOutlined' },
  ],
};

export const MOCK_POSTS: Post[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Blog Post Title ${i + 1}`,
  slug: `blog-post-title-${i + 1}`,
  summary: `This is a short summary for blog post number ${i + 1}. It covers the basics of the topic.`,
  content: `# Blog Post ${i + 1}\n\nThis is the main content in **Markdown** format.\n\n## Section 1\nContent goes here...`,
  coverUrl: `https://picsum.photos/seed/${i + 1}/800/400`,
  tags: [MOCK_TAGS[i % MOCK_TAGS.length].name],
  status: i % 5 === 0 ? PostStatus.DRAFT : PostStatus.PUBLISHED,
  author: MOCK_AUTHOR.name,
  viewCount: Math.floor(Math.random() * 1000),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
}));
