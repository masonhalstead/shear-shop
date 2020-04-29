import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Banner } from 'images/Banner';
import { BannerPricing } from 'images/BannerPricing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './LandingPage.module.scss';
const { PUBLIC_URL } = process.env;

class LandingPage extends PureComponent {
  render() {
    return (
      <div className={cn.pageWrapper}>
        <div className={cn.heroContainer}>
          <div id="booking" className={cn.actionContainer}>
            <Banner height="300" width="400" fill="#d9ba75" />
            <p className={cn.action}>
              <a
                href="https://squareup.com/appointments/book/3b9d0e15-a8fb-492e-bc89-9d58e7d4d927/2HTDYJ8QY108Y/services"
                target="_blank"
              >
                Book Appointment{' '}
                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
              </a>
            </p>
          </div>
          <img
            src={`${PUBLIC_URL}/city-background.jpg`}
            className={cn.cityImage}
            alt="Downtown"
          />
        </div>
        <div id="services" className={cn.blockWrapper}>
          <img
            src={`${PUBLIC_URL}/womens-balayage.png`}
            className={cn.blockImage}
            alt="Downtown"
          />
          <div className={cn.blockFloat}>
            <h2 className={cn.blockTitle}>BALAYAGE</h2>
            <p className={cn.blockText}>Price Varies</p>
            <p className={cn.blockText}>
              French for 'sweeping'. This is a hand painted color technique that
              incorporates highlights in a polished but natural placement.
              Typically followed by a glazing color to blend your base (base
              breaking), shampoo, blow dry style and product consultation.
            </p>
          </div>
        </div>
        <div className={cn.blockWrapper}>
          <img
            src={`${PUBLIC_URL}/mens-haircut.png`}
            className={cn.blockImageAlt}
            alt="Downtown"
          />
          <div className={cn.blockFloat}>
            <h2 className={cn.blockTitle}>MEN &amp; WOMENS HAIRCUTS</h2>
            <p className={cn.blockText}>$45 - $60</p>
            <p className={cn.blockText}>
              Men's Haircuts: Starting at $45 and includes a consultation,
              optional shear cut, razor, clippers or combination, shampoo
              blow-dry and style product.
            </p>
            <p className={cn.blockText}>
              Women's Haircuts: Starting at $60 and includes consultation,
              shampoo, cut blowout/style and style product.
            </p>
          </div>
        </div>
        <div className={cn.blockWrapper}>
          <img
            src={`${PUBLIC_URL}/womens-haircut.png`}
            className={cn.blockImage}
            alt="Downtown"
          />
          <div className={cn.blockFloat}>
            <h2 className={cn.blockTitle}>SPECIAL OCCASION STYLES</h2>
            <p className={cn.blockText}>$50+</p>
            <p className={cn.blockText}>
              Whether your hair is short, long, curly or straight, finding the
              right hairstyle for the occasion can be accomplished at Shear
              Shop. Let us know what you are looking for and we will make it
              happen.
            </p>
          </div>
        </div>
        <div id="pricing" className={cn.pricingBlock}>
          <BannerPricing height="200" width="500" fill="#d9ba75" />
          <div style={{ width: '500px' }}>
            <ul className="leaders">
              <li>
                <span>Womens Haircut</span>
                <span>$60</span>
              </li>
              <li>
                <span>Mens Haircut</span>
                <span>$45</span>
              </li>
              <li>
                <span>Base Color</span>
                <span>Starting at $70</span>
              </li>
              <li>
                <span>Partial Foil</span>
                <span>Starting at $85</span>
              </li>
              <li>
                <span>Full Foil</span>
                <span>$105</span>
              </li>
              <li>
                <span>Balayage</span>
                <span>Price Varies</span>
              </li>
              <li>
                <span>Shampoo and Blow Out</span>
                <span>$45</span>
              </li>
              <li>
                <span>Toner</span>
                <span>$45</span>
              </li>
              <li>
                <span>Wax (eyebrow or lip)</span>
                <span>$20</span>
              </li>
              <li>
                <span>Kids Cuts</span>
                <span>$40</span>
              </li>
            </ul>
          </div>
        </div>
        <div id="location" className={cn.locationWrapper}>
          <p className={cn.blockText}>
            Redmond Shear Shop
            <br />
            (425) 314-6901
            <br />
            15808 NE 83rd Street
            <br />
            Redmond, WA 98052
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(LandingPage);
