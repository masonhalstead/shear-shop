import React from 'react';
import { normalizeSeconds } from 'utils/normalizers';
import cn from './Job.module.scss';

export const TopPanel = React.memo(({ data }) => (
  <>
    <div className={cn.containerTabRow}>
      <div className={cn.padding}>
        <div className={cn.label}>Docker Image</div>
        <div className={cn.text}>{data.docker_image}</div>
      </div>
      <div className={cn.padding}>
        <div className={cn.label}>Description</div>
        <div className={cn.text}>{data.description}</div>
      </div>
      <div className={cn.padding}>
        <div className={cn.label}>Startup command</div>
        <div className={cn.text}>{data.startup_command}</div>
      </div>
    </div>
    <div className={cn.containerConfigRow}>
      <div className={cn.rowConfig}>
        <div className={cn.textAlign}>
          <div className={cn.label}>CPU</div>
          <div className={cn.text}>{data.required_cpu || 0}</div>
        </div>
        <div className={cn.textAlign}>
          <div className={cn.label}>GPU</div>
          <div className={cn.text}>{data.required_gpu || 0}</div>
        </div>
        <div className={cn.textAlign}>
          <div className={cn.label}>Memory GB</div>
          <div className={cn.text}>{data.required_memory_gb || 0}</div>
        </div>
      </div>
      <div className={cn.rowConfig}>
        <div className={cn.textAlign}>
          <div className={cn.label}>Max Retries</div>
          <div className={cn.text}>{data.retries}</div>
        </div>
        <div className={cn.textAlign}>
          <div className={cn.label}>Timeout</div>
          <div className={cn.text}>
            {normalizeSeconds(data.timeout_seconds, 'h [hrs] m [min]')}
          </div>
        </div>
      </div>
      <div className={cn.rowConfig}>
        <div className={cn.textAlign}>
          <div className={cn.label}>Location</div>
          <div className={cn.text}>{data.location_name}</div>
        </div>
        <div className={cn.textAlign}>
          <div className={cn.label}>Method</div>
          <div className={cn.text}>{data.result_method_name}</div>
        </div>
      </div>
    </div>
  </>
));
