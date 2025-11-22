// Event listener cho DOMContentLoaded. Tại sao dùng: Chờ trang load xong mới chạy JS, tránh lỗi nếu element chưa tồn tại. Lưu ý liên kết: Sự kiện này áp dụng cho tất cả file HTML có script.js, nếu thay đổi cần kiểm tra element như .fade-in ở các file.
document.addEventListener("DOMContentLoaded", function() {
  // Phần animation fade-in. Tại sao dùng: Làm nội dung hiện dần khi cuộn vào view, tăng tính tương tác. Lưu ý liên kết: Observer theo dõi .fade-in từ styles.css, nếu thay đổi class fade-in ở HTML hoặc CSS thì cần cập nhật selector ở đây.
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // IntersectionObserver, theo dõi element. Tại sao dùng: Tiết kiệm hiệu suất hơn scroll event, chỉ chạy khi cần. Lưu ý liên kết: Nếu thay đổi options (như threshold), cần kiểm tra animation ở tất cả các page có .fade-in.
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Unobserve sau khi trigger. Tại sao dùng: Tránh lặp lại, tiết kiệm tài nguyên. Lưu ý liên kết: Nếu bỏ unobserve, có thể gây loop ở các page có nhiều fade-in.
      }
    });
  }, observerOptions);

  // Query tất cả .fade-in và observe. Tại sao dùng: Áp dụng animation cho nhiều element cùng lúc. Lưu ý liên kết: Selector '.fade-in' liên kết với class ở HTML và CSS, nếu đổi class cần cập nhật ở JS, HTML, và CSS.
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Phần highlight menu active. Tại sao dùng: Giúp người dùng biết đang ở trang nào, cải thiện navigation. Lưu ý liên kết: Dựa vào location.href và href ở navbar HTML, nếu thay đổi href ở HTML cần kiểm tra logic này.
  const currentLocation = location.href; // Lấy URL hiện tại. Tại sao dùng: Để so sánh với href của link. Lưu ý liên kết: Nếu website dùng base URL hoặc subdomain, cần điều chỉnh logic so sánh.
  const menuItem = document.querySelectorAll('.nav-link, .dropdown-item'); // Query tất cả link menu. Lưu ý liên kết: Selector liên kết với class ở navbar HTML, nếu thay đổi class nav cần cập nhật selector.
  
  menuItem.forEach(item => {
    if(item.href === currentLocation) { // Kiểm tra nếu href khớp URL. Lưu ý liên kết: So sánh exact, nếu có query param hoặc hash cần điều chỉnh logic.
      item.classList.add('active'); // Thêm class active. Tại sao dùng: Để style nổi bật link hiện tại. Lưu ý liên kết: Class active từ styles.css, nếu thay đổi style active ở CSS thì ảnh hưởng toàn site.
      const parentDropdown = item.closest('.dropdown'); // Tìm dropdown cha. Tại sao dùng: Để active cả menu cha nếu cần. Lưu ý liên kết: Closest dựa vào class dropdown ở HTML.
      if (parentDropdown) {
        parentDropdown.querySelector('.nav-link').classList.add('active');
      }
    }
  });

  // Phần xử lý form liên hệ. Tại sao dùng: Ngăn submit mặc định và xử lý JS, có thể kết nối backend sau. Lưu ý liên kết: Chỉ áp dụng cho form ở lienhe.html, nếu thêm form ở file khác cần điều chỉnh selector.
  const contactForm = document.querySelector('form');
  if (contactForm) { // Kiểm tra form tồn tại. Tại sao dùng: Tránh lỗi nếu trang không có form. Lưu ý liên kết: Selector 'form' chung, nếu có nhiều form cần chỉ định id hoặc class.
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Ngăn submit reload trang. Tại sao dùng: Giữ trải nghiệm mượt mà. Lưu ý liên kết: Nếu thêm backend submit, cần thay đổi logic này.
      alert('Cảm ơn bạn! Thông tin đã được gửi thành công.'); // Alert tạm thời. Tại sao dùng: Phản hồi nhanh cho user. Lưu ý liên kết: Nếu thay bằng AJAX, cần kiểm tra form id ở lienhe.html.
      contactForm.reset(); // Reset form. Tại sao dùng: Xóa dữ liệu sau submit, sẵn sàng cho lần sau. Lưu ý liên kết: Reset dựa vào input id ở form HTML.
    });
  }
});
