import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  @Output() clickInLeftSidePanel = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onClickLeftPanel(clickedButton: string){
    this.clickInLeftSidePanel.emit(clickedButton);
  }
  
}
