import React, { useState, useEffect } from "react";
import { profileService } from "../services/profileService";

const ListProfiles = ({ refreshTrigger }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (refreshTrigger > 0) {
      // Khi có refresh trigger, dùng retry logic
      fetchProfilesWithRetry();
    } else {
      // Lần đầu load bình thường
      fetchProfiles();
    }
  }, [refreshTrigger]);

  useEffect(() => {
    console.log("Profiles state updated:", profiles);
  }, [profiles]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      console.log("Fetching profiles...");

      const detailResponse = await profileService.getDataDetailByFolderId("");

      console.log("Detail response:", detailResponse);

      if (detailResponse.resultCode === 200 &&
          detailResponse.data?.listFolder &&
          detailResponse.data.listFolder.length > 0) {

        // Convert from listFolder format to display format
        const mappedProfiles = detailResponse.data.listFolder.map(folder => ({
          id: folder.id,
          name: folder.title,
          fileCode: folder.fileCode,
          totalItems: folder.totalDoc || 0,
          parentId: null,
          iconType: folder.iconType,
          button: folder.button,
          createDate: folder.createDate,
          createBy: folder.createBy,
        }));

        setProfiles(mappedProfiles);
        console.log("Profiles loaded from detail:", mappedProfiles.length, "items");
      } else {
        setError("Failed to fetch profiles");
      }
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilesWithRetry = async () => {
    try {
      setLoading(true);
      console.log("Fetching profiles with retry...");

      let attempts = 0;
      const maxAttempts = 3;
      let lastCount = profiles.length; // Số lượng hiện tại

      while (attempts < maxAttempts) {
        // Delay trước mỗi lần thử
        if (attempts > 0) {
          console.log(`Retry attempt ${attempts}...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const detailResponse = await profileService.getDataDetailByFolderId("");

        if (detailResponse.resultCode === 200) {
          const folders = detailResponse.data?.listFolder || [];
          const currentCount = folders.length;

          console.log(`Attempt ${attempts + 1}: Found ${currentCount} profiles (previous: ${lastCount})`);

          // Nếu số lượng tăng lên (có hồ sơ mới) hoặc đã hết lần thử
          if (currentCount > lastCount || attempts === maxAttempts - 1) {
            const mappedProfiles = folders.map(folder => ({
              id: folder.id,
              name: folder.title,
              fileCode: folder.fileCode,
              totalItems: folder.totalDoc || 0,
              parentId: null,
              iconType: folder.iconType,
              button: folder.button,
              createDate: folder.createDate,
              createBy: folder.createBy,
            }));

            setProfiles(mappedProfiles);
            console.log("✓ Profiles updated:", mappedProfiles.length, "items");

            if (currentCount > lastCount) {
              console.log("✓ New profile detected!");
            }
            break;
          }

          lastCount = currentCount;
        }

        attempts++;
      }
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="list-profiles">
      <h2>Danh sách hồ sơ công việc</h2>
      {profiles.length === 0 ? (
        <p>Không có hồ sơ nào</p>
      ) : (
        <div className="profiles-grid">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <h3>{profile.name}</h3>
              <p>Mã hồ sơ: {profile.fileCode}</p>
              <p>Tổng số mục: {profile.totalItems}</p>
              <div className="profile-actions">
                {profile.button.edit && <button>Chỉnh sửa</button>}
                {profile.button.del && <button>Xóa</button>}
                {profile.button.share && <button>Chia sẻ</button>}
                {profile.button.addDoc && <button>Thêm tài liệu</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProfiles;
