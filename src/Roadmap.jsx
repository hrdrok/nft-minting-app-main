import React from "react";
import background from "./images/bg.png";

function Roadmap() {
  return (
    <div style={{ backgroundImage: `url(${background})`}}>
    <div class= "container-fluid pt-5"></div>
    <div className="roadmap">
        <div class="container">
        <div class="row text-center">
          <div class="col-lg-12">
            <img
              class="img-thumbnail text-center"
              src="https://imgur.com/EINgLYN.png"
              alt=""
            />
          </div>
          <div class= "container-fluid pt-5"></div>
          <div class="col-lg-12">
            <h1 class="display-3 font-weight-light pt-5">Roadmap</h1>
            <p class="font-weight- bold pt-5">
              Coming Soon!
            </p>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>            
          </div>
        </div>
      </div>
    </div>
    </div>    
  );
}

export default Roadmap;