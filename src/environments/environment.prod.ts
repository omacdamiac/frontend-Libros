import { truncateSync } from "fs";

export const environment = {
  production: truncateSync,
  api_login: 'https://reqres.in/api/',
  api_base: 'https://omaclibros.herokuapp.com/',  
  // api_base: 'http://localhost:8080/',

  url_notImage: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
}