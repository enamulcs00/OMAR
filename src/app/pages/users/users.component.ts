import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  closeResult: string;
  searchForm:FormGroup
  UserList:any;
  totalItems:any;
  currentPage:number = 1;
  
  itemPerPage:number = 10;
  constructor(private spinner: NgxSpinnerService, private modalService: NgbModal,public service:PagesService,private toaster: ToastrService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
       this.getUserDetails()
  }
// This is for the first modal
open1(content1) {
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
openWindowCustomClass(content3) {
  this.modalService.open(content3, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
userprofileModal(userDelete) {
  this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
userDeleteModal(userDelete) {
  this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
}
userDetailModal(userDetail) {
  this.modalService.open(userDetail, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
addUserModal(addUser) {
  this.modalService.open(addUser, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
passwordModal(password) {
  this.modalService.open(password, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
getUserDetails(){
  this.spinner.show()
  let url = '/getusers'
this.service.getApi(url).subscribe((res:any)=>{
  console.log('Get User Len',res.data.users.length)
  
  this.spinner.hide()
  if (res['success']) {
    this.UserList = res.data.users
    this.totalItems = res.data.users.length
  
  } else {
    this.totalItems = ''
    this.toaster.error(res['message'])
  }
}, error => {
  this.toaster.error(error['message'])
  this.spinner.hide()
})
}
pagination(event) {
  console.log('This event will display page number:->',event);
  this.currentPage = event;
  this.getUserDetails()
}
searchFormSubmit() {
  if (this.searchForm.value.search) {
    this.getUserDetails()
  }
}
}

