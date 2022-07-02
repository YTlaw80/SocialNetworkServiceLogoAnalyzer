function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
}

function removeUpload() {
$('.file-upload-input').replaceWith($('.file-upload-input').clone());
$('.file-upload-content').hide();
$('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function() {
$('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function() {
$('.image-upload-wrap').removeClass('image-dropping');
});


const URL = "https://teachablemachine.withgoogle.com/models/zIH5hdi8q/";
let model, webcam, labelContainer, maxPredictions;
// Load the image model and setup the webcam
async function init() {
document.getElementById("spinner").style.display = "block";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";


model = await tmImage.load(modelURL, metadataURL);
maxPredictions = model.getTotalClasses(); // 모델에 학습시킨 클래스 총 개수
labelContainer = document.getElementById("label-container");
for (let i = 0; i < maxPredictions; i++) { // and class labels
let newDiv = document.createElement("div");
newDiv.setAttribute("id", "class" + i);
labelContainer.appendChild(newDiv);
}
console.log(labelContainer.childElementCount);
while(labelContainer.childElementCount != 11);
console.log("div child 11 exist");
predict();
}

async function predict() { 
let temp_list = new Array(11);

var image = document.getElementById("input-image"); // 사용자가 업로드한 이미지 파일
const prediction = await model.predict(image, false); // 업로드한 이미지 파일을 인공지능 모델에게 예측시키기
for (let i = 0; i < maxPredictions; i++) {
let class_probabillity = parseInt(prediction[i].probability.toFixed(2) * 100);
//console.log(class_probabillity);
const classPrediction = prediction[i].className + ": " + class_probabillity + "%";
labelContainer.childNodes[i].innerHTML = classPrediction;
temp_list[i] = class_probabillity;
}
let btnContainer = document.getElementById("restartBtn-container");
let newBtn = document.createElement("button");
newBtn.setAttribute("id", "btn-restart");
newBtn.setAttribute("class", "btn-start");
newBtn.setAttribute("onClick", "window.location.reload()")
newBtn.innerText = "다시 시작하기";
btnContainer.appendChild(newBtn);

document.getElementById("spinner").style.display = "none";

// 그래프
document.getElementById("class1-progress").style.width = temp_list[0] + "%";
document.getElementById("class2-progress").style.width = temp_list[1] + "%";
document.getElementById("class3-progress").style.width = temp_list[2] + "%";
document.getElementById("class4-progress").style.width = temp_list[3] + "%";
document.getElementById("class5-progress").style.width = temp_list[4] + "%";
document.getElementById("class6-progress").style.width = temp_list[5] + "%";
document.getElementById("class7-progress").style.width = temp_list[6] + "%";
document.getElementById("class8-progress").style.width = temp_list[7] + "%";
document.getElementById("class9-progress").style.width = temp_list[8] + "%";
document.getElementById("class10-progress").style.width = temp_list[9] + "%";
document.getElementById("class11-progress").style.width = temp_list[10] + "%";

//그래프 글자 표시

document.getElementById("class1-title").innerText = "유튜브 Youtube           "  + temp_list[0] + "%";
document.getElementById("class2-title").innerText = "페이스북(메타) Facebook(Meta)           "  + temp_list[1] + "%";
document.getElementById("class3-title").innerText = "인스타그램 Instagram           "  + temp_list[2] + "%";
document.getElementById("class4-title").innerText = "트위터 Twitter           "  + temp_list[3] + "%";
document.getElementById("class5-title").innerText = "틱톡 TikTok           "  + temp_list[4] + "%";
document.getElementById("class6-title").innerText = "왓츠앱 WhatsApp           "  + temp_list[5] + "%";
document.getElementById("class7-title").innerText = "위챗 WeChat           "  + temp_list[6] + "%";
document.getElementById("class8-title").innerText = "시나 웨이보 Sina Weibo           "  + temp_list[7] + "%";
document.getElementById("class9-title").innerText = "카카오톡 Kakao Talk           "  + temp_list[8] + "%";
document.getElementById("class10-title").innerText = "라인 LINE           "  + temp_list[9] + "%";
document.getElementById("class11-title").innerText = "디스코드 Discord           "  + temp_list[10] + "%";
//그래프 보이기
document.getElementById("bar-graph").style.display = "block";

document.getElementById("label-container").style.display = "none";
}
