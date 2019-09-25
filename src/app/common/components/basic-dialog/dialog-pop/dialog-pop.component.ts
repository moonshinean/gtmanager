import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DataTree, DialogModel, FromData} from '../dialog.model';
import {FormGroup} from '@angular/forms';
import {TreeNode} from '../../../model/shared-model';
import {Area, Data} from '../../../model/area-model';

@Component({
  selector: 'rbi-dialog-pop',
  templateUrl: './dialog-pop.component.html',
  styleUrls: ['./dialog-pop.component.less']
})
export class DialogPopComponent implements OnInit, OnChanges {

  @Input()
  public dialogOption: DialogModel = new DialogModel();
  @Output()
  public eventClick = new EventEmitter<any>();
  @Output()
  public blurClick = new EventEmitter<any>();
  @Input()
  public formContrl: FormGroup;
  @Input()
  public formdata: FromData[];
  @Input()
  public treeData: any;
  public dataTrees: DataTree[];
  public dataTree: DataTree = new DataTree();
  public treeDialog: boolean;
  public disable = true;
  public flag = 0;
  public esDate = {
    firstDayOfWeek: 0,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    clear: '清除'
  };
  constructor() { }

  ngOnInit() {
    // this.dialog = false;
  }
  // dialog sure
  public  SureClick(): void {
    this.eventClick.emit({type: this.dialogOption.title, value: this.formContrl, invalid: !this.formContrl.invalid});

  }
  // input click event
  public  inputData(): void {
  }
  // Close the dialog
  public  CloseClick(): void {
    this.eventClick.emit('false');
    this.flag = 0;
  }
  // Initialization tree structure
  public  dataTreeClick(): void {
    this.dataTrees = this.initializeTree(this.treeData);
    console.log(this.dataTrees);
    this.treeDialog = true;
  }
  // Tree structure is not selected
  public  treeOnNodeSelect(e): void {
    console.log(e);
  }
  // Confirm selected data
  public  dataTreeSureClick(): void {
    console.log(this.dataTree);
    this.setData(this.dataTree);
    this.treeDialog = false;
    this.flag = 0;
  }
  // The life cycle onChanges
  ngOnChanges(changes: SimpleChanges): void {
    // if (this.treeData) {
    //   this.disable = true;
    // }
    // console.log(this.formContrl);
  }
  // Tree structure initialization
  // public initializeTree(data): any {
  //
  //   const oneChild = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const childnode = new TreeNode();
  //     childnode.value = data[i].code;
  //     childnode.label = data[i].name;
  //     if (data[i].villageChoose2DTO != null && data[i].villageChoose2DTO.length !== 0 ) {
  //       childnode.children = this.initializeTree(data[i].villageChoose2DTO);
  //     } else {
  //       childnode.children = [];
  //     }
  //     oneChild.push(childnode);
  //   }
  //   return oneChild;
  //
  // }
  public  initializeTree(data): any[] {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      if (data[i].hasOwnProperty('companyName')) {
        childnode.value = data[i].companyId;
        childnode.label = data[i].companyName;
        childnode.id = 1;
      } else if (data[i].hasOwnProperty('areaName')) {
        console.log(data[i].areaName);
        childnode.value = data[i].areaCode;
        childnode.label = data[i].areaName;
        childnode.id = 2;
      } else if(data[i].hasOwnProperty('serviceAreaName')){
        childnode.value = data[i].serviceAreaId;
        childnode.label = data[i].serviceAreaName;
        childnode.id = 3;
      } else if (data[i].hasOwnProperty('storeName')) {
        childnode.value = data[i].storeId;
        childnode.label = data[i].storeName;
        childnode.id = 4;
      }
      if (data[i].hasOwnProperty('companyMngPrvcTreeList')) {
        if (data[i].companyMngPrvcTreeList != null && data[i].companyMngPrvcTreeList.length !== 0 ) {
          childnode.children = this.initializeTree(data[i].companyMngPrvcTreeList);
        }
      } else if (data[i].hasOwnProperty('companyAreaInfoList')) {
        if (data[i].companyAreaInfoList != null && data[i].companyAreaInfoList.length !== 0 ) {
          childnode.children = this.initializeTree(data[i].companyAreaInfoList);
        }
      } else  if (data[i].hasOwnProperty('serviceAreaBasisInfoList')) {
        if (data[i].serviceAreaBasisInfoList != null && data[i].serviceAreaBasisInfoList.length !== 0 ) {
          childnode.children = this.initializeTree(data[i].serviceAreaBasisInfoList);
        }
      } else if(data[i].hasOwnProperty('sysStoreList')){
        if (data[i].sysStoreList != null && data[i].sysStoreList.length !== 0 ) {
          childnode.children = this.initializeTree(data[i].sysStoreList);
        }
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
  // // 递归调用重组数据结构
  // public tableTreeInitialize(data): any {
  //   const oneChild = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const childnode = new Area();
  //     const datanode  = new Data();
  //     if (!data[i].hasOwnProperty('areaName')) {
  //       datanode.areaName  = data[i].provinceName;
  //     } else {
  //       datanode.areaName  = data[i].areaName;
  //     }
  //     if (!data[i].hasOwnProperty('areaCode')) {
  //       datanode.areaCode  = data[i].provinceId;
  //     } else  {
  //       datanode.areaCode  = data[i].areaCode;
  //     }
  //     datanode.areaLevel = data[i].areaLevel;
  //     datanode.companyName = data[i].companyName;
  //     datanode.companyPrvcId = data[i].companyPrvcId;
  //     datanode.companyLevel = data[i].companyLevel;
  //     datanode.companyId = data[i].companyId;
  //     datanode.idt = data[i].idt;
  //     childnode.data = datanode;
  //     childnode.parent = null;
  //     if (data[i].companyAreaInfoList === undefined) {
  //       childnode.children = [];
  //     } else {
  //       childnode.children = this.tableTreeInitialize(data[i].companyAreaInfoList);
  //     }
  //     oneChild.push(childnode);
  //   }
  //   return oneChild;
  // }
  // Set the value in the acquired tree
  public setData(data): void {
    if (data.id === 3) {
      this.formContrl.patchValue({serviceAreaId: data.value});
      this.formContrl.patchValue({serviceAreaName: data.label});
    } else if (data.id === 4) {
      this.formContrl.patchValue({storeId: data.value});
      this.formContrl.patchValue({storeName: data.label});
      this.formContrl.patchValue({serviceAreaId: data.parent.value});
    }
  }
  // Input loses focus event
  public  inputBlur(e): void {
    const data = {name: e , value: this.formContrl};
    this.blurClick.emit(data);
  }
  // Dropdown box change event
  public  dataChange(e, value, option): void {
    const a = {};
    option.forEach(v => {
      if (this.formContrl.value[e] === v.value) {
        a[value] = v.label;
        this.formContrl.patchValue(a);
      }
    });
    const data = {name: e , value: this.formContrl};
    this.blurClick.emit(data);
  }
}
