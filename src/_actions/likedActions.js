import { LIKE_SAVE } from "../_constants/cartConstants"

const likedItem = (id,name,liked)=>(dispatch)=>{
    dispatch({
      type:LIKE_SAVE,
      payload:{id,name,liked}
    })
  
  }
export {likedItem}