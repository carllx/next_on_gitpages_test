/**
 * 分类
 * cat
 *  :background
 *  :img
 *  :icon_artist
 *
 * scroll未看到的时候隐藏,加载完毕的时候显示
 * display:{boolean}
 *
 */


import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous, {ThemeProvider} from 'glamorous'
import XHRProgress  from '../utils/Progress'
import Logo from './logo'
import {ui}  from '../utils/ui'
import HOC_WithLoad from './loader'



const _IMG  = glamorous.div({
  justifyContent:   'space-around',
  backgroundColor:  '#3b444f',
  backgroundRepeat: 'no-repeat',
  backgroundSize:   'cover',
  overflow:         'hidden',

},(props)=>({
  // isLandscape  --或 居中
  width:            props.w?`${props.w}`:'100%',
  height:           props.h?`${props.h}`:'100%',
  //在这里找渐变模板 https: //webgradients.com/
  backgroundImage:  props.src?`url(${props.src})`:'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
}))




const _BG_IMG = glamorous.div({
  // fontSize:           '0.3rem',
  zIndex:           1,
  display:          'flex',

  justifyContent:   'space-around',
  backgroundColor:  '#3b444f',
  backgroundRepeat: 'no-repeat',
  backgroundSize:   'cover',
  overflow:         'hidden',
  position:         'absolute',
  left:             0,
  top:              0,
  width:            '100%',
  height:           '100%',
},(props)=>({
  // isLandscape  --或 居中

  //在这里找渐变模板 https: //webgradients.com/
  backgroundImage:  props.src?`url(${props.src})`:'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
})
)


export let IMG = HOC_WithLoad(_BG_IMG)




