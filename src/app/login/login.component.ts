import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalStorageService} from '../common/services/local-storage.service';
import {LoginService} from '../common/services/login.service';
import {PublicMethedService} from '../common/tool/public-methed.service';

@Component({
  selector: 'rbi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
// 表单
  public myFromModule: FormGroup;
  public formUsername: any;
  public formPassword: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private localSessionStorage: LocalStorageService,
    private loginServie: LoginService,
    private toolSrv: PublicMethedService,
  ) {
  }

  ngOnInit() {
    this.myFromModule = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['' , [Validators.required]]
    });
    this.formUsername = this.myFromModule.get('userName');
    this.formPassword = this.myFromModule.get('password');
  }

//  登陆
  public onSubmit() {
    if (this.myFromModule.valid) {
      // this.myFromModule.reset({
      //   username: '',
      //   password: ''
      // });
      this.route.navigate(['/home/main']);
    } else {
      this.toolSrv.setToast('warn', '登陆失败', '请输入合法的用户名和密码');
    }
  }
}
