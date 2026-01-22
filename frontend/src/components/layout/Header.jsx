import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          ReachInbox
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-sm text-red-500 hover:underline cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
