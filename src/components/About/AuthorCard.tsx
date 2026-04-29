import React from 'react';
import { Card, Avatar, Typography, Tag, Space, Button } from 'antd';

const { Title, Paragraph } = Typography;

interface Props {
	data: any;
	onEdit: () => void;
}

const AuthorCard: React.FC<Props> = ({ data, onEdit }) => {
	return (
		<Card style={{ maxWidth: 700, margin: 'auto', textAlign: 'center' }}>
			<Space direction='vertical' align='center' style={{ width: '100%' }}>
				<Avatar size={120} src={data.avatar} />

				<Title level={3}>{data.name}</Title>

				<Paragraph>{data.bio}</Paragraph>

				<div>
					{data.skills.map((skill: string) => (
						<Tag key={skill}>{skill}</Tag>
					))}
				</div>

				<Space>
					{data.social.facebook && <a href={data.social.facebook}>Facebook</a>}
					{data.social.github && <a href={data.social.github}>GitHub</a>}
					{data.social.linkedin && <a href={data.social.linkedin}>LinkedIn</a>}
				</Space>

				<Button type='primary' onClick={onEdit}>
					Chỉnh sửa
				</Button>
			</Space>
		</Card>
	);
};

export default AuthorCard;
