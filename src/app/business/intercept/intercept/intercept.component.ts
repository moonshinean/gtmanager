import { Component, OnInit } from '@angular/core';
import {BtnOption} from '../../../common/components/header-btn/headerData.model';
import {InterceptService} from '../../../common/services/intercept.service';
import {environment} from '../../../../environments/environment';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {PagingOption} from '../../../common/components/paging/paging.model';

@Component({
  selector: 'rbi-intercept',
  templateUrl: './intercept.component.html',
  styleUrls: ['./intercept.component.less']
})
export class InterceptComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public interceptSelect: any;
  public interceptTableOption: any;
  public pageOption: PagingOption = new PagingOption();
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
          this.toolSrv.setQuestJudgment(value.status, value.message, () =>{
            this.setTableOption(value.bayonetPaingQueryInfo.datas);
            this.pageOption = {nowpage: value.bayonetPaingQueryInfo.currentPage, row: value.bayonetPaingQueryInfo.pageSize, total: value.bayonetPaingQueryInfo.totalPage};

          });
        }
      );
  }
  // btn click event  (button点击事件)
  public  btnEvent(e): void {
    switch (e) {
      case '新增': break;
      case '修改': break;
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
      this.interceptSrv.deleteIntercept({bayonetId: this.interceptSelect[0].bayonetId}).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {

          })
        }
      );
    }else  {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    }
  }
  //get the bayonet configuration information  (获取卡口配置信息)
  public  getInterceptConfigInfo(): void {
      this.interceptSrv.getInterceptConfigData({companyId: environment.companyId}).subscribe(
        value => {
          console.log(value);
        }
      );
  }
}
