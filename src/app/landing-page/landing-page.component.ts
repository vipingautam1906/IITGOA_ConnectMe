import { Component, OnInit } from '@angular/core';
import { LandingService } from './landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  quoteArray:any;
  dailyQuote: string;
  quoteAuther: string;
constructor(private landingSer: LandingService ) { }
  ngOnInit() {
    this.landingSer.getQuotes()
        .subscribe( data=>{
            this.quoteArray = data;
            this.dailyQuote = this.quoteArray.contents.quotes[0].quote;
            this.quoteAuther = this.quoteArray.contents.quotes[0].author;
    })
}
}
