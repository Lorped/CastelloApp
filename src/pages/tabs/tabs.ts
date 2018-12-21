import { Component } from '@angular/core';

import { LogPage } from '../log/log';
import { OggettiPage } from '../oggetti/oggetti';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OggettiPage;
  tab3Root = LogPage;

  constructor() {

  }
}
