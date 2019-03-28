//assets
import "jquery"
import "bootstrap"
import "underscore"
import "backbone"
import "backbone.radio"
// import Marionette from "backbone.marionette"
import Mn from 'backbone.marionette'
window.Mn = require('backbone.marionette')

//code
import "./js/app.js"

//styles
import "./css/style.less"

$(document).ready(function(){
    console.log(`${process.env.INSTAGRAM_API_URL}` + `${process.env.INSTAGRAM_PROFILE}`)

    $("#instagram_profile").text(`${process.env.INSTAGRAM_PROFILE}`)
})