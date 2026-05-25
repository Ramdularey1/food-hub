import MenuItems from "./MenuItems";
import { v4 as uuidv4 } from "uuid";

const RestaurantMenuInfo = ({menuInfo, resCart}) => {
  const menuCards = Array.isArray(menuInfo) ? menuInfo : [];
  
  return (
    menuCards.map((menu) => {
      const card = menu?.card?.card;

      if (card?.itemCards) {
        return <MenuItems {...card} resCart={resCart} key={uuidv4()} />;
      }

      if (Array.isArray(card?.categories)) {
        return card.categories.map((category) =>
          category?.itemCards ? (
            <MenuItems {...category} resCart={resCart} key={uuidv4()} />
          ) : null
        );
      }

      return null;
    })
  )
}

export default RestaurantMenuInfo
