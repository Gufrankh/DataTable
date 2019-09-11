import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatIconModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { DataServiceService } from '../service/data-service.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators } from '@angular/forms';
import { Region } from '../region';

@Component({
  selector: 'app-combined',
  templateUrl: './combined.component.html',
  styleUrls: ['./combined.component.css']
})
export class CombinedComponent implements OnInit {
  addNewRegion: Region[] = [
    { region_ID: null, region_Name: null, region_ISO_Code: null, region_Description: null, region_Level: null, parent_Level: null, created_By: null, creation_Date: null, modified_By: null, modified_On: null }
  ];
  showTable: boolean;
  statusMessage: string;
  dataSourceAddRegion: any;
  newRegion: Region;
  idFilter = new FormControl('');
  nameFilter = new FormControl('');
  isoFilter = new FormControl('');
  descriptionFilter = new FormControl('');
  levelFilter = new FormControl('');
  parentLevelFilter = new FormControl('');
  MyDataSource: any;
  displayedColumnsAddRegion: string[] = ['region_Name', 'region_ISO_Code', 'region_Description', 'region_Level', 'parent_Level', 'Save', 'Cancel'];
  displayedColumnsNames: string[] = ['Region ID', 'Region Name', 'Region ISO Code ', 'Region Description', 'Region Level', 'Parent Level', 'Creation Date', 'Created By', 'Modified On', 'Modified By', 'Action '];
  displayedColumns = ['region_ID', 'region_Name', 'region_ISO_Code', 'region_Description', 'region_Level', 'parent_Level', 'creation_Date', 'created_By', 'modified_On', 'modified_By', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSaved = false;
  searchKey: string;

  constructor(public dataService: DataServiceService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.RenderDataTable();
    this.dataSourceAddRegion = new MatTableDataSource();
  }
  filterValues = {
    region_Name: '',
    region_ID: '',
    region_ISO_Code: '',
    region_Description: '',
    region_Level: '',
    parent_Level: ''
  };
  ngOnInit() {

    this.RenderDataTable();
    this.dataSourceAddRegion = new MatTableDataSource();
    this.idFilter.valueChanges
      .subscribe(
        region_ID => {
          this.filterValues.region_ID = region_ID;
          this.MyDataSource.filter = JSON.stringify(this.filterValues);
          this.MyDataSource.filterPredicate = this.createFilter();
        }
      )
    this.nameFilter.valueChanges
      .subscribe(
        region_Name => {
          this.filterValues.region_Name = region_Name;
          this.MyDataSource.filter = JSON.stringify(this.filterValues);
          this.MyDataSource.filterPredicate = this.createFilter();
        }
      )
    this.isoFilter.valueChanges
      .subscribe(
        region_ISO_Code => {
          this.filterValues.region_ISO_Code = region_ISO_Code;
          this.MyDataSource.filter = JSON.stringify(this.filterValues);
          this.MyDataSource.filterPredicate = this.createFilter();
        }
      )
    this.descriptionFilter.valueChanges
      .subscribe(
        region_Description => {
          this.filterValues.region_Description = region_Description;
          this.MyDataSource.filter = JSON.stringify(this.filterValues);
          this.MyDataSource.filterPredicate = this.createFilter();
        }
      )

    this.levelFilter.valueChanges
      .subscribe(
        region_Level => {
          this.filterValues.region_Level = region_Level;
          this.MyDataSource.filter = JSON.stringify(this.filterValues);
          this.MyDataSource.filterPredicate = this.createFilter();
        }
      )
    this.parentLevelFilter.valueChanges
      .subscribe(
        parent_Level => {
          this.filterValues.parent_Level = parent_Level;
          this.MyDataSource.filter = JSON.stringify(this.filterValues);
          this.MyDataSource.filterPredicate = this.createFilter();
        }
      )
  }

  editUser(region: Region) {
    this.dataService.updateRegion(region.region_ID, region).subscribe(data => {
      this.statusMessage = 'User ' + region.region_ID + ' is updated',
        //  this.openSnackBar(this.statusMessage, "Success");
        this.RenderDataTable();
    },
      error => {
        this.openSnackBar(error.statusText, "Error");
      }
    );
  }
  saveRegion(region: Region) {
    region.region_ID = null;
    console.log(region);
    if (region.region_Name != null && region.region_ISO_Code != null && region.region_Description != null && region.region_Level != null && region.parent_Level != null) {
      this.dataService.createUser(region).subscribe(data => {
        this.statusMessage = 'Region ' + region.region_Name + ' is added',
          this.showTable = false;
        this.openSnackBar(this.statusMessage, "Success");
        this.RenderDataTable();
      },
        error => {
          this.showTable = false;
          this.openSnackBar(error.statusText, "Error");
        }
      );
    }
    else {
      this.openSnackBar("Please enter correct data", "Error")
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  show() {
    this.showTable = true;
    this.addNewRegion = [
      { region_ID: null, region_Name: null, region_ISO_Code: null, region_Description: null, region_Level: null, parent_Level: null, created_By: null, creation_Date: null, modified_By: null, modified_On: null }
    ];

  }
  cancel() {
    this.showTable = false;
  }

  region_Name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.region_Name.hasError('required') ? 'You must enter a value' :
      this.region_Name.hasError('region_Name') ? 'Not a valid name' : '';
  }

  region_ISO_Code = new FormControl('', [Validators.required]);

  isoGetErrorMessage() {
    return this.region_ISO_Code.hasError('required') ? 'You must enter a value' :
      this.region_ISO_Code.hasError('region_ISO_Code') ? 'Not a valid Iso code' : '';
  }
  region_Description = new FormControl('', [Validators.required]);
  desGetErrorMessage() {
    return this.region_Description.hasError('required') ? 'You must enter a value' :
      this.region_Description.hasError('region_Description') ? 'Not a valid Region Description' : '';
  }

  region_Level = new FormControl('', [Validators.required]);

  regionLevelGetErrorMessage() {
    return this.region_Level.hasError('required') ? 'You must enter a value' :
      this.region_Level.hasError('region_Level') ? 'Not a valid region level' : '';
  }


  parent_Level = new FormControl('', [Validators.required]);

  parentLevelGetErrorMessage() {
    return this.parent_Level.hasError('required') ? 'You must enter a value' :
      this.parent_Level.hasError('parent_Level') ? 'Not a valid parent level' : '';
  }
  onSubmit(newRegion: Region) {
    this.newRegion = new Region();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.region_Name.toLowerCase().indexOf(searchTerms.region_Name) !== -1
        && data.region_ID.toString().toLowerCase().indexOf(searchTerms.region_ID) !== -1
        && data.region_ISO_Code.toLowerCase().indexOf(searchTerms.region_ISO_Code) !== -1
        && data.region_Description.toLowerCase().indexOf(searchTerms.region_Description) !== -1
        && data.region_Level.toString().toLowerCase().indexOf(searchTerms.region_Level) !== -1
        && data.parent_Level.toString().toLowerCase().indexOf(searchTerms.parent_Level) !== -1

    }
    return filterFunction;
  }
  RenderDataTable() {
    this.dataService.GetAllTodos()
      .subscribe(
        res => {
          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = res;
          this.dataSourceAddRegion = new MatTableDataSource(this.addNewRegion);
          this.MyDataSource.sort = this.sort;
          this.MyDataSource.paginator = this.paginator;
        },
        error => {
          console.log('There was an error while retrieving Todos !!!' + error);
        });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.MyDataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getTotalCost() {
    console.log("test", this.MyDataSource);
    return this.MyDataSource.filteredData.map(t => t.parent_Level).reduce((acc, curr) => acc + curr, 0);
  }

  deleteRegion(region: Region) {
    this.dataService.deleteRegion(region.region_ID).subscribe(data => {
      this.statusMessage = 'Region ' + region.region_Name + ' is deleted',
        this.openSnackBar(this.statusMessage, "Success");
      this.RenderDataTable();
    })
  }
}
