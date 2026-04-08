import React, { useState, useEffect } from 'react';
import { Card, Table, Input, Select, Tag, Divider, Row, Col, Button } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

interface Task {
	id: string;
	name: string;
	assignee: string;
	priority: string;
	deadline: string;
	status: string;
}

const GroupTaskFilter: React.FC = () => {

};

export default GroupTaskFilter;
