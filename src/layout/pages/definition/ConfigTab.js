import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, NativeSelect } from '@material-ui/core';
import {
  CustomInput,
  CustomInputBack,
} from 'components/material-input/CustomInput';
import {
  BootstrapInput,
  BootstrapInputDisabled,
} from 'components/bootsrap-input/BootstrapInput';
import cn from './Definition.module.scss';

export class ConnectedConfigTab extends PureComponent {
  static propTypes = {
    cpu: PropTypes.number,
    timeout: PropTypes.string,
    max_retries: PropTypes.number,
    gpu: PropTypes.number,
    stdout_success_text: PropTypes.string,
    location: PropTypes.number,
    locations: PropTypes.array,
    result_method_id: PropTypes.number,
    region: PropTypes.any,
    memory_gb: PropTypes.number,
    result_methods: PropTypes.array,
    handleDefinitionTabs: PropTypes.func,
  };

  render() {
    const {
      cpu,
      timeout,
      max_retries,
      gpu,
      stdout_success_text,
      location,
      locations,
      result_method_id,
      region,
      memory_gb,
      result_methods,
      handleDefinitionTabs,
    } = this.props;

    return (
      <div className={cn.tabValue}>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <div className={cn.label}>CPU</div>
            <CustomInput
              className={cn.rowPadding}
              type="number"
              label="CPU"
              value={cpu || ''}
              name="cpu"
              onChange={e => handleDefinitionTabs({ cpu: e.target.value })}
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <div className={cn.containerMiddle}>
            <div className={cn.label}>Timeout</div>
            <CustomInput
              type="time"
              className={cn.rowPadding}
              label="Timeout"
              value={timeout || ''}
              name="dockerImage"
              onChange={e => handleDefinitionTabs({ timeout: e.target.value })}
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <div className={cn.containerRight}>
            <div className={cn.label}>Max Retries</div>
            <CustomInput
              className={cn.rowPadding}
              type="number"
              label="Max Retries"
              value={max_retries || ''}
              name="max_retries"
              onChange={e =>
                handleDefinitionTabs({ max_retries: e.target.value })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
        </div>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <div className={cn.label}>GPU</div>
            <CustomInput
              className={cn.rowPadding}
              label="GPU"
              type="number"
              value={gpu || ''}
              name="gpu"
              onChange={e => handleDefinitionTabs({ gpu: e.target.value })}
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <FormControl className={cn.containerMiddle}>
            <div className={cn.label}>Location</div>
            <NativeSelect
              disabled={region !== 'empty'}
              value={location || undefined}
              onChange={e => handleDefinitionTabs({ location: e.target.value })}
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
          </FormControl>
          <FormControl className={cn.containerRight}>
            <div className={cn.label}>Result Method</div>
            <NativeSelect
              value={result_method_id || undefined}
              onChange={e =>
                handleDefinitionTabs({ result_method_id: e.target.value })
              }
              input={
                <BootstrapInput name="result_method_id" id="result_method_id" />
              }
            >
              <option key="empty" value="empty" />
              {result_methods.map(item => (
                <option key={item.uuid} value={item.result_method_id}>
                  {item.result_method_name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <div className={cn.label}>Memory GB</div>
            <CustomInput
              className={cn.rowPadding}
              label="Memory GB"
              type="number"
              value={memory_gb || ''}
              name="memory_gb"
              onChange={e =>
                handleDefinitionTabs({ memory_gb: e.target.value })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <FormControl className={cn.containerMiddle}>
            <div className={cn.label}>Region Hint</div>
            <NativeSelect
              disabled={location !== 'empty'}
              value={region || undefined}
              onChange={e => handleDefinitionTabs({ region: e.target.value })}
              input={
                location !== 'empty' ? (
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
          </FormControl>
          <div className={cn.containerRight}>
            <div className={cn.label}>Success Text</div>
            {Number(result_method_id) === 2 ? (
              <CustomInput
                className={cn.rowPadding}
                label="Success Text"
                value={stdout_success_text || ''}
                name="stdout_success_text"
                onChange={e =>
                  handleDefinitionTabs({ stdout_success_text: e.target.value })
                }
                inputStyles={{
                  input: cn.inputStyles,
                }}
              />
            ) : (
              <CustomInputBack
                disabled
                className={cn.rowPadding}
                label="Success Text"
                value={stdout_success_text || ''}
                name="stdout_success_text"
                onChange={e =>
                  handleDefinitionTabs({ stdout_success_text: e.target.value })
                }
                inputStyles={{
                  input: cn.inputStyles,
                }}
              />
            )}
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
