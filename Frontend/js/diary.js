class Queue{
	constructor(qid){
		this.qid = qid;
		this.qArr = [];
	}
	pushItem(inItem){
		this.qArr.push(inItem);
	}
	shiftItem(){
		return this.qArr.shift();
	}
	countItem(){
		return this.qArr.length;
	}
}
const diaryRead = new Queue('diaryAll');


class Diary{
	constructor( diaryName ){
		this.diaryName = diaryName;
		this.buttonName = null;
		this.dateValue = ''; //date
		this.weatherValue = ''; //weather
		this.moodValue = ''; //mood
		this.titleValue = ''; //title
		this.bodyValue = ''; //body

		this.listYear = 0;
		this.listMonth = 0;
		this.listDate = 0;

		this.readData = [];
		this.DeleteKey = '';
		this.updateKey = [];

		this.windowWidth = 0;

		this.moodObj = {} //select mood
		this.weatherObj = {} //select weather

    this.lastData = ''; //last data
    this.updateDataStr = '';
	}

	//--width Size--//
	widthSize(){
		
		this.windowWidth = window.innerWidth;
		window.addEventListener('resize', ()=>{
			this.windowWidth = window.innerWidth;
		});
		
	}
	//--width Size end--//

	//--mode change--//
	modeChange(){
		document.querySelector('.titleCharacter').addEventListener('click',()=>{
			if(document.querySelector('.titleCharacter').style.background != 'url("../img/moon.png") center center / contain no-repeat'){
				document.querySelector('.titleCharacter2').style.background = `center/contain no-repeat url('../img/moon.png')`;
				document.querySelector('.titleCharacter').style.background = `center/contain no-repeat url('../img/moon.png')`;
				document.querySelector('.wrapCRUD').style.background = `center/cover no-repeat url('../img/night.png')`;
				document.querySelector('.readWrap').style.background = `center/cover no-repeat url('../img/night.png')`;
				document.querySelectorAll('.rightTitleWrap>div>p').forEach((v,i,a)=>{
					v.style.color = '#fff';
				});
			}else{
				document.querySelector('.titleCharacter').style.background = `center/contain no-repeat url('../img/sun_bg.png')`;
				document.querySelector('.titleCharacter2').style.background = `center/contain no-repeat url('../img/sun_bg.png')`;
				document.querySelector('.wrapCRUD').style.background = `center/cover no-repeat url('../img/morning.png')`;
				document.querySelector('.readWrap').style.background = `center/cover no-repeat url('../img/mornig.png')`;
				document.querySelectorAll('.rightTitleWrap>div>p').forEach((v,i,a)=>{
					v.style.color = '#333';
				});
			}
		});
		document.querySelector('.titleCharacter2').addEventListener('click',()=>{
			if(document.querySelector('.titleCharacter2').style.background != 'url("../img/moon.png") center center / contain no-repeat'){
				document.querySelector('.titleCharacter2').style.background = `center/contain no-repeat url('../img/moon.png')`;
				document.querySelector('.titleCharacter').style.background = `center/contain no-repeat url('../img/moon.png')`;
				document.querySelector('.wrapCRUD').style.background = `center/cover no-repeat url('../img/night.png')`;
				document.querySelector('.readWrap').style.background = `center/cover no-repeat url('../img/night.png')`;
				document.querySelector('.writeContentWrap').style.transform = 'scale(0)';
				document.querySelectorAll('.rightTitleWrap>div>p').forEach((v,i,a)=>{
					v.style.color = '#fff';
				});
			}else{
				document.querySelector('.titleCharacter2').style.background = `center/contain no-repeat url('../img/sun_bg.png')`;
				document.querySelector('.titleCharacter').style.background = `center/contain no-repeat url('../img/sun_bg.png')`;
				document.querySelector('.wrapCRUD').style.background = `center/cover no-repeat url('../img/morning.png')`;
				document.querySelector('.readWrap').style.background = `center/cover no-repeat url('../img/mornig.png')`;
				document.querySelector('.writeContentWrap').style.transform = 'scale(0)';
				document.querySelectorAll('.rightTitleWrap>div>p').forEach((v,i,a)=>{
					v.style.color = '#333';
				});
			}
		});
	}
	//--mode change end--//

	//--date--//
	standardToday(){
		document.getElementById("diaryDate").value = '';
		document.getElementById("diaryDate").value = new Date().toISOString().substring(0, 10);
		// console.log(document.getElementById("diaryDate").value);
		let now_utc = Date.now()
		let timeOff = new Date().getTimezoneOffset()*60000;
		let today = new Date(now_utc-timeOff).toISOString().split("T")[0];
		document.getElementById("diaryDate").setAttribute("max", today);
	}
	//--date end--//


	//--select weather, mood--//
	selectValue(){
		this.dateValue = (document.getElementById("diaryDate").value);
		this.titleValue = (document.getElementById("diaryTitle").value.replace(/(\n|\r\n)/g, '<br>'));
		this.bodyValue = (document.getElementById("diaryBody").value.replace(/(\n|\r\n)/g, '<br>'));
		this.bodyValue = this.bodyValue;
		this.weatherObj = { "sun":false, "cloud":false, "rain":false, "snow":false }
		document.querySelectorAll(".weatherS>div").forEach((v,i,a)=>{
			let weatherStr = '';
			v.removeEventListener('click', ()=>{});
			v.addEventListener('click', ()=>{
				this.weatherObj[v.id] = !this.weatherObj[v.id];
				// console.log(weather);
				for(let key in this.weatherObj){
					if(this.weatherObj[key] == true){
						weatherStr += key;
						weatherStr += ',';
						this.weatherValue = weatherStr.substring(0, weatherStr.length-1)
						//  console.log(this.weatherValue);
					}
				}
				weatherStr = '';
				v.classList.toggle('selectValue');
			});
		});
		this.moodObj = { "happy":false, "sad":false, "soso":false, "angry":false }
		document.querySelectorAll(".moodS>div").forEach((v,i,a)=>{
			let moodStr = '';
			v.removeEventListener('click', ()=>{});
			v.addEventListener('click', ()=>{
				this.moodObj[v.id] = !this.moodObj[v.id];
				console.log(this.moodObj);
				for(let key in this.moodObj){

					if(this.moodObj[key] == true){
						moodStr += key;
						moodStr += ',';
						this.moodValue = moodStr.substring(0, moodStr.length-1);
					}
				}
				moodStr = '';
				v.classList.toggle('selectValue');
			});
		});
	}
	//--select weather, mood end--//

	
	//--last write call--//
	allData( resData ){
    let diaryAll = JSON.parse(resData);
		console.log(diaryAll);

		diaryAll["diary"].forEach((v,i,a)=>{
			diaryRead.pushItem(v);
		});

		let diaryArr = [];
		for(; diaryRead.countItem(); ){
			diaryArr.push(diaryRead.shiftItem());
		}
	
		// console.log(diaryArr);
		document.getElementById("dateS").innerHTML = diaryArr[diaryArr.length-1]["date"]; 
		document.getElementById("readTitle").innerText = diaryArr[diaryArr.length-1]["title"].replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
		document.getElementById("readBody").innerText = diaryArr[diaryArr.length-1]["body"].replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');

		const matchW = { "sun":"../img/sun2.png", "cloud":"../img/cloud2.png", "rain":"../img/rain2.png", "snow":"../img/snow2.png" }
		let weatherSelect = diaryArr[diaryArr.length-1]["weather"].split(",");
		for(let i=0; i<weatherSelect.length; i++){
			document.getElementById("weatherS").innerHTML += `<div class="readW" style="background: center/contain no-repeat url('${matchW[weatherSelect[i].toString()]}');"></div>`;
		}
		
		const matchM = { "happy":"../img/happy2.png", "sad":"../img/sad2.png", "soso":"../img/soso2.png","angry":"../img/angry2.png" }
		let moodSelect = diaryArr[diaryArr.length-1]["mood"].split(",");
		console.log(moodSelect);
		for(let i=0; i<moodSelect.length; i++){
			document.getElementById("moodS").innerHTML += `<div class="readW" style="background: center/contain no-repeat url('${matchM[moodSelect[i].toString()]}');"></div>`;
			// console.log(document.querySelector('.readW'));
		}
	}
	//--last wirte call end--//

	//--data output--//
	dataSend(){
		this.selectValue();
		(async ()=>{
			let responseData = await new Promise(resolve => {
				const xhttp = new XMLHttpRequest();	
				xhttp.open("GET", `http://kkms4001.iptime.org:10188/create/?date=${this.dateValue}&weather=${this.weatherValue}&mood=${this.moodValue}&title=${this.titleValue}&body=${this.bodyValue}`, true);
				xhttp.onload = function(e) {
					resolve(xhttp.response);
				}
				xhttp.onerror = function() {
					resolve(undefined);
					console.error("** An error occurred during the XMLHttpRequest");
				}
				xhttp.send();
				const monthName = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        const sendNextShow = new Date(this.dateValue);
        this.lastData = monthName[sendNextShow.getMonth()];
			});
      //console.log(responseData);
			this.allData(responseData);
			this.showList(responseData);
			this.changeShow(responseData);
		})();
	}
	//--data output end--//

	showList( resData2 ){
		let listAll = JSON.parse(resData2);
		console.log(listAll);
		//--now date--//
		//--now date end--//

		const now = new Date();
		this.listYear = now.getFullYear(); // 연도
		this.listMonth = now.getMonth(); // 월
		this.listDate = now.getDate(); // 일
    
    this.lastData = (this.listYear+"-"+((this.listMonth+1) < 10? "0"+(this.listMonth+1):(this.listMonth+1))+"-"+this.listDate); 
		console.log(this.lastData);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(this.dateValue);
    // chagne date update
    this.updateDataStr = (this.dateValue.length == 0) ? ((now.getFullYear() + "-" + (Number(now.getMonth()+1) > 10? "0"+(now.getMonth()+1):(now.getMonth()+1)) + "-" + now.getDate())) : (this.dateValue);
    this.updateDataStr = this.updateDataStr.split('-');
    console.log(this.updateDataStr)

    const dataMonth = {}
		listAll["diary"].forEach((v,i,a)=>{

			//--DB date--//
			const dbMonth = new Date(v["date"]);
			
			//console.log(dbMonth);
			// console.log(v["date"]);
			if( !(`${dbMonth.getFullYear()}` in dataMonth) ){
				dataMonth[dbMonth.getFullYear()] = { "1":[], "2":[], "3":[], "4":[], "5":[], "6":[], "7":[], "8":[], "9":[], "10":[], "11":[], "12":[] }
			}

			dataMonth[dbMonth.getFullYear()][dbMonth.getMonth()+1].push(...[v]);
			// console.log(dbMonth.getMonth()+1);
			//console.log('------------');
			//--DB date end--//

		});
		// console.log(dataMonth);
		
		const monthName = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
		const dayName = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat' ];

    // left year change
		document.getElementById("diaryYear").innerHTML = `<span>${this.updateDataStr[0]}<span>`;
		document.getElementById("titleMonth").innerHTML = `<p>${monthName[this.listMonth]}</p>`;
    this.listYear = this.updateDataStr[0];
		// left month change
		document.getElementById("monthZone").innerHTML = '';
		for(let key in dataMonth[`${this.updateDataStr[0]}`]){
      
			// console.log('key -->', key);
			// console.log(monthName[Number(key)-1]);
			document.getElementById("monthZone").innerHTML += `
				<div class="monthBoxWrap">
				<div class="monthBox">
				<p id="${monthName[Number(key)-1]}">${monthName[Number(key)-1]}</p>
				<p>${dataMonth[`${this.updateDataStr[0]}`][key].length}</p>
				</div>
				</div>
				`;
			document.querySelectorAll(`.monthBox`).forEach((v2,i2,a2) =>{
				v2.addEventListener("click", ()=>{
					document.getElementById("diaryBox").innerHTML ='';
					// console.log(dataMonth[`${this.listYear}`][i2+1]);

					//--Read gogo--//
					this.readData = [];
					const clickRead = dataMonth[`${this.listYear}`][i2+1];
					this.readData.push(clickRead);
					//console.log(this.readData);
					//--Read gogo end-//
					
					document.getElementById("titleMonth").innerHTML = `<p>${monthName[i2]}</p>`;
					// console.log(monthName[i2]);
					for(let j=0; j<dataMonth[`${this.listYear}`][i2+1].length; j++){
						
						const dbDay = new Date(dataMonth[`${this.listYear}`][i2+1][j]["date"]);
						document.getElementById("diaryBox").innerHTML += `
							<div class="listBox">
								<div class="listDateBox">
									<div class="dateBox">
										<p>${dayName[dbDay.getDay()]}</p>
										<p>${dbDay.getDate()}</p>
									</div>
								</div>
								<div class="listTitleBox">
									<p class="titleContent"></p>
								</div>
							</div>
						`;
						document.querySelectorAll('.titleContent')[j].innerText = `${dataMonth[`${this.listYear}`][i2+1][j]["title"]}`;
					}
					this.showRead();
					this.showDelete();
				});
			});
		}

		//--main start List show--//
		document.getElementById("diaryBox").innerHTML ='';
		document.getElementById("titleMonth").innerHTML = `<p>${monthName[Number(this.updateDataStr[1])-1]}</p>`;
    // console.log(monthName);
    // console.log(this.listMonth);
		// console.log(monthName[this.listMonth]);
    console.log(dataMonth);
    console.log(`${this.updateDataStr[0]} - ${this.updateDataStr[1]} - ${this.updateDataStr[2]}`);
		for(let j=0; j<dataMonth[`${this.updateDataStr[0]}`][Number(this.updateDataStr[1])].length; j++){
			
			const dbDay = new Date(dataMonth[`${this.updateDataStr[0]}`][Number(this.updateDataStr[1])][j]["date"]);
			document.getElementById("diaryBox").innerHTML += `
				<div class="listBox">
					<div class="listDateBox">
						<div class="dateBox">
							<p>${dayName[dbDay.getDay()]}</p>
							<p>${dbDay.getDate()}</p>
						</div>
					</div>
					<div class="listTitleBox">
						<p class="titleContent"></p>
					</div>
				</div>
			`;
			document.querySelectorAll('.titleContent')[j].innerText = `${dataMonth[`${this.updateDataStr[0]}`][Number(this.updateDataStr[1])][j]["title"]}`;
		}
		//--start List end--//
	
		//--default read gogo--//
		const sendShow = dataMonth[`${this.updateDataStr[0]}`][Number(this.updateDataStr[1])];
		// const sendShow = dataMonth[`${this.listYear}`][this.listMonth];
		this.readData = [];
		this.readData.push(sendShow);
		console.log(this.readData);
		this.showRead();
		this.showDelete();
		//--default read gogo end--//
		
    // left month color change
		document.getElementById(`${monthName[Number(this.updateDataStr[1])-1]}`).parentNode.parentNode.classList.add('selectList');
		document.querySelectorAll(".monthBoxWrap").forEach((v,i,a)=>{
			v.addEventListener("click", () =>{
				document.getElementById(`${monthName[Number(this.updateDataStr[1])-1]}`).parentNode.parentNode.classList.remove('selectList');
				a.forEach(v2=> {
					v2.classList.remove('selectList');
				});
				v.classList.add('selectList');
			});
		});
	}


	//--change data--//
	changeEvent( getID ){
    console.log(getID);
		const now = new Date();
		if(getID == "yearPrev"){
			this.listYear--;
			console.log(this.listYear);
			if(this.listYear < now.getFullYear()){
				document.getElementById("yearNext").style.transform = 'scale(1)';
			}
		}else if(getID == "yearNext"){
			this.listYear++;
			console.log(this.listYear);
			if(this.listYear >= now.getFullYear()){
				document.getElementById("yearNext").style.transform = 'scale(0)';
			}
		}
	}
	//--change data end--//


	//--update show--//
	changeShow( resData3 ){
		let listAll = JSON.parse(resData3);

		const dataMonth = {}
		listAll["diary"].forEach((v2,i2,a2)=>{
			//--DB date--//
			const dbMonth = new Date(v2["date"]);
			
			//console.log(dbMonth);
			//console.log(v["date"]);
			if( !(`${dbMonth.getFullYear()}` in dataMonth) ){
				dataMonth[dbMonth.getFullYear()] = { "1":[], "2":[], "3":[], "4":[], "5":[], "6":[], "7":[], "8":[], "9":[], "10":[], "11":[], "12":[] }
			}

			dataMonth[dbMonth.getFullYear()][dbMonth.getMonth()+1].push(...[v2]);
			//console.log(dbMonth.getMonth()+1);
			//console.log('------------');
			//--DB date end--//
		});
		document.querySelectorAll(".yearZone>i").forEach((v,i,a)=>{
			if(v.clickHandler){
				document.getElementById(v.id).removeEventListener("click",v.clickHandler);  
			}
			v.clickHandler = () =>{
				this.changeEvent(v.id);
				console.log(this.listYear);

				const monthName = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
				const dayName = [ 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun' ];
				document.getElementById("diaryYear").innerHTML = `<span>${this.listYear}<span>`;
				document.getElementById("titleMonth").innerHTML = `<p>${monthName[this.listMonth]}</p>`;
				document.getElementById("monthZone").innerHTML = '';
				for(let key in dataMonth[`${this.listYear}`]){
					//console.log('key -->', key);
					//console.log('countMonth[key] -->', countMonth[`${this.listYear}`][key]);
					
					document.getElementById("monthZone").innerHTML += `
						<div class="monthBoxWrap">
							<div class="monthBox">
								<p id="${monthName[Number(key)-1]}">${monthName[Number(key)-1]}</p>
								<p>${dataMonth[`${this.listYear}`][key].length}</p>
							</div>
						</div>
					`;
					document.querySelectorAll(`.monthBox`).forEach((v2,i2,a2) =>{
						v2.addEventListener("click", ()=>{
							document.getElementById("titleMonth").innerHTML = `<p>${monthName[i2]}</p>`;
							document.getElementById("diaryBox").innerHTML ='';
							console.log(dataMonth[`${this.listYear}`][i2+1]);

							this.readData = [];
							const clickRead = dataMonth[`${this.listYear}`][i2+1];
							
							this.readData.push(clickRead);
							console.log(this.readData);
							
							for(let j=0; j<dataMonth[`${this.listYear}`][i2+1].length; j++){
								//console.log(dataMonth[`${this.listYear}`][i2+1][j]["date"]);
								const dbDay = new Date(dataMonth[`${this.listYear}`][i2+1][j]["date"]);
								document.getElementById("diaryBox").innerHTML += `
									<div class="listBox">
										<div class="listDateBox">
											<div class="dateBox">
												<p>${dayName[dbDay.getDay()]}</p>
												<p>${dbDay.getDate()}</p>
											</div>
											</div>
										<div class="listTitleBox">
											<p class="titleContent"></p>
										</div>
									</div>
											`;
								console.log(document.querySelector('.titleContent').innerText);
								document.querySelectorAll('.titleContent')[j].innerText = `${dataMonth[`${this.listYear}`][i2+1][j]["title"]}`;
							}
							this.showRead();
							this.showDelete();
						});
					});
				}
				document.querySelectorAll(".monthBoxWrap").forEach((v,i,a)=>{
					v.addEventListener("click", () =>{
						a.forEach(v2=> v2.classList.remove('selectList'));
						v.classList.add('selectList');
					});
				});
			}
			v.addEventListener('click', v.clickHandler);
		});
	}
	//--update show end--//
	//--button event--//		
	buttonEvent(){
		this.buttonName = document.getElementsByTagName("button");
		for(let i=0; i<this.buttonName.length; i++){
			
			this.buttonName[i].addEventListener("click", ()=>{
				// console.log(this.buttonName[i].id);
				
				if(this.buttonName[i].id == "cancelBtn" || this.buttonName[i].id == "cancelBtnRead"){
					document.querySelector('.listContentWrap').style.width = "80%";
					document.querySelector('.wrapCRUD').style.width = "0%";
					document.querySelector('.dateContentWrap').style.width = "20%";
					//--reset--//
					this.moodObj = { "happy":false, "sad":false, "soso":false, "angry":false }
					this.weatherObj = { "sun":false, "cloud":false, "rain":false, "snow":false }
					//--reset end--//
				}

				if(this.buttonName[i].id == "saveBtn"){
					document.getElementById('yearNext').style.transform = "scale(0)";
					document.getElementById('readWrap').style.transform = "scale(1)";
					if(this.windowWidth > 980){
						document.querySelector('.listContentWrap').style.width = "80%";
						document.querySelector('.wrapCRUD').style.width = "0%";
						document.querySelector('.dateContentWrap').style.width = "20%";
						//mobile
					}else if(this.windowWidth < 980){
						document.querySelector('.listContentWrap').style.width = "0%";
						document.querySelector('.wrapCRUD').style.width = "80%";
					}else if(isMobile){
						document.querySelector('.listContentWrap').style.width = "0%";
						document.querySelector('.wrapCRUD').style.width = "100%";
						document.querySelector('.wrapCRUD').style.zIndex = 300;
						document.querySelector('.dateContentWrap').style.width = "0%";
					}
					this.dataSend();
          this.listData();
				}

				if(this.buttonName[i].id == "diaryWriteBtn"){
					document.getElementById('saveBtn').style.transform = "scale(1)";
					document.getElementById('updateBtn').style.transform = "scale(0)";
					document.getElementById('readWrap').style.transform = "scale(0)";
					document.querySelector('.writeContentWrap').style.transform = 'scale(1)';
					const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
					//pc
					if(this.windowWidth > 980){
						console.log('mobile');
						document.querySelector('.listContentWrap').style.width = "40%";
						document.querySelector('.wrapCRUD').style.width = "40%";
						//mobile
					}else if(this.windowWidth < 980){
						document.querySelector('.listContentWrap').style.width = "0%";
						document.querySelector('.wrapCRUD').style.width = "80%";
					}else if(isMobile){
						document.querySelector('.listContentWrap').style.width = "0%";
						document.querySelector('.wrapCRUD').style.width = "100%";
						document.querySelector('.wrapCRUD').style.zIndex = 300;
						document.querySelector('.dateContentWrap').style.width = "0%";
					}
					//--reset--//
					this.moodObj = { "happy":false, "sad":false, "soso":false, "angry":false }
					this.weatherObj = { "sun":false, "cloud":false, "rain":false, "snow":false }
					for(let key in this.moodObj){
						document.getElementById(`${key}`).classList.remove('selectValue');
					}
					for(let key in this.weatherObj){
						document.getElementById(`${key}`).classList.remove('selectValue');
					}
					// document.getElementById("diaryDate").value = '';
					document.getElementById("diaryTitle").value = '';
					document.getElementById("diaryBody").value = '';
				}
				//--reset end--//

				if(this.buttonName[i].id == 'deleteBtnRead'){
					document.querySelector('.deleteModal').style.transform = 'scale(1)';
					document.querySelectorAll('.deleteModal>div>div>p').forEach((v,i,a)=>{
						v.addEventListener('click', ()=>{
							if(v.innerText == 'Yes'){
								document.querySelector('.listContentWrap').style.width = "80%";
								document.querySelector('.wrapCRUD').style.width = "0%";
								document.querySelector('.dateContentWrap').style.width = "20%";
								document.querySelector('.deleteModal').style.transform = 'scale(0)';
								this.deleteData();
							}else if(v.innerText == 'No'){
								document.querySelector('.deleteModal').style.transform = 'scale(0)';
							}
						});
					});
				}

				if(this.buttonName[i].id == 'updateBtn'){
					document.querySelector('.listContentWrap').style.width = "80%";
					document.querySelector('.wrapCRUD').style.width = "0%";
					document.querySelector('.dateContentWrap').style.width = "20%";
					document.querySelector('.writeContentWrap').style.transform = "scale(0)";
					this.dateValue = document.getElementById("diaryDate").value;
					this.titleValue = document.getElementById("diaryTitle").value.replace(/(\n|\r\n)/g, '<br>');
					this.bodyValue = document.getElementById("diaryBody").value.replace(/(\n|\r\n)/g, '<br>');
					this.bodyValue = this.bodyValue;
					this.updateData();
				}
			});
		}
	}
	//--button event end--//

	//--default read--//
	showRead(){
		const monthName = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    console.log('###################')
		console.log(this.readData);
		console.log(this.readData[0]);
    this.lastData = (this.dateValue.length == 0 ) ? (this.lastData) : (this.dateValue);
    console.log('========***======')
    console.log(this.lastData)
    let sendNextShow = new Date(`${this.lastData}`);
    console.log(sendNextShow);
		let clickContent = document.getElementById(`${monthName[sendNextShow.getMonth()]}`).parentNode.parentNode;
    clickContent.click();

		document.querySelectorAll('.listBox').forEach((v,i,a)=>{
			v.addEventListener('click', ()=>{
				const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
				document.querySelector('.writeContentWrap').style.transform = "scale(0)";
				document.querySelector('.deleteModal').style.transform = 'scale(0)';
				document.getElementById('readWrap').style.transform = "scale(1)";
				if(this.windowWidth > 980){
					document.querySelector('.listContentWrap').style.width = "40%";
					document.querySelector('.wrapCRUD').style.width = "40%";
				}else if(this.windowWidth < 980){
					document.querySelector('.listContentWrap').style.width = "0%";
					document.querySelector('.wrapCRUD').style.width = "80%";
				}else if(isMobile){
					document.querySelector('.listContentWrap').style.width = "0%";
					document.querySelector('.wrapCRUD').style.width = "100%";
					document.querySelector('.wrapCRUD').style.zIndex = 300;
					document.querySelector('.dateContentWrap').style.width = "0%";
				}

				document.getElementById("dateS").innerHTML = this.readData[0][i]["date"];
				document.getElementById("readTitle").innerText = this.readData[0][i]["title"];
				document.getElementById("readBody").innerText = this.readData[0][i]["body"].replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
				document.getElementById("weatherS").innerHTML = '';
				const matchW = { "sun":"../img/sun2.png", "cloud":"../img/cloud2.png", "rain":"../img/rain2.png", "snow":"../img/snow2.png" }
				let weatherSelect = this.readData[0][i]["weather"].split(",");
				//console.log(weatherSelect);
				for(let i=0; i<weatherSelect.length; i++){
					if(weatherSelect[i] != ''){
						document.getElementById("weatherS").innerHTML += `<div class="readW" style="background: center/contain no-repeat url('${matchW[weatherSelect[i].toString()]}');"></div>`;
					}
				}
				document.getElementById("moodS").innerHTML = '';
				const matchM = { "happy":"../img/happy2.png", "sad":"../img/sad2.png", "soso":"../img/soso2.png","angry":"../img/angry2.png" }
				let moodSelect = this.readData[0][i]["mood"].split(",");
				for(let i=0; i<moodSelect.length; i++){
					if(moodSelect[i] != ''){
						document.getElementById("moodS").innerHTML += `<div class="readW" style="background: center/contain no-repeat url('${matchM[moodSelect[i].toString()]}');"></div>`;
					}
				}
		
				document.getElementById("modifyBtn").addEventListener('click',()=>{
					document.querySelector('.writeContentWrap').style.transform = 'scale(1)';
					//console.log(this.readData);
					this.showUpdate();
				});
				console.log(this.readData[0][i]);
				const updateSend = this.readData[0][i];
				this.updateKey = [];
				this.updateKey.push(updateSend);
				console.log(this.updateKey);
			});
		});
	}
	//--default read end--//

	//--delete contents--//
	showDelete(){
		//console.log(this.readData);
		document.querySelectorAll('.listBox').forEach((v,i,a)=>{
			v.addEventListener('click',()=>{
				console.log(this.readData[0][i]["date"]);
				this.deleteKey = this.readData[0][i]["date"];
				console.log(this.deleteKey);
			});
		});
	}
	//--delete contents--//

	//--delte data--//
	deleteData(){
		(async ()=>{
			let responseData3 = await new Promise(resolve => {
				const xhttp2 = new XMLHttpRequest();
				xhttp2.open("GET", `http://kkms4001.iptime.org:10188/delete/?date=${this.deleteKey}`, true);

				xhttp2.onload = function(e) {
					resolve(xhttp2.response);
				}
				xhttp2.onerror = function() {
					resolve(undefined);
					console.error("** An error occurred during the XMLHttpRequest");
				}
				xhttp2.send();
        this.lastData = this.deleteKey
			});
			this.showList(responseData3);
			this.changeShow(responseData3);
		})();
	}
	//--delte data end--//

	//--read data--//
	listData(){
		(async ()=>{
			let responseData2 = await new Promise(resolve => {
				const xhttp2 = new XMLHttpRequest();
				xhttp2.open("GET", "../js/diary.json", true);
				xhttp2.onload = function(e) {
					resolve(xhttp2.response);
				}
				xhttp2.onerror = function() {
					resolve(undefined);
					console.error("** An error occurred during the XMLHttpRequest");
				}
				xhttp2.send();
			});
			this.showList(responseData2);
			this.changeShow(responseData2);
		})();
	}
	//--read data end--//


	//--update change--//
	showUpdate(){
		// console.log(this.updateKey[0]);
		document.getElementById('saveBtn').style.transform = "scale(0)";
		document.getElementById('updateBtn').style.transform = "scale(1)";
		document.getElementById('readWrap').style.transform = "scale(0)";

		const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

		if(isMobile){
			document.querySelector('.listContentWrap').style.width = "0%";
			document.querySelector('.wrapCRUD').style.width = "100%";
			document.querySelector('.wrapCRUD').style.zIndex = 300;
			document.querySelector('.dateContentWrap').style.width = "0%";
		}


		// const weather = { "sun":false, "cloud":false, "rain":false, "snow":false }
		// const mood = { "happy":false, "sad":false, "soso":false, "angry":false }
		for(let key in this.updateKey[0]){
			if(key == 'mood'){
				this.updateKey[0][key].split(",").forEach((v,i,a)=>{
					if(document.getElementById(`${v}`) != null){
						document.getElementById(`${v}`).classList.add('selectValue');
					}
					this.moodObj[v] = true;
				});
			}
		}
		// console.log(this.moodObj);
		for(let key in this.updateKey[0]){
			if(key == 'weather'){
				this.updateKey[0][key].split(",").forEach((v,i,a)=>{
					if(document.getElementById(`${v}`) != null){
						document.getElementById(`${v}`).classList.add('selectValue');
					}
					this.weatherObj[v] = true;
				});
			}
		}
		document.getElementById("diaryDate").value = this.updateKey[0]["date"]; 
		document.getElementById("diaryTitle").value = this.updateKey[0]["title"].replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
		document.getElementById("diaryBody").value = this.updateKey[0]["body"].replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
	}
	//--update change end--//

	//--update data--//
	updateData(){
		(async ()=>{
			let responseData4 = await new Promise(resolve => {
				const xhttp4 = new XMLHttpRequest();
				xhttp4.open("GET", `http://kkms4001.iptime.org:10188/update/?date=${this.dateValue}&weather=${this.weatherValue}&mood=${this.moodValue}&title=${this.titleValue}&body=${this.bodyValue}`, true);

				xhttp4.onload = function(e) {
					resolve(xhttp4.response);
				}
				xhttp4.onerror = function() {
					resolve(undefined);
					console.error("** An error occurred during the XMLHttpRequest");
				}
				xhttp4.send();
			});
			this.showList(responseData4);
			this.changeShow(responseData4);
		})();
	}
	//--update data end--//
}

const myDiary1 = new Diary('test1');
myDiary1.buttonEvent();
myDiary1.selectValue();
myDiary1.listData();
myDiary1.widthSize();
myDiary1.modeChange();
myDiary1.standardToday();