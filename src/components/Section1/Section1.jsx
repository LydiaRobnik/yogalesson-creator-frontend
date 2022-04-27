import React from 'react';
import './section1.scss';
import flowers from '../../pictures/flowers.jpg';

export default function Section1() {
  return <div class="flex flex-row justify-center h-full px-0 m-0 overflow-hidden">
    <div><img className="w-1/2 object-cover hover:object-scale-down" src={flowers}/></div>
    <div className="w-1/2 text" >Text</div>
 </div>
  ;
}