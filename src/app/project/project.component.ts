import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { MomentModule } from 'angular2-moment';

import { Build, Project } from '../models/project';
import { ProjectService } from '../services/project/ProjectService';
import { BuildService } from '../services/build/BuildService';
import { PROJECT_SERVICE, BUILD_SERVICE } from '../app.config';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {
  project;
  builds;

  constructor(
    @Inject(PROJECT_SERVICE) private projectService: ProjectService,
    @Inject(BUILD_SERVICE) private buildService: BuildService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.getProject(projectId);
    this.getBuilds(projectId);
  }

  getProject(projectId): void {
    this.projectService.getProject(projectId)
      .subscribe(returnedProject => {
        this.project = returnedProject;
      },
      error => console.error(error));
  }

  getBuilds(projectId): void {
    this.buildService.getBuilds(projectId)
      .subscribe(returnedBuilds => {
        this.builds = returnedBuilds;
      },
      error => console.error(error));
  }

  calculateProviderLogoClass(buildProvider) {
    switch (buildProvider) {
      case 'github':
        return 'icon ion-logo-github';
      default:
        return 'icon ion-logo-tux';
    }
  }
}