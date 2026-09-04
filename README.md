# EPIC Talent Center Website

Website tĩnh cho Trung tâm Năng khiếu EPIC.

## Cấu trúc

epic-talent-center/
├── index.html
├── style.css
├── script.js
└── assets/
    └── logo.png

## Chạy trên máy

Cách đơn giản nhất:
1. Mở file `index.html` bằng trình duyệt.

Khuyến nghị:
- Dùng VS Code.
- Cài extension "Live Server".
- Chuột phải `index.html` → "Open with Live Server".

## Thay nội dung

Tìm trong `index.html`:
- Số điện thoại `0900 000 000`
- Email `hello@epic.edu.vn`
- Địa chỉ mẫu
- Tên giáo viên mẫu
- Nội dung chương trình

## Thay ảnh

Thêm ảnh vào thư mục `assets/`, sau đó thay các khu vực placeholder trong HTML bằng thẻ:

<img src="assets/ten-anh.jpg" alt="Mô tả ảnh">

## Form đăng ký

Bản code hiện tại có giao diện + kiểm tra dữ liệu + lưu bản đăng ký cuối cùng vào localStorage.

Để nhận đăng ký thật từ phụ huynh khi website đã public, cần kết nối form với:
- Google Forms
- Formspree
- Netlify Forms
- hoặc backend riêng.

## Đưa website lên Internet miễn phí

Có thể dùng GitHub Pages:
1. Tạo tài khoản GitHub.
2. Tạo repository mới.
3. Upload toàn bộ file/thư mục.
4. Vào Settings → Pages.
5. Chọn Deploy from branch → `main` → `/root`.
6. Save.
7. GitHub sẽ cấp một địa chỉ website miễn phí.

Tên miền riêng `.vn`/`.com` là tùy chọn, không bắt buộc.
