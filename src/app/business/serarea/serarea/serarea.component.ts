import { Component, OnInit } from '@angular/core';
import {SerareaService} from '../../../common/services/serarea.service';
import {environment} from '../../../../environments/environment';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {BtnOption} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';

@Component({
  selector: 'rbi-serarea',
  templateUrl: './serarea.component.html',
  styleUrls: ['./serarea.component.less']
})
export class SerareaComponent implements OnInit {

  public serareaPageOption: PagingOption = new PagingOption();
  public serareaSelect: any;
  public serareaTableOption: any;
  public btnOption: BtnOption = new BtnOption();
  constructor(
    private serareaSrv: SerareaService,
    private toolSrv: PublicMethedService,
  ) { }

  ngOnInit() {
    this.btnOption.btnlist = [
      // {label: '新增', src: 'assets/images/ic_add.png', style: {background: '#55AB7F', marginLeft: '2vw'} },
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.queryServiceAreaData();
  }

  public  queryServiceAreaData(): void {
    this.serareaSrv.queryServiceAreaDataPage({currentPage: 1, pageSize: 10, companyId: environment.companyId}).subscribe(
      value => {
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.setTableOption(value.paingQueryData.datas);
          this.serareaPageOption = {nowpage: value.paingQueryData.currentPage, row: value.paingQueryData.pageSize, total: value.paingQueryData.totalPage};
        });
      }
    );
  }
  public  selectData(e): void {
      this.serareaSelect = e;
  }
  public setTableOption(data): void {
    console.log(data);
      this.serareaTableOption = {
        width: '100%',
        header: [
          {field: 'provinceName', header: '省份名称'},
          {field: 'areaName', header: '区域名称'},
          {field: 'companyName', header: '公司名称'},
          {field: 'serviceAreaName', header: '服务区名称'},
        ],
        Content: data,
        btnHidden: false,
        // tableList: [{label: '详情', color: '#6A72A1'}]
      };
  }

  public  btnEvent(e): void {
      switch (e) {
        case '新增': break;
        case '修改': break;
        case '删除': break;
        default: break;
      }
  }
}
