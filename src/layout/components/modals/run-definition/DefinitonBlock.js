import React from 'react';

import { Typography } from '@material-ui/core';
import cn from './RunDefinition.module.scss';

import classNames from 'classnames';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { InputTimeout } from 'components/inputs/InputTimeout';
import { TextAreaWrapper } from 'components/textarea/TextAreaWrapper';
import { Dropdown } from 'components/dropdowns/Dropdown';
import uuid from 'uuid';

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
  handleOnSelectLocation,
  location_name,
  region_endpoint_hint,
  handleOnSelectRegion,
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
        <Dropdown
          rows={locations}
          extended={[
            {
              location_name: 'Remove Location',
              location_id: null,
              uuid: uuid.v1(),
            },
          ]}
          row_key="location_name"
          value={location_name}
          label="Location"
          disabled={!!region_endpoint_hint}
          right_icon="chevron-down"
          handleOnSelect={handleOnSelectLocation}
        />
      </div>
      <div className={classNames(cn.containerInputLast)}>
        <Dropdown
          rows={locations}
          extended={[
            {
              location_name: 'Remove Region Hint',
              location_id: null,
              uuid: uuid.v1(),
            },
          ]}
          row_key="location_name"
          value={region_endpoint_hint}
          disabled={!!location_name}
          label="Region Hint"
          right_icon="chevron-down"
          handleOnSelect={handleOnSelectRegion}
        />
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
