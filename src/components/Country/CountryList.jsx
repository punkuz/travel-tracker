import { useCities } from '../../hooks/useCities';
import Spinner from '../Spinner'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'

export default function CountryList() {
  //get cities and isLoading from context
  const { cities, isLoading } = useCities();
  const countries = cities.reduce((acc, cur) => {
    if(!acc.map(el => el.country).includes(cur.country)){
      return [...acc, {emoji: cur.emoji, country: cur.country, id: cur.id}]
    } else {
      return acc;
    }
  },[])

  return (
    <div className={styles.countryList}>
      {isLoading && <Spinner/>}
      {!isLoading && countries.length === 0 && <p>No countries found.</p>}
      {!isLoading && countries.length > 0 && (
        <ul className={styles.countryList}>
          {countries.map(country => (
            <CountryItem country={country} key={country.id} />
          ))}
        </ul>
      )}
    </div>
  )
}
