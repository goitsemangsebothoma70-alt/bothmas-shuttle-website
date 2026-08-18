const currentUser=JSON.parse(sessionStorage.getItem("currentUser"));
if(!currentUser||currentUser.role!=="passenger"){alert("Please sign in as a passenger first.");window.location.href="index.html";}
const headerUser=document.getElementById("header-user"),logoutBtn=document.getElementById("logout-btn");
if(currentUser)headerUser.textContent=currentUser.name||"Passenger";
logoutBtn.addEventListener("click",()=>{sessionStorage.removeItem("currentUser");window.location.href="index.html";});

const rideForm=document.getElementById("ride-form"),pickup=document.getElementById("pickup"),destination=document.getElementById("destination"),distance=document.getElementById("distance"),fare=document.getElementById("fare");
const emptyStatus=document.getElementById("empty-status"),activeRide=document.getElementById("active-ride"),subtitle=document.getElementById("status-subtitle"),statusText=document.getElementById("status-text"),badge=document.getElementById("status-badge"),statusPickup=document.getElementById("status-pickup"),statusDestination=document.getElementById("status-destination"),driverPanel=document.getElementById("driver-panel"),driverName=document.getElementById("driver-name"),driverCar=document.getElementById("driver-car"),driverRating=document.getElementById("driver-rating"),driverEta=document.getElementById("driver-eta");
const startBtn=document.getElementById("start-trip"),completeBtn=document.getElementById("complete-trip"),cancelBtn=document.getElementById("cancel-ride");
const steps={search:document.getElementById("step-search"),driver:document.getElementById("step-driver"),trip:document.getElementById("step-trip"),complete:document.getElementById("step-complete")},lines={one:document.getElementById("line-1"),two:document.getElementById("line-2"),three:document.getElementById("line-3")};

const BASE=20,RATE=8,SERVICE=5;
function calcFare(){fare.textContent=`R${(BASE+(Number(distance.value)||0)*RATE+SERVICE).toFixed(2)}`;}
distance.addEventListener("input",calcFare);calcFare();

document.getElementById("use-location").addEventListener("click",e=>{
  if(!navigator.geolocation){alert("Location services are not supported.");return;}
  e.currentTarget.disabled=true;e.currentTarget.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Getting location...';
  navigator.geolocation.getCurrentPosition(p=>{
    pickup.value=`Current location (${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)})`;
    e.currentTarget.disabled=false;e.currentTarget.innerHTML='<i class="fa-solid fa-check"></i> Location added';
  },()=>{alert("Unable to access your location. Please type it manually.");e.currentTarget.disabled=false;e.currentTarget.innerHTML='<i class="fa-solid fa-crosshairs"></i> Use my current location';},{enableHighAccuracy:true,timeout:10000});
});

function setStep(current){const order=["search","driver","trip","complete"],i=order.indexOf(current);order.forEach((n,x)=>{steps[n].classList.remove("active","done");if(x<i)steps[n].classList.add("done");if(x===i)steps[n].classList.add("active")});lines.one.classList.toggle("active",i>=1);lines.two.classList.toggle("active",i>=2);lines.three.classList.toggle("active",i>=3);}
function setStatus(message,type="searching"){statusText.textContent=message;const styles={searching:["#fff4dc","#a56600"],driver:["#eeeafd","#512da8"],trip:["#eaf7ee","#218739"],complete:["#eaf7ee","#218739"]}[type];badge.style.background=styles[0];badge.style.color=styles[1];}
function randomDriver(){return[{name:"Thabo M.",car:"Toyota Quantum • BSM 214 GP",rating:"★ 4.9"},{name:"Kabelo S.",car:"Toyota Quantum • BSM 672 GP",rating:"★ 4.8"},{name:"Mpho K.",car:"Toyota Quantum • BSM 431 GP",rating:"★ 5.0"}][Math.floor(Math.random()*3)];}
function showRide(){emptyStatus.classList.add("hidden");activeRide.classList.remove("hidden");statusPickup.textContent=pickup.value;statusDestination.textContent=destination.value;subtitle.textContent="Searching for a driver...";}
function resetRide(){emptyStatus.classList.remove("hidden");activeRide.classList.add("hidden");driverPanel.classList.add("hidden");startBtn.classList.add("hidden");completeBtn.classList.add("hidden");subtitle.textContent="No active ride";setStep("search");setStatus("Searching for a driver...");}

rideForm.addEventListener("submit",e=>{
  e.preventDefault();
  if(!pickup.value.trim()||!destination.value.trim()){alert("Enter both pickup and destination.");return;}
  const km=Number(distance.value);if(!km||km<=0){alert("Enter a valid distance.");return;}
  const ride={passenger:currentUser?.name||"Passenger",pickup:pickup.value.trim(),destination:destination.value.trim(),distance:km,fare:BASE+km*RATE+SERVICE,status:"searching",createdAt:new Date().toISOString()};
  sessionStorage.setItem("activeRide",JSON.stringify(ride));showRide();setStep("search");setStatus("Searching for a driver...");
  setTimeout(()=>{
    const d=randomDriver();ride.status="driver_found";ride.driver=d;sessionStorage.setItem("activeRide",JSON.stringify(ride));
    driverName.textContent=d.name;driverCar.textContent=d.car;driverRating.textContent=d.rating;driverEta.textContent=`${Math.floor(Math.random()*5)+3} min`;
    driverPanel.classList.remove("hidden");subtitle.textContent="Driver matched";setStatus("Driver found and heading to you.","driver");setStep("driver");startBtn.classList.remove("hidden");
  },2500);
});

startBtn.addEventListener("click",()=>{const r=JSON.parse(sessionStorage.getItem("activeRide"));if(!r)return;r.status="in_progress";sessionStorage.setItem("activeRide",JSON.stringify(r));setStep("trip");setStatus("Your trip is in progress.","trip");subtitle.textContent="Trip in progress";startBtn.classList.add("hidden");completeBtn.classList.remove("hidden");driverEta.textContent="On trip";});
completeBtn.addEventListener("click",()=>{const r=JSON.parse(sessionStorage.getItem("activeRide"));if(!r)return;r.status="completed";r.completedAt=new Date().toISOString();sessionStorage.setItem("lastCompletedRide",JSON.stringify(r));sessionStorage.removeItem("activeRide");setStep("complete");setStatus("Ride completed successfully.","complete");subtitle.textContent="Ride completed";completeBtn.classList.add("hidden");cancelBtn.classList.add("hidden");setTimeout(()=>{alert(`Ride completed.\nEstimated fare: R${r.fare.toFixed(2)}`);resetRide();cancelBtn.classList.remove("hidden");},400);});
cancelBtn.addEventListener("click",()=>{if(!sessionStorage.getItem("activeRide")){resetRide();return;}if(confirm("Are you sure you want to cancel this ride?")){sessionStorage.removeItem("activeRide");alert("Your ride has been cancelled.");resetRide();}});

function restoreRide(){const r=JSON.parse(sessionStorage.getItem("activeRide"));if(!r)return;pickup.value=r.pickup||"";destination.value=r.destination||"";distance.value=r.distance||10;calcFare();showRide();
if(r.status==="searching"){setStep("search");setStatus("Searching for a driver...");}
if(r.driver){driverName.textContent=r.driver.name;driverCar.textContent=r.driver.car;driverRating.textContent=r.driver.rating;driverPanel.classList.remove("hidden");}
if(r.status==="driver_found"){setStep("driver");setStatus("Driver found and heading to you.","driver");subtitle.textContent="Driver matched";startBtn.classList.remove("hidden");}
if(r.status==="in_progress"){setStep("trip");setStatus("Your trip is in progress.","trip");subtitle.textContent="Trip in progress";completeBtn.classList.remove("hidden");driverEta.textContent="On trip";}}
restoreRide();