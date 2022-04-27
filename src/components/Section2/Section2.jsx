import React from 'react';
import './section2.scss';
import flowers from '../../pictures/flowers.jpg';

export default function Section1() {
  return <div class="container flex flex-row justify-center">
    <div class="text" >Text</div>
    <div><img class="object-cover hover:object-scale-down" src={flowers}/></div>
  </div>
  ;
}