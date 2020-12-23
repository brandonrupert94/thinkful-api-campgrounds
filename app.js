
const apiKey = 'OiONWIfvr0i94cSwrGaZh5d3Yq0746UbbbHD8hoh';

const baseUrl = 'https://developer.nps.gov/api/v1/parks?';


function formatUrlParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURI(key)}=${encodeURI(params[key])}`);
    console.log(queryItems);
    console.log(queryItems.join('&'));
    return queryItems.join('&');

};


function showCampList(responseJson) {
    
    for (i = 0; i < responseJson.data.length; i++) {
        $('.list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
            </li>`
          )};  
        $('.results-container').show();
    };
   






function retrieveList(state, limit){
    const params = {
        api_key : apiKey,
        stateCode: state,
        limit: limit,
    };

    const queryString = formatUrlParams(params);
    const url = baseUrl + queryString;
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
        $('.list').empty();
        const state = $('#state').val().replace(/\s/g, "");
               
        const limit = $('#amount').val();
       retrieveList(state, limit);
       
    })
};






function handleCampApp(){
    console.log('app is ready to run')
    getCampListings();
};

$(handleCampApp());
