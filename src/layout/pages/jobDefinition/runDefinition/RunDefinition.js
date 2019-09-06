import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { CustomizedDialogs } from 'components/common/modal/CustomModal';
import { Typography, NativeSelect, FormControl } from '@material-ui/core';
import { CustomInput } from 'components/common/material-input/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BootstrapInput from 'components/common/bootsrapInput/BootstrapInput';
import cn from './RunDefinition.module.scss';

class RunDefinition extends PureComponent {
  static propTypes = {
    opened: PropTypes.bool,
    handleClose: PropTypes.func,
    runJob: PropTypes.func,
    title: PropTypes.string,
    locations: PropTypes.array,
  };

  state = {
    dockerImage: '',
    startupCommand: '',
    cpu: '',
    gpu: '',
    memory: '',
    timeout: '',
    location: 'empty',
    region: 'empty',
    batchDesc: '',
    batchID: '',
    params: [
      {
        value: '',
        description: '',
      },
      {
        value: '',
        description: '',
      },
      {
        value: '',
        description: '',
      },
    ],
  };

  changeName = (value, index) => {
    this.setState(prevState => {
      const newItems = [...prevState.params];
      newItems[index].value = value;
      return { params: newItems };
    });
  };

  changeDescription = (description, index) => {
    this.setState(prevState => {
      const newItems = [...prevState.params];
      newItems[index].description = description;
      return { params: newItems };
    });
  };

  addMoreParameters = () => {
    this.setState(prevState => {
      const newItems = [...prevState.params];
      newItems.push({
        value: '',
        description: '',
      });
      return { params: newItems };
    });
  };

  runJob = () => {
    const { runJob } = this.props;
    runJob();
  };

  render() {
    const { opened, handleClose, title, locations } = this.props;
    const {
      dockerImage,
      startupCommand,
      cpu,
      gpu,
      memory,
      timeout,
      location,
      region,
      batchID,
      batchDesc,
      params,
    } = this.state;
    return (
      <CustomizedDialogs
        open={opened}
        handleClose={handleClose}
        runJob={this.runJob}
        title={title}
      >
        <Typography gutterBottom>
          <CustomInput
            label="Docker Image"
            value={dockerImage}
            name="dockerImage"
            onChange={e => this.setState({ dockerImage: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
          />
          <CustomInput
            multiline
            label="Startup Command"
            value={startupCommand}
            name="startupCommand"
            onChange={e => this.setState({ startupCommand: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
            className={cn.top}
          />
          <div className={cn.containerRow}>
            <div className={cn.containerRowSmall}>
              <CustomInput
                label="CPU"
                value={cpu}
                name="cpu"
                onChange={e => this.setState({ cpu: e.target.value })}
                inputStyles={{ input: cn.inputStylesSmall }}
                className={cn.top}
              />
              <CustomInput
                className={cn.align}
                label="GPU"
                value={gpu}
                name="gru"
                onChange={e => this.setState({ gpu: e.target.value })}
                inputStyles={{ input: cn.inputStylesSmall }}
              />
              <CustomInput
                className={cn.align}
                label="Memory GB"
                value={memory}
                name="memory"
                onChange={e => this.setState({ memory: e.target.value })}
                inputStyles={{ input: cn.inputStylesSmall }}
              />
              <CustomInput
                type="time"
                label="Timeout"
                value={timeout}
                name="timeout"
                onChange={e => this.setState({ timeout: e.target.value })}
                inputStyles={{ input: cn.inputStylesSmall }}
                className={cn.align}
              />
            </div>
          </div>
          <div className={cn.containerRow}>
            <FormControl className={cn.formControl}>
              <div className={cn.label}>Location</div>
              <NativeSelect
                disabled={region !== 'empty'}
                value={location}
                onChange={e => this.setState({ location: e.target.value })}
                input={<BootstrapInput name="location" id="location" />}
              >
                <option key="empty" value="empty" />
                {locations.map(item => (
                  <option key={item.uuid} value={item.location_id}>
                    {item.location_name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <FormControl className={cn.formControl}>
              <div className={cn.label}>Region Hint</div>
              <NativeSelect
                disabled={location !== 'empty'}
                value={region}
                onChange={e => this.setState({ region: e.target.value })}
                input={<BootstrapInput name="region" id="region" />}
              >
                <option key="empty" value="empty" />
                {locations.map(item => (
                  <option key={item.uuid} value={item.location_id}>
                    {item.location_name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
          <div className={cn.containerRow}>
            <div className={cn.longInput}>
              <CustomInput
                label="Batch Descriptor"
                value={batchDesc}
                name="batchDesc"
                onChange={e => this.setState({ batchDesc: e.target.value })}
                inputStyles={{ input: cn.customHeight }}
                className={cn.top}
              />
            </div>
            <div className={cn.shortInput}>
              <CustomInput
                className={cn.align}
                label="Batch ID"
                value={batchID}
                name="batchID"
                onChange={e => this.setState({ batchID: e.target.value })}
                inputStyles={{ input: cn.customHeight }}
              />
            </div>
          </div>
          <div className={cn.divider} />
        </Typography>
        <Typography>
          <div className={cn.label}>Parameters</div>
          {params.map((param, index) => (
            <div className={cn.containerRow}>
              <div className={cn.formControl}>
                <CustomInput
                  label={`Parameter ${index} Name`}
                  value={param.value}
                  name={`name_${index}`}
                  onChange={e => this.changeName(e.target.value, index)}
                  inputStyles={{ input: cn.customHeight }}
                  className={cn.top}
                />
              </div>
              <div className={cn.formControl}>
                <CustomInput
                  className={cn.align}
                  label={`Parameter ${index} Description`}
                  value={param.description}
                  name={`desc_${index}`}
                  onChange={e => this.changeDescription(e.target.value, index)}
                  inputStyles={{ input: cn.customHeight }}
                />
              </div>
            </div>
          ))}
          <div className={cn.addMore} onClick={this.addMoreParameters}>
            <FontAwesomeIcon icon="plus" color="#818fa3" size={30} />
            <span className={cn.addMoreButton}>Add More Parameters</span>
          </div>
        </Typography>
      </CustomizedDialogs>
    );
  }
}

export default RunDefinition;
