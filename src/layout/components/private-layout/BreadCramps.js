import { Dropdown } from 'components/dropdowns/Dropdown';
import React from 'react';

export const ProjectBread = ({
  projects,
  handleOnSelectFilterProject,
  route,
}) => {
  let projectName = '';
  if (projects.length > 0) {
    projectName = projects.filter(
      filter => filter.project_id === Number(route[2]),
    )[0].project_name;
  }
  return (
    <Dropdown
      rows={projects}
      row_key="project_name"
      value={projectName}
      placeholder="Optional Placeholder"
      right_icon="chevron-down"
      handleOnSelect={handleOnSelectFilterProject}
    />
  );
};

export const JobFilterBread = ({
  filtersJob,
  handleOnSelectFilterJob,
  route,
}) => {
  let label = 'Last 24 Hours';

  if (route[4] === '7') {
    label = 'Last 7 Days';
  }
  if (route[4] !== '24' && route[4] !== '7') {
    label = route[4].charAt(0).toUpperCase() + route[4].slice(1);
  }
  return (
    <Dropdown
      rows={filtersJob}
      row_key="name"
      value={label}
      placeholder="Optional Placeholder"
      right_icon="chevron-down"
      handleOnSelect={handleOnSelectFilterJob}
    />
  );
};

export const JobBread = ({ handleOnSelectFilterOneJob, jobs, route }) => {
  let jobName = '';
  if (jobs.length > 0) {
    jobName = jobs.filter(
      filter => filter.job_definition_id === Number(route[5]),
    )[0].job_definition_name;
  }
  return (
    <Dropdown
      rows={jobs}
      row_key="name"
      value={jobName}
      placeholder="Optional Placeholder"
      right_icon="chevron-down"
      handleOnSelect={handleOnSelectFilterOneJob}
    />
  );
};

export const DefinitionFilter = ({
  route,
  handleOnSelectFilterDefinition,
  filtersDefinition,
}) => {
  const label = route[4].charAt(0).toUpperCase() + route[4].slice(1);

  return (
    <Dropdown
      rows={filtersDefinition}
      row_key="name"
      value={label}
      placeholder="Optional Placeholder"
      right_icon="chevron-down"
      handleOnSelect={handleOnSelectFilterDefinition}
    />
  );
};

export const DefinitionsList = ({definitions, handleOnSelectFilterDefinitionsList, route}) => {
  let definitionName = '';
  if (definitions.length > 0) {
    definitionName = definitions.filter(
      filter => filter.job_definition_id === Number(route[6]),
    )[0].job_definition_name;
  }
  return (
    <Dropdown
      rows={definitions}
      row_key="job_definition_name"
      value={definitionName}
      placeholder="Optional Placeholder"
      right_icon="chevron-down"
      handleOnSelect={handleOnSelectFilterDefinitionsList}
    />
  );
};
