import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetpostService } from '../getpost.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import { Postinterface } from '../postinterface';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostTableComponent implements OnInit, AfterViewInit {
  dataSource : MatTableDataSource<Postinterface> = new MatTableDataSource<Postinterface>;
  dataSourceFilters : MatTableDataSource<Postinterface> = new MatTableDataSource<Postinterface>;
  posts: any;
  displayedColumns = ['userId','id','title','body']
  apicomm : any;
  comm : any;
  // apicomm : any;
  comments : any = [];
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;

  constructor( private getdata : GetpostService){

  }
  ngOnInit(){
    this.getdata.getPosts().subscribe((res)=>{
      this.posts = res;
      this.dataSource = new MatTableDataSource<Postinterface>(this.posts);      
      this.dataSource.sort = this.sort;
      this.dataSourceFilters = new MatTableDataSource<Postinterface>(this.posts);      
    })
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.title.toLowerCase().includes(filter);
  };
  console.log(this.dataSource.filterPredicate)
    // this.getdata.getComments(1).subscribe((res)=>{
    //   console.log(res)
    // })
    // this.dataSourceFilters.filterPredicate = function (record,filter) {
    //   // debugger;
    //   var map = new Map(JSON.parse(filter));
    //   let isMatch = false;
    //   for(let [key,value] of map){
    //     isMatch = (value=="title") || (record[key as keyof Postinterface] == value); 
    //     if(!isMatch) return false;
    //   }
    //   // console.log(isMatch)
    //   return isMatch;
    // }
    // console.log(this.dataSourceFilters.filterPredicate)
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    // console.log(this.sort)
  }
  ngDoCheck(){
    // console.log(this.sort)
  }
  getcomments(e : any){
    this.apicomm = null;
    this.comm = null;
    this.comments = [];
    let id = e.id;
    this.getdata.getComments(id).subscribe((res : any)=>{
      for (let i = 0; i < res.length; i++) {
        if (res[i].body) {
            this.comm = res[i].body;
            this.comments.push(this.comm);
          }
          this.apicomm = [this.comments]
    }
    })

  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value; 
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   console.log(this.dataSource.filter)
  //   console.log(this.dataSource.filterPredicate)
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.dataSourceFilters)
  }
}
