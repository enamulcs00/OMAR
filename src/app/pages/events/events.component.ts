import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }
  
  eventDeleteModal(eventDelete) {
    this.modalService.open(eventDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
}
