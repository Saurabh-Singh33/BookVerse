import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, BookOpen, CreditCard, CheckCircle, XCircle, Search } from "lucide-react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4001/user/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-pink-500 rounded-lg text-white">
                <Users size={24} />
              </div>
              Admin Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage users and track their reading activity</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Card (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Users</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Books Tracked</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {users.reduce((acc, user) => acc + user.recentBooks.length, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">User Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Recently Read (First 2)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="loading loading-spinner loading-lg text-pink-500"></div>
                        <p className="text-slate-500 dark:text-slate-400">Loading user data...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800 dark:text-white">{user.fullname}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{user.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          {user.recentBooks.length > 0 ? (
                            user.recentBooks.map((book, index) => (
                              <div key={index} className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-pink-500 w-4">{index + 1}.</span>
                                  <span className="text-sm font-medium dark:text-slate-200">{book.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {book.price > 0 ? (
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
                                      <CreditCard size={10} /> Paid
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                                      <CheckCircle size={10} /> Free
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 italic">No books read yet</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
