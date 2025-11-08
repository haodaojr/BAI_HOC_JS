import { useState, useEffect, useMemo } from 'react';
import './App.css';

// Profile Card Component
function ProfileCard({ user, onFollow, onViewProfile, compact = false }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `${diffDays} ngày trước`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
    return `${Math.floor(diffDays / 365)} năm trước`;
  };

  if (compact) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        border: '1px solid #e9ecef',
        borderRadius: 8,
        backgroundColor: 'white',
        cursor: 'pointer'
      }} onClick={() => onViewProfile(user)}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 600,
            fontSize: 14,
            color: '#2d3436',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            {user.name}
            {user.isVerified && <span style={{ color: '#007bff' }}>✓</span>}
          </div>
          <div style={{ fontSize: 12, color: '#6c757d' }}>
            @{user.username}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFollow(user.id);
          }}
          style={{
            padding: '6px 12px',
            border: user.isFollowing ? '1px solid #6c757d' : 'none',
            backgroundColor: user.isFollowing ? 'white' : '#007bff',
            color: user.isFollowing ? '#6c757d' : 'white',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {user.isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
    }}
    onClick={() => onViewProfile(user)}
    >
      {/* Cover */}
      <div style={{
        height: 80,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }} />

      {/* Content */}
      <div style={{ padding: 20, marginTop: -40 }}>
        {/* Avatar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 16
        }}>
          <div style={{ position: 'relative' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: '4px solid white',
                objectFit: 'cover'
              }}
            />
            {user.isVerified && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: '#007bff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}>
                <span style={{ fontSize: 12, color: 'white' }}>✓</span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <h3 style={{
            margin: '0 0 4px 0',
            fontSize: 20,
            fontWeight: 700,
            color: '#2d3436'
          }}>
            {user.name}
          </h3>
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontSize: 14
          }}>
            @{user.username}
          </p>
          {user.location && (
            <p style={{
              margin: '4px 0 0 0',
              color: '#6c757d',
              fontSize: 14
            }}>
              📍 {user.location}
            </p>
          )}
        </div>

        {/* Bio */}
        {user.bio && (
          <p style={{
            textAlign: 'center',
            color: '#2d3436',
            fontSize: 14,
            lineHeight: 1.5,
            marginBottom: 16,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}>
            {user.bio}
          </p>
        )}

        {/* Badges */}
        {user.badges && user.badges.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'center',
            marginBottom: 16
          }}>
            {user.badges.slice(0, 3).map(badge => (
              <span
                key={badge.id}
                style={{
                  padding: '4px 8px',
                  backgroundColor: badge.color,
                  color: 'white',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <span>{badge.icon}</span>
                {badge.name}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: 16,
          padding: '12px 0',
          borderTop: '1px solid #e9ecef',
          borderBottom: '1px solid #e9ecef'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#2d3436'
            }}>
              {user.stats.posts}
            </div>
            <div style={{
              fontSize: 12,
              color: '#6c757d'
            }}>
              Bài viết
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#2d3436'
            }}>
              {user.followers}
            </div>
            <div style={{
              fontSize: 12,
              color: '#6c757d'
            }}>
              Người theo dõi
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#2d3436'
            }}>
              {user.following}
            </div>
            <div style={{
              fontSize: 12,
              color: '#6c757d'
            }}>
              Đang theo dõi
            </div>
          </div>
        </div>

        {/* Join Date */}
        <div style={{
          textAlign: 'center',
          fontSize: 12,
          color: '#6c757d',
          marginBottom: 16
        }}>
          Tham gia {formatDate(user.joinDate)}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFollow(user.id);
            }}
            style={{
              flex: 1,
              padding: '10px 16px',
              border: user.isFollowing ? '1px solid #6c757d' : 'none',
              backgroundColor: user.isFollowing ? 'white' : '#007bff',
              color: user.isFollowing ? '#6c757d' : 'white',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {user.isFollowing ? '✓ Đang theo dõi' : '+ Theo dõi'}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Xem profile của ${user.name}`);
            }}
            style={{
              padding: '10px 16px',
              border: '1px solid #007bff',
              backgroundColor: 'white',
              color: '#007bff',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

// User Gallery Component
function UserGallery({ users, loading, onFollow, onViewProfile, viewMode = 'grid' }) {
  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'grid'
          ? 'repeat(auto-fill, minmax(320px, 1fr))'
          : '1fr',
        gap: 20,
        padding: '20px 0'
      }}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minHeight: 300
            }}
          >
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#e9ecef',
              margin: '0 auto 16px'
            }} />
            <div style={{
              height: 20,
              backgroundColor: '#e9ecef',
              borderRadius: 4,
              marginBottom: 8
            }} />
            <div style={{
              height: 16,
              backgroundColor: '#e9ecef',
              borderRadius: 4,
              width: '60%',
              margin: '0 auto'
            }} />
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#6c757d'
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
        <h3>Không tìm thấy người dùng</h3>
        <p>Vui lòng thử lại với từ khóa khác</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '20px 0'
      }}>
        {users.map(user => (
          <ProfileCard
            key={user.id}
            user={user}
            compact={true}
            onFollow={onFollow}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: 20,
      padding: '20px 0'
    }}>
      {users.map(user => (
        <ProfileCard
          key={user.id}
          user={user}
          onFollow={onFollow}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  );
}

// User Filters Component
function UserFilters({
  searchTerm,
  onSearchChange,
  selectedSkills,
  onSkillChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  verifiedOnly,
  onVerifiedChange
}) {
  const skills = [
    'React', 'JavaScript', 'CSS', 'Node.js', 'Python',
    'Java', 'PHP', 'TypeScript', 'Vue.js', 'Angular'
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: 24
    }}>
      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Tìm kiếm người dùng theo tên, username, hoặc kỹ năng..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: 6,
            fontSize: 16
          }}
        />
      </div>

      {/* Filters Row */}
      <div style={{
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Skills Filter */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 600,
            color: '#2d3436'
          }}>
            Kỹ năng:
          </label>
          <select
            value={selectedSkills.length > 0 ? selectedSkills[0] : ''}
            onChange={(e) => onSkillChange(e.target.value ? [e.target.value] : [])}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: 4,
              minWidth: 150
            }}
          >
            <option value="">Tất cả kỹ năng</option>
            {skills.map(skill => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 600,
            color: '#2d3436'
          }}>
            Sắp xếp:
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: 4,
              minWidth: 150
            }}
          >
            <option value="name">Tên A-Z</option>
            <option value="followers">Người theo dõi (cao → thấp)</option>
            <option value="recent">Tham gia gần đây</option>
            <option value="verified">Đã xác thực trước</option>
          </select>
        </div>

        {/* Verified Filter */}
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 600,
            color: '#2d3436',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => onVerifiedChange(e.target.checked)}
            />
            Chỉ hiển thị tài khoản đã xác thực
          </label>
        </div>

        {/* View Mode */}
        <div style={{ marginLeft: 'auto' }}>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 600,
            color: '#2d3436'
          }}>
            Chế độ xem:
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onViewModeChange('grid')}
              style={{
                padding: '8px 16px',
                border: viewMode === 'grid' ? '2px solid #007bff' : '1px solid #ddd',
                backgroundColor: viewMode === 'grid' ? '#007bff' : 'white',
                color: viewMode === 'grid' ? 'white' : '#333',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              📱 Grid
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              style={{
                padding: '8px 16px',
                border: viewMode === 'list' ? '2px solid #007bff' : '1px solid #ddd',
                backgroundColor: viewMode === 'list' ? '#007bff' : 'white',
                color: viewMode === 'list' ? 'white' : '#333',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              📋 List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App5() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Mock data
  const mockUsers = [
    {
      id: 1,
      name: "Nguyễn Văn Minh",
      username: "minhnguyen",
      email: "minh@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Frontend Developer passionate about React and UI/UX design. Love creating beautiful and functional web applications.",
      location: "Hà Nội, Việt Nam",
      joinDate: "2020-03-15",
      isVerified: true,
      isFollowing: false,
      followers: 1234,
      following: 567,
      skills: ["React", "JavaScript", "CSS", "Node.js"],
      stats: {
        posts: 89,
        projects: 24,
        contributions: 156
      },
      badges: [
        { id: 1, name: "Top Contributor", color: "#28a745", icon: "🏆" },
        { id: 2, name: "React Expert", color: "#007bff", icon: "⚛️" }
      ]
    },
    {
      id: 2,
      name: "Trần Thị Lan",
      username: "lantran",
      email: "lan@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      bio: "Full-stack Developer with 5+ years experience. Specialized in MERN stack and cloud technologies.",
      location: "TP.HCM, Việt Nam",
      joinDate: "2019-08-22",
      isVerified: true,
      isFollowing: true,
      followers: 2156,
      following: 789,
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      stats: {
        posts: 145,
        projects: 38,
        contributions: 289
      },
      badges: [
        { id: 1, name: "MERN Expert", color: "#17a2b8", icon: "🚀" },
        { id: 2, name: "Cloud Certified", color: "#ffc107", icon: "☁️" }
      ]
    },
    {
      id: 3,
      name: "Lê Hoàng Anh",
      username: "anhle",
      email: "anh@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      bio: "UI/UX Designer turned Frontend Developer. Creating pixel-perfect interfaces with modern technologies.",
      location: "Đà Nẵng, Việt Nam",
      joinDate: "2021-01-10",
      isVerified: false,
      isFollowing: false,
      followers: 892,
      following: 445,
      skills: ["React", "CSS", "Figma", "TypeScript"],
      stats: {
        posts: 67,
        projects: 15,
        contributions: 98
      },
      badges: [
        { id: 1, name: "Design Expert", color: "#e83e8c", icon: "🎨" }
      ]
    }
  ];

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setLoading(false);
    };
    loadUsers();
  }, []);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills?.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedSkills.length > 0) {
      filtered = filtered.filter(user =>
        selectedSkills.some(skill => user.skills?.includes(skill))
      );
    }

    if (verifiedOnly) {
      filtered = filtered.filter(user => user.isVerified);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'followers':
          return b.followers - a.followers;
        case 'recent':
          return new Date(b.joinDate) - new Date(a.joinDate);
        case 'verified':
          if (a.isVerified && !b.isVerified) return -1;
          if (!a.isVerified && b.isVerified) return 1;
          return a.name.localeCompare(b.name);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [users, searchTerm, selectedSkills, verifiedOnly, sortBy]);

  // Event handlers
  const handleFollow = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ));
  };

  const handleViewProfile = (user) => {
    alert(`Xem profile của ${user.name}\n\nBio: ${user.bio}\n\nSkills: ${user.skills?.join(', ')}\n\nLocation: ${user.location}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h1 style={{
            margin: 0,
            color: '#2d3436',
            fontSize: 28,
            fontWeight: 'bold'
          }}>
            👥 User Profile Gallery
          </h1>
          <p style={{
            margin: '8px 0 0 0',
            color: '#6c757d',
            fontSize: 16
          }}>
            Khám phá cộng đồng developer Việt Nam
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Filters */}
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSkills={selectedSkills}
          onSkillChange={setSelectedSkills}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          verifiedOnly={verifiedOnly}
          onVerifiedChange={setVerifiedOnly}
        />

        {/* Results Summary */}
        <div style={{
          marginBottom: 20,
          color: '#6c757d',
          fontSize: 14
        }}>
          Hiển thị {filteredAndSortedUsers.length} người dùng
          {searchTerm && ` cho "${searchTerm}"`}
          {selectedSkills.length > 0 && ` có kỹ năng ${selectedSkills.join(', ')}`}
          {verifiedOnly && ' (chỉ tài khoản đã xác thực)'}
        </div>

        {/* User Gallery */}
        <UserGallery
          users={filteredAndSortedUsers}
          loading={loading}
          onFollow={handleFollow}
          onViewProfile={handleViewProfile}
          viewMode={viewMode}
        />
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        marginTop: 40
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3>🎉 Hoàn thành Mini Project Day 2!</h3>
          <p>
            Đã áp dụng đầy đủ kiến thức về Props với nested objects, arrays,
            function callbacks, và complex data structures
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App5;