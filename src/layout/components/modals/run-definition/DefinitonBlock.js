import React from 'react';

import { NativeSelect, Typography } from '@material-ui/core';
import cn from './RunDefinition.module.scss';
import {
  CustomInput,
  CustomInputTextArea,
} from 'components/material-input/CustomInput';

import classNames from 'classnames';
import {
  BootstrapInput,
  BootstrapInputDisabled,
} from 'components/bootsrap-input/BootstrapInput';

export const DefinitionBlock = ({
  docker_image,
  startup_command,
  handleDefinitionBlock,
  cpu,
  gpu,
  memory_gb,
  timeout,
  region,
  locations,
  location_id,
  batch_description,
  batch_id,
}) => (
  <Typography component={'span'} gutterBottom>
    <div className={cn.container}>
      <div className={cn.label}>Docker Image</div>
      <CustomInput
        label="Docker Image"
        value={docker_image}
        name="dockerImage"
        onChange={e =>
          handleDefinitionBlock({
            docker_image: e.target.value,
          })
        }
        inputStyles={{ input: cn.inputStyles }}
      />
    </div>
    <div className={cn.container}>
      <div className={cn.label}>Startup Command</div>
      <CustomInputTextArea
        multiline
        label="Startup Command"
        value={startup_command}
        name="startupCommand"
        onChange={e =>
          handleDefinitionBlock({
            startup_command: e.target.value,
          })
        }
        inputStyles={{ input: cn.inputStyles }}
      />
    </div>
    <div className={cn.containerRow}>
      <div className={cn.splitContainer}>
        <div className={classNames(cn.containerInput, cn.inputSmall)}>
          <div className={cn.label}>CPU</div>
          <CustomInput
            label="CPU"
            type="number"
            value={cpu}
            name="cpu"
            onChange={e =>
              handleDefinitionBlock({
                cpu: e.target.value,
              })
            }
            inputStyles={{ input: cn.inputStylesSmall }}
          />
        </div>
        <div className={classNames(cn.containerInput, cn.inputSmall)}>
          <div className={cn.label}>GPU</div>
          <CustomInput
            label="GPU"
            value={gpu}
            type="number"
            name="gpu"
            onChange={e =>
              handleDefinitionBlock({
                gpu: e.target.value,
              })
            }
            inputStyles={{ input: cn.inputStylesSmall }}
          />
        </div>
        <div className={classNames(cn.containerInputLast, cn.inputSmall)}>
          <div className={cn.label}>Memory GB</div>
          <CustomInput
            label="Memory GB"
            type="number"
            value={memory_gb}
            name="memory"
            onChange={e =>
              handleDefinitionBlock({
                memory_gb: e.target.value,
              })
            }
            inputStyles={{ input: cn.inputStylesSmall }}
          />
        </div>
      </div>
      <div className={cn.containerInputLast}>
        <div className={cn.label}>Timeout</div>
        <CustomInput
          type="time"
          label="Timeout"
          value={timeout}
          name="timeout"
          onChange={e =>
            handleDefinitionBlock({
              timeout: e.target.value,
            })
          }
          inputStyles={{ input: cn.inputStylesSmall }}
        />
      </div>
    </div>
    <div className={cn.containerRow}>
      <div className={classNames(cn.containerInputLast, cn.inputMedium)}>
        <div className={cn.label}>Location</div>
        <NativeSelect
          disabled={region !== 'empty'}
          value={location_id}
          style={{ width: '100%' }}
          onChange={e =>
            handleDefinitionBlock({
              location_id: e.target.value,
            })
          }
          input={
            region !== 'empty' ? (
              <BootstrapInputDisabled name="location" id="location" />
            ) : (
              <BootstrapInput name="location" id="location" />
            )
          }
        >
          <option key="empty" value="empty" />
          {locations.map(item => (
            <option key={item.uuid} value={item.location_id}>
              {item.location_name}
            </option>
          ))}
        </NativeSelect>
      </div>
      <div className={classNames(cn.containerInputLast)}>
        <div className={cn.label}>Region Hint</div>
        <NativeSelect
          disabled={location_id !== 'empty'}
          value={region}
          style={{ width: '100%' }}
          onChange={e =>
            handleDefinitionBlock({
              region: e.target.value,
            })
          }
          input={
            location_id !== 'empty' ? (
              <BootstrapInputDisabled name="region" id="region" />
            ) : (
              <BootstrapInput name="region" id="region" />
            )
          }
        >
          <option key="empty" value="empty" />
          {locations.map(item => (
            <option key={item.uuid} value={item.location_id}>
              {item.location_name}
            </option>
          ))}
        </NativeSelect>
      </div>
    </div>
    <div className={cn.containerRow}>
      <div className={classNames(cn.containerInputLast, cn.inputLarge)}>
        <div className={cn.label}>Batch Descriptor</div>
        <CustomInput
          label="Batch Descriptor"
          value={batch_description}
          name="batchDesc"
          onChange={e =>
            handleDefinitionBlock({
              batch_description: e.target.value,
            })
          }
          inputStyles={{ input: cn.customHeight }}
        />
      </div>
      <div className={cn.containerInputLast}>
        <div className={cn.label}>Batch ID</div>
        <CustomInput
          label="Batch ID"
          value={batch_id}
          name="batchID"
          onChange={e =>
            handleDefinitionBlock({
              batch_id: e.target.value,
            })
          }
          inputStyles={{ input: cn.customHeight }}
        />
      </div>
    </div>
    <div className={cn.divider} />
  </Typography>
);
