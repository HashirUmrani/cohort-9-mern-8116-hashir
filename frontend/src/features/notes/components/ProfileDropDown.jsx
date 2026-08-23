import { useEffect, useRef, useState } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  const username = user?.username || "User";
  const email = user?.email || "";
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="profile-wrapper" ref={profileRef}>
      <button
        type="button"
        className="profile"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label="Open profile menu"
      >
        <div className="avatar">{initial}</div>

        <span>{username}</span>

        <span className={`profile-arrow ${isOpen ? "is-open" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <div className="profile-dropdown-avatar">{initial}</div>

            <div className="profile-details">
              <strong>{username}</strong>
              <span>{email}</span>
            </div>
          </div>

          <div className="profile-divider" />

          <button
            type="button"
            className="profile-menu-item"
            onClick={() => setIsOpen(false)}
          >
            <User size={16} />
            <span>Profile</span>
          </button>

          <button
            type="button"
            className="profile-menu-item logout-item"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut size={16} />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
