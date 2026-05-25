import { useParams } from "react-router-dom"
import useCollections from "../../hooks/useCollections";
import RestaurantCard from "../../components/shared/RestaurantCard";
import CollectionsShimmer from "../../components/shimmers/CollectionsShimmer";

const RestaurantCollections = () => {
  const { collectionId } = useParams();
  const restaurant = useCollections(collectionId);
  const restaurants = Array.isArray(restaurant) ? restaurant : [];
  const header = restaurants[0]?.card?.card;

  return !restaurant ? <CollectionsShimmer /> : (
    <section className="container pb-10 pt-[120px]">
      <h1 className="text-3xl md:text-4xl text-gray-100  font-bold">{header?.title || "Restaurants"}</h1>
      <p className="mt-1 truncate text-base lg:text-lg font-light text-gray-300">{header?.description || "Explore restaurants near you"}</p>
      <h3 className="my-7 text-xl md:text-2xl text-gray-100  font-semibold">Restaurants to explore</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-2">
        {
          restaurants.map((restaurant) => (
            restaurant?.card?.card?.info ? (
              <RestaurantCard info={restaurant.card.card.info} key={"infoCard" +
              restaurant?.card?.card?.info?.id} />
            ) : null
          ))
        }
      </div>
    </section>
  )
}

export default RestaurantCollections
