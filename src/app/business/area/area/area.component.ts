import { Component, OnInit } from '@angular/core';
import {AreaService} from '../../../common/services/area.service';
import {environment} from '../../../../environments/environment';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {Area, Data} from '../../../common/model/area-model';
import {PagingOption} from '../../../common/components/paging/paging.model';

@Component({
  selector: 'rbi-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.less']
})
export class AreaComponent implements OnInit {

  public areaSelect: any;
  public areaTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  constructor(
    private areaSrv: AreaService,
    private toolSrv: PublicMethedService,
  ) {
  }

  ngOnInit() {
    // this.areaSrv.getAreaBaasicData({companyId: environment.companyId}).subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // );
    this.areaInitialization();
  }
  public  areaInitialization(): void {
     this.queryAreaDataPage(1);
     this.queryAreaBasicData();
  }

  // select table  data
  public selectData(e): void {
    this.areaSelect = e;
  }

  // query area data page
  public queryAreaDataPage(data): void {
    this.areaSrv.queryAreaDataPage({pageSize: 10, currentPage: data, companyId: environment.companyId}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.setTableOption(this.tableTreeInitialize(value.paingQueryData.datas));
          this.pageOption = {nowpage: value.paingQueryData.currentPage, row: value.paingQueryData.pageSize, total:value.paingQueryData.totalPage};
        });
        // this.setTableOption(value)
      });
  }
  // quera area basic data
  public  queryAreaBasicData(): void {
    this.areaSrv.getAreaBaasicData({companyId: environment.companyId}).subscribe(
      value => {
        console.log(value);
      });
  }
  // set table option
  public  setTableOption(data): void {
    console.log(data);
    this.areaTableOption = {
      width: '100%',
      header: [
        {field: 'areaName', header: '区域名称'},
        {field: 'companyName', header: '公司名称'},
        {field: 'companyLevel', header: '公司级别'},
        {field: 'idt', header: '添加时间'},
      ],
      Content: data,
      btnHidden: false,
      // tableList: [{label: '详情', color: '#6A72A1'}]
    };
  }

  // 递归调用重组数据结构
  public tableTreeInitialize(data): any {
    console.log(data);
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      console.log(i);
      const childnode = new Area();
      const datanode  = new Data();
       console.log(data[i].hasOwnProperty('areaName'));
       if (!data[i].hasOwnProperty('areaName')) {
         datanode.areaName  = data[i].provinceName;
       } else {
         datanode.areaName  = data[i].areaName;
       }
       if (!data[i].hasOwnProperty('areaCode')) {
         datanode.areaCode  = data[i].provinceId;
       } else  {
         datanode.areaCode  = data[i].areaCode;
       }
      datanode.areaLevel = data[i].areaLevel;
      datanode.companyName = data[i].companyName;
      datanode.companyPrvcId = data[i].companyPrvcId;
      datanode.companyLevel = data[i].companyLevel;
      datanode.companyId = data[i].companyId;
      datanode.idt = data[i].idt;
      childnode.data = datanode;
      if (data[i].companyAreaInfoList === undefined) {
        childnode.children = [];
      } else {
        childnode.children = this.tableTreeInitialize(data[i].companyAreaInfoList);
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
}
