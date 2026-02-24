import { Bell, ChevronDown, Menu, Settings } from "lucide-react";
import { handleLogout } from "../../utils";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuth";
import { Popover } from "antd";
import userImage from '../../assets/user.png'

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuthContext();
  const name = state?.user?.name || "User";
  const email = state?.user?.email || "user@example.com";

  const content = (
    <div className="p-2 space-y-1">
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-slate-500 truncate">{email}</p>
      <button onClick={() => handleLogout(navigate, dispatch)} className="text-red-500 text-sm">Logout</button>
    </div>
  );

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={onToggleSidebar}
          >
            <Menu className="size-5" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-black text-[#0E2A45] dark:text-white">Dashboard</h1>
            <p className="text-[#0E2A45] dark:text-white">Welcome back, {name.charAt(0).toUpperCase() + name.slice(1)} — here’s what’s happening today</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Popover content={content} trigger="click">
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700 cursor-pointer">
              <img src={userImage} alt="user" className="size-8 rounded-full ring-2 ring-[#E64D21]" />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-[#0E2A45] dark:text-slate-400">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
              </div>
              <ChevronDown className="size-4 text-slate-400" />
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
