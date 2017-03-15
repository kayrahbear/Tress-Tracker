"use strict";

app.factory("FirebaseStorage", function(FBCreds, $q, $http, AuthFactory) {

    let getAllWigs = () => {
        let wigs = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/allWigs.json`)
            .then((wigObject) =>{
                let wigCollection = wigObject.data;
                Object.keys(wigCollection).forEach((key)=>{
                    wigCollection[key].id = key;
                    wigs.push(wigCollection[key]);
                });
                resolve(wigs);
            })
            .catch((error)=> {
                reject(error);
            });
        });
    };

    return {getAllWigs};

});
