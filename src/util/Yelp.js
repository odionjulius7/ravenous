const apiKey = 'lgPT5eBeTLlZj0ZxVjyjxgFiBlJCSZUg6nribuuBZgUccVxIlw0uDqo5RxYbQgXItFJ5TLNEbzQF06EyAWhWIn8mj2EILD8XyHKx2Xd_PfCvX1FFd3DGxkxmsRztX3Yx';
  
const Yelp = {
    search(term, location, sortBy) {
        // appending CORS anywhere for safe(permissions) request 
        // here we are making a fetch() request from an api (yelp api)
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, { 
            headers: {
              Authorization: `Bearer ${apiKey}` 
            }
          }).then( response => {
              /* converting are response from the api to json  */ 
              return response.json()
          }).then( jsonResponse => {
              // we would like to know if the response(json format) has businesses as a key 
              if (jsonResponse.businesses) {
                return jsonResponse.businesses.map( business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    };
                })
              }
          });
    }
};

export default Yelp;