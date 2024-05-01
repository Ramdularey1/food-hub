import MenuItems from "./MenuItems";
import { v4 as uuidv4 } from "uuid";

const RestaurantMenuInfo = ({menuInfo, resCart}) => {
  
  return (
    menuInfo.map((menu) => {
        return menu?.card?.card?.itemCards ? <MenuItems {...menu?.card?.card}
        resCart={resCart} key={uuidv4()} /> : null;
    })
  )
}

export default RestaurantMenuInfo