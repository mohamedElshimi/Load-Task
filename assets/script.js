//////////////////////Initialize variables//////////////////////////
let carImage = document.getElementById('carImage');
let makesOption = document.getElementById('makes');
let modelsOption = document.getElementById('models');
let yearsOption = document.getElementById('years');
let radios = document.getElementsByName('appType');
let pass1 = document.getElementById('pass1');
let pass2 = document.getElementById('pass2');
let shippingFor = document.getElementsByName('shippingFor')

let data = {
    type : "Individually",
    make :  "",
    model :  "",
    year :  "",
    carImage :  "",
    pieceName :  "",
    pieceNum :  "",
    pieceSerial :  "",
    vehicleChassiss:  "",
    clientName:  "",
    clientEmail:  "",
    clientPhone:  "",
    password:  "",
    repassword:  "",
    shipFor:  "me",
    shipNameAr:  "",
    shipNameEn:  "",
    address:  "",
    postalCode:  "",
    addressDiscription:  "",
    shipPhone:  "",
}


///////////////////////////Events///////////////////////////////



makesOption.addEventListener('change',()=>{
    data.make = makesOption.value;
    getCarModels(data.make);
})
modelsOption.addEventListener('change',()=>{
    data.model =  modelsOption.value;
    getCarYears(data.model)
})
yearsOption.addEventListener('change',()=>{
    data.year =  yearsOption.value;
    getCarImage(data.make, data.model, data.year);
})
shippingFor.forEach((radio)=>{
    radio.addEventListener('click',()=>{
        data.shipFor= radio.id;
    })
})
radios.forEach((radio)=>{
    radio.addEventListener('click',()=>{
        data.type= radio.id;
        if (radio.id == 'Company') {
            document.getElementById('pieceNumberDiv10').style.display='block';
            document.getElementById('pieceNumberDiv1').style.display='none';
            document.getElementById('chassisNumber').style.display='none'
        } else {
            document.getElementById('pieceNumberDiv10').style.display='none';
            document.getElementById('pieceNumberDiv1').style.display='block';
            document.getElementById('chassisNumber').style.display='block'
        }
    })
})
document.getElementById('goToStep2').addEventListener('click',()=>{
    event.preventDefault();
    if (data.year) {
        document.getElementById('step2').style.display="block";
    } else {
        alert('Enter the car details first!')
    }
})
document.getElementById('goToStep3').addEventListener('click',()=>{
    event.preventDefault();
    // document.getElementById('step3').style.display="block";
    let pieceName = document.getElementById('pieceName');
    let pieceNum = document.getElementById('pieceNum');
    let chassisNumberIn = document.getElementById('chassisNumberIn');
    
    if (pieceName.value == ''  || pieceNum.value == '' || chassisNumberIn.value== '') {
        alert('Please fill all required fields!')
    } else {
        data.pieceName =  pieceName.value;
        data.pieceNum =  pieceNum.value;
        data.vehicleChassiss = chassisNumberIn.value;
        data.pieceSerial = document.getElementById('serial').value;
        document.getElementById('step3').style.display="block";
    }
})
document.getElementById('goToStep4').addEventListener('click',()=>{
    event.preventDefault();
    // document.getElementById('step4').style.display="block";
    let celintName = document.getElementById('celintName');
    let celintEmail = document.getElementById('celintEmail');
    let flagCode = document.getElementById('flagCode');
    let celintPhone = document.getElementById('celintPhone');
    if (celintName.value == ''  || celintEmail.value == '' || flagCode.value== '' || celintPhone.value== '' || pass1.value== '' || pass1.value== '') {
        alert('Please fill all required fields!')
    } else {
        if (pass1.value != pass2.value) {
            
        } else {
            document.getElementById('step4').style.display="block";
            data.clientName =  celintName.value;
            data.clientEmail =  celintEmail.value;
            data.clientPhone =  flagCode.value.split(' ')[0]+celintPhone.value;
            console.log(data);
        }
    }
})
document.getElementById('goToStep5').addEventListener('click',()=>{
    event.preventDefault();
    // document.getElementById('step5').style.display="block";
    let shipNameAr = document.getElementById('shipNameAr');
    let shipNameEn = document.getElementById('shipNameEn');
    let country = document.getElementById('country');
    let city = document.getElementById('city');
    let Neighborhood = document.getElementById('Neighborhood');
    let postalCode = document.getElementById('postalCode');
    let addressDes = document.getElementById('addressDes');
    let flagCode2 = document.getElementById('flagCode');
    let celintPhone2 = document.getElementById('celintPhone');
    if (shipNameAr.value == ''  || shipNameEn.value == '' || flagCode2.value== '' || celintPhone2.value== '' || country.value== '' || city.value== '' || Neighborhood.value== '' || postalCode.value== '' || addressDes.value== '') {
        alert('Please fill all required fields!')
    } else {
        document.getElementById('step5').style.display="block";
        data.shipNameAr =  shipNameAr.value;
        data.shipNameEn =  shipNameEn.value;
        data.address = country.value +' , '+ city.value+' , '+Neighborhood.value ;
        data.postalCode= postalCode.value;
        data.addressDiscription = addressDes.value;
        data.shipPhone =  flagCode2.value.split(' ')[0]+celintPhone2.value;
        console.log(data);
        showOverview();
    }   
})
document.getElementById('backToStep1').addEventListener('click',()=>{
    event.preventDefault();
    document.getElementById('step2').style.display="none";
})
document.getElementById('backToStep2').addEventListener('click',()=>{
    event.preventDefault();
    document.getElementById('step3').style.display="none";
})
document.getElementById('backToStep3').addEventListener('click',()=>{
    event.preventDefault();
    document.getElementById('step4').style.display="none";
})
// document.getElementById('backToStep4').addEventListener('click',()=>{
//     event.preventDefault();
//     document.getElementById('step5').style.display="none";
// })
// document.getElementById('delete').addEventListener('click',Delete)
// document.getElementById('send').addEventListener('click',Send)

pass1.addEventListener('keyup',()=>{
    if (pass1.value == pass2.value) {
        document.getElementById('wrongPass').style.display = 'none'
    }else{
        document.getElementById('wrongPass').style.display = 'block'
    }
})
pass2.addEventListener('keyup',()=>{
    if (pass1.value == pass2.value) {
        document.getElementById('wrongPass').style.display = 'none'
    }else{
        document.getElementById('wrongPass').style.display = 'block'
    }
})



// // Functions to get car image , make, model, and year



function getCarImage(make, model, year) {
    // Construct the API endpoint URL
    const apiUrl = `https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=${make}+${model}+${year}`;

    // Fetch car image from Car Imagery API
    fetch(apiUrl)
        .then(response => response.text())
        .then(data2 => {
            // Extract image URL from XML response
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data2, "text/xml");
            const imageUrl = xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            carImage.style.display = 'block';
            carImage.src = imageUrl;
            data.carImage = imageUrl;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
function getCarMakes() {
    const apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract car makes from the response
            const makes = data.Results.map(result => result.MakeName);
            // You can do further processing with car makes here
            for (let i = 0; i < makes.length; i++) {
                makesOption.innerHTML += `<option>${makes[i]}</option>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
function getCarModels(make) {
    const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract car models from the response
            const models = data.Results.map(result => result.Model_Name);
            modelsOption.innerHTML = '<option selected>Select Car Model</option>';
            // console.log("Car Models for", make, ":", models);
            // You can do further processing with car models here
            for (let i = 0; i < models.length; i++) {
                modelsOption.innerHTML += `<option>${models[i]}</option>`;
            }

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
function getCarYears(model) {
    const apiKey = 'kYbMHYYLO/yTgBQ24Vx/5A==MegHk7Nz0Fawoa6A';
    const url = `https://api.api-ninjas.com/v1/cars?model=${model}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        yearsOption.innerHTML = '<option selected value="">Select Model Year</option>';
        for (let i = 0; i < result.length; i++) {
            yearsOption.innerHTML += `<option>${result[i].year}</option>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// get Country Code from API
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    // Loop through each country
    data.forEach(country => {
      let countryCode ='';
      if (country.idd.suffixes[1] == undefined) {
        countryCode = country.idd.root+country.idd.suffixes[0];
      } else {
        countryCode = country.idd.root;
      }
      const countryName = country.name.common;
    //   const flagUrl = country.flags.png;
    document.getElementById('flagCode').innerHTML += `<option>${countryCode}  - ${countryName}</option>`;
    document.getElementById('flagCode2').innerHTML += `<option>${countryCode}  - ${countryName}</option>`;
    document.getElementById('country').innerHTML += `<option>${countryName}</option>`;

    });
  })
  .catch(error => {
    console.error('Error fetching country data:', error);
  });


function Delete() {
    location.reload();
}

function Send() {
    swal("Your application has been received", `It  is being reviewed and it number is : 2222`).then(() => {
          location.reload();
      });
    
}
function goBack() {
    document.getElementById('step5').style.display="none";
}
function showOverview() {
    document.getElementById('overview').innerHTML = `
<h3 class="text-center">Overview</h3>
                <div>
                    <h3 class="text-decoration-underline">Car</h3>
                    <div class="d-flex justify-content-between">
                        <div>
                            <p class="fs-5">Form Type : ${data.type}</p>
                            <p class="fs-5">Car Maker : ${data.make}</p>
                            <p class="fs-5">Model : ${data.model}</p>
                            <p class="fs-5">Model Year : ${data.year}</p>
                        </div>
                        <img src="${data.carImage}" height="150" alt="">
                    </div>
                </div>
                <div>
                    <h3 class="text-decoration-underline">Piece</h3>
                    <div class="row justify-content-between">
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Name Of Piece : ${data.pieceName}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Serial Number Of Piece : ${data.pieceSerial}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Number Of Piece : ${data.pieceNum}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Vehicle Chassis Number : ${data.vehicleChassiss}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 class="text-decoration-underline">Client</h3>
                    <div class="row justify-content-between">
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Client Name : ${data.clientName}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Client Email : ${data.clientEmail}</p>
                        </div>
                        <div class="col-12">
                            <p class="fs-5">Client Phone : ${data.clientPhone}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 class="text-decoration-underline">Shipping</h3>
                    <div class="row justify-content-between">
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Shipping For : ${data.shipFor}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Full Name In Arabic : ${data.shipNameAr}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Full Name In English : ${data.shipNameEn}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Address : ${data.address}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Postal Code : ${data.postalCode}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Phone : ${data.shipPhone}</p>
                        </div>
                        <div class="col-md-6 col-12">
                            <p class="fs-5">Address Description : ${data.addressDiscription}</p>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between col-12">
                    <button class="btn btn-secondary" id="backToStep4" onclick="goBack()">Back</button>
                    <button class="btn btn-danger" onclick="Delete()">Delete</button>
                    <button class="btn btn-primary" onclick="Send()">Send</button>
                </div>

`;
}
////////////////////////Execute function////////////////////////


getCarMakes();
document.getElementById('pieceNumberDiv10').style.display='none';
document.getElementById('pieceNumberDiv1').style.display='block';
