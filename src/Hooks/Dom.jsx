import React from 'react'

export default function Dom() {
   const id = str => document.getElementById(str);
   const query = (select, one = false)=> one === true?
   document.querySelector(select):document.querySelectorAll(select);

   const create = str => document.createElement(str)
}
