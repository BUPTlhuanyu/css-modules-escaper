/**
 * @file
 */
import $style from './index.less'
$style.locals = true;

const body = document.getElementsByTagName('body')[0];
body.children[0].classList.add($style.test1);
body.children[0].classList.add($style.test2);
body.children[0].classList.add($style.test3);
body.children[0].classList.add($style.test4);
