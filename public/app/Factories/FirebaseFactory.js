"use strict";

app.factory("FirebaseStorage", function (FBCreds, $q, $http, AuthFactory) {

//interactions with non-user items from Firebase
    let getAllWigs = () => {
        let wigs = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/allWigs.json`)
                .then((wigObject) => {
                    let wigCollection = wigObject.data;
                    Object.keys(wigCollection).forEach((key) => {
                        wigCollection[key].id = key;
                        wigs.push(wigCollection[key]);
                    });
                    resolve(wigs);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let getColors = () => {
        let colors = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/brandColors.json`)
                .then((brandObject) => {
                    let brandColorsCollection = brandObject.data;
                    Object.keys(brandColorsCollection).forEach((key) => {
                        brandColorsCollection[key].id = key;
                        colors.push(brandColorsCollection[key]);
                    });
                    resolve(colors);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let getSingleWig = (wigId) => {
        return $q(function (resolve, reject) {
            $http.get(`${FBCreds.databaseURL}/allWigs/${wigId}.json`)
                .then(function (wigObject) {
                    resolve(wigObject.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };

    let scrapeSingleWig = (wigUrl) => {
        return $q(function (resolve, reject) {
            $http.get(`https://cysterwigs.com/products/${wigUrl}/products.json`)
                .then(function (scrapedObject) {
                    resolve(scrapedObject.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    };

//user specific interactions with FB
    let addUserWig = (userWig) => {
        return $q((resolve, reject) => {
            $http.post(`${FBCreds.databaseURL}/userData.json`,
                JSON.stringify(userWig))
                .then((ObjectFromFirebase) => {
                    resolve(ObjectFromFirebase);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let getUserWigs = (user) => {
        let wigs = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/userData.json?orderBy="uid"&equalTo="${user}"`)
                .then((wigObject) => {
                    let wigCollection = wigObject.data;
                    Object.keys(wigCollection).forEach((key) => {
                        wigCollection[key].id = key;
                        wigs.push(wigCollection[key]);
                    });
                    resolve(wigs);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let deleteUserWig = (wigId) => {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/userData/${wigId}.json`)
                .then((ObjectFromFirebase) => {
                    resolve(ObjectFromFirebase);
                });
        });
    };

    return {getAllWigs, getSingleWig, scrapeSingleWig, addUserWig, getUserWigs, deleteUserWig, getColors};

});
