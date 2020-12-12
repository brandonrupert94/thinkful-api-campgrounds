
const apiKey = 'OiONWIfvr0i94cSwrGaZh5d3Yq0746UbbbHD8hoh';

const baseUrl = 'https://developer.nps.gov/api/v1/parks';


function formatUrlParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        
    return queryItems.join('&');

}






















function retrieveList(){
    const params = {
        api_key : apiKey,
        parkCode: document.getElementById('state').value,
        
    };
    
    const queryString = formatUrlParams(params);
    const url = baseUrl + '?' + queryString;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    response.json();
                }
                    throw new Error(response.status);
            
            })
            .then(responseJson => showCampList(responseJson))
            .catch(err => {
                $('.error-message').show();
                })

 

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