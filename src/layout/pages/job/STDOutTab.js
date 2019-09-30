import cn from './Job.module.scss';
import React from 'react';

export const STDOutTab = ({ stdOutData }) => (
  <div className={cn.stdoutContainer}>
    {stdOutData.map(data => (
      <p key={data} className={cn.stdoutText}>{data}</p>
    ))}
  </div>
);
