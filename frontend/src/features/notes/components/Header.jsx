import { Search, User, LogOut, X } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

const Header = ({ searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const profileRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const username = user?.username || "User";
  const email = user?.email || "";
  const avatarLetter = username.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout();
      setIsProfileOpen(false);
      setIsProfileModalOpen(false);
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.replace("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleProfile = () => {
    setIsProfileOpen(false);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="profile-wrapper" ref={profileRef}>
          <button
            type="button"
            className="profile"
            onClick={() => setIsProfileOpen((current) => !current)}
            aria-expanded={isProfileOpen}
            aria-label="Open profile menu"
          >
            <div className="avatar">{avatarLetter}</div>

            <span>{username}</span>

            <span className={`profile-arrow ${isProfileOpen ? "is-open" : ""}`}>
              ▾
            </span>
          </button>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-user">
                <div className="profile-dropdown-avatar">{avatarLetter}</div>

                <div className="profile-dropdown-details">
                  <strong>{username}</strong>
                  <span>{email}</span>
                </div>
              </div>

              <div className="profile-dropdown-divider" />
              <button
                type="button"
                className="profile-dropdown-item"
                onClick={handleProfile}
              >
                <User size={16} />
                <span>Profile</span>
              </button>
              <button
                type="button"
                className="profile-dropdown-item logout-item"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut size={16} />

                <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {isProfileModalOpen && (
        <div className="profile-modal-overlay" onMouseDown={closeProfileModal}>
          <div
            className="profile-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="profile-modal-header">
              <div>
                <span className="profile-modal-eyebrow">Account</span>

                <h2>Profile</h2>
              </div>

              <button
                type="button"
                className="profile-modal-close"
                onClick={closeProfileModal}
                aria-label="Close profile"
              >
                <X size={18} />
              </button>
            </div>

            <div className="profile-modal-identity">
              <div className="profile-modal-avatar">{avatarLetter}</div>

              <div>
                <h3>{username}</h3>
                <p>{email}</p>
              </div>
            </div>
            <div className="profile-details">
              <div className="profile-detail">
                <span>Username</span>
                <strong>{username}</strong>
              </div>

              <div className="profile-detail">
                <span>Email</span>
                <strong>{email}</strong>
              </div>
            </div>
            <div className="profile-modal-actions">
              <button
                type="button"
                className="profile-modal-close-btn"
                onClick={closeProfileModal}
              >
                Close
              </button>

              <button
                type="button"
                className="profile-modal-logout"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut size={15} />

                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
