import { Component, OnInit } from '@angular/core';

// function alertDecorator(target, name, descriptor) {
//   // target function or class
//   // name of target function
//   // descriptor of target function
//   // store original function in a variable
//   const originalFunction = descriptor.value;
//   // manipulate descriptor.value
//   descriptor.value = function(...args){
//     const result = originalFunction(args);
//     alert(`ALERT DECORATOR: the function ${name} called with arguments: ${args} resulted in : ${result}`);
//     return result;
//   }
//   // return descriptor
//   return descriptor;
// }


// function logDecorator(target, name, descriptor) {
//   // target function or class
//   // name of target function
//   // descriptor of target function
//   console.log(target, 'TARGET', name, 'NAME', descriptor, 'DESCRIPTOR');
//   // store original function in a variable
//   const originalFunction = descriptor.value;
//   // manipulate descriptor.value
//   descriptor.value = function (...args) {
//     const result = originalFunction(args);
//     console.log(`LOG DECORATOR: the function ${name} called with arguments: ${args} resulted in : ${result}`);
//     return result;
//   }
//   // return descriptor
//   return descriptor;
// }

@Component({
  selector: 'app-mypools',
  templateUrl: './mypools.component.html',
  styleUrls: ['./mypools.component.css']
})
export class MypoolsComponent implements OnInit{
  constructor() { }

  ngOnInit() {
  }

  // @logDecorator
  // clickColor(color) {
  //   console.log(`Do my normal stuff when I click color: ${color}`);
  //   return `You clicked ${color}`;
  // }

}
