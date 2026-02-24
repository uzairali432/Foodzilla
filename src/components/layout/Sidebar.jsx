import { ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/Logo.png";
import { useAuthContext } from "../hooks/useAuth";
import userImage from '../../assets/user.png'

const Sidebar = ({
  menu,
  currentPage,
  onPageChange,
  menuItems,
  title,
  subtitle,
  role,
}) => {
  const { state } = useAuthContext();
  const name = state?.user?.name || "User";
  const userRole = state?.user?.role || role; // fall back to prop if provided

  const [expandItems, setExpandItems] = useState(new Set());

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandItems);
    if (newExpanded.has(itemId)) newExpanded.delete(itemId);
    else newExpanded.add(itemId);
    setExpandItems(newExpanded);
  };

  return (
    <div
      className={`${
        menu ? "w-20" : "w-72"
      } transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}
    >
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="size-10 bg-gradient-to-r from-white to-gray-200 rounded-xl flex items-center justify-center">
            <img src={logo} alt="logo" />
          </div>
          {!menu && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                {title}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                currentPage === item.id
                  ? "bg-[#E64D21] text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
              onClick={() => {
                if (item.subMenu) toggleExpanded(item.id);
                else onPageChange(item.id);
              }}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="size-5" />
                {!menu && (
                  <span className="font-medium ml-2">{item.label}</span>
                )}
              </div>
              {!menu && item.subMenu && (
                <ChevronDown
                  className={`size-4 transition-transform ${
                    expandItems.has(item.id) ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {!menu && item.subMenu && expandItems.has(item.id) && (
              <div className="ml-8 mt-2 space-y-1">
                {item.subMenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => onPageChange(subItem.id)}
                    className={`w-full text-left p-2 text-sm rounded-lg transition-all ${
                      currentPage === subItem.id
                        ? "bg-[#E64D21] text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {!menu && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src={userImage}
              alt="user"
              className="size-10 rounded-full ring-2 ring-blue-500"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </p>
              <p className="text-xs text-slate-500 truncate">{userRole}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
