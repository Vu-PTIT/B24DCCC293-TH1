
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Input, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TodoListTable, { TodoItem } from './components/List';
import TodoForm from './components/Form';

const TODO_STORAGE_KEY = 'my_todo_list_data';

const TodoList = () => {
    // --- STATE QUẢN LÝ DỮ LIỆU ---
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [searchText, setSearchText] = useState('');

    // --- STATE QUẢN LÝ MODAL ---
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<TodoItem | null>(null);

    // --- EFFECT: LOAD DỮ LIỆU TỪ LOCAL STORAGE ---
    useEffect(() => {
        const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
        if (savedTodos) {
            try {
                setTodos(JSON.parse(savedTodos));
            } catch (error) {
                console.error('Lỗi khi đọc LocalStorage:', error);
            }
        }
    }, []);

    // --- HELPER: LƯU DỮ LIỆU VÀO LOCAL STORAGE ---
    const saveToLocalStorage = (newTodos: TodoItem[]) => {
        setTodos(newTodos);
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos));
    };

    // --- ACTIONS: THÊM / SỬA / XÓA ---

    // Mở modal thêm mới
    const handleAddNew = () => {
        setEditingItem(null);
        setIsModalVisible(true);
    };

    // Mở modal chỉnh sửa
    const handleEdit = (item: TodoItem) => {
        setEditingItem(item);
        setIsModalVisible(true);
    };

    // Xử lý lưu form (Thêm mới hoặc Cập nhật)
    const handleSave = (values: any) => {
        if (editingItem) {
            // Cập nhật item cũ
            const updatedTodos = todos.map(todo =>
                todo.id === editingItem.id ? { ...todo, ...values } : todo
            );
            saveToLocalStorage(updatedTodos);
            message.success('Cập nhật thành công!');
        } else {
            // Thêm item mới
            const newTodo: TodoItem = {
                id: Date.now().toString(), // Tạo ID đơn giản bằng timestamp
                title: values.title,
                description: values.description,
                priority: values.priority,
                completed: false,
                createdAt: new Date().toISOString(),
            };
            saveToLocalStorage([newTodo, ...todos]);
            message.success('Thêm mới thành công!');
        }
        setIsModalVisible(false);
    };

    // Xóa công việc
    const handleDelete = (id: string) => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        saveToLocalStorage(filteredTodos);
        message.success('Đã xóa công việc!');
    };

    // Đổi trạng thái Hoàn thành / Chưa hoàn thành
    const handleToggleStatus = (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveToLocalStorage(updatedTodos);
    };

    // --- FILTER: TÌM KIẾM ---
    const filteredData = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <PageContainer title="Danh sách công việc (Todo List)">
            <Card>
                {/* THANH CÔNG CỤ */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm công việc..."
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
                        Thêm công việc
                    </Button>
                </div>

                {/* BẢNG DANH SÁCH */}
                <TodoListTable
                    data={filteredData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                />

                {/* MODAL FORM */}
                <TodoForm
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    onSave={handleSave}
                    initialValues={editingItem}
                />
            </Card>
        </PageContainer>
    );
};

export default TodoList;
