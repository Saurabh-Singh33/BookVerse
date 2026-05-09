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
    user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 animate-in fade-in slide-in-from-top duration-700">
          <div>
            <h1 className="text-4xl font-extrabold flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl text-white shadow-lg shadow-pink-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                <Users size={28} />
              </div>
              <span className="text-gradient">Admin Dashboard</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Manage your community and monitor reading trends</p>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-12 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all w-full md:w-80 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <div className="glass-card p-6 rounded-3xl hover:scale-[1.02] transition-transform duration-300 cursor-default">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                <Users size={26} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Users</p>
                <p className="text-3xl font-black text-slate-800 dark:text-white">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-3xl hover:scale-[1.02] transition-transform duration-300 cursor-default">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-2xl">
                <BookOpen size={26} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Books Discovered</p>
                <p className="text-3xl font-black text-slate-800 dark:text-white">
                  {users.reduce((acc, user) => acc + (user.recentBooks?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl hover:scale-[1.02] transition-transform duration-300 cursor-default">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl">
                <CreditCard size={26} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Engagement Rate</p>
                <p className="text-3xl font-black text-slate-800 dark:text-white">
                  {users.length > 0 ? ((users.filter(u => u.recentBooks?.length > 0).length / users.length) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table Container */}
        <div className="glass-card rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">User Details</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Recent Activity (Last 2)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {loading ? (
                  <tr>
                    <td colSpan="2" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <span className="loading loading-spinner loading-lg text-pink-500"></span>
                        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Syncing user data...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <XCircle size={48} className="text-slate-300 dark:text-slate-700" />
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No matches found for "{searchTerm}"</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all duration-300">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-pink-100 to-violet-100 dark:from-pink-900/20 dark:to-violet-900/20 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold text-xl border border-pink-200/50 dark:border-pink-800/30">
                            {user.fullname?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-pink-500 transition-colors">{user.fullname}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                          {user.recentBooks && user.recentBooks.length > 0 ? (
                            user.recentBooks.map((book, index) => (
                              <div key={index} className="flex flex-col min-w-[180px] bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 group/book hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5 transition-all duration-300">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-tighter">Book {index + 1}</span>
                                  {book.price > 0 ? (
                                    <span className="flex items-center gap-1 text-[9px] font-black uppercase bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md border border-amber-200/50 dark:border-amber-800/50">
                                      <CreditCard size={10} /> Paid
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-[9px] font-black uppercase bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-md border border-green-200/50 dark:border-green-800/50">
                                      <CheckCircle size={10} /> Free
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate group-hover/book:text-pink-500 transition-colors" title={book.name}>
                                  {book.name}
                                </div>
                                <div className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">{book.category}</div>
                              </div>
                            ))
                          ) : (
                            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600 italic text-sm py-2">
                              <div className="h-1 w-8 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                              No activity recorded yet
                            </div>
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

        {/* Footer info */}
        <div className="mt-8 text-center text-slate-400 dark:text-slate-600 text-sm font-medium animate-in fade-in duration-1000 delay-500">
          &copy; {new Date().getFullYear()} BookVerse Admin Portal &bull; System Operational
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
