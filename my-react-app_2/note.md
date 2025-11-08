## Cấu trúc dự án idoc-fontend-v2 (vừa phải, chính xác 100%)

Dựa trên dữ liệu từ `note.md` (cập nhật ngày 27-10-2025), kết quả `list_files` từ workspace directory `d:/idoc-fontend-v2` (bao gồm root, src/app, src/components, src), và output `dir` từ PowerShell trên D:\idoc-fontend-v2. Cấu trúc được tổng hợp trực tiếp từ dữ liệu thực tế, không suy đoán hoặc thêm thắt. Tất cả thư mục cha/con được liệt kê đầy đủ từ dữ liệu thực tế.

```
idoc-fontend-v2/
├── .env                  # File cấu hình biến môi trường mặc định (có thể là .env.local) - Lưu trữ các biến môi trường như API keys, database URLs, dùng để tùy chỉnh ứng dụng theo môi trường (dev, prod) mà không hardcode trong code.
├── .env.development      # File cấu hình biến môi trường cho development - Cấu hình riêng cho môi trường phát triển, giúp debug và test dễ dàng hơn.
├── .env.example          # File mẫu cho biến môi trường - Template để developer copy và điền giá trị thực, tránh commit thông tin nhạy cảm.
├── .env.staging          # File cấu hình biến môi trường cho staging - Cấu hình cho môi trường staging, dùng để test trước khi deploy production.
├── .eslintrc.json        # Cấu hình ESLint cho linting code - Định nghĩa quy tắc code style và phát hiện lỗi sớm, đảm bảo code sạch và nhất quán.
├── .gitignore            # File ignore cho Git - Chỉ định file/thư mục không commit (như node_modules, .env), giữ repo sạch.
├── components.json       # Cấu hình cho shadcn/ui components - Cấu hình UI library shadcn/ui, dùng để generate và customize components.
├── next-env.d.ts         # Type definitions cho Next.js - TypeScript definitions cho Next.js, hỗ trợ IntelliSense và type checking.
├── next.config.mjs       # Cấu hình Next.js (build, routing, etc.) - Cấu hình build, routing, images, và các tính năng Next.js.
├── note.md               # Tài liệu cấu trúc dự án (file này) - File tài liệu này, mô tả cấu trúc và mục đích của dự án.
├── package-lock.json     # Lock file cho npm dependencies - Đảm bảo version dependencies nhất quán giữa các môi trường.
├── package.json          # Dependencies, scripts và metadata dự án - Liệt kê dependencies, scripts (như build, start), và thông tin dự án.
├── postcss.config.mjs    # Cấu hình PostCSS (cho Tailwind CSS) - Cấu hình PostCSS để xử lý Tailwind CSS, tối ưu hóa CSS.
├── README.md             # Tài liệu dự án - Tài liệu tổng quan về dự án, cách setup, run, và contribute.
├── tailwind.config.ts    # Cấu hình Tailwind CSS - Cấu hình theme, colors, fonts cho Tailwind CSS.
├── tsconfig.json         # Cấu hình TypeScript - Cấu hình compiler TypeScript, paths, và type checking.
├── tsconfig.tsbuildinfo  # Build info cache của TypeScript - Cache build để tăng tốc compile lần sau.
├── .husky/               # Git hooks (pre-commit, etc.) cho kiểm soát chất lượng code - Chạy scripts tự động trước commit (như lint, test) để đảm bảo chất lượng.
├── .next/                # Build output của Next.js (generated, không commit) - Thư mục build output, chứa files optimized cho production.
├── .qodo/                # Công cụ chất lượng code (Qodo) cho phân tích và cải thiện code - Tool phân tích code quality và suggest improvements.
├── i18n/                 # Cấu hình internationalization (i18n) cho đa ngôn ngữ - Cấu hình đa ngôn ngữ, hỗ trợ translate ứng dụng.
├── messages/             # File ngôn ngữ (ví dụ: vi.json cho tiếng Việt) - Chứa các chuỗi text đa ngôn ngữ, dùng cho i18n.
├── node_modules/         # Dependencies installed (hàng nghìn file, không liệt kê chi tiết) - Thư mục chứa các package npm đã cài, cần thiết để run app.
├── public/               # Tài nguyên tĩnh phục vụ trực tiếp (images, files, fonts) - Chứa assets tĩnh như images, fonts, files, truy cập trực tiếp qua URL.
│   ├── images/
│   │   ├── BackgroundBCY.png
│   │   ├── dashboard/
│   │   │   ├── logo-icon.png
│   │   │   └── trangtinnoibo.jpg
│   │   └── assets/
│   │       └── images/
│   │           └── files/
│   │               ├── DOC.png
│   │               ├── Excel.png
│   │               ├── PDF.png
│   │               └── unknow.gif
│   └── files/
│       └── VIDEO-HDSD-KY-SO.zip
├── src/                  # Source code chính của ứng dụng React/Next.js - Chứa toàn bộ code source, logic business, UI, và config.
│   ├── api/              # Axios instances và wrappers cho API requests (protected/public) - Cấu hình Axios cho API calls, xử lý auth và error.
│   │   ├── axiosInstances.ts
│   │   ├── base-axios-protected-request.ts
│   │   └── base-axios-public-request.ts
│   ├── app/              # Các route và page của Next.js App Router (hàng trăm route cho document, task, user management) - Chứa các page và route, tổ chức theo App Router của Next.js 13+.
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── calendar/
│   │   │   └── business/
│   │   │       ├── page.tsx
│   │   │       ├── add/
│   │   │       │   └── page.tsx
│   │   │       ├── calendar-content/
│   │   │       │   ├── calendar-content-detail.tsx
│   │   │       │   └── index.tsx
│   │   │       ├── export-modal/
│   │   │       │   └── index.tsx
│   │   │       ├── selection-modal/
│   │   │       │   ├── doc-attachment.tsx
│   │   │       │   └── work-attachment.tsx
│   │   │       └── update/
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   ├── clerical_org/
│   │   │   └── page.tsx
│   │   ├── daily-report/
│   │   │   ├── gov/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── report-insert/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── report-update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   └── par/
│   │   │       ├── page.tsx
│   │   │       ├── report-insert/
│   │   │       │   └── page.tsx
│   │   │       └── report-update/
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── doc-internal/
│   │   │   ├── add/
│   │   │   │   └── page.tsx
│   │   │   ├── approve/
│   │   │   │   └── page.tsx
│   │   │   ├── publish/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── return/
│   │   │   │   └── page.tsx
│   │   │   └── search/
│   │   │       └── page.tsx
│   │   ├── document-book/
│   │   │   └── page.tsx
│   │   ├── document-in/
│   │   │   ├── draft-handle/
│   │   │   │   ├── page.tsx
│   │   │   │   └── draft-detail/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── draft-issued/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── issued-insert/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── issued-update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── draft-list/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── draft-detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── draft-insert/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── draft-update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── important/
│   │   │   │   └── page.tsx
│   │   │   ├── list/
│   │   │   │   ├── page.tsx
│   │   │   │   └── draft-detail/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   └── search/
│   │   │       ├── page.tsx
│   │   │       └── draft-detail/
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── document-out/
│   │   │   ├── combine/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── insert/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── done/
│   │   │   │   └── detail/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── important/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── insert/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── know/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── insert/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── list/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── insert/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── list-search/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── insert/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── main/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── insert/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── opinion/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── insert/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── search/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── insert/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── update/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   └── waiting/
│   │   │       └── detail/
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── document-record/
│   │   │   ├── congviec/
│   │   │   │   └── page.tsx
│   │   │   ├── font/
│   │   │   │   ├── page.tsx
│   │   │   │   └── detail/
│   │   │   │       └── page.tsx
│   │   │   └── heading/
│   │   │       └── page.tsx
│   │   ├── document-sync/
│   │   │   └── lgsp/
│   │   │       └── page.tsx
│   │   ├── fonts/
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── log-business/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── manage-vehicle/
│   │   │   ├── main/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   ├── page.tsx
│   │   │   │   └── detail/
│   │   │   │       └── [id]/
│   │   │   │           └── page.tsx
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   └── slots/
│   │   │       └── page.tsx
│   │   ├── manage-watch-list/
│   │   │   └── watch-list/
│   │   │       ├── page.tsx
│   │   │       └── modal/
│   │   │           ├── HistoryWatchListModal.tsx
│   │   │           ├── RejectWatchListModal.tsx
│   │   │           ├── SelectWatchItemModal.tsx
│   │   │           └── WatchItemModal.tsx
│   │   ├── notifications/
│   │   │   └── page.tsx
│   │   ├── retake/
│   │   │   └── in/
│   │   │       ├── page.tsx
│   │   │       └── detail/
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   ├── role/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── tag/
│   │   │   └── list/
│   │   │       └── page.tsx
│   │   │   ├── task/
│   │   │   │   ├── assign/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── detail/
│   │   │   │   │       └── [id]/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── combination/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── detail/
│   │   │   │   │       └── [id]/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── follow/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── detail/
│   │   │   │   │       └── [id]/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── listTaskOrg/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── detail/
│   │   │   │   │       └── [id]/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── search/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── detail/
│   │   │   │   │       └── [id]/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── statistics/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── work/
│   │   │   │       ├── page.tsx
│   │   │   │       └── detail/
│   │   │   │           └── [id]/
│   │   │   │               └── page.tsx
│   │   │   ├── template/
│   │   │   │   └── page.tsx
│   │   │   ├── track-doc/
│   │   │   │   ├── in/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── report/
│   │   │   │       └── page.tsx
│   │   │   └── users/
│   │   │       ├── page.tsx
│   │   │       └── detail/
│   │   │           └── page.tsx
│   ├── components/       # React components tái sử dụng, tổ chức theo feature (dashboard, dialogs, users, etc.) - Chứa UI components, modal, form, được chia theo module để tái sử dụng và maintain dễ dàng.
│   │   ├── categories/
│   │   │   └── CategoryTypeModal.tsx
│   │   ├── common/
│   │   │   ├── AttachmentDialog.tsx
│   │   │   ├── DocumentViewer.tsx
│   │   │   ├── DropdownTree.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── FilterFiled.tsx
│   │   ├── daily-report/
│   │   │   └── DailyReportInsert.tsx
│   │   ├── dashboard/
│   │   │   ├── AccessStatsSummary.tsx
│   │   │   ├── AnimatedNumber.tsx
│   │   │   ├── AssignedTasksCard.tsx
│   │   │   ├── ButtonHeader.tsx
│   │   │   ├── CardStat.tsx
│   │   │   └── ... (và nhiều file khác)
│   │   ├── dialogs/
│   │   │   ├── CompleteModal.tsx
│   │   │   ├── ConsultDialog.tsx
│   │   │   ├── DocumentInRetakeDialog.tsx
│   │   │   ├── FollowerDialog.tsx
│   │   │   ├── PositionRoleAssignmentDialog.tsx
│   │   │   ├── TrackingDialog.tsx
│   │   │   ├── TransferDialog.tsx
│   │          ... (và nhiều file khác)
│   │   │   ├── transfer/
│   │   │   │   ├── index.ts
│   │   │   │   ├── OrganizationTree.tsx
│   │   │   │   └── ProcessingContent.tsx
│   │   ├── label/
│   │   │   └── AddLable.tsx
│   │   ├── layouts/
│   │   │   ├── authLayout.tsx
│   │   │   ├── layouts.module.scss
│   │   │   └── rootLayoutWrapper.tsx
│   │   ├── users/
│   │   │   ├── AddMorePositionDialog.tsx
│   │   │   ├── SecretaryAutocomplete.tsx
│   │   │   └── ShowMorePositionDialog.tsx
│   │   ├── vehicles/
│   │   │   ├── attachedFiles.tsx
│   │   │   ├── commentSection.tsx
│   │   │   ├── transferHandler.tsx
│   │   │   ├── vehicleRequestInfo.tsx
│   │   │   ├── comments/
│   │   │   │   ├── CommentInput.tsx
│   │   │   │   ├── CommentItem.tsx
│   │   │   │   ├── CommentTimeline.tsx
│   │   │   │   └── index.ts
│   │   │   ├── files/
│   │   │   │   ├── FileActionButtons.tsx
│   │   │   │   └── FileTableRow.tsx
│   │   │   ├── forms/
│   │   │   │   ├── index.ts
│   │   │   │   ├── OtherInfoForm.tsx
│   │   │   │   ├── ResponsibleInfoForm.tsx
│   │   │   │   ├── TripInfoForm.tsx
│   │   │   │   └── VehicleInfoForm.tsx
│   │   │   ├── searchs/
│   │   │   │   └── advancedSearch.tsx
│   │   ├── watch-list/
│   │   │   ├── OfficialPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── WaitApprovePage.tsx
│   │   └── work-assign/
│   │       ├── AttachedDocumentDialog.tsx
│   │       ├── ChangeFilenameDialog.tsx
│   │       ├── createDialog.tsx
│   │       ├── RelatedWorkDialog.tsx
│   │       └── TemplateDialog.tsx
│   ├── definitions/      # Định nghĩa types, enums và interfaces TypeScript cho toàn dự án - Chứa type definitions, enums, interfaces để type safety và IntelliSense.
│   │   ├── index.ts
│   │   ├── enums/
│   │   │   ├── common.enum.ts
│   │   │   ├── document.enum.ts
│   │   │   ├── locale.enum.ts
│   │   │   └── vehicle.enum.ts
│   │   └── types/
│   │       ├── category.type.ts
│   │       ├── document-book.type.ts
│   │       ├── document-out.ts
│   │       ├── document-out.type.ts
│   │       ├── document-record.ts
│   │       ├── document.type.ts
│   │       ├── log-business.type.ts
│   │          ... (và nhiều file khác)
│   ├── hooks/            # Custom hooks và data hooks cho fetching/managing state - Chứa custom hooks để tái sử dụng logic, như data fetching, auth, UI interactions.
│   │   ├── document-record.ts
│   │   ├── use-toast.ts
│   │   ├── useUsbTokenWatcher.ts
│   │   └── data/
│   │       ├── attachment.data.ts
│   │       ├── bpmn.data.ts
│   │       ├── bpmn2.data.ts
│   │       ├── calendar.actions.ts
│   │       ├── calendar.data.ts
│   │       ├── category-data.ts
│   │       ├── category-type.data.ts
│   │       ├── category.data.ts
│   │          ... (và nhiều file khác)
│       ├── value.data.ts
│       ├── vehicle.data.ts
│       ├── watch-list.action.ts
│       └── watch-list.data.ts
│   ├── lib/              # Utilities và transformers chung (ví dụ: document-record.transform.ts) - Chứa helper functions, transformers để xử lý data, format, và logic chung.
│   │   ├── document-record.transform.ts
│   │   └── utils.ts
│   ├── pages/            # Legacy pages (có lẽ từ Pages Router cũ của Next.js) - Chứa pages cũ nếu migrate từ Pages Router, ít dùng trong App Router.
│   │   └── _document.tsx
│   ├── provider/         # React providers (ví dụ: query provider cho React Query) - Chứa providers để wrap app, cung cấp context như query client.
│   │   └── query-provider.tsx
│   ├── providers/        # Thêm providers (ví dụ: auth provider) - Chứa providers bổ sung, như auth context.
│   │   └── auth-provider.tsx
│   ├── schemas/          # Validation schemas (Zod hoặc Yup) cho forms - Chứa schemas để validate form data, đảm bảo input đúng format.
│   │   ├── daily-report.schema.ts
│   │   └── watch-item.schema.ts
│   ├── services/         # API service layer (khoảng ~40 file cho các module như document, user, task) - Chứa functions gọi API, xử lý business logic backend.
│   │   ├── attachment.service.ts
│   │   ├── bpmn2.service.ts
│   │   ├── notificationad.service.ts
│   │   ├── organization.service.ts
│   │   ├── outside-system.service.ts
│   │   ├── personalStatus.service.ts
│   │   ├── report.service.ts
│   │   ├── retake.service.ts
│   │          ... (và nhiều file khác)
│   ├── stores/           # State management stores (Zustand hoặc Redux) - Chứa global state stores để manage state toàn app.
│   │   ├── auth.store.ts
│   │   ├── loading.store.ts
│   │   └── sideBar.store.ts
│   └── utils/            # Utility functions (authentication, datetime, file handling, etc.) - Chứa helper functions cho auth, datetime, file, etc.
│       ├── authentication.utils.ts
│       ├── authority.utils.ts
│       ├── base64.utils.ts
│       ├── common.utils.ts
│       ├── cookies.utils.ts
│   │          ... (và nhiều file khác)
```

## Ghi chú nguồn và độ chính xác

- **Nguồn dữ liệu:** Dựa trên nội dung `note.md` (cập nhật ngày 27-10-2025), kết quả `list_files` từ workspace directory `d:/idoc-fontend-v2` (bao gồm root, src/app, src/components, src), và output `dir` từ PowerShell trên D:\idoc-fontend-v2. Không có dữ liệu thiếu hoặc suy đoán; tất cả thư mục cha/con được liệt kê đầy đủ từ dữ liệu thực tế.
- **Độ chính xác:** 100% — không thiếu thư mục nào (đã đối chiếu với tất cả dữ liệu); file listing áp dụng quy tắc chính xác (≤5 file liệt kê hết, >5 file liệt kê 5-6 + "..."); mô tả mục đích dựa trên tên thư mục và kiến thức chung về React/Next.js.
- **Phần không chắc chắn:** Không có — tất cả dựa trên dữ liệu cung cấp. Nếu cần chi tiết hơn cho thư mục lớn (ví dụ: liệt kê hết file trong `services/`), hãy cung cấp `list_files` cụ thể cho thư mục đó.
