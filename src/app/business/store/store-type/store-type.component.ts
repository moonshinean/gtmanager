import { Component, OnInit } from '@angular/core';
import {BtnOption} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {StoreService} from '../../../common/services/store.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {environment} from '../../../../environments/environment';
import {StoreTypeService} from '../../../common/services/store-type.service';

@Component({
  selector: 'rbi-store-type',
  templateUrl: './store-type.component.html',
  styleUrls: ['./store-type.component.less']
})
export class StoreTypeComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public storeTypeSelect: any[] = [];
  public storeTypeTableOption: any;
  public pageOption: PagingOption = new PagingOption();

  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public companyOption: any[] = [];
  public orientationOption = [
    {label: '上行', value: 1},
    {label: '下行', value: 2}
  ];
  public storeTypeTypeOption = [
    {label: '餐饮', value: 1},
    {label: '汽修', value: 2}
  ];

  constructor(
    private storeTypeSrv: StoreTypeService,
    private toolSrv: PublicMethedService
  ) { }

  ngOnInit() {
    this.btnOption.btnlist = [
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.querystoreTypeData(1);
    this.getstoreTypeConfigInfo();
  }
  // select data （选择数据）
  public  selectData(e): void {
    this.storeTypeSelect = e;
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.storeTypeTableOption = {
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
  public querystoreTypeData(data): void {
    this.storeTypeSrv.queryStoreTypeDataPage({currentPage: data, pageSize: 10, companyId: environment.companyId}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.setTableOption(value.paingQueryData.datas);
          this.pageOption = {nowpage: value.paingQueryData.currentPage, row: value.paingQueryData.pageSize, total: value.paingQueryData.totalPage};

        });
      }
    );
  }
  public  showAddStoreTypeDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['storeTypeName', 'orientation', 'storeTypeTypeId', 'manage', 'manageTelephone'];
    list.forEach(val => {
      this.form.push({key: val, disabled: false, required: true, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '公司名称', type: 'dropdown', name: 'storeTypeName', option: this.companyOption, placeholder: '请选择公司'},
      {label: '上下行', type: 'dropdown', name: 'orientation', option: this.orientationOption, placeholder: '请选择上下行'},
      {label: '店铺类型', type: 'dropdown', name: 'storeTypeTypeId', option: this.storeTypeTypeOption, placeholder: '请选择店铺类型'},
      {label: '管理人', type: 'input', name: 'manage', option: '', placeholder: '请输入管理人姓名'},
      {label: '管理人电话', type: 'input', name: 'manageTelephone', option: '', placeholder: '请输入管理人电话'},
    ];
  }

  public  addStoreTypeRequest(data): void {
    // this.toolSrv.setConfirmation('修改', '修改', () => {
    //   this.interceptSrv.modifyInterceptInfo(data).subscribe(
    //     value => {
    //       console.log(value);
    //       this.toolSrv.setQuestJudgment(value.status, value.message, () => {
    //         this.queryInterceptData(1);
    //         this.dialogOption.dialog = false;
    //       });
    //     }
    //   );
    // });
  }
  // btn click event  (button点击事件)
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.showAddStoreTypeDialog(); break;
      case '修改': break;
      case '删除': this.deletestoreType() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.querystoreTypeData(e);
  }
  // delete interceot (删除卡扣)
  public  deletestoreType(): void {
    if (this.storeTypeSelect.length === 1) {
      // this.storeTypeSrv.deletestoreType({bayonetId: this.storeTypeSelect[0].bayonetId}).subscribe(
      //   value => {
      //     this.toolSrv.setQuestJudgment(value.status, value.message, () => {
      //
      //     });
      //   }
      // );
    } else  {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    }
  }
  // get the bayonet configuration information  (获取卡口配置信息)
  public  getstoreTypeConfigInfo(): void {
    // this.storeTypeSrv.querystoreTypeConfiginfo({companyId: environment.companyId}).subscribe(
    //   value => {
    //     console.log(value);
    //     this.toolSrv.setQuestJudgment(value.status, value.message, () => {
    //       value.companyComboBoxTreeList.forEach(v => {
    //         this.companyOption.push({label: v.companyName, value: v.companyId});
    //       });
    //     });
    //   }
    // );
  }

  public  eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.dialogOption.dialog = false;
      // this.addDialogOption.dialog = false;
      // this.areaSelect = [];
    } else {
      if (e.invalid) {
        console.log(e.type === '添加信息');
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            // this.addArea[eKey] = e.value.value[eKey];
          }
          // this.areaAddRequest();
        } else  {
          for (const eKey in e.value.value) {
            //   if (e.value.value[eKey] === '') {
            //     if (eKey === 'provinceId') {
            //       this.modifyArea[eKey] = this.areaSelect[0].parent.data['areaCode'];
            //
            //     }else {
            //       this.modifyArea[eKey] = this.areaSelect[0].data[eKey];
            //
          }
          //   } else  {
          //     this.modifyArea[eKey] = e.value.value[eKey];
          //
          //   }
          // }
          // this.areaModifyRequest();
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
}
