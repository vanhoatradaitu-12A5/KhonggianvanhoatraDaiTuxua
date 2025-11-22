// Event listener cho DOMContentLoaded. Tại sao dùng: Chờ trang load xong mới chạy JS, tránh lỗi nếu element chưa tồn tại.
document.addEventListener("DOMContentLoaded", function() {
  // Phần animation fade-in. Tại sao dùng: Làm nội dung hiện dần khi cuộn vào view, tăng tính tương tác.
  // ObserverOptions, config cho IntersectionObserver. Tại sao dùng threshold 0.1: Chỉ cần 10% element vào view là trigger.
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // IntersectionObserver, theo dõi element. Tại sao dùng: Tiết kiệm hiệu suất hơn scroll event, chỉ chạy khi cần.
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Unobserve sau khi trigger. Tại sao dùng: Tránh lặp lại, tiết kiệm tài nguyên.
      }
    });
  }, observerOptions);

  // Query tất cả .fade-in và observe. Tại sao dùng: Áp dụng animation cho nhiều element cùng lúc.
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Phần highlight menu active. Tại sao dùng: Giúp người dùng biết đang ở trang nào, cải thiện navigation.
  const currentLocation = location.href; // Lấy URL hiện tại. Tại sao dùng: Để so sánh với href của link.
  const menuItem = document.querySelectorAll('.nav-link, .dropdown-item'); // Query tất cả link menu.
  
  menuItem.forEach(item => {
    if(item.href === currentLocation) { // Kiểm tra nếu href khớp URL.
      item.classList.add('active'); // Thêm class active. Tại sao dùng: Để style nổi bật link hiện tại.
      const parentDropdown = item.closest('.dropdown'); // Tìm dropdown cha. Tại sao dùng: Để active cả menu cha nếu cần.
      if (parentDropdown) {
        parentDropdown.querySelector('.nav-link').classList.add('active');
      }
    }
  });

  // Phần xử lý form liên hệ. Tại sao dùng: Ngăn submit mặc định và xử lý JS, có thể kết nối API sau.
  const contactForm = document.querySelector('form');
  if (contactForm) { // Kiểm tra form tồn tại. Tại sao dùng: Tránh lỗi nếu trang không có form.
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Ngăn submit reload trang. Tại sao dùng: Giữ trải nghiệm mượt mà.
      alert('Cảm ơn bạn! Thông tin đã được gửi thành công.'); // Alert tạm thời. Tại sao dùng: Phản hồi nhanh cho user.
      contactForm.reset(); // Reset form. Tại sao dùng: Xóa dữ liệu sau submit, sẵn sàng cho lần sau.
    });
  }
});
