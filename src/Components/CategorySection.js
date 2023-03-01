import React from 'react'
import './categorysection.css'
import category from '../imgs/category.png'

function CategorySection() {
  return (
    <>
    <div className="container">
      <div className="category-section">
        <img src={category} className="category-img" />
        <p className="heading">Categories</p>
      </div>
    </div>
    </>
  )
}

export default CategorySection