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
        $('.parallax').parallax();
        $('.modal').modal({
            dismissible: false
        });
    });

    loginBtn.addEventListener('click', e=>{
        if(email1.value == ""){
            logErr1.classList.remove('hide');
        }else{
            logErr1.classList.add('hide');
        }

        if(password1.value == ""){
            logErr2.classList.remove('hide');
        }else{
            logErr2.classList.add('hide');
        }

        if(email1.value != "" && password1 != ""){
            logErr1.classList.add('hide');
            logErr2.classList.add('hide');
            firebase.auth().signInWithEmailAndPassword(email1.value, password1.value).catch((error) => {
                logErr0.classList.remove('hide');
                logErr0.textContent = error.message;
            });
        }
    });

    registerBtn.addEventListener('click', e=>{

        if(email2.value == ""){
            regErr1.classList.remove('hide');
        }else{
            regErr1.classList.add('hide');
        }

        if(password2.value == ""){
            regErr2.classList.remove('hide');
        }else{
            regErr2.classList.add('hide');
        }

        if(email2.value != "" && password2.value != ""){
            regErr1.classList.add('hide');
            regErr2.classList.add('hide');
            firebase.auth().createUserWithEmailAndPassword(email2.value, password2.value).catch((error) => {
                regErr0.classList.remove('hide');
                regErr0.textContent = error.message;
            });
        }

    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $(document).ready(function(){
                $('#loading').modal('open');
            });
            db.collection('users').doc(user.uid).get().then((doc)=>{
                if(doc.exists){
                    window.location = "users/index.html";
                }else{
                    db.collection('users').doc(user.uid).set({
                        photo: null,
                        fullname: null,
                        email: user.email,
                        pincode: null
                    }).then(function(){
                        window.location = "users/index.html";
                    });
                }
            });
        } else {
            console.log('no user');
        }
      });
})();