import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BtnList, BtnOption} from '../headerData.model';
import {TreeNode} from '../../../model/shared-model';
import {DataTree} from '../../basic-dialog/dialog.model';

@Component({
  selector: 'rbi-basic-btn',
  templateUrl: './basic-btn.component.html',
  styleUrls: ['./basic-btn.component.less']
})
export class BasicBtnComponent implements OnInit {

  @Input()
  public btnOption: BtnOption;
  @Output()
  public event = new EventEmitter<any>();
  @Output()
  public searchEvent = new EventEmitter<any>();
  @Input()
  public treeData: any;
  public dataTrees: DataTree[];
  public dataTree: DataTree = new DataTree();
  public treeDialog: boolean;
  public ServiceName: any;
  constructor() { }
  ngOnInit() {
  }

  public  eventClick(e): void {
     this.event.emit(e);
  }
  // public  SearchClick(): void {
  //     this.searchEvent.emit({type: this.searchType, value: this.serchData});
  // }
  public  initializeTree(data): any[] {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      if (data[i].hasOwnProperty('companyName')) {
        childnode.value = data[i].companyId;
        childnode.label = data[i].companyName;
        childnode.id = 1;
        if(childnode.value === 0) {
          childnode.selectable = true;
        } else {
          childnode.selectable = false;
        }
      } else if (data[i].hasOwnProperty('areaName')) {
        console.log(data[i].areaName);
        childnode.value = data[i].areaCode;
        childnode.label = data[i].areaName;
        childnode.id = 2;
        childnode.selectable = false;
      } else if(data[i].hasOwnProperty('serviceAreaName')){
        childnode.value = data[i].serviceAreaId;
        childnode.label = data[i].serviceAreaName;
        childnode.id = 3;
        childnode.selectable = true;
      } else if (data[i].hasOwnProperty('storeName')) {
        childnode.value = data[i].storeId;
        childnode.label = data[i].storeName;
        childnode.id = 4;
        childnode.selectable = true;
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
      } else if (data[i].hasOwnProperty('sysStoreList')) {
        if (data[i].sysStoreList != null && data[i].sysStoreList.length !== 0 ) {
          childnode.children = this.initializeTree(data[i].sysStoreList);
        }
      }else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }

  public  dataTreeSureClick(): void {
    console.log(this.dataTree);
    this.setData(this.dataTree);
    this.treeDialog = false;
  }

  public setData(data): void {
    this.ServiceName = data.label;
    this.searchEvent.emit(data.value);
  }
  public  showDataTree(): void {
    this.dataTrees = this.initializeTree(this.treeData);
    console.log(this.dataTrees);
    this.treeDialog = true;
  }
}
