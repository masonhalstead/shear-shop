import React from 'react';

import { NativeSelect, Typography } from '@material-ui/core';
import cn from './RunDefinition.module.scss';

import classNames from 'classnames';
import {
  BootstrapInput,
  BootstrapInputDisabled,
} from 'components/bootsrap-input/BootstrapInput';
import { InputWrapper } from '../../../../components/inputs/InputWrapper';
import { Input } from '../../../../components/inputs/Input';
import { InputTimeout } from '../../../../components/inputs/InputTimeout';
import { TextAreaWrapper } from '../../../../components/textarea/TextAreaWrapper';

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
      <InputWrapper
        label="Docker Image"
        value={docker_image}
        component={Input}
        handleOnChange={input =>
          handleDefinitionBlock({ docker_image: input.value })
        }
      />
    </div>
    <div className={cn.container}>
      <TextAreaWrapper
        label="Startup Command"
        value={startup_command}
        handleOnChange={input =>
          handleDefinitionBlock({ startup_command: input.value })
        }
      />
    </div>
    <div className={cn.containerRow}>
      <div className={cn.splitContainer}>
        <div className={classNames(cn.containerInput, cn.inputSmall)}>
          <InputWrapper
            label="CPU"
            value={cpu}
            type="number"
            component={Input}
            handleOnChange={input =>
              handleDefinitionBlock({ cpu: input.value })
            }
          />
        </div>
        <div className={classNames(cn.containerInput, cn.inputSmall)}>
          <InputWrapper
            label="GPU"
            type="number"
            value={gpu}
            component={Input}
            handleOnChange={input =>
              handleDefinitionBlock({ gpu: input.value })
            }
          />
        </div>
        <div className={classNames(cn.containerInputLast, cn.inputSmall)}>
          <InputWrapper
            label="Memory GB"
            type="number"
            value={memory_gb}
            component={Input}
            handleOnChange={input =>
              handleDefinitionBlock({ memory_gb: input.value })
            }
          />
        </div>
      </div>
      <div className={cn.containerInputLast}>
        <InputWrapper
          label="Timeout"
          value={timeout}
          data_mask="timeout"
          placeholder="hh:mm"
          component={InputTimeout}
          handleOnChange={input =>
            handleDefinitionBlock({ timeout: input.value })
          }
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
        <InputWrapper
          label="Batch Descriptor"
          value={batch_description}
          component={Input}
          handleOnChange={input =>
            handleDefinitionBlock({ batch_description: input.value })
          }
        />
      </div>
      <div className={cn.containerInputLast}>
        <InputWrapper
          label="Batch ID"
          value={batch_id}
          component={Input}
          handleOnChange={input =>
            handleDefinitionBlock({ batch_id: input.value })
          }
        />
      </div>
    </div>
    <div className={cn.divider} />
  </Typography>
);
