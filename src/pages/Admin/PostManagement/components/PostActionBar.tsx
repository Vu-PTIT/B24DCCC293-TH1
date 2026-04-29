import React from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface PostActionBarProps {
	onAddClick: () => void;
}

const PostActionBar: React.FC<PostActionBarProps> = ({ onAddClick }) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: 16,
				gap: 12,
				flexWrap: 'wrap',
				flexDirection: window.innerWidth < 768 ? 'column' : 'row',
			}}
		>
			<Title level={4} style={{ margin: 0, minWidth: 0 }}>
				Quan ly bai viet
			</Title>
			<Button
				type='primary'
				icon={<PlusOutlined />}
				onClick={onAddClick}
				style={{ width: window.innerWidth < 768 ? '100%' : 'auto' }}
			>
				Them bai viet
			</Button>
		</div>
	);
};

export default PostActionBar;
