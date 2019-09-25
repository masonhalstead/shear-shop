import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import {
  CustomInput,
  CustomInputTextArea,
} from 'components/material-input/CustomInput';
import classNames from 'classnames';
import cn from './Definition.module.scss';

export class DefinitionBlock extends PureComponent {
  static propTypes = {
    job_definition_name: PropTypes.string,
    docker_image: PropTypes.string,
    startup_command: PropTypes.string,
    description: PropTypes.string,
    handleDefinitionBlock: PropTypes.func,
  };

  render() {
    const {
      handleDefinitionBlock,
      job_definition_name,
      docker_image,
      startup_command,
      description,
    } = this.props;
    return (
      <Paper className={cn.contentAlign}>
        <div className={cn.containerRow}>
          <div className={classNames(cn.container, cn.inputSmall)}>
            <div className={cn.label}>Job Definition</div>
            <CustomInput
              label="Job Definition"
              value={job_definition_name || ''}
              name="Job Definition"
              onChange={e =>
                handleDefinitionBlock({
                  job_definition_name: e.target.value,
                })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <div className={classNames(cn.containerLast, cn.inputMedium)}>
            <div className={cn.label}>Docker Image</div>
            <CustomInput
              label="Docker Image"
              value={docker_image || ''}
              name="Docker Image"
              onChange={e =>
                handleDefinitionBlock({
                  docker_image: e.target.value,
                })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
        </div>
        <div className={cn.containerLast}>
          <div className={cn.label}>Startup Command</div>
          <CustomInputTextArea
            multiline
            label="Startup Command"
            value={startup_command || ''}
            name="Startup Command"
            onChange={e =>
              handleDefinitionBlock({
                startup_command: e.target.value,
              })
            }
            inputStyles={{ input: cn.inputStyles }}
            className={cn.top}
          />
        </div>
        <div className={classNames(cn.containerLast, cn.topItem)}>
          <div className={cn.label}>Description</div>
          <CustomInputTextArea
            multiline
            label="Description"
            value={description || ''}
            name="description"
            onChange={e =>
              handleDefinitionBlock({
                description: e.target.value,
              })
            }
            inputStyles={{ input: cn.inputStyles }}
            className={cn.top}
          />
        </div>
      </Paper>
    );
  }
}
