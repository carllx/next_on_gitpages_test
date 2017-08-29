// FETCH 方式 :
//-----------
//
var wixOBJs = [];
var nameURL = "https://files.wix.com/files/getpage?page_size=50&media_type=picture&order=-date"
var folderURL = "https://files.wix.com/folders?media_type=picture"
async function fectch_name(URL) {

    var response = await fetch(URL, { method: 'get', credentials: 'include' })
    return response.json()
}
function getFolderName(id, dict) {
   var name ;
    dict.forEach((item) => {
        if (item.folder_id == id) name=  item.folder_name
    })
    return name
}
async function run() {
    // 1.现请求Folder
    var response = await fectch_name(folderURL)
    var folder_response = response['folders']
    var folders=[]
    folder_response.forEach((item) => {
        folders.push ({
            folder_id: item['folder_id'],
            folder_name: item['folder_name']
            })
    })

    var response = await fectch_name(nameURL)
    var files = response.files
    // wixOBJs =[]
    files.forEach((item)=>{
        wixOBJs.push({
            FOLDER:getFolderName(item.parent_folder_id , folders),
            NAME:item.file_name,
            uNAME:item.original_file_name
        })
    })

}

run()
// table(wixOBJs)
