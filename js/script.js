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
