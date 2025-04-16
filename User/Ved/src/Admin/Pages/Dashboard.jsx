/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiShoppingCart, FiUser, FiDollarSign, FiEdit, FiTrash } from "react-icons/fi";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

import Sidebar from '../component/SideBar';
import Header from '../component/Header';
import axios from 'axios';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/Features/auth/authSlice';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredorder, setfilteredorder] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  
  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      console.error("No token found! Please log in.");
      alert("User is not authenticated");
      return;
    }
    // fetchProducts();
    // fetchOrders();
    // fetchUsers();
  }, [token]);

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get("/api/product/allProduct", getAuthHeaders());
  //     setProducts(response.data.products);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.post(
  //       "/api/user/alluser", {}, getAuthHeaders());
  //     setUser(response.data.users);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };



  // // Function to fetch orders from the backend
  // const fetchOrders = async () => {
  //   try {
  //     const response = await axios.post("/api/order/getallorder", {}, getAuthHeaders());

  //     const todayOrders = filterTodayOrders(response.data);
  //     setfilteredorder(todayOrders);
  //     setOrders(response.data);
  //     calculateTotalRevenue(response.data);
    
  //     prepareChartData(response.data)
  //   } catch (err) {
  //     console.log(err.response ? err.response.data.message : "Something went wrong");
  //   }
  // };

  // Function to filter today's orders
  const filterTodayOrders = (orders) => {
    const today = new Date().toISOString().split('T')[0];
    return orders.filter(order => new Date(order.createdAt).toISOString().split('T')[0] === today);
  };
  // Calculate the total revenue for today's orders
  const calculateTotalRevenue = (orders) => {
    const revenue = orders.filter(order => order.paymentStatus === "paid").reduce((total, order) => total + order.totalPrice, 0);
    setTotalRevenue(revenue);
  };

  

  // Prepare the chart data
  const prepareChartData = (ordersData) => {
    const revenueData = Array(12).fill(0).map((_, i) => ({
      name: new Date(2023, i).toLocaleString('default', { month: 'short' }),
      revenue: 0,
    }));

    const orderData = Array(12).fill(0).map((_, i) => ({
      name: new Date(2023, i).toLocaleString('default', { month: 'short' }),
      orders: 0,
    }));
    // Loop through orders and group by month
    ordersData.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const month = orderDate.getMonth(); // 0-11 for months (January is 0)
      const revenue = order.totalPrice;

      // Increment revenue for the corresponding month
      revenueData[month].revenue += revenue;

      // Increment order count for the corresponding month
      orderData[month].orders += 1;
    });

    setRevenueData(revenueData);
    setOrderData(orderData);
  };

  // Custom styling for the BarChart
  const renderColor = (index) => {
    return index % 2 === 0 ? '#82ca9d' : '#8884d8'; // Alternate colors for bars
  };

  return (
    <>
      <div className="flex bg-[#f8f8f8]">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="bg-gray-100 pl-4 p-2 overflow-y-auto flex-1 h-[calc(100vh-4rem)]">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 pl-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                {
                  title: "Total Product",
                  value: products?.length, // Dynamically set to products length
                  icon: <FiTrendingUp />,
                  color: "bg-green-100 text-green-500",
                  onClick: () => handleCardClick('/admin/products'),
                },
                {
                  title: "Total Order",
                  value: orders?.length,
                  icon: <FiShoppingCart />,
                  color: "bg-red-100 text-blue-500",
                  onClick: () => handleCardClick('/admin/orders'), // Navigate to orders
                },
                {
                  title: "Total User",
                  value: user?.length,
                  icon: <FiUser />,
                  color: "bg-blue-100 text-blue-500",
                  onClick: () => handleCardClick('/admin/alluser'),

                },
                {
                  title: "Total Revenue",
                  value: totalRevenue,
                  icon: <MdOutlineCurrencyRupee />,
                  color: "bg-yellow-100 text-yellow-500",
                },
                
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`p-4 ${stat.color} shadow rounded-lg flex justify-between items-center`}
                  onClick={stat.onClick} // Add onClick handle
                >
                  <div>
                    <p className="text-gray-500">{stat.title}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                    <p className="text-sm">{stat.change}</p>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              ))}
            </div>

            <div className="md:p-6 bg-gray-100 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div>
                  <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData} barSize={30} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#555' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#555' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                      <Legend />
                      <Bar dataKey="revenue">
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={renderColor(index)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Order Count Chart */}
                <div>
                  <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">Monthly Order Count</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={orderData} barSize={30} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#555' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#555' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                      <Legend />
                      <Bar dataKey="orders">
                        {orderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={renderColor(index)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 shadow rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="md:text-lg font-semibold">Recent Orders</h2>
                <p className="md:text-lg font-semibold">Total Revenue: ₹{totalRevenue}</p>
              </div>

              {/* Table View for Larger Screens */}
              <div className="hidden md:block">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="py-2">Order ID</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Total Price</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredorder.map((order) => (
                      <tr key={order._id} className="border-b hover:bg-gray-50">
                        <td className="py-2">{order._id}</td>
                        <td>{order.shippingAddress.firstname} {order.shippingAddress.lastname}</td>
                        <td>{order.status}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>₹{order.totalPrice}</td>
                        <td>{order.paymentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card View for Mobile */}
              <div className="md:hidden space-y-4">
                {filteredorder.map((order) => (
                  <div key={order._id} className="p-4 border rounded-lg shadow">
                    <p className="font-semibold">Order ID: <span className="font-normal">{order._id}</span></p>
                    <p className="font-semibold">Customer: <span className="font-normal">{order.shippingAddress.firstname} {order.shippingAddress.lastname}</span></p>
                    <p className="font-semibold">Status: <span className="font-normal">{order.status}</span></p>
                    <p className="font-semibold">Date: <span className="font-normal">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                    <p className="font-semibold">Total Price: <span className="font-normal">₹{order.totalPrice}</span></p>
                    <p className="font-semibold">Payment Status: <span className="font-normal">{order.paymentStatus}</span></p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
