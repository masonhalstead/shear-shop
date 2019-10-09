import React, { PureComponent } from 'react';
import cn from './Navigation.module.scss';

export class Navigation extends PureComponent {
  render() {
    return <div className={cn.navigationContainer}>{this.props.children}</div>;
  }
};