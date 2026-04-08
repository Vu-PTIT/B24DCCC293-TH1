import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Task {
	id: string;
	name: string;
	assignee: string;
	priority: string;
	deadline: string;
	status: string;
}

const GroupTaskAnalytics: React.FC = () => {


};

export default GroupTaskAnalytics;
