import React from 'react';
import cn from './Job.module.scss';

export const STDOutTab = ({ standard_out }) => (
    <div className={cn.stdoutContainer}>
      <p className={cn.stdoutText}>{standard_out}</p>
    </div>
  );
