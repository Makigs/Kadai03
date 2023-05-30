

function selectBox(start, end){
    let str = "";
    for(let i=start; i<end; i++){
        str += `<option>${i}</option>`;
    }
return str;
}

const year = selectBox(1970,3000);
const month = selectBox(1,13);
const date = selectBox(1,32);
//3.変数「html」に入ってる文字列を pタグid="view"に表示
$("#view1").html(year);
$("#view2").html(month);
$("#view3").html(date);
