import { ApiBuildService } from '../app/services/build/api-build.service';
import { ApiProjectService } from '../app/services/project/api-project.service';

export const environment = {
  production: true,
  routeDebugging: false,

  buildServiceType: ApiBuildService,
  projectServiceType: ApiProjectService
};
