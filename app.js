"use strict";
const apiKey = 'OiONWIfvr0i94cSwrGaZh5d3Yq0746UbbbHD8hoh';

const baseUrl = 'https://developer.nps.gov/api/v1/parks';


function formatUrlParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        
    return queryItems.join('&');

}


function showCampList(responseJson) {
    $('.list').empty();
    for (i = 0; i < responseJson.data.length; i++) {
        $('.list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <p>${responseJson.data[i].url}</p>
            </li>`
          )};  
        $('.results-container').show();
    }
   


















function retrieveList(){
    const params = {
        api_key : apiKey,
        stateCode: document.getElementById('state').value,
        limit: document.getElementById('amount').value,
    };
    
    const queryString = formatUrlParams(params);
    const url = baseUrl + '?' + queryString;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                    throw new Error(response.status);
            
            })
            .then(responseJson => showCampList(responseJson))
            .catch(err => {
                $('.error-message').show();
                });
    console.log('retrieveList ran');

 
    
};



function getCampListings(){
    $('main').submit(event => {
        event.preventDefault();
        retrieveList();
    })
};






function handleCampApp(){
    console.log('app is ready to run')
    getCampListings();
}

$(handleCampApp());
