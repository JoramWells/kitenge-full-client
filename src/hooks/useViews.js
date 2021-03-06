import axios from "axios";
import { useEffect, useState } from "react";

export const useViews = (id) => {
  const [views, setViews] = useState("");

  const fetchLikes = async () => {
    await axios
      .get("/aidata/likes/" + id)
      .then((res) => setViews(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return views;
};

export const useAvatar = (id) => {
  const [avatar, setAvatar] = useState("");
  const fetchAvatar = async () => {
    await axios
      .get("/user/avatar/" + id)
      .then((res) => setAvatar(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchAvatar();
  }, []);
  return avatar;
};

export const useIp = () => {
  const [ip, setIp] = useState("");
  const getIp = async() => {
    await axios
      .get("https://api.ipify.org/")
      .then((res) => setIp(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getIp();
  }, []);
  return ip;
};
