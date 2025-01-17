import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Address, City, District, Ward} from '../../../../../models/user';
import {UserService} from '../../user.service';
import {SnackbarService} from '../../../../../core/services/snackbar.service';
import { SnackbarModifyService } from 'src/app/core/services/snackbar-modify.service';
import {TokenService} from '../../../../../core/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent implements OnInit {
  address: any = {
    wardId: 1,
    districtAddressId: 1,
    cityAddressId: 1,
    id: 0,
    name: '',
    phone: ''
  };
  addressForm: FormGroup = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    cityAddressId: new FormControl(this.address.cityAddressId),
    districtAddressId: new FormControl(this.address.districtAddressId),
    wardId: new FormControl(this.address.wardId),
    street_Address: new FormControl('')
  });
  citys: City[] = [];
  districts: District[];
  wards: Ward[];
  constructor(private userService: UserService, private snackbarModifyService: SnackbarModifyService, private tokenService: TokenService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getAllCity();
    this.userService.$city.subscribe(res => {
      this.citys = res;
      this.userService.getDistrictByCityIdModify(1).subscribe(dis => {
        this.districts = dis.data;
        const adddress: any = {
          cityAddressId: 1,
          districtAddressId: 1
        };
        this.userService.getWardByCityIdAndDistrictIdModify(adddress).subscribe(ward => {
          this.wards = ward.data;
        });
      });
    });
  }

  submitAddress(): any {
    let name = this.addressForm.get('name').value;
    let numberPhone = this.addressForm.get('phone').value;
    let address = this.addressForm.get('street_Address').value;
    let checkName = new RegExp('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕUÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ_ ]{3,30}$');
    let checkAddress = new RegExp('^[a-zA-Z0-9_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕUÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ_ ]{3,}$');
    let checkNumberPhone = new RegExp('^[0-9]{10,12}$');
    if(checkName.test(name) && checkNumberPhone.test(numberPhone) && checkAddress.test(address)){
      const data = this.addressForm.value;
      data.userId = this.tokenService.getUserId();
      this.userService.AddAddress(data).subscribe(res => {
        if (res.success){
          this.snackbarModifyService.openMessage(res);
        }
      });
    }
    else {
      if (checkName.test(name) === false){
        this.matSnackBar.open('Tên không hợp lệ, vui lòng nhập lại!', 'Close', {
          duration: 2000
        })
      }
      if (checkNumberPhone.test(numberPhone) === false){
        this.matSnackBar.open('Số điện thoại không hợp lệ, vui lòng nhập lại!', 'Close', {
          duration: 2000
        })
      }
      if (checkAddress.test(address) === false){
        this.matSnackBar.open('Địa chỉ không hợp lệ, vui lòng nhập lại!', 'Close', {
          duration: 2000
        })
      }
    }
  }

  changeProvince(value: number): any {
    this.userService.getDistrictAndWardByCityId(value).subscribe(res => {
      this.address = res.data;
      this.userService.getDistrictByCityIdModify(this.address.cityAddressId).subscribe(dis => {
        this.districts = dis.data;
        this.userService.getWardByCityIdAndDistrictIdModify(this.address).subscribe(ward => {
          this.wards = ward.data;
          this.addressForm.patchValue({
            cityAddressId: this.address.cityAddressId,
            districtAddressId: this.address.districtAddressId,
            wardId: this.address.id
          });
          console.warn(this.address);
        });
      });
    });
  }

  changeDistrict(value: any): any {
    const address: any = {
      id: 0,
      districtAddressId: value,
      cityAddressId: this.address.cityAddressId,
    };
    // this.userService.getWardByCityIdAndDistrictId(address);
    this.userService.getWardByCityIdAndDistrictIdModify(address).subscribe(res => {
      this.wards = res.data;
  });
}
}
