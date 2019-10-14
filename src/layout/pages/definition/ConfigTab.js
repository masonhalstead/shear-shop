import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl } from '@material-ui/core';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { InputTimeout } from 'components/inputs/InputTimeout';
import { Dropdown } from 'components/dropdowns/Dropdown';
import uuid from 'uuid';
import cn from './Definition.module.scss';

export class ConnectedConfigTab extends PureComponent {
  static propTypes = {
    cpu: PropTypes.number,
    timeout: PropTypes.string,
    max_retries: PropTypes.number,
    gpu: PropTypes.number,
    stdout_success_text: PropTypes.string,
    location_name: PropTypes.any,
    region_endpoint_hint: PropTypes.any,
    locations: PropTypes.array,
    result_method_id: PropTypes.number,
    result_method_name: PropTypes.any,
    memory_gb: PropTypes.number,
    result_methods: PropTypes.array,
    handleOnSelectRegion: PropTypes.func,
    handleOnSelectMethod: PropTypes.func,
    handleOnSelectLocation: PropTypes.func,
    handleDefinitionTabs: PropTypes.func,
  };

  handleTimoutConversion = input => {
    let timeout_seconds = 0;
    if (input === 0 || input) {
      const [hours, hour, minutes, minute] = input.split('');
      timeout_seconds += (hours || 0) * 36000;
      timeout_seconds += (hour || 0) * 3600;
      timeout_seconds += (minutes || 0) * 600;
      timeout_seconds += (minute || 0) * 60;
    }
    return timeout_seconds;
  };

  render() {
    const {
      cpu,
      timeout,
      max_retries,
      gpu,
      stdout_success_text,
      location_name,
      locations,
      result_method_name,
      result_method_id,
      region_endpoint_hint,
      memory_gb,
      result_methods,
      handleDefinitionTabs,
      handleOnSelectRegion,
      handleOnSelectMethod,
      handleOnSelectLocation,
    } = this.props;

    return (
      <div className={cn.tabValue}>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <InputWrapper
              label="CPU"
              value={cpu}
              type="number"
              min={0}
              component={Input}
              handleOnChange={input =>
                handleDefinitionTabs({ cpu: input.value })
              }
            />
          </div>
          <div className={cn.containerMiddle}>
            <InputWrapper
              label="Timeout"
              value={timeout}
              data_mask="timeout"
              placeholder="hh:mm"
              component={InputTimeout}
              handleOnChange={input => {
                const timeout_seconds = this.handleTimoutConversion(
                  input.value,
                );
                handleDefinitionTabs({ timeout: input.value, timeout_seconds });
              }}
            />
          </div>
          <div className={cn.containerRight}>
            <InputWrapper
              label="Max Retries"
              value={max_retries}
              type="number"
              component={Input}
              handleOnChange={input =>
                handleDefinitionTabs({ max_retries: input.value })
              }
            />
          </div>
        </div>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <InputWrapper
              label="GPU"
              value={gpu}
              type="number"
              min={0}
              component={Input}
              handleOnChange={input =>
                handleDefinitionTabs({ gpu: input.value })
              }
            />
          </div>
          <FormControl className={cn.containerMiddle}>
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
          </FormControl>
          <FormControl className={cn.containerRight}>
            <Dropdown
              rows={result_methods}
              row_key="result_method_name"
              value={result_method_name}
              label="Result Method"
              right_icon="chevron-down"
              handleOnSelect={handleOnSelectMethod}
            />
          </FormControl>
        </div>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <InputWrapper
              label="Memory GB"
              value={memory_gb}
              type="number"
              min={0}
              component={Input}
              handleOnChange={input =>
                handleDefinitionTabs({ memory_gb: input.value })
              }
            />
          </div>
          <FormControl className={cn.containerMiddle}>
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
          </FormControl>
          <div className={cn.containerRight}>
            <InputWrapper
              label="Success Text"
              value={stdout_success_text}
              disabled={result_method_id !== 2}
              component={Input}
              handleOnChange={input =>
                handleDefinitionTabs({ stdout_success_text: input.value })
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  result_methods: state.lookups.result_methods,
  locations: state.lookups.locations,
});

export const ConfigTab = connect(mapStateToProps)(ConnectedConfigTab);
