// Animation fade-in khi scroll: Làm nội dung hiện dần khi kéo trang xuống. Không cần thay đổi trừ khi muốn thêm chức năng mới.
window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});

// Form liên hệ: Xử lý khi submit form (hiện alert placeholder). Để gửi email thực, thay bằng code tích hợp (ví dụ: dùng email.js).
document.querySelector('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thông tin đã gửi!'); // Thay bằng chức năng gửi email nếu cần (cần thêm thư viện bên ngoài).
});

// (MỚI) Active Link: Tự động tô màu menu tương ứng với trang đang xem.
document.addEventListener("DOMContentLoaded", function() {
  // Lấy địa chỉ trang hiện tại
  const currentLocation = location.href; 
  // Chọn tất cả các link trong menu
  const menuItem = document.querySelectorAll('.nav-link, .dropdown-item'); 
  
  menuItem.forEach(item => {
    if(item.href === currentLocation) { // Nếu link trong menu trùng với trang hiện tại
      item.classList.add('active'); // Thêm class 'active' để đổi màu trong CSS.
      
      // Nếu link này nằm trong menu con (Dropdown), thì tô màu cả mục cha của nó nữa.
      const parentDropdown = item.closest('.dropdown'); 
      if (parentDropdown) {
        parentDropdown.querySelector('.nav-link').classList.add('active');
      }
    }
  });
});
