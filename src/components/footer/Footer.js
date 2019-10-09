import React from 'react';
import cn from './Footer.module.scss';

const Footer = () => {
  const date = new Date();
  const copyrightYear = date.getFullYear();
  return (
    <>
      <div className={cn.beforeFooter}/>
      <div className={cn.footer}>
        <p className={cn.copyright}>&copy; {copyrightYear} Cognitiv</p>
      </div>
    </>
  );
};
export default Footer;
