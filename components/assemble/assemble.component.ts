import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { BaseService } from '../../services/base.service';

import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionAssemble, Section, SectionApp } from '../../services/section';
import { AppFilterFunc, Allowed } from '../appFilter';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'dstore-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.scss'],
})
export class AssembleComponent implements OnInit {
  server = BaseService.serverHosts.metadataServer;
  @Input() section: Section;
  @Input() assembleList: SectionAssemble[] = [];
  @Input() appFilter: AppFilterFunc = Allowed;

  constructor(
    private appService: AppService,
    private sanitizer: DomSanitizer,
    private category: CategoryService,
  ) {}
  categoryList: { [key: string]: Category };

  filter(apps: SectionApp[]) {
    return apps.filter(app => app.show && this.appFilter(app.name));
  }

  ngOnInit() {
    this.category.getList().subscribe(cs => {
      this.categoryList = cs;
    });
  }
}