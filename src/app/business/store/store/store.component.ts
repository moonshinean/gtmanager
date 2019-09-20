import { Component, OnInit } from '@angular/core';
import {BtnOption} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {StoreService} from '../../../common/services/store.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {environment} from '../../../../environments/environment';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {AddStore, ModifyStore} from '../../../common/model/store.model';

@Component({
  selector: 'rbi-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less']
})
export class StoreComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public storeSelect: any[] = [];
  public storeTableOption: any;
  public pageOption: PagingOption = new PagingOption();

  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public companyOption: any[] = [];
  public addStore: AddStore = new AddStore();
  public modifyStore: ModifyStore = new ModifyStore();
  public storeTypeOption = [
    {label: '餐饮', value: 1},
    {label: '汽修', value: 2}
  ];

  constructor(
    private storeSrv: StoreService,
    private toolSrv: PublicMethedService
  ) { }

  ngOnInit() {
    this.btnOption.btnlist = [
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.querystoreData(1);
    this.getstoreConfigInfo();
  }
  // select data （选择数据）
  public  selectData(e): void {
    this.storeSelect = e;
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.storeTableOption = {
      width: '100%',
      header: [
        {field: 'areaCode', header: '区域编号'},
        {field: 'areaName', header: '区域名称'},
        {field: 'serviceAreaName', header: '服务区名称'},
        {field: 'bayonetName', header: '卡口名称'},
        {field: 'orientation', header: '服务区方向'},
        {field: 'idt', header: '添加时间'},
      ],
      Content: data,
      btnHidden: false,
    };
  }
  // Paging query (分页查询)
  public querystoreData(data): void {
    this.storeSrv.queryStoreDataPage({currentPage: data, pageSize: 10, companyId: environment.companyId}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.setTableOption(value.paingQueryData.datas);
          this.pageOption = {nowpage: value.paingQueryData.currentPage, row: value.paingQueryData.pageSize, total: value.paingQueryData.totalPage};
        });
      }
    );
  }
  public  showAddDialog(): void {
    this.dialogOption = {
        type: 'add',
        title: '添加信息',
        width: '800',
        dialog: true
      };
    const list = ['storeName', 'orientation', 'storeTypeId', 'manage', 'manageTelephone'];
    list.forEach(val => {
        this.form.push({key: val, disabled: false, required: true, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '店铺名称', type: 'input', name: 'storeName', option: '', placeholder: '请输入店铺名称'},
      {label: '方向', type: 'radio', name: 'orientation', option: '', placeholder: '', value: [{label: '上行', name: 'orientation', value: 1, group: 'group'}, {label: '下行', name: 'orientation', value: 2, group: 'group'}]},
      {label: '店铺类型', type: 'dropdown', name: 'storeTypeId', option: this.storeTypeOption, placeholder: '请选择店铺类型'},
      {label: '管理人', type: 'input', name: 'manage', option: '', placeholder: '请输入管理人姓名'},
      {label: '管理人电话', type: 'input', name: 'manageTelephone', option: '', placeholder: '请输入管理人电话'},
    ];
  }

  public  addStoreRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.storeSrv.addStoreInfo(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.querystoreData(1);
            this.dialogOption.dialog = false;
            this.storeSelect = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }
  public  showModifyStoreDialog(): void {
      if (this.storeSelect.length === 0 || this.storeSelect.length === undefined) {
        this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
      } else if ( this.storeSelect.length === 1) {
        this.dialogOption = {
          type: 'add',
          title: '修改信息',
          width: '800',
          dialog: true
        };
        const list = ['storeName', 'orientation', 'storeTypeId', 'manage', 'manageTelephone'];
        list.forEach(val => {
          this.form.push({key: val, disabled: false, required: true, value: this.storeSelect[0][val]});
        });
        this.formgroup = this.toolSrv.setFormGroup(this.form);
        this.formdata = [
          {label: '公司名称', type: 'dropdown', name: 'storeName', option: this.companyOption, placeholder: '请选择公司'},
          {label: '方向', type: 'radio', name: 'orientation', option: '', placeholder: '', value: [{label: '上行', name: 'orientation', value: 1, group: 'group'}, {label: '下行', name: 'orientation', value: 2, group: 'group'}]},
          {label: '店铺类型', type: 'dropdown', name: 'storeTypeId', option: this.storeTypeOption, placeholder: '请选择店铺类型'},
          {label: '管理人', type: 'input', name: 'manage', option: '', placeholder: '请输入管理人姓名'},
          {label: '管理人电话', type: 'input', name: 'manageTelephone', option: '', placeholder: '请输入管理人电话'},
        ];
      } else {
        this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
      }
  }

  public  modifyStoryRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.storeSrv.updateStoreInfo(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.querystoreData(1);
            this.dialogOption.dialog = false;
            this.storeSelect = [];
            this.formgroup.reset();

            // this.formdata = [];
          });
        }
      );
    });
  }
  // btn click event  (button点击事件)
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.showAddDialog(); break;
      case '修改': this.showModifyStoreDialog(); break;
      case '删除': this.deletestore() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.querystoreData(e);
  }
  // delete storeInfo (删除卡扣)
  public  deletestore(): void {
    if (this.storeSelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.storeSrv.deleteStoreInfo({storeId: this.storeSelect[0].storeId}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.querystoreData(1);
              // this.formgroup.reset();
              this.storeSelect = [];
            });
          }
        );
      });
    } else  {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    }
  }
  // get the bayonet configuration information  (获取卡口配置信息)
  public  getstoreConfigInfo(): void {
    this.storeSrv.queryStoreConfiginfo({companyId: environment.companyId}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          value.companyComboBoxTreeList.forEach(v => {
            this.companyOption.push({label: v.companyName, value: v.companyId});
          });
        });
      }
    );
  }

  public  eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.dialogOption.dialog = false;
      // this.addDialogOption.dialog = false;
      this.storeSelect = [];
      this.formdata = [];
    } else {
      if (e.invalid) {
        console.log(e.type === '添加信息');
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            // this.addArea[eKey] = e.value.value[eKey];
            this.addStore[eKey] = e.value.value[eKey];
          }
          console.log(this.addStore);
          this.addStoreRequest(this.addStore);
          // this.areaAddRequest();
        } else  {
          for (const eKey in e.value.value) {
                this.modifyStore[eKey] = e.value.value[eKey];
              }
          console.log(this.modifyStore);
          this.modifyStoryRequest(this.modifyStore);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
}
