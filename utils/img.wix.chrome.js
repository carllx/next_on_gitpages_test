
// FETCH 方式 :
//-----------
//

var nameURL = "https://files.wix.com/files/getpage?page_size=-1&media_type=picture&order=-date"// 初始值size = 50 , -1 是全部
var folderURL = "https://files.wix.com/folders?media_type=picture"


async function Fetch(URL) {

    const response = await fetch(
        URL,
        {
            method: 'get',
            credentials: 'include'
         })
    return response.json()
}


function getFolderName(id, dict) {
   var name ;
    dict.forEach((item) => {
        if (item.folder_id == id) name=  item.folder_name
    })
    return name
}




async function _getWIXOBJs() {
    // 1.现请求Folder
    var response = await Fetch(folderURL)
    var folder_response = response['folders']
    var folders=[]
    folder_response.forEach((item) => {
        folders.push ({
            folder_id: item['folder_id'],
            folder_name: item['folder_name']
            })
    })
    // 2. 请求Img信息
    var response = await Fetch(nameURL)
    var files = response.files
    // wixOBJs =[]
    var OBJ= files.map((item)=>{
//         debugger
        return({
            FOLDER:getFolderName(item.parent_folder_id , folders),
            title:item.original_file_name,
            img:item.file_name
        })
    })

    return OBJ

}

/**
 * [getObjbyWorksFolder WORKS文件夹过滤]
 * @param  {[STRING]} folderName [ps : Zhong.works.EnzoCucchi,要获取的文件夹名称]
 * @return {[ARRAY]}            [可写入艺术家文档的对象]
    object 基本样式
     [
        {content:{it:,cn:,en:},title:{it:,cn:,en:},img:''},
        {content:{it:,cn:,en:},title:{it:,cn:,en:},img:''},
        {content:{it:,cn:,en:},title:{it:,cn:,en:},img:''},
      ]
 */
async function getObjbyWorksFolder(folderName){

    const wixOBJs = await _getWIXOBJs()

    return(
        wixOBJs
        .filter((items)=>items['FOLDER']=== folderName)
        .map((item)=>{

            return( {
                    title:{
                        it:item['title'].replace(/\.jpg|\.png|\.jpeg|\.JPG|\.PNG|\.JPEG/,''),
                        cn:item['title'].replace(/\.jpg|\.png|\.jpeg|\.JPG|\.PNG|\.JPEG/,''),
                        en:item['title'].replace(/\.jpg|\.png|\.jpeg|\.JPG|\.PNG|\.JPEG/,'')
                        },
                    time:'2017-9-10',
                    img:item['img'],
                    content:{
                        it:'lavoro e\'....',
                        cn:'该作品描述内容.....',
                        en:'this work is....'
                        }
                    })
            })
    )

}


/**
 * @param 'Vincenzo_Ventimiglia-文森佐_文堤米利亚.png'
 * return
    {it:Vincenzo Ventimiglia,
    zh:文森佐_文堤米利亚,
    en:Vincenzo Ventimiglia,
    id:VincenzoVentimiglia}
 */

function getNamebyId(name){

    var n=name
    .replace(/\.jpg|\.png|\.jpeg|\.JPG|\.PNG|\.JPEG/,'')
    .split('-')

    return {
        it:n[0].replace(/_/,' '),
        zh:n[1].replace(/_/,' '),
        en:n[0].replace(/_/,' '),
        id:n[0].replace(/_/,'')
    }
}

async function getObjbyArtist(){

    const wixOBJs = await _getWIXOBJs()

    //@ Artist=[]
    Artist =
    wixOBJs
    .filter((items)=>items['FOLDER']=== 'zhong.artisti')
    .map((item)=>{

            const t = getNamebyId(item['title'])

            return({
                "id": t.id,
                "title":{it:`${t.it},ZAI`,zh:`${t.zh},ZAI`,en:`${t.en},ZAI`},
                'name': {it:t.it,zh:t.zh,en:t.en},
                "avatar": item['img'],
                "keywords": [t.it,t.zh ,"艺术家","artisti","artist","italiana"],

                "description": {it:'',zh:'',en:''},
                "exhibitions":[
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                ],
                "events":[
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                ],
                "works":[
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                    {"content": {it:'.null',zh:'.null',en:'.null'}},
                ],


                })/*return*/
    })/*map*/

    return Artist



}

/*
从艺术家
 */
getObjbyArtist()




/**
 * 从Works文件夹获取 works可用对象
 * ps : 'Zhong.works.EnzoCucchi'
 */
// getObjbyWorksFolder('Zhong.works.EnzoCucchi')




// table(wixOBJs)
// copy(wixOBJs)
// copy(worksFliterObj)

