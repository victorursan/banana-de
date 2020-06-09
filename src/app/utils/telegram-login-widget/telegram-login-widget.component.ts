import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-telegram-login-widget',
  templateUrl: './telegram-login-widget.component.html',
  styleUrls: ['./telegram-login-widget.component.css']
})
export class TelegramLoginWidgetComponent implements AfterViewInit {

  @ViewChild('script', {static: true}) script: ElementRef;

  constructor() {

  }

  convertToScript() {
    const element = this.script.nativeElement;
    const script = document.createElement('script');


    script.src = "https://telegram.org/js/telegram-widget.js?9";
    script.setAttribute("data-telegram-login", "cartchufi_bot");

    script.setAttribute("data-size", "large");
    // Callback function in global scope
    script.setAttribute("data-onauth", "loginViaTelegram(user)");
    script.setAttribute("data-request-access", "write");

    element.parentElement.replaceChild(script, element);
  }

  ngAfterViewInit() {
    this.convertToScript();
  }

}
