import {Component, OnInit} from '@angular/core';
import {EncryptionService} from "../../../shared/services/encryption.service";
import {StorageService} from "../../../shared/services/storage.service";
import {TokenData} from "../../../models/ResponseObject.model";
import {UserService} from "../../../shared/services/api/user/user.service";
import {User} from "../../../models/User.model";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;

  constructor(private storageService: StorageService, private userService: UserService) {
  }

  ngOnInit() {

    // this.storageService.getTokenAsObservable().subscribe(async token => {
    //   console.log(token);
    //   const result: TokenData = await jwt_decode(token);
    //   console.log(result)
    //   this.userService.getUser(result.user_id).subscribe(responseData => {
    //     this.user = responseData.data;
    //     console.log(this.user);
    //   })
    // })

    const token = this.storageService.getToken()
    const result: TokenData = jwt_decode(token);
    this.userService.getUser(result.user_id).subscribe(responseData => {
      this.user = responseData.data;
      console.log(this.user);
    })

  }

}
