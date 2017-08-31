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
    +`${name}/v1/fill/`
    +`w_${w},h_${h}/`
    +`${name}`;

