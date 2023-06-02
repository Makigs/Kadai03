// シミュレーションページを開いたときにLocal storage 保存されていれば反映
// Local storageのvalueと一致するoptionを反映させる
$(window).on('load', function() {
  if (document.URL.match(/easy_sim.html/)) {
    for (let i = 1; i <= 6; i++) {
      const option = "selectedOption" + i;
      const value = localStorage.getItem(option);

			if (i<=5){
			// まだ選択していないときはLocal storage内容は反映させない
				if (value !== null && value !== "" && value !== "notanswer" && value !== "undefined") {
					const optionText = $(".option" + i + " option[value='" + value + "']").text();
					$(".option" + i).val(value).find("option[value='" + value + "']").text(optionText);
					$(".btn").addClass('disable');
					$(".btn_hearing").removeClass('disable');
				}
			}else if(i == 6){
				let dataUrl = localStorage.getItem('selectedOption6');
				if (dataUrl) {
					let img = $('<img />', { 
						src: dataUrl
					});
					img.css({
						maxWidth: '300px',
						maxHeight: '250px'
					});
					$('.preview').append(img);
					$(".preview_text").css("display","none");
				}
			}
		}
    	// }
			// else if(i == 6){
			// 	if (value !== null && value !== "" && value !== "notanswer") {
			// 		// $('.myFileInput').prop('files')[0].name;

			// 		let storedFileName = localStorage.getItem('selectedOption6');
			// 		let result = storedFileName.match(/[^\\]+$/)[0];
			// 		if (storedFileName) {
			// 			// ファイル名を表示するための処理
			// 			$('.option6').val(storedFileName);
			// 		}
				// }
	};
});



// Option2(年代)の関数
function selectBox(start, end){
    let str = `<option value="notanswer" selected>-</option>`;
    for(let i=start; i<end; i+=10){
        str += `<option>${i}歳～</option>`;
    }
    return str;
}

// Option2(年代)の処理
$(document).ready(function(){
    const age = selectBox(10,100);
    $(".era").html(age);
});



// LocalStorageへ保存（Option1-5まで）
$(document).ready(function(){
	setInterval(function() {
			for(let i = 1; i < 6; i++){
					let element = $(".option" + i);
					if (element.length > 0) {
							let selectedOption = element.val();
							if (selectedOption) {
									localStorage.setItem("selectedOption" + i, selectedOption);
							} else {
									console.log("selectedOption is undefined or empty for .option" + i);
							}
					} else {
							console.log(".option" + i + " does not exist.");
					}
					console.log(localStorage)
			}
	}, 5000);  // 5000ミリ秒 = 5秒
});

// 必須の項目が選択されていないとボタンを押せない
$(".s-form-e-option").change(function() {
	let flag = false;
	$(".s-form-e-option").each(function() {
		let selected = $(this).find("option:selected").val();
		console.log(selected, "選択個数");

		if (selected === "notanswer") {
			flag = true;
			return false;
		}
	});
	
	if (flag) {
		if (!$(".btn").hasClass('disable')) {
			$(".btn").addClass('disable');
			$(".btn_hearing").removeClass('disable');
		}
	} else {
		$(".btn_hearing").addClass('disable');
		$(".btn").removeClass('disable');
	}
});


// 写真のプレビュー
function previewFile(inputElement){
	let fileData = new FileReader();
	fileData.onload = function(e) {
			$(inputElement).closest('.s-form-e-data').find('.pic_preview').attr('src', e.target.result);
	};
	fileData.readAsDataURL(inputElement.files[0]);
}

$(".s-input-lo1 input[type='file']").on("change", function(){
	$(".pic_preview").empty();
	previewFile(this);
	$(".preview_text").css("display","none");
});


// LocalStorageへ保存（Option6 写真）
$(".s-input-lo1 input[type='file']").on("change", function(){
	let reader = new FileReader();

	reader.onload = function (e) {
			let dataUrl = e.target.result;
			localStorage.setItem('selectedOption6', dataUrl);
	};

	reader.readAsDataURL(this.files[0]);
});



// 結果ページを開いたときにLocal storage 保存されていれば反映
// Local storageのvalueと一致するoptionを反映させる
$(window).on('load', function() {
  if (document.URL.match(/easy_result.html/)) {
		let dataUrl = window.localStorage.getItem('selectedOption6');
		if (dataUrl) {
			let img = $('<img />', { 
				src: dataUrl
			});
			img.css({
				maxWidth: '300px',
				maxHeight: '250px'
			});
			$('.ai_result').append(img);
		}

		// 診断結果のIF文
		let op1_value = window.localStorage.getItem('selectedOption1');
		let op2_era = window.localStorage.getItem('selectedOption2');
		let op3_value = window.localStorage.getItem('selectedOption3');
		let op4_value = window.localStorage.getItem('selectedOption4');
		let op5_value = window.localStorage.getItem('selectedOption5');

		let lastClinicMapping = {
			'within-3m': '3か月以内',
			'within-6m': '半年以内',
			'within-1y': '1年以内',
			'within-3y': '1～3年以内',
			'more-3y': 'それ以上前',
			'not-rem': '覚えていない'
		};

		let brushing_freq = {
			'3td': '1日3回',
			'2td': '1日2回',
			'1td': '1日1回',
			'1t3d': '2-3日に1回',
			'notoften': 'あまりしない'
		};

		let op5_situ = {
			'decay': '虫歯になりやすい',
			'tartar': '歯石が付きやすい',
			'notsure': 'よくわからない'
		};

		let op3_last_clinic = lastClinicMapping[op3_value];
		let op4_brushing_freq = brushing_freq[op4_value];
		let op5_situ_res = op5_situ[op5_value];

		

		let nickName = "";
		let judge = "";
		if(op1_value == "undefined" | op1_value == "" ){
			nickName = "匿名希望さん";
			console.log(nickName,"ニックネーム1")

			judge = `
			<div class="result_judge">
				<span class="res_name_2">
					あなたは、
				</span>
				<span class="last_clinic">
					最後に歯医者に行ったのは${op3_last_clinic}、
				</span>
				<span class="brushing_freq">
					歯磨き頻度は${op4_brushing_freq}程度です。
			</span>
			</div>
		`;


		}else{
		nickName = op1_value + "さん";
		console.log(nickName,"ニックネーム2")

		judge = `
		<div class="result_judge">
			<span class="res_name_2">
			${nickName}は、
			</span>
			<span class="last_clinic">
				最後に歯医者に行ったのは${op3_last_clinic}、
			</span>
			<span class="brushing_freq">
				歯磨き頻度は${op4_brushing_freq}程度です。
		</span>
		</div>
	`;
		}

		const name_era = `
			<div class="result_name_era">
				<span class="res_name">
					${nickName}
				</span>
				<span class="res_era">
					${op2_era}
				</span>
			</div>
		`;

		let lc ="";
		let bf ="";
		if(op3_last_clinic === "within-3m"){
			lc = 10;
		}else if(op3_last_clinic === "within-6m"){
			lc = 8;
		}else if(op3_last_clinic === "within-1y"){
			lc = 6;
		}else if(op3_last_clinic === "within-3y"){
			lc = 3;
		}else if(op3_last_clinic === "more-3y"){
			lc = 1;
		}else{
			lc = 2;
		}

		if(op4_brushing_freq === "3td"){
			bf = 10;
		}else if(op4_brushing_freq === "2td"){
			bf = 8;
		}else if(op4_brushing_freq === "1td"){
			bf = 6;
		}else if(op4_brushing_freq === "1td3d"){
			bf = 3;
		}else{
			bf = 1;
		}

		let lf_res = lc + bf;
		let lf_judge = "";

		if(lf_res < 15){
			lf_judge = `
				<div class="lf_judge">
				積極的にオーラルチェックができていますね！フロスや歯間ブラシを併用すると、より虫歯や歯周病などのリスクが下がりますよ。
				</div>
			`;
		}else if(lf_res < 7){
			lf_judge = `
				<div class="lf_judge">
				口腔環境が悪化している可能性があるので、一度歯科検診を検討してみましょう。
				</div>
			`;
		}else{
			lf_judge = `
				<div class="lf_judge">
				口腔環境が悪化している可能性があります。歯医者恐怖症がある方は、麻酔で眠ったまま治療してくれる歯医者もありますので、ぜひ検討してみてください。
				</div>
			`;
		}

		let o5 ="";
		if(op5_value === "notsure" | op5_value === "undefined"){
			
		}else{
			o5 = `
			<div class="o5">
			${op5_situ_res}ようなので、悩みにあった歯磨き粉を利用するとよいでしょう。
			</div>
		`;
		}

		console.log(judge)
	$(".jq_res").append(name_era);
	$(".jq_res").append(judge);
	$(".jq_res").append(lf_judge);
	$(".jq_res").append(o5);

	}
});

// for(let i=0; i<localStorage.length; i++){
// 	const key   = localStorage.key(i);
// 	const value = localStorage.getItem(key);
// 	const html = '<tr><th>'+key+'</th><td>'+value+'</td></tr>';
// 	$("#list").append(html);
// }


// for (let i = 1; i <= localStorage.length; i++) {
// 	const option = "selectedOption" + i;
// 	const value = localStorage.getItem(option);

// 	if (i<=5){
// 	// まだ選択していないときはLocal storage内容は反映させない
// 		if (value !== null && value !== "" && value !== "notanswer") {
// 			const optionText = $(".option" + i + " option[value='" + value + "']").text();
// 			$(".option" + i).val(value).find("option[value='" + value + "']").text(optionText);
// 		}
// 	}else if(i == 6){



// 		let webStorage_e = function () {
// 		if (sessionStorage.getItem('access')) {
// 				// 2回目以降アクセス時の処理
// 				$(".splash").addClass('is-active');

// 		} else {
// 			// 初回アクセス時の処理
// 				// sessionStorageにデータを保存
// 			sessionStorage.setItem('access', 'true');
// 			let storage_1 = sessionStorage.getItem('access');
// 			console.log(storage_1,"Sessionstorageへの格納");

// 			$(".splash").delay(800).fadeOut('slow',function(){
// 				$('body').addClass('appear');
// 				let winH = $(window).height();
// 				console.log("ここまで動いてる２")
// 				$(".splashbg").css({
// 							//ボーダーの太さにブラウザの高さを代入	
// 						"border-width":winH,
// 						"animation-name":"backBoxAnime"
// 				}); 
// 				console.log("ここまで動いてる３")
// 			});

// 			setTimeout(function () {
// 				$(".splash-logo").fadeOut('slow');
// 				// ローディングを数秒後に非表示にする
// 				$(".splash").addClass('is-active');
// 				$(".splashbg").addClass('is-active');
// 				$(".splash-logo").removeClass('is-active');

// 			}, 600); // ローディングを表示する時間
// 		}
// 	}
// 	webStorage();
// 	console.log("ここまで動いてる５")
// 	}  
// });






//テスト用　クリアボタン
$(".clear").on("click",function(){
    localStorage.clear();
    $(".option1").val("");
    $(".option2").html(selectBox(10,100));
    $(".option3").val("notanswer");
    $(".option4").val("notanswer");
    $(".option5").val("notanswer");
		// $(".option6").prop("value", "");
		$(".pic_preview").empty();
		location.reload();

});
	