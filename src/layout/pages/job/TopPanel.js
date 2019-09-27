import React from 'react';
import cn from './Job.module.scss';

export const TopPanel = () => (
  <>
    <div className={cn.containerTabRow}>
      <div className={cn.padding}>
        <div className={cn.label}>Docker Image</div>
        <div className={cn.text}>cognitiv/umbro</div>
      </div>
      <div className={cn.padding}>
        <div className={cn.label}>Description</div>
        <div className={cn.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
      <div className={cn.padding}>
        <div className={cn.label}>Startup command</div>
        <div className={cn.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
    </div>
    <div className={cn.containerConfigRow}>
      <div className={cn.rowConfig}>
        <div className={cn.textAlign}>
          <div className={cn.label}>CPU</div>
          <div className={cn.text}>12</div>
        </div>
        <div className={cn.textAlign}>
          <div className={cn.label}>GPU</div>
          <div className={cn.text}>0</div>
        </div>
        <div className={cn.textAlign}>
          <div className={cn.label}>Memory GB</div>
          <div className={cn.text}>20</div>
        </div>
      </div>
      <div className={cn.rowConfig}>
        <div className={cn.textAlign}>
          <div className={cn.label}>Max Retries</div>
          <div className={cn.text}>0</div>
        </div>
        <div className={cn.textAlign}>
          <div className={cn.label}>Timeout</div>
          <div className={cn.text}>1 day</div>
        </div>
      </div>
      <div className={cn.rowConfig}>
        <div className={cn.textAlign}>
          <div className={cn.label}>Location</div>
          <div className={cn.text}>us-east-1</div>
        </div>
        <div className={cn.textAlign}>
          <div className={cn.label}>Method</div>
          <div className={cn.text}>Auto</div>
        </div>
      </div>
    </div>
  </>

);
