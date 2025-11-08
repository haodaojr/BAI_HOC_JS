import React, { useState } from 'react';

/* 
╔══════════════════════════════════════════════════════════╗
║  FUNCTION 3: HERO COMPONENT (với Typing Effect)         ║
║  Từ code Portfolio của bạn - Dòng 116-204              ║
╚══════════════════════════════════════════════════════════╝
*/

// THEMES
const themes = {
  light: {
    background: '#ffffff',
    text: '#1f2937',
    primary: '#3b82f6',
    secondary: '#10b981'
  },
  dark: {
    background: '#1f2937',
    text: '#f9fafb',
    primary: '#60a5fa',
    secondary: '#34d399'
  }
};

// ĐÂY LÀ HERO COMPONENT
function Hero({ theme }) {
  
  // 1. STATE: displayText - text đang hiển thị
  const [displayText, setDisplayText] = useState('');
  
  // 2. TEXT MỤC TIÊU - text đầy đủ cần hiển thị
  const fullText = "Hi, I'm Your Name 👋";

  // 3. useEffect - CHẠY KHI COMPONENT MOUNT (lần đầu render)
  React.useEffect(() => {
    let i = 0; // Biến đếm vị trí ký tự
    
    // 4. setInterval - Chạy mỗi 100ms
    const timer = setInterval(() => {
      if (i < fullText.length) {
        // Lấy từ đầu đến vị trí i+1
        setDisplayText(fullText.slice(0, i + 1));
        i++; // Tăng i lên 1
      } else {
        // Khi đã hiển thị hết → dừng interval
        clearInterval(timer);
      }
    }, 100);

    // 5. CLEANUP FUNCTION - Dọn dẹp khi component unmount
    return () => clearInterval(timer);
  }, []); // [] = chỉ chạy 1 lần khi mount

  // 6. RETURN JSX
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
      padding: '120px 2rem 2rem'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px'
      }}>
        
        {/* TIÊU ĐỀ với typing effect */}
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: theme.text,
          marginBottom: '1rem',
          minHeight: '4rem'
        }}>
          {displayText}
        </h1>

        {/* MÔ TẢ */}
        <p style={{
          fontSize: '1.2rem',
          color: theme.text + '80',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Full Stack Developer passionate about creating amazing user experiences
          with modern web technologies.
        </p>

        {/* 2 BUTTONS */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            backgroundColor: theme.primary,
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            View My Work 🚀
          </button>

          <button style={{
            backgroundColor: 'transparent',
            color: theme.primary,
            border: `2px solid ${theme.primary}`,
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Download CV 📄
          </button>
        </div>
      </div>
    </section>
  );
}

/* 
📝 GIẢI THÍCH CHI TIẾT:

1. STATE displayText:
   const [displayText, setDisplayText] = useState('');
   - Ban đầu = '' (rỗng)
   - Sẽ được cập nhật từng ký tự: "H" → "Hi" → "Hi," → ...

2. useEffect LÀ GÌ?
   - Hook để xử lý side effects
   - Chạy sau khi component render
   - [] = dependency array rỗng = chỉ chạy 1 lần

3. setInterval:
   setInterval(() => { ... }, 100)
   - Chạy function mỗi 100ms (0.1 giây)
   - Giống như đồng hồ tick mỗi 100ms

4. LOGIC TYPING EFFECT:
   Bước 1: i = 0 → displayText = "H"
   Bước 2: i = 1 → displayText = "Hi"
   Bước 3: i = 2 → displayText = "Hi,"
   ...
   Cuối cùng: displayText = "Hi, I'm Your Name 👋"

5. fullText.slice(0, i + 1):
   - slice() cắt chuỗi từ vị trí 0 đến i+1
   - "Hello".slice(0, 2) = "He"
   - "Hello".slice(0, 5) = "Hello"

6. CLEANUP FUNCTION:
   return () => clearInterval(timer);
   - Dọn dẹp interval khi component bị remove
   - Tránh memory leak
   - Rất quan trọng!

7. LINEAR GRADIENT:
   background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`
   - Tạo background màu gradient
   - 135deg = góc
   - 20 ở cuối = opacity 20% (hex color)

✅ BẠN ĐÃ HỌC:
1. useState để lưu text hiển thị
2. useEffect để chạy code khi component mount
3. setInterval để tạo animation
4. slice() để cắt chuỗi
5. clearInterval để dọn dẹp
6. Cleanup function trong useEffect
7. Linear gradient background

❓ KIỂM TRA HIỂU BÀI:
1. useEffect với [] chạy bao nhiêu lần? → 1 lần khi mount
2. setInterval(fn, 100) nghĩa là gì? → Chạy fn mỗi 100ms
3. Tại sao cần clearInterval? → Để dọn dẹp, tránh memory leak
4. slice(0, 3) làm gì? → Lấy 3 ký tự đầu

🎯 THỰC HÀNH:
- Xem text xuất hiện từng chữ
- Thử đổi 100 thành 200 → chậm hơn
- Thử đổi fullText thành tên bạn
- Click button Light/Dark để xem gradient đổi màu

⚠️ LƯU Ý QUAN TRỌNG:
- LUÔN cleanup interval/timeout
- useEffect với [] chỉ chạy 1 lần
- Không dùng setInterval mà không clear → memory leak!
*/

// DEMO HERO
export default function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const theme = currentTheme === 'light' ? themes.light : themes.dark;
  
  return (
    <div style={{ 
      backgroundColor: theme.background,
      minHeight: '100vh'
    }}>
      <div style={{ 
        backgroundColor: '#fef3c7', 
        padding: '10px',
        color: '#000',
        textAlign: 'center'
      }}>
        <strong>Function 3/12:</strong> HERO COMPONENT (Typing Effect)
        <button 
          onClick={() => setCurrentTheme(t => t === 'light' ? 'dark' : 'light')}
          style={{ marginLeft: '20px', padding: '5px 15px', cursor: 'pointer' }}
        >
          Toggle Theme
        </button>
      </div>
      
      <Hero theme={theme} />
      
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: theme.text 
      }}>
        <p>💡 Reload trang để xem typing effect lại từ đầu!</p>
      </div>
    </div>
  );
}