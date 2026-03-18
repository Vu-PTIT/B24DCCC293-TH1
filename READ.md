Đề bài: Xây dựng ứng dụng giúp phòng chuyên viên Quản lý sổ văn bằng tốt nghiệp và người dùng tra cứu thông tin văn bằng. Các chức năng chính:

+ Quản lý sổ văn bằng:

Các văn bằng tốt nghiệp của sinh viên sẽ được cấp số vào sổ, số hiệu văn bằng và được quản lý trong sổ văn bằng.

Mỗi năm sẽ có 1 sổ văn bằng, số vào sổ được tự động tăng dần, và reset về 1 khi mở sổ mới

+ Quyết định tốt nghiệp:

Trong 1 năm sẽ có nhiều đợt sinh viên tốt nghiệp, mỗi đợt tương ứng với 1 quyết định

Thông tin của quyết định đợt/quyết định: Số QĐ, ngày ban hành, trích yếu, được quản lý trong sổ văn bằng nào

+ Cấu hình biểu mẫu phụ lục văn bằng:

Quản trị viên có thể cấu hình các trường thông tin sẽ được lưu trong hệ thống, mỗi trường thông tin sẽ có kiểu dữ liệu: String, Number hoặc Date.

Ví dụ: Dân tộc, Nơi sinh, Điểm trung bình, Ngày nhập học

Hệ thống cho phép thêm mới, chỉnh sửa, xóa các trường thông tin trong văn bằng

+ Thông tin văn bằng:

Mỗi bằng tốt nghiệp của sinh viên sẽ được quản lý tương ứng với 1 thông tin văn bằng, bao gồm các thông tin: Số vào sổ, số hiệu văn bằng, mã sinh viên, họ tên, ngày sinh (mặc định) và các trường thông tin đã được cấu hình trong biểu mẫu (điểm trung bình, xếp hạng, hệ đào tạo, nơi sinh, dân tộc…) và thuộc quyết định tốt nghiệp nào.

Khi thêm mới thông tin văn bằng, số vào sổ sẽ tự động tăng theo sổ văn bằng, không cho chỉnh sửa

Các trường thông tin khác (ngoài 5 trường mặc định) được lấy từ cấu hình biểu mẫu: Tên, kiểu dữ liệu, giá trị/control nhập liệu phải tương ứng với kiểu dữ liệu

+ Tra cứu văn bằng:

Người dùng có thể tra cứu và xem chi tiết thông tin của văn bằng và quyết định tốt nghiệp

Các tham số tìm kiếm: số hiệu văn bằng, số vào sổ, MSV, họ tên, ngày sinh; yêu cầu người dùng nhập ít nhất 2 tham số.

Ghi nhận tổng số lượt tra cứu theo quyết định tốt nghiệp