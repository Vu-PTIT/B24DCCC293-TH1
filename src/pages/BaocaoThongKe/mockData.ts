import { IMember } from '../../interfaces/member';
import { clubs } from '../../interfaces/clubs';

export const mockMembers: IMember[] = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@ptit.edu.vn', phone: '0987654321', gender: 'Nam', address: 'Hà Đông, Hà Nội', clubId: 3, clubName: 'CLB Lập trình', status: 'Pending' },
  { id: 2, name: 'Trần Thu Hà', email: 'ha.tran@ptit.edu.vn', phone: '0911222333', gender: 'Nữ', address: 'Thanh Xuân, Hà Nội', clubId: 2, clubName: 'CLB Âm nhạc', status: 'Approved' },
  { id: 3, name: 'Lê Đức Minh', email: 'minh.le@ptit.edu.vn', phone: '0909988776', gender: 'Nam', address: 'Văn Quán, Hà Đông', clubId: 1, clubName: 'CLB Bóng đá', status: 'Rejected' },
  { id: 4, name: 'Phạm Ngọc Mai', email: 'mai.pham@ptit.edu.vn', phone: '0922334455', gender: 'Nữ', address: 'Cầu Giấy, Hà Nội', clubId: 3, clubName: 'CLB Lập trình', status: 'Approved' },
  { id: 5, name: 'Hoàng Quốc Bảo', email: 'bao.hoang@ptit.edu.vn', phone: '0933445566', gender: 'Nam', address: 'Đống Đa, Hà Nội', clubId: 3, clubName: 'CLB Lập trình', status: 'Approved' },
  { id: 6, name: 'Vũ Thị Lan', email: 'lan.vu@ptit.edu.vn', phone: '0944556677', gender: 'Nữ', address: 'Ba Đình, Hà Nội', clubId: 2, clubName: 'CLB Âm nhạc', status: 'Pending' },
  { id: 7, name: 'Đặng Minh Quang', email: 'quang.dang@ptit.edu.vn', phone: '0955667788', gender: 'Nam', address: 'Long Biên, Hà Nội', clubId: 1, clubName: 'CLB Bóng đá', status: 'Approved' },
  { id: 8, name: 'Ngô Thu Thủy', email: 'thuy.ngo@ptit.edu.vn', phone: '0966778899', gender: 'Nữ', address: 'Hai Bà Trưng, Hà Nội', clubId: 1, clubName: 'CLB Bóng đá', status: 'Pending' },
  { id: 9, name: 'Bùi Thế Anh', email: 'anh.bui@ptit.edu.vn', phone: '0977889900', gender: 'Nam', address: 'Tây Hồ, Hà Nội', clubId: 2, clubName: 'CLB Âm nhạc', status: 'Rejected' },
  { id: 10, name: 'Lý Lan Hương', email: 'huong.ly@ptit.edu.vn', phone: '0988990011', gender: 'Nữ', address: 'Thanh Trì, Hà Nội', clubId: 3, clubName: 'CLB Lập trình', status: 'Rejected' },
];

export const mockClubs = clubs;
