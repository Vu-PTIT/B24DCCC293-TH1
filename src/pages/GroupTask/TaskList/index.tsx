import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, DatePicker, message, Space, Tag, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

interface Task {
	id: string;
	name: string;
	assignee: string;
	priority: 'Thấp' | 'Trung bình' | 'Cao';
	deadline: string;
	status: 'Chưa làm' | 'Đang làm' | 'Đã xong';
}

const GroupTaskList: React.FC = () => {

};

export default GroupTaskList;
