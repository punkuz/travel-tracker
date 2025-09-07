import Spinner from "../Spinner";

import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "../Message"
import { useCities } from "../../hooks/useCities";

export default function CityList() {
  //get cities and isLoading from context
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message= "Add your city by clicking on the map" />
  return (
    <div className={styles.cityList}>
      {
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem city={city} key={city.id} />
          ))}
        </ul>
      }
    </div>
  );
}
