import axios from "axios";
import {useEffect,useState} from "react";

export const useViews = (id) => {
  const [views, setViews] = useState("");


   const fetchLikes = async () => {
    await axios
      .get("/aidata/likes/"+id)
      .then((res) => setViews(res.data))
      .catch((err) => console.log(err));
  };

 
  useEffect(()=>{
      fetchLikes()
  },[fetchLikes])

  return views
};

export const useAvatar =(id)=>{
  const [avatar, setAvatar] = useState("");
  const fetchAvatar = async ()=>{
    await axios.get("/user/avatar/"+id)
    .then(res=>setAvatar(res.data))
    .catch(err=>console.log(err))
  }
  useEffect(()=>{
      fetchAvatar()
  },[fetchAvatar])
  return avatar
  
}


