import React from 'react';
import cn from './Footer.module.scss';

const Footer = React.memo(() => (
  <div className={cn.footer}>
    <p className={cn.copyright}>&copy; {new Date().getFullYear()} Cognitiv</p>
  </div>
));
export default Footer;
