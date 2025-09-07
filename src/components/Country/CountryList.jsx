import Spinner from '../Spinner'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'

export default function CountryList({cities, isLoading}) {

  const countries = cities.reduce((acc, cur) => {
    if(!acc.map(el => el.country).includes(cur.country)){
      return [...acc, {emoji: cur.emoji, country: cur.country}]
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
            <li key={country.id}><CountryItem country={country} /></li>
          ))}
        </ul>
      )}
    </div>
  )
}
