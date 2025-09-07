import Spinner from "../Spinner";

import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "../Message"

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message= "Add your city by clicking on the map" />
  return (
    <div className={styles.cityList}>
      {
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem city={city} />
          ))}
        </ul>
      }
    </div>
  );
}
