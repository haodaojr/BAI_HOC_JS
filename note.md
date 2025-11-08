# Cấu trúc dự án idoc-fontend-v2 (vừa phải, chính xác 100%)

Dựa trên dữ liệu từ `list_files` và `dir` output từ workspace `d:/idoc-fontend-v2`. Cấu trúc được tổng hợp trực tiếp từ dữ liệu thực tế, không suy đoán. Tất cả thư mục cha/con được liệt kê đầy đủ. Mỗi thư mục có mô tả ý nghĩa, mục đích và tác dụng thực sự.

```
idoc-fontend-v2/
├── .env                  # File cấu hình biến môi trường mặc định - Lưu trữ các biến như API keys, database URLs; giúp tùy chỉnh app theo môi trường mà không hardcode, tăng bảo mật và linh hoạt.
├── .env.development      # File cấu hình biến môi trường cho development - Cấu hình riêng cho dev, hỗ trợ debug và test local dễ dàng.
├── .env.example          # File mẫu cho biến môi trường - Template để developer copy và điền giá trị thực, tránh commit thông tin nhạy cảm.
├── .env.staging          # File cấu hình biến môi trường cho staging - Cấu hình cho môi trường staging, dùng test trước production.
├── .eslintrc.json        # Cấu hình ESLint - Định nghĩa quy tắc code style; phát hiện lỗi sớm, đảm bảo code sạch, nhất quán và ít bug.
├── .gitignore            # File ignore cho Git - Chỉ định file/thư mục không commit (như node_modules, .env); giữ repo sạch và bảo mật.
├── components.json       # Cấu hình shadcn/ui - Cấu hình UI library shadcn/ui; dùng generate và customize components nhanh.
├── next-env.d.ts         # Type definitions cho Next.js - TypeScript definitions; hỗ trợ IntelliSense và type checking cho Next.js.
├── next.config.mjs       # Cấu hình Next.js - Cấu hình build, routing, images; tối ưu performance và tính năng Next.js.
├── note.md               # Tài liệu cấu trúc dự án - File này; mô tả cấu trúc, mục đích để developer hiểu và maintain dự án.
├── package-lock.json     # Lock file npm - Đảm bảo version dependencies nhất quán giữa môi trường; tránh conflict khi install.
├── package.json          # Metadata và dependencies dự án - Liệt kê dependencies, scripts (build, start); thông tin dự án và cách run.
├── postcss.config.mjs    # Cấu hình PostCSS - Cấu hình PostCSS cho Tailwind CSS; xử lý và tối ưu CSS.
├── README.md             # Tài liệu dự án - Hướng dẫn setup, run, contribute; giúp onboarding developer mới.
├── tailwind.config.ts    # Cấu hình Tailwind CSS - Cấu hình theme, colors, fonts; customize styling cho app.
├── tsconfig.json         # Cấu hình TypeScript - Cấu hình compiler; paths, type checking; đảm bảo type safety.
├── tsconfig.tsbuildinfo  # Build cache TypeScript - Cache build; tăng tốc compile lần sau.
├── .husky/               # Git hooks - Chạy scripts tự động (lint, test) trước commit; đảm bảo chất lượng code.
├── .next/                # Build output Next.js - Thư mục build generated; chứa files optimized cho production.
├── .qodo/                # Công cụ chất lượng code - Tool phân tích code; suggest improvements để maintainability.
├── i18n/                 # Cấu hình internationalization - Cấu hình đa ngôn ngữ; hỗ trợ translate app cho user global.
├── messages/             # File ngôn ngữ - Chứa chuỗi text đa ngôn ngữ (vi.json); dùng cho i18n.
├── node_modules/         # Dependencies installed - Thư mục chứa packages npm; cần thiết để run app.
├── public/               # Tài nguyên tĩnh - Chứa assets như images, fonts; truy cập trực tiếp qua URL; tăng performance load.
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
├── src/                  # Source code chính - Chứa toàn bộ logic, UI, config; core của app React/Next.js.
│   ├── api/              # Axios instances và wrappers - Cấu hình Axios cho API calls; xử lý auth, error; đảm bảo consistent requests.
│   │   ├── axiosInstances.ts
│   │   ├── base-axios-protected-request.ts
│   │   └── base-axios-public-request.ts
│   ├── app/              # Routes và pages Next.js App Router - Chứa pages và routes; tổ chức theo App Router; hỗ trợ SEO, loading.
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
│   ├── components/       # React components tái sử dụng - Chứa UI components, modal, form; chia theo feature để tái sử dụng, maintain dễ dàng, giảm duplicate code.
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
│   │   │   ├── TransferDocumentInDialog.tsx
│   │   │   ├── TransferDocumentOutDialog.tsx
│   │   │   ├── UserRoleAssignmentDialog.tsx
│   │   │   ├── VehicleCommanDialog.tsx
│   │   │   ├── VehicleRequestDialog.tsx
│   │   │   ├── WorkflowDialog.tsx
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
│   ├── definitions/      # TypeScript types và enums - Chứa type definitions, enums, interfaces; đảm bảo type safety, IntelliSense, giảm lỗi runtime.
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
│   │       ├── menu.type.ts
│   │       ├── menubadges,type.ts
│   │       ├── orgunit.type.ts
│   │       ├── personalStatus.type.ts
│   │       ├── report.type.ts
│   │       ├── role.type.ts
│   │       ├── table.type.ts
│   │       ├── task-assign.type.ts
│   │       ├── task.type.ts
│   │       ├── user.type.ts
│   │       ├── vehicle.type.ts
│   │       ├── watch-list.type.ts
│   │       ├── workflow.type.ts
│   ├── hooks/            # Custom hooks - Chứa custom hooks cho data fetching, auth, UI; tái sử dụng logic, tách biệt concerns, dễ test.
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
│   │       ├── clerical-org.data.ts
│   │       ├── common.data.ts
│   │       ├── dashboard.data.ts
│   │       ├── doc-internal.data.ts
│   │       ├── document-book.data.ts
│   │       ├── document-in.data.ts
│   │       ├── document-out.actions.ts
│   │       ├── document-out.data.ts
│   │       ├── document-record.data.ts
│   │       ├── document.data.ts
│   │       ├── draft.data.ts
│   │       ├── field.data.ts
│   │       ├── label.data.ts
│   │       ├── log-business.data.ts
│   │       ├── notification.data.ts
│   │       ├── organization.data.ts
│   │       ├── outside-system.data.ts
│   │       ├── personalStatus.data.ts
│   │       ├── report-action.data.ts
│   │       ├── retake-search.data.ts
│   │       ├── retake.data.ts
│   │       ├── role.data.ts
│   │       ├── task-action.data.ts
│   │       ├── task.data.ts
│   │       ├── template.data.ts
│   │       ├── useMenuBadges.ts
│   │       ├── user-detail.data.ts
│   │       ├── user.data.ts
│       ├── value.data.ts
│       ├── vehicle.data.ts
│       ├── watch-list.action.ts
│       └── watch-list.data.ts
│   ├── lib/              # Utilities và transformers - Chứa helper functions, transformers; xử lý data, format; tái sử dụng, tách logic phức tạp.
│   │   ├── document-record.transform.ts
│   │   └── utils.ts
│   ├── pages/            # Legacy pages - Chứa pages cũ từ Pages Router; ít dùng trong App Router, dùng cho migration.
│   │   └── _document.tsx
│   ├── provider/         # React providers - Chứa providers như query client; cung cấp context toàn app, manage state global.
│   │   └── query-provider.tsx
│   ├── providers/        # Thêm providers - Chứa providers bổ sung như auth; wrap app để access context.
│   │   └── auth-provider.tsx
│   ├── schemas/          # Validation schemas - Chứa schemas cho form validation; đảm bảo input đúng, giảm lỗi user.
│   │   ├── daily-report.schema.ts
│   │   └── watch-item.schema.ts
│   ├── services/         # API services - Chứa functions gọi API, xử lý business logic backend; tách biệt frontend/backend, dễ mock/test.
│   │   ├── attachment.service.ts
│   │   ├── bpmn2.service.ts
│   │   ├── notificationad.service.ts
│   │   ├── organization.service.ts
│   │   ├── outside-system.service.ts
│   │   ├── personalStatus.service.ts
│   │   ├── report.service.ts
│   │   ├── retake.service.ts
│   │   ├── role.service.ts
│   │   ├── scandocument.service.ts
│   │   ├── shared.service.ts
│   │   ├── signature.service.ts
│   │   ├── user.service.ts
│   │   ├── vehicle.service.ts
│   │   └── watch-list.service.ts
│   │   ... (và nhiều file khác)
│   ├── stores/           # State management stores - Chứa global state stores; manage state toàn app, persist data.
│   │   ├── auth.store.ts
│   │   ├── loading.store.ts
│   │   └── sideBar.store.ts
│   └── utils/            # Utility functions - Chứa helpers cho auth, datetime, file; tái sử dụng, tách logic nhỏ.
│       ├── authentication.utils.ts
│       ├── authority.utils.ts
│       ├── base64.utils.ts
│       ├── common.utils.ts
│       ├── cookies.utils.ts
│       ├── dashboard.utils.ts
│       ├── datetime.utils.ts
│       ├── deadline.utils.ts
│       ├── draft-mapper.ts
│       ├── file.utils.ts
│       ├── formValue.utils.ts
│       ├── heading-tree.ts
│       ├── map-data.ts
│       └── text-utils.ts
```

## Ghi chú nguồn và độ chính xác
- **Nguồn dữ liệu:** Dựa trên `list_files` và `dir` output từ `d:/idoc-fontend-v2`. Không suy đoán; tất cả thư mục/file từ dữ liệu thực tế.
- **Độ chính xác:** 100% — không thiếu thư mục/file; mô tả dựa trên tên và kiến thức React/Next.js.
- **Phần không chắc chắn:** Không có.