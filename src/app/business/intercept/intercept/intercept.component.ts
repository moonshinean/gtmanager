import { Component, OnInit } from '@angular/core';
import {BtnOption} from '../../../common/components/header-btn/headerData.model';
import {InterceptService} from '../../../common/services/intercept.service';
import {environment} from '../../../../environments/environment';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {TreeNode} from '../../../common/model/shared-model';
import {addInterceptData, modifyInterceptData} from '../../../common/model/Intercept.model';
import {error} from 'util';

@Component({
  selector: 'rbi-intercept',
  templateUrl: './intercept.component.html',
  styleUrls: ['./intercept.component.less']
})
export class InterceptComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public interceptSelect: any[] = [];
  public interceptTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public companyTree: any;
  public addIntercept: addInterceptData = new addInterceptData();
  public modifyIntercept: modifyInterceptData = new modifyInterceptData();
  constructor(
    private interceptSrv: InterceptService,
    private toolSrv: PublicMethedService
  ) { }

  ngOnInit() {
    this.btnOption.btnlist = [
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.queryInterceptData(1);
    this.getInterceptConfigInfo();
  }
  // select data （选择数据）
  public  selectData(e): void {
      this.interceptSelect = e;
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.interceptTableOption = {
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
  public queryInterceptData(data): void {
      this.interceptSrv.queryInterceptDataPage({currentPage: data, pageSize: 10, companyId: environment.companyId}).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            value.bayonetPaingQueryInfo.datas.forEach(v => {
                v.orientation = (v.orientation === 1) ? '上行' : '下行';
              }
            );
            this.setTableOption(value.bayonetPaingQueryInfo.datas);
            this.pageOption = {nowpage: value.bayonetPaingQueryInfo.currentPage, row: value.bayonetPaingQueryInfo.pageSize, total: value.bayonetPaingQueryInfo.totalPage};

          });
        }
      );
  }
  // show Intercept add Dialog
  public  showAddInterceptDialog(): void {
    this.dialogOption = {
        type: 'add',
        title: '添加信息',
        width: '800',
        dialog: true
      };
    const list = ['bayonetCode', 'serviceAreaName', 'serviceAreaId', 'orientation', 'bayonetName', 'bayonetType'];
    list.forEach(val => {
      this.form.push({key: val, disabled: false, required: true, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '卡口标识', type: 'input', name: 'bayonetCode', option: '', placeholder: '请输入卡口标识'},
      {label: '服务区名称', type: 'tree', name: 'serviceAreaName', option: '', placeholder: '请选择服务区'},
      {label: '方向', type: 'radio', name: 'orientation', option: '', placeholder: '', value: [{label: '上行', name: 'orientation', value: 1, group: 'group'}, {label: '下行', name: 'orientation', value: 2, group: 'group'}]},
      {label: '卡口名称', type: 'input', name: 'bayonetName', option: '' , placeholder: '请输入卡扣名称'},
      {label: '卡扣类型', type: 'radio', name: 'bayonetType', option: '', placeholder: '', value: [{label: '进口', name: 'bayonetType', value: 1, group: 'group1'}, {label: '出口', name: 'bayonetType', value: 2, group: 'group1'}]},
    ];
  }

  public  addInterceptRequest(data): void {
      this.toolSrv.setConfirmation('添加', '添加', () => {
        this.interceptSrv.addInterceptInfo(data).subscribe(
          value => {

            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryInterceptData(1);
              this.dialogOption.dialog = false;
            });
          }
        );
      });
  }

  public  showModifyInterceptDialog(): void {
    if (this.interceptSelect.length === 0 || this.interceptSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if (this.interceptSelect.length === 1) {
      this.modifyIntercept.bayonetId = this.interceptSelect[0].bayonetId;
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const list = ['bayonetCode', 'serviceAreaName', 'serviceAreaId', 'orientation', 'bayonetName', 'bayonetType'];
      list.forEach(val => {
        if (val === 'orientation'){
          this.form.push({key: val, disabled: false, required: true, value: (this.interceptSelect[0][val] === '上行') ? 1 : 2 });

        } else {
          this.form.push({key: val, disabled: false, required: true, value: this.interceptSelect[0][val]});

        }
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '卡口标识', type: 'input', name: 'bayonetCode', option: '', placeholder: '请输入卡口标识'},
        {label: '服务区名称', type: 'tree', name: 'serviceAreaName', option: '', placeholder: '请选择服务区'},
        {label: '方向', type: 'radio', name: 'orientation', option: '', placeholder: '', value: [{label: '上行', name: 'orientation', value: 1, group: 'group'}, {label: '下行', name: 'orientation', value: 2, group: 'group'}]},
        {label: '卡口名称', type: 'input', name: 'bayonetName', option: '' , placeholder: '请输入卡扣名称'},
        {label: '卡扣类型', type: 'radio', name: 'bayonetType', option: '', placeholder: '', value: [{label: '进口', name: 'bayonetType', value: 1, group: 'group1'}, {label: '出口', name: 'bayonetType', value: 2, group: 'group1'}]},
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }

  }

  public  modifyInterceptRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.interceptSrv.modifyInterceptInfo(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryInterceptData(1);
            this.dialogOption.dialog = false;
          });
        }
      );
    });
  }
  // btn click event  (button点击事件)
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.showAddInterceptDialog(); break;
      case '修改': this.showModifyInterceptDialog(); break;
      case '删除': this.deleteIntercept() ; break;
      default: break;
    }
  }

  // Pagination (分页)
  public  nowPageClick(e): void {
      this.queryInterceptData(e);
  }
  // delete interceot (删除卡扣)
  public  deleteIntercept(): void {
    if (this.interceptSelect.length === 1) {
     this.toolSrv.setConfirmation('删除', '删除', () => {
       this.interceptSrv.deleteIntercept({bayonetId: this.interceptSelect[0].bayonetId}).subscribe(
         value => {
           this.toolSrv.setQuestJudgment(value.status, value.message, () => {
             this.queryInterceptData(1);
           });
         }
       );
     });
    } else  {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    }
  }
  // get the bayonet configuration information  (获取卡口配置信息)
  public  getInterceptConfigInfo(): void {
      this.interceptSrv.getInterceptConfigData({companyId: environment.companyId}).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.companyTree = value.companyComboBoxTreeList;
          });
        }
      );
  }
  public eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.dialogOption.dialog = false;
      // this.addDialogOption.dialog = false;
      // this.areaSelect = [];
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            if (eKey !== 'serviceAreaName'){
              this.addIntercept[eKey] = e.value.value[eKey];
            }
          }
          console.log(this.addIntercept);
          // this.areaAddRequest();
          this.addInterceptRequest(this.addIntercept);
        } else  {
          for (const eKey in e.value.value) {
              this.modifyIntercept[eKey] = e.value.value[eKey];
          }
          this.modifyInterceptRequest(this.modifyIntercept);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
}
