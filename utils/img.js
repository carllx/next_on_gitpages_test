/**
 * 可用的图片服务器网址输出
 *
 */

// [cloudinary] Vesion
//
//
/**
* http://res.cloudinary.com/responsivebreakpoints/image/upload/
* c_crop,
* h_403,
* w_200
* /v1502792912/00_Tempio_Malatestiano_gwfwy4.jpg
*/
export const cloudinary = ( name ,w ,h ) =>
    `http://res.cloudinary.com/responsivebreakpoints/image/upload/`
    +`c_crop,`
    +`h_${h},`
    +`w_${w}/`
    +`${name}`




// [WIX] Vesion
export const wix = ( name ,w ,h ) =>

    `https://static.wixstatic.com/media/`
    +`${name}/v1/fit/`
    +`w_${Math.round(w)},h_${Math.round(h)}/`
    +`${name}`;

// WIX
/*
jpg
-------------------
http://static.wixstatic.com/media/bd526d_b8e7ac744114eb073154dc3e273de210.jpg/v1/fill/w_190,h_230,al_c,q_75,usm_0.50_1.20_0.00,lg_1/bd526d_b8e7ac744114eb073154dc3e273de210.jpg

http://static.wixstatic.com/media/bd526d_b8e7ac744114eb073154dc3e273de210.jpg
/v1
/fill
/
w_190,h_230
,al_c
,q_80 (quality ,1是马赛克)
,usm_0.50_1.20_0.00 (
    //usm_0.66_1.00_0.01
    usm_0.66
    _1.00 (锐化 ,从0.00到10.00)
    _0.01
    )
,lg_1(是否根据 w_ h_ 设定裁剪, 不带后缀'_d_2736_3648_s_4_2' ,.jpg前)
/bd526d_b8e7ac744114eb073154dc3e273de210.jpg



png
-------------------
http://static.wixstatic.com/media/74b68f_1a2138fe35fc43a28abc239ba269381f.png_srb_p_340_953_75_22_0.50_1.20_0.00_png_srb


http://static.wixstatic.com/media/74b68f_1a2138fe35fc43a28abc239ba269381f
.png_srb (换成jpg也可以)
_p
_340_953 (w_h) 不会大于原始尺寸的最大值
_75_22_0.50_1.20_0
.00_png_srb

 */
