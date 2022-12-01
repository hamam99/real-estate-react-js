import React, { useContext } from 'react'
import { HouseContext } from './HouseContext'
import { ImSpinner2 } from 'react-icons/im'

import House from './House'
import { Link } from 'react-router-dom'

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext)
  if (loading) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-violet-700 mt-[200px] text-4xl" />
    )
  }
  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
          {houses.map((house, index) => {
            return (
              <Link to={`/property/${house.id}`}>
                <House house={house} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HouseList
