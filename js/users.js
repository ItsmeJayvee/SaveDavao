(()=>{

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDpdkPhAYa_KXs4Ulef0eIYdrYC8bZ7z8w",
        authDomain: "savedavao.firebaseapp.com",
        projectId: "savedavao",
        storageBucket: "savedavao.appspot.com",
        messagingSenderId: "742079499394",
        appId: "1:742079499394:web:5809da22d40c54b568f89b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    $(document).ready(function(){
        $('.sidenav').sidenav();
        $('.modal').modal({
            dismissible: false
        });
    });

    eraseBtn2.addEventListener('click', e=>{
        enterPin1.value = "";
        enterPin2.value = "";
        enterPin3.value = "";
        enterPin4.value = "";
    });

    eraseBtn1.addEventListener('click', e=>{
        newPin1.value = "";
        newPin2.value = "";
        newPin3.value = "";
        newPin4.value = "";
    });

    logoutBtn.addEventListener('click', e=>{
        firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection('users').doc(user.uid).get().then((doc)=>{
                if(doc.data().fullname == null){
                    $(document).ready(function(){
                        $('#profile').modal("open");
                        M.updateTextFields();
                    });
                    emailProfile.value = user.email;
                }
                if(doc.data().pincode != null){
                    $(document).ready(function(){
                        $('#enterPin').modal('open');
                    });
                }
            });

            db.collection('users').doc(user.uid).onSnapshot((doc) =>{
                emptyPic.src = doc.data().photo;
                fullname.textContent = doc.data().fullname;
                email.textContent = doc.data().email;
            });

            profileBtn.addEventListener('click', e=>{
                db.collection('users').doc(user.uid).get().then((doc)=>{
                    fnameProfile2.value = doc.data().fullname;
                    emailProfile2.value = doc.data().email;
                    $(document).ready(function(){
                        $('#profile2').modal("open");
                        M.updateTextFields();
                    });
                });
            });

            submitProfile2.addEventListener('click', e=>{
                db.collection('users').doc(user.uid).update({
                    fullname: fnameProfile.value
                }).then(function(){
                    $(document).ready(function(){
                        $('#profile2').modal('close');
                    });
                });
            });

            fileBtn2.addEventListener('change', e=>{
                if(fnameProfile2.value == ""){
                    fnameMissing2.classList.remove('hide');
                    fileBtn2.value = ""
                }else{
                    fnameMissing2.classList.add('hide');

                    var file = e.target.files[0];

                    var storageRef = firebase.storage().ref('profile_pics/' + file.name);
    
                    var task = storageRef.put(file);
    
                    task.on('state_changed',
                        function progress(snapshot){
                            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            uploader2.value = percentage;
                        },
                        function error(err)
                        {
                            
                        },
                        function complete(){
                            task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                                db.collection('users').doc(user.uid).update({
                                    photo: downloadURL
                                }).then(function(){
                                    submitProfile.classList.remove('hide');
                                });
                            });
                        });
                }
            });

            submitProfile.addEventListener('click', e=>{
                db.collection('users').doc(user.uid).update({
                    fullname: fnameProfile.value
                }).then(function(){
                    $(document).ready(function(){
                        $('#profile').modal('close');
                        $('#newPin').modal('open');
                    });
                });
            });

            confirmPin.addEventListener('click', e=>{
                db.collection('users').doc(user.uid).update({
                    pincode: newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value
                }).then(function(){
                    $(document).ready(function(){
                        $('#newPin').modal('close');
                        $('#sure').modal('close');
                    });
                });
            });

            fileBtn.addEventListener('change', e=>{
                if(fnameProfile.value == ""){
                    fnameMissing.classList.remove('hide');
                    fileBtn.value = ""
                }else{
                    fnameMissing.classList.add('hide');

                    var file = e.target.files[0];

                    var storageRef = firebase.storage().ref('profile_pics/' + file.name);
    
                    var task = storageRef.put(file);
    
                    task.on('state_changed',
                        function progress(snapshot){
                            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            uploader.value = percentage;
                        },
                        function error(err)
                        {
                            
                        },
                        function complete(){
                            task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                                db.collection('users').doc(user.uid).update({
                                    photo: downloadURL
                                }).then(function(){
                                    submitProfile.classList.remove('hide');
                                });
                            });
                        });
                }
            });

            fire.addEventListener('click', e=>{
                let map, infoWindow;
        
                infoWindow = new google.maps.InfoWindow();
        
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 7.1907, lng: 125.4553 },
                    zoom: 18,
                });
        
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);
                            db.collection('reports').add({
                                user: user.uid,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                report: "fire report"
                            });
                        });
                    $(document).ready(function(){
                        $('#mapLocation').modal('open');
                    });
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            });

            flood.addEventListener('click', e=>{
                let map, infoWindow;
        
                infoWindow = new google.maps.InfoWindow();
        
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 7.1907, lng: 125.4553 },
                    zoom: 18,
                });
        
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);
                            db.collection('reports').add({
                                user: user.uid,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                report: "flood report"
                            });
                        });
                    $(document).ready(function(){
                        $('#mapLocation').modal('open');
                    });
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            });

            earthquake.addEventListener('click', e=>{
                let map, infoWindow;
        
                infoWindow = new google.maps.InfoWindow();
        
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 7.1907, lng: 125.4553 },
                    zoom: 18,
                });
        
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);
                            db.collection('reports').add({
                                user: user.uid,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                report: "earthquake report"
                            });
                        });
                    $(document).ready(function(){
                        $('#mapLocation').modal('open');
                    });
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            });

            crime.addEventListener('click', e=>{
                let map, infoWindow;
        
                infoWindow = new google.maps.InfoWindow();
        
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 7.1907, lng: 125.4553 },
                    zoom: 18,
                });
        
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);
                            db.collection('reports').add({
                                user: user.uid,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                report: "crime report"
                            });
                        });
                    $(document).ready(function(){
                        $('#mapLocation').modal('open');
                    });
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            });

            accident.addEventListener('click', e=>{
                let map, infoWindow;
        
                infoWindow = new google.maps.InfoWindow();
        
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 7.1907, lng: 125.4553 },
                    zoom: 18,
                });
        
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);
                            db.collection('reports').add({
                                user: user.uid,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                report: "accident report"
                            });
                        });
                    $(document).ready(function(){
                        $('#mapLocation').modal('open');
                    });
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            });

            one.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "1";
                }else if(newPin2.value == ""){
                    newPin2.value = "1";
                }else if(newPin3.value == ""){
                    newPin3.value = "1";
                }
                else{
                    newPin4.value = "1";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            two.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "2";
                }else if(newPin2.value == ""){
                    newPin2.value = "2";
                }else if(newPin3.value == ""){
                    newPin3.value = "2";
                }
                else{
                    newPin4.value = "2";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            three.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "3";
                }else if(newPin2.value == ""){
                    newPin2.value = "3";
                }else if(newPin3.value == ""){
                    newPin3.value = "3";
                }
                else{
                    newPin4.value = "3";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            four.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "4";
                }else if(newPin2.value == ""){
                    newPin2.value = "4";
                }else if(newPin3.value == ""){
                    newPin3.value = "4";
                }
                else{
                    newPin4.value = "4";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            five.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "5";
                }else if(newPin2.value == ""){
                    newPin2.value = "5";
                }else if(newPin3.value == ""){
                    newPin3.value = "5";
                }
                else{
                    newPin4.value = "5";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            six.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "6";
                }else if(newPin2.value == ""){
                    newPin2.value = "6";
                }else if(newPin3.value == ""){
                    newPin3.value = "6";
                }
                else{
                    newPin4.value = "6";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            seven.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "7";
                }else if(newPin2.value == ""){
                    newPin2.value = "7";
                }else if(newPin3.value == ""){
                    newPin3.value = "7";
                }
                else{
                    newPin4.value = "7";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            eight.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "8";
                }else if(newPin2.value == ""){
                    newPin2.value = "8";
                }else if(newPin3.value == ""){
                    newPin3.value = "8";
                }
                else{
                    newPin4.value = "8";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            nine.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "9";
                }else if(newPin2.value == ""){
                    newPin2.value = "9";
                }else if(newPin3.value == ""){
                    newPin3.value = "9";
                }
                else{
                    newPin4.value = "9";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
        
            zero.addEventListener('click', e=>{
                if(newPin1.value == ""){
                    newPin1.value = "0";
                }else if(newPin2.value == ""){
                    newPin2.value = "0";
                }else if(newPin3.value == ""){
                    newPin3.value = "0";
                }
                else{
                    newPin4.value = "0";
                }

                if(newPin1.value != "" && newPin2.value != "" && newPin3.value != "" && newPin4.value != ""){
                    $(document).ready(function(){
                        $('#sure').modal('open');
                    });
                    textMessage.textContent = "Your new PIN code will be "+newPin1.value+""+newPin2.value+""+newPin3.value+""+newPin4.value;
                }
            });
            
            one1.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "1";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "1";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "1";
                }
                else{
                    enterPin4.value = "1";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            two2.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "2";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "2";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "2";
                }
                else{
                    enterPin4.value = "2";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            three3.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "3";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "3";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "3";
                }
                else{
                    enterPin4.value = "3";
                }
                
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            four4.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "4";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "4";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "4";
                }
                else{
                    enterPin4.value = "4";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            five5.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "5";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "5";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "5";
                }
                else{
                    enterPin4.value = "5";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            six6.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "6";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "6";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "6";
                }
                else{
                    enterPin4.value = "6";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            seven7.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "7";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "7";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "7";
                }
                else{
                    enterPin4.value = "7";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            eight8.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "8";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "8";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "8";
                }
                else{
                    enterPin4.value = "8";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            nine9.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "9";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "9";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "9";
                }
                else{
                    enterPin4.value = "9";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });
        
            zero0.addEventListener('click', e=>{
                if(enterPin1.value == ""){
                    enterPin1.value = "0";
                }else if(enterPin2.value == ""){
                    enterPin2.value = "0";
                }else if(enterPin3.value == ""){
                    enterPin3.value = "0";
                }
                else{
                    enterPin4.value = "0";
                }
        
                if(enterPin1.value != "" && enterPin2.value != "" && enterPin3.value != "" && enterPin4.value != ""){   
                    var pincodes = enterPin1.value+""+enterPin2.value+""+enterPin3.value+""+enterPin4.value;
                    db.collection('users').doc(user.uid).get().then((doc)=>{
                        if(doc.data().pincode == pincodes){
                            $(document).ready(function(){
                                $('#enterPin').modal('close')
                            });
                        }else{
                            $(document).ready(function(){
                                $('#enterPin').modal('open')
                            });
                            enterPin1.value = "";
                            enterPin2.value = "";
                            enterPin3.value = "";
                            enterPin4.value = "";
                            wrongPin.classList.remove('hide');
                        }
                    });
                }
            });

        } else {
            window.location = "/index.html";
        }
    });
})();