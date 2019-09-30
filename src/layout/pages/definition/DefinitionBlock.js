import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { TextAreaWrapper } from 'components/textarea/TextAreaWrapper';
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
            <InputWrapper
              label="Job Definition"
              value={job_definition_name}
              component={Input}
              handleOnChange={input =>
                handleDefinitionBlock({ job_definition_name: input.value })
              }
            />
          </div>
          <div className={classNames(cn.containerLast, cn.inputMedium)}>
            <InputWrapper
              label="Docker Image"
              value={docker_image}
              component={Input}
              handleOnChange={input =>
                handleDefinitionBlock({ docker_image: input.value })
              }
            />
          </div>
        </div>
        <div className={cn.containerLast}>
          <TextAreaWrapper
            label="Startup Command"
            value={startup_command}
            handleOnChange={input =>
              handleDefinitionBlock({ startup_command: input.value })
            }
          />
        </div>
        <div className={classNames(cn.containerLast, cn.topItem)}>
          <TextAreaWrapper
            label="Description"
            value={description}
            handleOnChange={input =>
              handleDefinitionBlock({ description: input.value })
            }
          />
        </div>
      </Paper>
    );
  }
}
