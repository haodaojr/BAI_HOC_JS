import React, { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';

const AddProfileForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '000.00.07.G11.2025.',
    year: '2025',
    fileNumber: '',
    title: '',
    headingId: '',
    maintenance: '',
    usageMode: '',
    language: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    infoCode: '',
    description: '',
    keywords: '',
    sheetCount: '',
    pageCount: '',
    physicalStatus: '',
    approverId: '',
    folderType: 'CANHAN',
  });

  const [errors, setErrors] = useState({});
  const [headings, setHeadings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const [headingsResponse, categoriesResponse] = await Promise.all([
        profileService.getHeadingsTree(),
        profileService.getCategoriesTHHS(),
      ]);

      if (headingsResponse.resultCode === 200) {
        setHeadings(headingsResponse.data);
      }

      if (categoriesResponse.resultCode === 200) {
        setCategories(categoriesResponse.data);
      }
    } catch (err) {
      console.error('Failed to load form data:', err);
      setError('Failed to load form data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.year.trim()) {
      newErrors.year = 'Vui lòng nhập năm hồ sơ';
    }
    if (!formData.fileNumber.trim()) {
      newErrors.fileNumber = 'Vui lòng nhập số và ký hiệu';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề hồ sơ';
    }
    if (!formData.headingId) {
      newErrors.headingId = 'Vui lòng chọn đề mục';
    }
    if (!formData.maintenance) {
      newErrors.maintenance = 'Vui lòng chọn thời hạn bảo quản';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatFileNumber = (value) => {
    let formatted = value.toUpperCase();
    formatted = formatted.replace(/[^0-9A-Z.]/g, '');
    if (formatted.length >= 1) {
      if (!/^\d/.test(formatted)) {
        return '';
      }
    }

    if (formatted.length >= 2) {
      if (!/^\d{2}/.test(formatted)) {
        return formatted.substring(0, 1);
      }
    }

    if (formatted.length === 2 && !formatted.includes('.')) {
      formatted = formatted + '.';
    }

    if (formatted.length > 3) {
      const firstTwo = formatted.substring(0, 2);
      const dot = '.';
      let rest = formatted.substring(3);
      rest = rest.replace(/[0-9]/g, '');
      formatted = firstTwo + dot + rest;
    }

    if (formatted.length > 10) {
      formatted = formatted.substring(0, 10);
    }

    return formatted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Chuẩn bị dữ liệu theo format API
      const submitData = {
        fileCode: formData.code,
        year: parseInt(formData.year),
        fileNotation: formData.fileNumber,
        title: formData.title,
        headingsId: parseInt(formData.headingId),
        maintenance: parseInt(formData.maintenance),
        rights: formData.usageMode,
        language: formData.language,
        startTime: formData.startDate,
        endTime: formData.endDate,
        informationSign: formData.infoCode,
        description: formData.description,
        keyword: formData.keywords,
        pageNumber: parseInt(formData.sheetCount) || 0,
        pageAmount: parseInt(formData.pageCount) || 0,
        totalReliability: formData.physicalStatus === 'BT' ? 'Bình thường' : 'Hư hỏng',
        approverId: formData.approverId || null,
        folderType: formData.folderType,
      };

      console.log('Submitting data:', submitData);

      // Check if fileNumber is empty
      if (!formData.fileNumber.trim()) {
        setError('Số và ký hiệu hồ sơ bắt buộc phải nhập');
        setLoading(false);
        return;
      }

      const result = await profileService.addFolder(submitData);

      // Nếu không có lỗi, coi như thành công
      console.log('Submit successful:', result);

      // Đợi 1.5 giây để backend xử lý
      await new Promise(resolve => setTimeout(resolve, 1500));

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message || 'Có lỗi xảy ra khi thêm hồ sơ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-profile-form-overlay">
      <div className="add-profile-form">
        <div className="form-header">
          <h2>Thêm hồ sơ</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Mã hồ sơ *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                readOnly
                className="bg-gray-100 text-gray-500 cursor-not-allowed"
                required
              />
            </div>
            <div className="form-group">
              <label>Năm hồ sơ *</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="0"
                placeholder="yyyy"
                className={errors.year ? 'border-red-500' : ''}
                required
              />
              {errors.year && <p className="mt-1 text-xs text-red-500">{errors.year}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Số và ký hiệu *</label>
              <input
                type="text"
                name="fileNumber"
                value={formData.fileNumber}
                onChange={(e) => {
                  const formatted = formatFileNumber(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    fileNumber: formatted,
                    code: `000.00.07.G11.${prev.year}.${formatted}`,
                  }));
                  if (errors.fileNumber) {
                    setErrors((prev) => ({ ...prev, fileNumber: '' }));
                  }
                }}
                placeholder="00.XXXX"
                className={errors.fileNumber ? 'border-red-500' : ''}
                required
              />
              {errors.fileNumber && <p className="mt-1 text-xs text-red-500">{errors.fileNumber}</p>}
            </div>
            <div className="form-group lg:col-span-2">
              <label>Tiêu đề hồ sơ *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nhập Tiêu đề hồ sơ"
                className={errors.title ? 'border-red-500' : ''}
                required
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Đề mục*</label>
              <select
                name="headingId"
                value={formData.headingId}
                onChange={(e) => handleSelectChange('headingId', e.target.value)}
                className={errors.headingId ? 'border-red-500' : ''}
                required
              >
                <option value="">--Chọn đề mục--</option>
                {headings.map((heading) => (
                  <option key={heading.id} value={heading.id}>
                    {heading.name}
                  </option>
                ))}
              </select>
              {errors.headingId && <p className="mt-1 text-xs text-red-500">{errors.headingId}</p>}
            </div>
            <div className="form-group">
              <label>Thời hạn bảo quản*</label>
              <select
                name="maintenance"
                value={formData.maintenance}
                onChange={(e) => handleSelectChange('maintenance', e.target.value)}
                className={errors.maintenance ? 'border-red-500' : ''}
                required
              >
                <option value="">--Chọn thời gian bảo quản--</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.maintenance && <p className="mt-1 text-xs text-red-500">{errors.maintenance}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Chế độ sử dụng</label>
              <input
                type="text"
                name="usageMode"
                value={formData.usageMode}
                onChange={handleInputChange}
                placeholder="Chế độ sử dụng"
              />
            </div>
            <div className="form-group">
              <label>Ngôn ngữ</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                placeholder="Ngôn ngữ"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Thời gian bắt đầu</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Thời gian kết thúc</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ký hiệu thông tin</label>
              <input
                type="text"
                name="infoCode"
                value={formData.infoCode}
                onChange={handleInputChange}
                placeholder="Ký hiệu thông tin"
              />
            </div>
            <div className="form-group lg:col-span-2">
              <label>Chú giải</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Chú giải"
                rows="2"
                className="resize-none"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Từ khóa</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="Từ khóa"
              />
            </div>
            <div className="form-group">
              <label>Số lượng tờ</label>
              <input
                type="number"
                name="sheetCount"
                value={formData.sheetCount}
                onChange={handleInputChange}
                min="1"
                placeholder="Số lượng tờ"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Số lượng trang</label>
              <input
                type="number"
                name="pageCount"
                value={formData.pageCount}
                onChange={handleInputChange}
                min="1"
                placeholder="Số lượng trang"
              />
            </div>
            <div className="form-group">
              <label>Tình trạng vật lý</label>
              <select
                name="physicalStatus"
                value={formData.physicalStatus}
                onChange={(e) => handleSelectChange('physicalStatus', e.target.value)}
              >
                <option value="">--Chọn tình trạng vật lý--</option>
                <option value="BT">Bình thường</option>
                <option value="HH">Hư hỏng</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Loại hồ sơ</label>
              <input
                type="text"
                name="folderType"
                value={formData.folderType}
                onChange={handleInputChange}
                placeholder="Nhập loại hồ sơ (CANHAN, CONGCONG, NOIBO)"
              />
            </div>
            <div className="form-group">
              <label>Người duyệt</label>
              <select
                name="approverId"
                value={formData.approverId || ''}
                onChange={(e) => handleSelectChange('approverId', e.target.value)}
              >
                <option value="">--Chọn người duyệt--</option>
                {/* TODO: Load approvers from API */}
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Hủy
            </button>
            <button type="submit" disabled={loading || !isFormValid()} className="submit-btn">
              {loading ? 'Đang lưu...' : 'Đồng ý'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  function isFormValid() {
    return (
      formData.year.trim() &&
      formData.fileNumber.trim() &&
      formData.title.trim() &&
      formData.headingId &&
      formData.headingId !== '' &&
      formData.maintenance &&
      formData.maintenance !== ''
    );
  }
};

export default AddProfileForm;