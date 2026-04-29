import React from 'react';
import { Typography, Avatar, Space, Divider, Tag } from 'antd';
import { MOCK_AUTHOR } from '@/services/blog/mock';
import { DeveloperRole } from '@/services/blog/typings';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', padding: '24px', background: '#fff', borderRadius: '8px' }}>
      <Avatar size={100} src={MOCK_AUTHOR.avatar} style={{ marginBottom: '16px' }} />
      <Title level={2}>{MOCK_AUTHOR.name}</Title>
      <Paragraph>{MOCK_AUTHOR.bio}</Paragraph>
      
      <Divider>Kỹ năng</Divider>
      <Space wrap style={{ justifyContent: 'center' }}>
        {MOCK_AUTHOR.skills.map(skill => <Tag key={skill} color="geekblue">{skill}</Tag>)}
      </Space>

      <div style={{ marginTop: '48px', color: '#ccc', textAlign: 'right' }}>
        Assigned to: {DeveloperRole.P2_UI_DETAIL}
      </div>
    </div>
  );
};

export default AboutPage;


