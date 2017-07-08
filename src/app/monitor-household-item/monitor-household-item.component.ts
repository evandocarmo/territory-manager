import { Component, Input } from '@angular/core';


export interface House {
  FULL_ADDRESS?;
  LANGUAGE?;
}

@Component({
  selector: 'monitor-household-item',
  templateUrl: './monitor-household-item.component.html',
  styleUrls: ['./monitor-household-item.component.css']
})
export class MonitorHouseholdItemComponent {
  @Input()
  house: House;
  
  constructor() { }

}
