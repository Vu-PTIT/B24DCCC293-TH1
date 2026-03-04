import request from '@/utils/axios';

// Lấy danh sách tất cả môn học
export async function getSubjects() {
	return request.get('/api/subject');
}

// Lấy môn học theo ID
export async function getSubjectById(id: string) {
	return request.get(`/api/subject/${id}`);
}

// Tạo môn học mới
export async function createSubject(data: Subject.IRecord) {
	return request.post('/api/subject', data);
}

// Cập nhật môn học
export async function updateSubject(id: string, data: Subject.IRecord) {
	return request.put(`/api/subject/${id}`, data);
}

// Xóa môn học
export async function deleteSubject(id: string) {
	return request.delete(`/api/subject/${id}`);
}

// Tìm kiếm môn học
export async function searchSubjects(keyword: string) {
	return request.get('/api/subject/search', {
		params: { keyword },
	});
}
