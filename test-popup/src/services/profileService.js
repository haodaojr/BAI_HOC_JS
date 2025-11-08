const API_BASE_URL = 'http://14.238.130.125:8181/api';

export const profileService = {
  // Lấy danh sách hồ sơ công việc
  getListHSCQ: async (params = {}) => {
    const queryParams = new URLSearchParams({
      tab: params.tab || 1,
      createBy: params.createBy || '',
      folderName: params.folderName || '',
      monthCreate: params.monthCreate || '',
      yearCreate: params.yearCreate || '',
    });

    const response = await fetch(`${API_BASE_URL}/hstl/getListHSCQ?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2MjEzODYxOSwiZXhwIjoxNzYyMjI1MDE5fQ.GjBpvggfUiMW9zfqoO9jijA6ZnFneBhg2Witc2bIDlTWGV3YF4uRGMmUDjS4jM7tUE2nEmmWKWNIqt_3wXSYbA',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch HSCQ');
    }

    return response.json();
  },

  // Lấy danh sách root folder
  getListRootFolder: async () => {
    const response = await fetch(`${API_BASE_URL}/hstl/getListRootFolder`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2MjEzODYxOSwiZXhwIjoxNzYyMjI1MDE5fQ.GjBpvggfUiMW9zfqoO9jijA6ZnFneBhg2Witc2bIDlTWGV3YF4uRGMmUDjS4jM7tUE2nEmmWKWNIqt_3wXSYbA',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch root folders');
    }

    return response.json();
  },

  // Lấy chi tiết dữ liệu theo folderId
  getDataDetailByFolderId: async (folderId = '') => {
    const response = await fetch(`${API_BASE_URL}/hstl/getDataDetailByFolderId?folderId=${folderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2MjEzODYxOSwiZXhwIjoxNzYyMjI1MDE5fQ.GjBpvggfUiMW9zfqoO9jijA6ZnFneBhg2Witc2bIDlTWGV3YF4uRGMmUDjS4jM7tUE2nEmmWKWNIqt_3wXSYbA',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch folder details');
    }

    return response.json();
  },

  // Lấy danh sách headings (đề mục)
  getHeadingsTree: async () => {
    const response = await fetch(`${API_BASE_URL}/headings/tree`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2MjEzODYxOSwiZXhwIjoxNzYyMjI1MDE5fQ.GjBpvggfUiMW9zfqoO9jijA6ZnFneBhg2Witc2bIDlTWGV3YF4uRGMmUDjS4jM7tUE2nEmmWKWNIqt_3wXSYbA',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch headings');
    }

    return response.json();
  },

  // Lấy danh sách categories cho thời hạn bảo quản
  getCategoriesTHHS: async () => {
    const response = await fetch(`${API_BASE_URL}/categories/getAllByCategoryTypeCode/THHS`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2MjEzODYxOSwiZXhwIjoxNzYyMjI1MDE5fQ.GjBpvggfUiMW9zfqoO9jijA6ZnFneBhg2Witc2bIDlTWGV3YF4uRGMmUDjS4jM7tUE2nEmmWKWNIqt_3wXSYbA',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  },

  // Thêm hồ sơ mới
  addFolder: async (profileData) => {
    console.log('Sending data:', profileData);

    const response = await fetch(`${API_BASE_URL}/hstl/addFolder?userApprove=`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2MjEzODYxOSwiZXhwIjoxNzYyMjI1MDE5fQ.GjBpvggfUiMW9zfqoO9jijA6ZnFneBhg2Witc2bIDlTWGV3YF4uRGMmUDjS4jM7tUE2nEmmWKWNIqt_3wXSYbA',
      },
      body: JSON.stringify(profileData),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return response.json();
  },
};