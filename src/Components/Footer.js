import React from 'react'
import './footer.css'

function Footer() {
  return (
    <>
    <div className="footer">
      <div className="disclaimer-area">
        <p className="disclaimer-head">Disclaimer:</p>
        <p style={{marginLeft:"5px"}} className="disclaimer-desc"> This Amazon clone project is a mere simulation and is not affiliated with Amazon in any way. </p>
      </div>
    </div>
    <div className="link-section">
      <div className="first-row">
        <p className='bold'>Get to Know Us</p>
        <p>Make Money with Us</p>
        <p>Amazon Payment</p>
        <p>Let Us Help You</p>
      </div>
      <div className="second-row">
        <p className='bold'>About Amazon</p>
        <p>Sell products on Amazon</p>
        <p>Amazon Business Card</p>
        <p>Amazon and COVID-19</p>
      </div>
      <div className="third-row">
        <p className='bold'>Connect with Us</p>
        <p>Sell apps on Amazon</p>
        <p>Shop with Points</p>
        <p>Shipping Rates & Policies</p>
      </div>
      <div className="fourth-row">
        <p className='bold'>Amazon Cares</p>
        <p>Become an Affiliate</p>
        <p>Reload Your Balance</p>
        <p>Returns & Replacements</p>
      </div>
    </div>
    </>
  )
}

export default Footer