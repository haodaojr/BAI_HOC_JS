# ⚡ COMPONENT NAMING CONVENTIONS (PASCALCASE, DESCRIPTIVE NAMES) - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **2 quy tắc vàng:**
1. **PascalCase**: Viết hoa chữ cái đầu mỗi từ
2. **Descriptive**: Tên mô tả rõ chức năng

**✅ Đúng:** `UserProfile`, `ProductCard`, `LoginForm`
**❌ Sai:** `userprofile`, `product_card`, `login-form`

---

## 🔥 PHẦN 1: PASCALCASE - QUY TẮC VIẾT HOA

### **🔍 PascalCase là gì? Tại sao phải dùng?**

**PascalCase là quy tắc viết hoa chữ cái đầu của từng từ.**

**1. Cách viết:**
- Viết hoa chữ cái đầu của **từng từ**
- KHÔNG có dấu gạch ngang hoặc gạch dưới
- KHÔNG có dấu cách

**2. Tại sao React bắt buộc dùng PascalCase?**

**Lý do 1: Phân biệt Component vs HTML tag**
```jsx
// HTML tag (viết thường) - React hiểu là thẻ HTML thật
<div>Hello</div>
<button>Click</button>

// Component (viết hoa) - React hiểu là component do bạn tạo
<UserProfile />
<ProductCard />
```

**Lý do 2: Quy tắc của React**
```jsx
// ❌ Viết thường → React tìm HTML tag
function userProfile() { return <div>Profile</div>; }
<userProfile />  // React tìm thẻ <userProfile> HTML → Không tồn tại → Lỗi

// ✅ Viết hoa → React gọi component
function UserProfile() { return <div>Profile</div>; }
<UserProfile />  // React gọi function UserProfile()
```

**Lý do 3: Convention của JavaScript/React**
- Class trong JS: `class UserProfile {}`
- Component trong React: `function UserProfile() {}`
- Cả hai đều dùng PascalCase

### **Ví dụ chi tiết:**

| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| `userprofile` | `UserProfile` | Viết hoa chữ đầu |
| `product_card` | `ProductCard` | Không gạch dưới |
| `login-form` | `LoginForm` | Không gạch ngang |
| `user_profile` | `UserProfile` | PascalCase chuẩn |

---

### **❌ LỖI PHỔ BIẾN:**

**❌ Lỗi 1: Viết thường chữ đầu**
```jsx
function userProfile() { /* ... */ }
// Lỗi: Component name phải viết hoa
```

**✅ Đúng:**
```jsx
function UserProfile() { /* ... */ }
```

**❌ Lỗi 2: Dùng snake_case**
```jsx
function user_profile() { /* ... */ }
// Lỗi: React không cho phép snake_case
```

**✅ Đúng:**
```jsx
function UserProfile() { /* ... */ }
```

**❌ Lỗi 3: Dùng kebab-case**
```jsx
function user-profile() { /* ... */ }
// Lỗi: JavaScript không cho phép dấu gạch ngang trong tên
```

**✅ Đúng:**
```jsx
function UserProfile() { /* ... */ }
```

---

## 🔥 PHẦN 2: DESCRIPTIVE NAMES - TÊN MÔ TẢ

### **🔍 Tại sao cần tên mô tả? Component làm gì?**

**Tên component phải trả lời được câu hỏi:**
**"Component này làm gì?"**

**❌ Tên xấu (không mô tả - học từ lỗi):**

```jsx
// Tên không rõ ràng - không biết làm gì
function Data() { /* ... */ }           // Data gì? User data? Product data?
function Info() { /* ... */ }           // Info gì? User info? System info?
function Card() { /* ... */ }           // Card gì? User card? Product card?
function Form() { /* ... */ }           // Form gì? Login form? Contact form?
function List() { /* ... */ }           // List gì? Todo list? User list?
```

**Vấn đề:**
- Đọc code khó hiểu mục đích
- Tìm component khó
- Team khác không hiểu
- Dễ bị nhầm lẫn

**✅ Tên tốt (mô tả rõ ràng - học từ best practice):**

```jsx
// Tên rõ ràng, cụ thể - biết ngay chức năng
function UserProfile() { /* ... */ }    // Profile của user
function ProductCard() { /* ... */ }    // Card hiển thị product
function LoginForm() { /* ... */ }      // Form đăng nhập
function TodoList() { /* ... */ }       // List các todo
function CommentSection() { /* ... */ } // Section bình luận
```

**Lợi ích:**
- Đọc code hiểu ngay
- Tìm component dễ
- Team collaboration tốt
- Ít bug do nhầm lẫn

---

### **📊 So sánh trực quan:**

| ❌ Bad Name | ✅ Good Name | Tại sao tốt hơn |
|-------------|--------------|-----------------|
| `Data()` | `UserData()` | Cụ thể data gì |
| `Info()` | `UserInfo()` | Mô tả rõ info gì |
| `Card()` | `ProductCard()` | Nói rõ card loại gì |
| `Form()` | `LoginForm()` | Form để làm gì |
| `List()` | `TodoList()` | List chứa cái gì |

---

### **🎯 Nguyên tắc đặt tên:**

**1. Trả lời "Component này hiển thị cái gì?"**
```jsx
// ✅ Tốt
function UserAvatar()     // Hiển thị avatar của user
function ProductPrice()   // Hiển thị giá của product
function LoginButton()    // Nút để login

// ❌ Không tốt
function Avatar()         // Avatar của ai?
function Price()          // Giá của cái gì?
function Button()         // Nút làm gì?
```

**2. Trả lời "Component này làm gì?"**
```jsx
// ✅ Tốt
function SearchInput()    // Input để search
function AddToCart()      // Thêm vào giỏ hàng
function DeleteUser()     // Xóa user

// ❌ Không tốt
function Input()          // Input làm gì?
function Add()            // Add cái gì?
function Delete()         // Delete cái gì?
```

---

## 🔥 PHẦN 3: CÁC LOẠI COMPONENT VÀ CÁCH ĐẶT TÊN

### **1. Page Components (trang chính):**

```jsx
function HomePage() { /* ... */ }
function AboutPage() { /* ... */ }
function ContactPage() { /* ... */ }
function DashboardPage() { /* ... */ }
function ProfilePage() { /* ... */ }
```

### **2. Layout Components (bố cục):**

```jsx
function Header() { /* ... */ }
function Footer() { /* ... */ }
function Sidebar() { /* ... */ }
function Navigation() { /* ... */ }
function MainLayout() { /* ... */ }
```

### **3. UI Components (giao diện):**

```jsx
function Button() { /* ... */ }
function Input() { /* ... */ }
function Modal() { /* ... */ }
function Dropdown() { /* ... */ }
function Avatar() { /* ... */ }
```

### **4. Feature Components (tính năng):**

```jsx
function UserProfile() { /* ... */ }
function ProductCard() { /* ... */ }
function ShoppingCart() { /* ... */ }
function SearchBar() { /* ... */ }
function NotificationBell() { /* ... */ }
```

### **5. Form Components:**

```jsx
function LoginForm() { /* ... */ }
function RegisterForm() { /* ... */ }
function ContactForm() { /* ... */ }
function CheckoutForm() { /* ... */ }
```

---

## 🔥 PHẦN 4: QUY TẮC ĐẶT TÊN CHI TIẾT

### **1. Sử dụng danh từ:**

```jsx
// ✅ Tốt
function UserCard() { /* ... */ }
function ProductList() { /* ... */ }
function CommentForm() { /* ... */ }

// ❌ Không nên
function ShowUser() { /* ... */ }     // Động từ
function DisplayProduct() { /* ... */ } // Động từ
function CreateComment() { /* ... */ }  // Động từ
```

### **2. Tránh tên quá ngắn:**

```jsx
// ❌ Quá ngắn, không rõ
function U() { /* ... */ }      // User?
function P() { /* ... */ }      // Product?
function C() { /* ... */ }      // Card? Comment?

// ✅ Rõ ràng
function User() { /* ... */ }
function Product() { /* ... */ }
function Comment() { /* ... */ }
```

### **3. Tránh tên quá dài:**

```jsx
// ❌ Quá dài, khó nhớ
function UserProfileInformationDisplayComponent() { /* ... */ }
function ProductCardWithImageAndPriceDisplay() { /* ... */ }

// ✅ Vừa đủ, rõ ràng
function UserProfile() { /* ... */ }
function ProductCard() { /* ... */ }
```

### **4. Sử dụng từ ghép có ý nghĩa:**

```jsx
// ✅ Tốt
function SearchInput() { /* Input để search */ }
function UserAvatar() { /* Avatar của user */ }
function ProductImage() { /* Hình ảnh product */ }
function LoginButton() { /* Nút đăng nhập */ }

// ❌ Không rõ ràng
function SearchField() { /* Field gì? */ }
function UserPic() { /* Pic là gì? */ }
function ProductPic() { /* Không chuẩn */ }
function LoginBtn() { /* Viết tắt */ }
```

---

## 🔥 PHẦN 5: QUY TẮC CHO COMPONENT CÓ VARIANT

### **1. Sử dụng props thay vì tạo component mới:**

```jsx
// ✅ Tốt - 1 component, nhiều variant
function Button({ variant, size }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      Click me
    </button>
  );
}

// Sử dụng:
<Button variant="primary" size="large" />
<Button variant="secondary" size="small" />
```

### **2. Chỉ tạo component riêng khi logic khác nhau hoàn toàn:**

```jsx
// ✅ Được phép - logic khác nhau
function PrimaryButton() { /* logic riêng */ }
function SecondaryButton() { /* logic riêng */ }

// ❌ Không nên - chỉ khác style
function RedButton() { /* chỉ khác màu */ }
function BlueButton() { /* chỉ khác màu */ }
```

---

## 🔥 PHẦN 6: QUY TẮC CHO FILE NAMES

### **File name = Component name:**

```
src/components/
├── UserProfile.jsx      // Component: UserProfile
├── ProductCard.jsx      // Component: ProductCard
├── LoginForm.jsx        // Component: LoginForm
└── TodoList.jsx         // Component: TodoList
```

### **Index files:**

```jsx
// src/components/index.js
export { default as UserProfile } from './UserProfile';
export { default as ProductCard } from './ProductCard';
export { default as LoginForm } from './LoginForm';
```

---

## 🔥 PHẦN 7: LỖI THƯỜNG GẶP

### **❌ Lỗi 1: Không viết hoa chữ đầu**

```jsx
// Sai
function userProfile() { /* ... */ }
function productCard() { /* ... */ }

// Đúng
function UserProfile() { /* ... */ }
function ProductCard() { /* ... */ }
```

### **❌ Lỗi 2: Sử dụng camelCase thay vì PascalCase**

```jsx
// Sai
function userProfile() { /* ... */ }
function loginForm() { /* ... */ }

// Đúng
function UserProfile() { /* ... */ }
function LoginForm() { /* ... */ }
```

### **❌ Lỗi 3: Sử dụng kebab-case hoặc snake_case**

```jsx
// Sai
function user-profile() { /* ... */ }
function user_profile() { /* ... */ }
function login_form() { /* ... */ }

// Đúng
function UserProfile() { /* ... */ }
function LoginForm() { /* ... */ }
```

### **❌ Lỗi 4: Tên không mô tả**

```jsx
// Sai
function Component1() { /* ... */ }
function MyDiv() { /* ... */ }
function Stuff() { /* ... */ }

// Đúng
function UserProfile() { /* ... */ }
function ProductCard() { /* ... */ }
function TodoList() { /* ... */ }
```

---

## ⚡ BÀI TẬP NHANH (5 phút)

### **Bài 1: Sửa tên component sai**

```jsx
// Sửa các tên component sau thành đúng quy tắc:

// 1. function userprofile() → ?
// 2. function product_card() → ?
// 3. function login-form() → ?
// 4. function user_info() → ?
// 5. function product-list() → ?
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Áp dụng PascalCase</summary>

```jsx
// PascalCase: Viết hoa chữ cái đầu mỗi từ
// 1. userprofile → UserProfile (hoa U và P)
// 2. product_card → ProductCard (hoa P, bỏ _, hoa C)
// 3. login-form → LoginForm (hoa L, bỏ -, hoa F)
// 4. user_info → UserInfo (hoa U, bỏ _, hoa I)
// 5. product-list → ProductList (hoa P, bỏ -, hoa L)
```
</details>

<details>
<summary>Bước 2: Kiểm tra lại</summary>

```jsx
// Đáp án đúng:
// 1. function UserProfile()
// 2. function ProductCard()
// 3. function LoginForm()
// 4. function UserInfo()
// 5. function ProductList()
```
</details>

---

### **Bài 2: Chọn tên tốt nhất**

```jsx
// Với mỗi nhóm, chọn tên component tốt nhất:

// Nhóm 1: Component hiển thị thông tin user
// A) UserData    B) UserProfile    C) ShowUser

// Nhóm 2: Component form đăng nhập
// A) Login        B) LoginForm      C) Auth

// Nhóm 3: Component danh sách sản phẩm
// A) Products     B) ProductList    C) Items
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Nhóm 1: Component hiển thị thông tin user</summary>

```jsx
// A) UserData - chỉ nói data, không nói hiển thị
// B) UserProfile - rõ ràng là profile của user ✅
// C) ShowUser - động từ "show" không nên dùng

// Đáp án: B) UserProfile
```
</details>

<details>
<summary>Nhóm 2: Component form đăng nhập</summary>

```jsx
// A) Login - quá ngắn, không rõ là form
// B) LoginForm - rõ ràng là form đăng nhập ✅
// C) Auth - viết tắt, không rõ ràng

// Đáp án: B) LoginForm
```
</details>

<details>
<summary>Nhóm 3: Component danh sách sản phẩm</summary>

```jsx
// A) Products - danh từ số nhiều, không rõ là list
// B) ProductList - rõ ràng là list các product ✅
// C) Items - quá chung chung

// Đáp án: B) ProductList
```
</details>

---

### **Bài 3: Đặt tên cho component mới**

```jsx
// Đặt tên cho các component sau:

// 1. Component hiển thị avatar và tên user → ?
// 2. Component form liên hệ → ?
// 3. Component thanh điều hướng → ?
// 4. Component nút thêm vào giỏ hàng → ?
// 5. Component hiển thị đánh giá sao → ?
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Áp dụng quy tắc descriptive naming</summary>

```jsx
// 1. Component hiển thị avatar và tên user
// → UserAvatar (avatar của user)
// → UserCard (card chứa info user)

// 2. Component form liên hệ
// → ContactForm (form để contact)

// 3. Component thanh điều hướng
// → Navigation (thanh navigation)
// → Navbar (viết tắt của navigation bar)

// 4. Component nút thêm vào giỏ hàng
// → AddToCartButton (nút thêm vào giỏ)

// 5. Component hiển thị đánh giá sao
// → StarRating (đánh giá bằng sao)
// → RatingStars (các ngôi sao đánh giá)
```
</details>

<details>
<summary>Đáp án tham khảo</summary>

```jsx
// 1. UserAvatar hoặc UserCard
// 2. ContactForm
// 3. Navigation hoặc Navbar
// 4. AddToCartButton
// 5. StarRating hoặc RatingStars
```
</details>

---

## 📊 BẢNG TRA CỨU NHANH

### **PascalCase Examples:**

| camelCase | PascalCase | snake_case | kebab-case |
|-----------|------------|------------|------------|
| userName | UserName | user_name | user-name |
| productCard | ProductCard | product_card | product-card |
| loginForm | LoginForm | login_form | login-form |
| todoList | TodoList | todo_list | todo-list |

### **Descriptive Names Examples:**

| ❌ Bad | ✅ Good | Lý do |
|--------|---------|-------|
| Data | UserData | Cụ thể hơn |
| Info | UserInfo | Mô tả rõ |
| Card | ProductCard | Nói rõ card gì |
| Form | LoginForm | Form để làm gì |
| List | TodoList | List của cái gì |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu quy tắc PascalCase
- [ ] Biết cách đặt tên descriptive
- [ ] Phân biệt được các loại component
- [ ] Biết quy tắc đặt tên file
- [ ] Tránh được các lỗi thường gặp
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"File organization: 1 component = 1 file"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về component naming"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**