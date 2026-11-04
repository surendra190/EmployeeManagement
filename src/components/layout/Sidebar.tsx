import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "Employees", path: "/employees" },
    { label: "Projects", path: "/projects" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">EMS</h2>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-menu ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
