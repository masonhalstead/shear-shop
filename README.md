# ANDROMEDA 

## AUTHENTICATION API ENDPOINTS

### POST
/authentication/login

## CONTAINER API ENDPOINTS

### GET
/containers/:container_id
/containers/:container_id/get_log
/containers/:container_id/stdout_contents

## JOBS API ENDPOINTS

### GET
/jobs/list
/jobs/:job_id
/jobs/:job_id/get_log
/jobs/:job_id/model_version
/jobs/:job_id/files/stdout
/jobs/:job_id/files/list
/jobs/:job_id/containers/current
/jobs/:job_id/containers/list
/jobs/:job_id/job_state_id
/jobs/:job_id/state
/jobs/:job_id/stop

### POST
/jobs/create
/jobs/run_command
/jobs/run_python
/jobs/:job_id/parameters
/jobs/:job_id/parameters/:parameter_name

## JOB DEFINITIONS API ENDPOINTS

### GET
/job_definitions/list
/job_definitions/public_list
/job_definitions/:job_definition_id
/job_definitions/:job_definition_id/parameters
/job_definitions/:job_definition_id/parameters/:parameter_name
/job_definitions/:job_definition_id/archive
/job_definitions/:job_definition_id/unarchive

### POST
/job_definitions/create
/job_definitions/update
/job_definitions/get_job_definition_id
/job_definitions/:job_definition_id/update
/job_definitions/:job_definition_id/jobs/list
/job_definitions/:job_definition_id/parameters/:parameter_name/create
/job_definitions/:job_definition_id/parameters/:parameter_name/update
/job_definitions/:job_definition_id/parameters/:parameter_name/delete

## PROJECTS API ENDPOINTS

### GET
/projects/list
/projects/:project_id
/projects/:project_id/delete
/projects/:project_id/jobs/list
/projects/:project_id/batches/list
/projects/:project_id/batch_definitions/list
/projects/:project_id/batch_definitions/archived_list
/projects/:project_id/job_definitions/list
/projects/:project_id/job_definitions/archived_list
/projects/:project_id/scheduled_batches/list
/projects/:project_id/scheduled_batches/archived_list
/projects/:project_id/files/list
/projects/:project_id/models/list
/projects/:project_id/models/formatted_list
/projects/:project_id/parameters
/projects/:project_id/parameters/:parameter_name

### POST
/projects/get_project_id
/projects/create
/projects/:project_id
/projects/:project_id/rename
/projects/:project_id/jobs/list_for_parameter
/projects/:project_id/jobs/query_list
/projects/:project_id/batches/list_for_parameter
/projects/:project_id/parameters/:parameter_name/create
/projects/:project_id/parameters/:parameter_name/update
/projects/:project_id/parameters/:parameter_name/delete

## BATCHES API ENDPOINTS

### GET
/batches/:batch_id
/batches/list
/batches/:batch_id/jobs/list
/batches/:batch_id/parameters
/batches/:batch_id/parameters/:parameter_name

### POST
/batches/create
/batches/get_batch_id
/batches/:batch_id/parameters/:parameter_name/create
/batches/:batch_id/parameters/:parameter_name/update
/batches/:batch_id/parameters/:parameter_name/delete

## MODELS API ENDPOINTS

### GET
/models/:model_id
/models/:model_id/model_versions/list
/models/:model_id/model_versions/formatted_list
/models/:model_id/hidden_layers/list
/models/:model_id/hidden_layers/clear
/models/:model_id/hidden_layers/:layer_id
/models/:model_id/hidden_layers/:layer_id/delete
/models/:model_id/hyperparameter_searches/list
/models/:model_id/hyperparameter_searches/:version
/models/:model_id/metrics/list
/models/:model_id/metrics/clear
/models/:model_id/metrics/:metric_id/create
/models/:model_id/metrics/:metric_id/delete

### POST
/models/create
/models/get_model_id
/models/:model_id/fit
/models/:model_id/update
/models/:model_id/subscribe
/models/:model_id/unsubscribe
/models/:model_id/model_versions/create
/models/:model_id/hidden_layers/create
/models/:model_id/hidden_layers/:layer_id/update
/models/:model_id/hyperparameter_searches/create