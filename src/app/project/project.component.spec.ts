import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MomentModule } from 'angular2-moment/moment.module';

import { ProjectFactory } from '../tests/project-factory';
import { BuildFactory } from '../tests/build-factory';

import { ProjectComponent } from './project.component';
import { Project } from '../models/Project';
import { Build } from '../models/Build';
import { BuildStatusBadgeComponent } from '../build-status-badge/build-status-badge.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let mockProject: Project;
  let mockBuilds: Build[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent, BuildStatusBadgeComponent ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: '', component: ProjectComponent }]
        ),
        MomentModule
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {snapshot: {data: {'project': mockProject, builds: mockBuilds}}}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = undefined;
  });
  describe('when there is project and build data available', () => {
    beforeEach(() => {
      mockProject = ProjectFactory.build({name: 'coffeesnob'});
      mockBuilds = BuildFactory.buildList(2, {id: 'coffeebuild'});
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should set the project', async(() => {
      expect(component.project).toEqual(mockProject);
      expect(fixture.nativeElement.querySelector('h1')
        .textContent).toContain('coffeesnob');
    }));

    it('should set the builds', async(() => {
      expect(component.builds).toEqual(mockBuilds);
      const firstBuild = fixture.nativeElement.querySelector('.build-item');
      expect(firstBuild.textContent).toContain('coffeebuild');
    }));

    it('should detect changes upstream and update the component elements', () => {
      component.project.name = 'newsnob';
      component.builds[0].id = 'newcoffeebuild';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('h1')
        .textContent).toContain('newsnob');
      const buildElement = fixture.nativeElement.querySelector('.build-item');
      expect(buildElement.textContent).toContain('newcoffeebuild');
    });

  });

  describe('when project and build data is unavailable', () => {
    beforeEach(() => {
      mockProject = undefined;
      mockBuilds = undefined;
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should create when no project data is available', () => {
      expect(component.project).toBeUndefined();
      expect(component.builds).toBeUndefined();
    });
  });

  describe('CalculateProviderLogoClass', () => {
    let expected;

    describe('when github is the argument', () => {
      beforeEach(() => {
        expected = 'icon ion-logo-github';
      });

      it('returns a github icon', () => {
        expect(component.CalculateProviderLogoClass('github')).toEqual(expected);
      });
    });

    describe('for any other argument', () => {
      beforeEach(() => {
        expected = 'icon ion-logo-tux';
      });

      it('returns a tux icon', () => {
        expect(component.CalculateProviderLogoClass('foo')).toEqual(expected);
        expect(component.CalculateProviderLogoClass('bar')).toEqual(expected);
        expect(component.CalculateProviderLogoClass('baz')).toEqual(expected);
      });
    });
  });
});
