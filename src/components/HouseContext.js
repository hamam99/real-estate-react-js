import React, { useState, useEffect, createContext } from 'react'

import { housesData } from '../data'

export const HouseContext = createContext()

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('Location (any)')
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState('Property type (any)')
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState('Price range (any)')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country
    })
    const uniqueCountry = ['Location (any)', ...new Set(allCountries)]
    setCountries(uniqueCountry)
  }, [])

  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type
    })
    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)]
    setProperties(uniqueProperties)
  }, [])

  const handleClick = () => {

    setLoading(true)

    const isDefault = (str) => {
      return str.split(' ').includes('(any)')
    }

    const minPrice = parseInt(price.split(' ')[0])
    const maxPrice = parseInt(price.split(' ')[2])

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price)
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house
      }

      if (isDefault(country) && isDefault(price) && isDefault(property)) {
        return house
      }

      if (!isDefault(country) && isDefault(price) && isDefault(property)) {
        return house.country === country
      }

      if (isDefault(country) && !isDefault(price) && isDefault(property)) {
        return housePrice >= minPrice && housePrice <= maxPrice
      }

      if (isDefault(country) && isDefault(price) && !isDefault(property)) {
        return house.type === property
      }

      if (!isDefault(country) && !isDefault(price) && isDefault(property)) {
        return (
          house.country === country &&
          housePrice >= minPrice &&
          housePrice <= maxPrice
        )
      }

      if (!isDefault(country) && isDefault(price) && !isDefault(property)) {
        return house.country === country && house.type === property
      }

      if (isDefault(country) && !isDefault(price) && !isDefault(property)) {
        return (
          housePrice >= minPrice &&
          housePrice <= maxPrice &&
          house.type === property
        )
      }
    })

    setTimeout(() => {
      setLoading(false)
      return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses)
    }, 500)

  }

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick
      }}
    >
      {children}
    </HouseContext.Provider>
  )
}

export default HouseContextProvider
