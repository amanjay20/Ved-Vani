/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/Features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/Features/auth/authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        dispatch(showLoading());
        const { data } = await axios.post(
          `/api/user/getuser`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(hideLoading());

        if (data?.user) {
          dispatch(setUser(data.user));
        } else {
          sessionStorage.clear();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        sessionStorage.clear();
        dispatch(hideLoading());
      } finally {
        setLoading(false);
      }
    };

    if (!user && token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  return children;
};

export default PrivateRoute;
