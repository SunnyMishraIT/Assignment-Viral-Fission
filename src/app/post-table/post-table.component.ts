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
      state('expanded', style({height: '325px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostTableComponent implements OnInit, AfterViewInit {
  dataSource : MatTableDataSource<Postinterface> = new MatTableDataSource<Postinterface>;
  dataSourceFilters : MatTableDataSource<Postinterface> = new MatTableDataSource<Postinterface>;
  posts: any;
  displayedColumns = ['userId','id','title','body']
  apicomm : any = [];
  comm : any;
  comments : any = [];
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
    
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
  
  getcomments(e: any) {
    let id = e.id;
    // console.log(id)
    this.getdata.getComments(id).subscribe((res: any) => {
      this.apicomm = res.map((r: any) => ({ ...r }));
      // console.log(this.apicomm)
    });
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Postinterface, filter: string) =>
      data.title.trim().toLowerCase().includes(filter);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }
}
