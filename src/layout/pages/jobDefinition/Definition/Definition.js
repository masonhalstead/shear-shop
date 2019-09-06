import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Toolbar,
  Breadcrumbs,
  Paper,
  Tabs,
  Tab,
  FormControl,
  NativeSelect,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from '@material-ui/core';
import { CustomAppBar } from 'components/common/appBar/AppBar';
import * as Sentry from '@sentry/browser';
import { CustomInput } from 'components/common/material-input/CustomInput';
import BootstrapInput from 'components/common/bootsrapInput/BootstrapInput';
import { TableContainer } from 'components/common/table-view/TableContainer';
import { TableContent } from 'components/common/table-view/TableContent';
import cn from './Definition.module.scss';
import { configureColumns } from './columns';

class DefinitionPage extends PureComponent {
  static propTypes = {
    getProjects: PropTypes.func,
    hamburger: PropTypes.object,
    projects: PropTypes.array,
    lookups: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  };

  static getDerivedStateFromProps(props, state) {
    const filter = props.location.pathname.split('/');
    const label = filter[4].charAt(0).toUpperCase() + filter[4].slice(1);

    if (state.label !== label) {
      return { label };
    }

    return state;
  }

  options = {
    filterType: 'textField',
    selectableRows: 'none',
    search: false,
    pagination: false,
    filter: false,
    download: false,
    viewColumns: false,
    print: false,
  };

  state = {
    label: 'Unarchived',
    definitionName: '',
    dockerImage: '',
    startupCommand: '',
    description: '',
    cpu: '',
    timeout: '',
    location: 'empty',
    retries: '',
    gpu: '',
    memory: 'empty',
    method: '',
    region: 'empty',
    success: '',
    tab: 0,
    open: false,
    index: '',
    project: '',
    parameter: '',
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
    data: [
      {
        name: 'Parameter 1',
        reference_parameter: '',
        required: false,
        method: '',
        reference: '',
        default: '',
        description: '',
        id: 1,
      },
    ],
  };

  componentDidMount() {
    // const { getProjects } = this.props;
    // try {
    //   getProjects();
    // } catch (err) {
    //   // Only fires if the server is off line or the body isnt set correctly
    //   Sentry.captureException(err);
    // }
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ tab: newValue });
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

  changeReferenceParameter = referenceParameter => {
    this.setState(prevState => {
      const newItems = [...prevState.params];
      newItems[this.state.index].reference_parameter = referenceParameter;
      return { params: newItems, parameter: referenceParameter };
    });
  };

  handleClickOpen = index => {
    this.setState({ open: true, index });
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

  addMNewRow = () => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems.push({
        name: '',
        required: false,
        method: '',
        reference: '',
        default: '',
        description: '',
        id: newItems.length + 1,
      });
      return { data: newItems };
    });
  };

  secondTab = () => (
    <TableContainer style={cn.tableContainerWrapper}>
      <TableContent
        tableData={this.state.data}
        tableOptions={this.options}
        columns={this.createColumns()}
      />
      <div className={cn.addMore} onClick={this.addMNewRow}>
        <FontAwesomeIcon icon="plus" color="#818fa3" size={30} />
        <span className={cn.addMoreButton}>Add More Parameters</span>
      </div>
    </TableContainer>
  );

  saveName = (name, index) => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[index].name = name;
      return { data: newItems };
    });
  };

  saveDefault = (defaultValue, index) => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[index].default = defaultValue;
      return { data: newItems };
    });
  };

  saveDescription = (description, index) => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[index].description = description;
      return { data: newItems };
    });
  };

  changeRequired = index => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[index].required = !newItems[index].required;
      return { data: newItems };
    });
  };

  thirdTab = () => {
    const { params } = this.state;

    return (
      <>
        {params.map((param, index) => (
          <div className={cn.containerRow}>
            <CustomInput
              label={`Parameter ${index} Name`}
              value={param.value}
              name={`name_${index}`}
              onChange={e => this.changeName(e.target.value, index)}
              inputStyles={{ input: cn.inputStyles }}
              className={cn.top}
            />
            <CustomInput
              className={cn.align}
              label={`Parameter ${index} Description`}
              value={param.description}
              name={`desc_${index}`}
              onChange={e => this.changeDescription(e.target.value, index)}
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
        ))}
        <div className={cn.addMore} onClick={this.addMoreParameters}>
          <FontAwesomeIcon icon="plus" color="#818fa3" size={30} />
          <span className={cn.addMoreButton}>Add More Parameters</span>
        </div>
      </>
    );
  };

  createColumns = () =>
    configureColumns(
      this.saveName,
      this.changeRequired,
      this.saveDefault,
      this.saveDescription,
      this.handleClickOpen,
    );

  firstTab = () => {
    const {
      cpu,
      timeout,
      retries,
      location,
      gpu,
      method,
      region,
      memory,
      success,
    } = this.state;
    const {
      lookups: { locations, result_methods },
    } = this.props;

    return (
      <>
        <div className={cn.containerRow}>
          <CustomInput
            className={cn.rowPadding}
            label="CPU"
            value={cpu}
            name="cpu"
            onChange={e => this.setState({ cpu: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
          />
          <CustomInput
            type="time"
            className={cn.rowPadding}
            label="Timeout"
            value={timeout}
            name="dockerImage"
            onChange={e => this.setState({ timeout: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
          />
          <CustomInput
            className={cn.rowPadding}
            label="Max Retries"
            value={retries}
            name="retries"
            onChange={e => this.setState({ retries: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
          />
        </div>
        <div className={cn.containerRow}>
          <CustomInput
            className={cn.rowPadding}
            label="GPU"
            value={gpu}
            name="gpu"
            onChange={e => this.setState({ gpu: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
          />
          <FormControl className={cn.rowPaddingSelect}>
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
          <FormControl className={cn.rowPaddingSelect}>
            <div className={cn.label}>Result Method</div>
            <NativeSelect
              value={method}
              onChange={e => this.setState({ method: e.target.value })}
              input={<BootstrapInput name="method" id="method" />}
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
          <CustomInput
            className={cn.rowPadding}
            label="Memory GB"
            value={memory}
            name="memory"
            onChange={e => this.setState({ memory: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
          />
          <FormControl className={cn.rowPaddingSelect}>
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
          <CustomInput
            className={cn.rowPadding}
            label="Success Text"
            value={success}
            name="success"
            onChange={e => this.setState({ success: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
          />
        </div>
      </>
    );
  };

  handleChangeProject = reference => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[this.state.index].reference = 'Reference Added';
      return { data: newItems, project: reference };
    });
  };

  render() {
    const { hamburger, history } = this.props;
    const {
      label,
      definitionName,
      dockerImage,
      startupCommand,
      description,
      tab,
      open,
      project,
      parameter,
    } = this.state;
    const id = 1;
    let content = '';
    if (tab === 0) {
      content = this.firstTab();
    }
    if (tab === 1) {
      content = this.secondTab();
    }
    if (tab === 2) {
      content = this.thirdTab();
    }

    return (
      <>
        <CustomAppBar hamburger={hamburger.open}>
          <Toolbar className={cn.toolbar}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push(`/projects`);
                }}
              >
                Lynx (Prod)
              </div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push(`/projects/${id}/definitions/unarchived`);
                }}
              >
                Job Definitions
              </div>
              <div>{label}</div>
            </Breadcrumbs>
            <div className={cn.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <Paper className={cn.contentAlign}>
          <div className={cn.containerRow}>
            <div className={cn.smallItem}>
              <CustomInput
                label="Job Definition"
                value={definitionName}
                name="definitionName"
                onChange={e =>
                  this.setState({ definitionName: e.target.value })
                }
                inputStyles={{ input: cn.inputStyles }}
              />
            </div>
            <CustomInput
              label="Docker Image"
              value={dockerImage}
              name="dockerImage"
              onChange={e => this.setState({ dockerImage: e.target.value })}
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <CustomInput
            multiline
            label="Startup Command"
            value={startupCommand}
            name="startupCommand"
            onChange={e => this.setState({ startupCommand: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
            className={cn.top}
          />
          <CustomInput
            multiline
            label="Description"
            value={description}
            name="description"
            onChange={e => this.setState({ description: e.target.value })}
            inputStyles={{ input: cn.inputStyles }}
            className={cn.top}
          />
        </Paper>
        <Paper className={cn.contentAlignSecond}>
          <Paper square>
            <Tabs
              value={tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChangeTab}
            >
              <Tab label="Configurations" />
              <Tab label="Inputs" />
              <Tab label="Outputs" />
            </Tabs>
            <div className={cn.tabValue}>{content}</div>
          </Paper>
        </Paper>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={() => this.setState({ open: false })}
        >
          <DialogContent style={{ padding: '20px' }}>
            <form>
              <div className={cn.label}>Region Hint</div>
              <NativeSelect
                style={{ width: '250px', marginBottom: '10px' }}
                value={project}
                onChange={e => this.handleChangeProject(e.target.value)}
                input={<BootstrapInput name="project" id="project" />}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
              <CustomInput
                label="Parameter"
                value={parameter}
                name="referenceParameter"
                onChange={e => this.changeReferenceParameter(e.target.value)}
                inputStyles={{ input: cn.inputStyles }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ open: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.setState({ open: false })}
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  lookups: state.lookups,
  // projects: state.projects,
});

const mapDispatchToProps = {
  // getProjects: getProjectsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionPage);
