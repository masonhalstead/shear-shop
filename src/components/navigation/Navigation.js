import React, { PureComponent } from 'react';
import { Logo } from 'images/Logo';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import cn from './Navigation.module.scss';

export class Navigation extends PureComponent {
  render() {
    return (
      <div className={cn.navigationWrapper}>
        <div className={cn.navigationContainer}>
          <Logo height="40" width="50" fill="#d9ba75" />
          <div className={cn.flexGrow} />
          <AnchorLink className={cn.navigationLink} href="#services">
            Services
          </AnchorLink>
          <AnchorLink className={cn.navigationLink} href="#booking">
            Booking
          </AnchorLink>
          <AnchorLink className={cn.navigationLink} href="#pricing">
            Pricing
          </AnchorLink>
          <AnchorLink className={cn.navigationLink} href="#location">
            Location
          </AnchorLink>
        </div>
      </div>
    );
  }
}
